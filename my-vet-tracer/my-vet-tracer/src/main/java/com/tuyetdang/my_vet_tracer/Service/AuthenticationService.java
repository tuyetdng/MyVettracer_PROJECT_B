package com.tuyetdang.my_vet_tracer.Service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.tuyetdang.my_vet_tracer.Entity.InvalidatedToken;
import com.tuyetdang.my_vet_tracer.Repository.InvalidatedTokenRepository;
import com.tuyetdang.my_vet_tracer.Repository.OwnerUserRepository;
import com.tuyetdang.my_vet_tracer.Repository.VetUserRepository;
import com.tuyetdang.my_vet_tracer.dto.request.AuthenticationRequest;
import com.tuyetdang.my_vet_tracer.dto.request.IntrospectRequest;
import com.tuyetdang.my_vet_tracer.dto.request.LogoutRequest;
import com.tuyetdang.my_vet_tracer.dto.request.RefreshRequest;
import com.tuyetdang.my_vet_tracer.dto.response.AuthenticationResponse;
import com.tuyetdang.my_vet_tracer.dto.response.IntrospectResponse;
import com.tuyetdang.my_vet_tracer.exception.AppException;
import com.tuyetdang.my_vet_tracer.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;
import java.util.StringJoiner;
import java.util.UUID;

import com.tuyetdang.my_vet_tracer.Entity.OwnerUser;
import com.tuyetdang.my_vet_tracer.Entity.VetUser;
import org.springframework.util.CollectionUtils;


@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    //@NonFinal: annotation lombok not add to constructor
    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;
    OwnerUserRepository ownerUserRepository;
    VetUserRepository vetUserRepository;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected long REFRESHABLE_DURATION;

    InvalidatedTokenRepository invalidatedTokenRepository;

    JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        Optional<? extends Object> foundUser = ownerUserRepository.findByUserName(request.getUserName())
                .map(user -> (Object) user)
                .or(() -> vetUserRepository.findByUserName(request.getUserName()).map(user -> (Object) user));


        boolean authenticated;
        String userName = "";

        if (foundUser.get() instanceof OwnerUser ownerUser) {
            authenticated = passwordEncoder.matches(request.getPassword(), ((OwnerUser) foundUser.get()).getPassword());
            userName = ownerUser.getUserName();
        } else if (foundUser.get() instanceof VetUser vetUser) {
            authenticated = passwordEncoder.matches(request.getPassword(), ((VetUser) foundUser.get()).getPassword());
            userName = vetUser.getUserName();

        } else {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }


        if (!authenticated) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        var token = generateToken(foundUser.get());

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();

    }

    private String generateToken(Object user) {
        String scope = "";
        String username = "";

        if (user instanceof OwnerUser ownerUser) {
            username = ownerUser.getUserName();
            scope = buildScope(ownerUser);
        } else if (user instanceof VetUser vetUser) {
            username = vetUser.getUserName();
            scope = buildScope(vetUser);
        }

        //Data in body
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(username)
                .issuer("vettracer.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", scope)
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token");
            throw new RuntimeException(e);
        }
    }

    private String buildScope(Object user) {
        StringJoiner stringJoiner = new StringJoiner(" ");

        if (user instanceof OwnerUser ownerUser) {
            if (!CollectionUtils.isEmpty(ownerUser.getRoles())) {
                ownerUser.getRoles().forEach(role -> {
                    stringJoiner.add("ROLE_" + role.getName());
                    if (!CollectionUtils.isEmpty(role.getPermissions())) {
                        role.getPermissions().forEach(permission -> stringJoiner.add(permission.getName()));
                    }
                });
            }
        } else {
            VetUser vetUser = (VetUser) user;
            if (!CollectionUtils.isEmpty(vetUser.getRoles())) {
                vetUser.getRoles().forEach(role -> {
                    stringJoiner.add("ROLE_" + role.getName());
                    if (!CollectionUtils.isEmpty(role.getPermissions())) {
                        role.getPermissions().forEach(permission -> stringJoiner.add(permission.getName()));
                    }
                });
            }
        }

        System.out.println("roles check: " + stringJoiner.toString());

        return stringJoiner.toString();
    }

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;

        try {
            verifyToken(token, false);
        } catch (AppException e) {
            isValid = false;
        }

        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }

    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try {
            var signToken = verifyToken(request.getToken(), true); //follow by refresh token time

            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();

            InvalidatedToken invalidatedToken =
                    InvalidatedToken.builder().id(jit).expiryTime(expiryTime).build();

            invalidatedTokenRepository.save(invalidatedToken);
        } catch (AppException exception) {
            log.info("Token already expired");
        }
    }

    private SignedJWT verifyToken(String token, boolean isRefresh)
            throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

//        String tokenId = signedJWT.getJWTClaimsSet().getJWTID();

        Date expiryTime = (isRefresh)
                ? new Date(signedJWT
                .getJWTClaimsSet()
                .getIssueTime()
                .toInstant()
                .plus(REFRESHABLE_DURATION, ChronoUnit.SECONDS)
                .toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);


        if (!(verified && expiryTime.after(new Date())))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return signedJWT;
    }

public AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException {
    var signedJWT = verifyToken(request.getToken(), true);

    var jit = signedJWT.getJWTClaimsSet().getJWTID();
    var expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

    InvalidatedToken invalidatedToken =
            InvalidatedToken.builder()
                    .id(jit)
                    .expiryTime(expiryTime)
                    .build();
    invalidatedTokenRepository.save(invalidatedToken);

    var username = signedJWT.getJWTClaimsSet().getSubject();

    Optional<? extends Object> foundUser = ownerUserRepository.findByUserName(username)
            .map(user -> (Object) user)
            .or(() -> vetUserRepository.findByUserName(username).map(user -> (Object) user));


    if (foundUser.isEmpty()) {
        throw new AppException(ErrorCode.UNAUTHENTICATED);
    }

    var token = generateToken(foundUser.get());

    return AuthenticationResponse.builder()
            .token(token)
            .authenticated(true)
            .build();
}


}