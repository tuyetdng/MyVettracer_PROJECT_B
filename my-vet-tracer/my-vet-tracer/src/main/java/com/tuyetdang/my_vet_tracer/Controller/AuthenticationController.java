package com.tuyetdang.my_vet_tracer.Controller;

import com.nimbusds.jose.JOSEException;
import com.tuyetdang.my_vet_tracer.Service.AuthenticationService;
import com.tuyetdang.my_vet_tracer.dto.request.AuthenticationRequest;
import com.tuyetdang.my_vet_tracer.dto.request.IntrospectRequest;
import com.tuyetdang.my_vet_tracer.dto.request.LogoutRequest;
import com.tuyetdang.my_vet_tracer.dto.response.APIResponse;
import com.tuyetdang.my_vet_tracer.dto.response.AuthenticationResponse;
import com.tuyetdang.my_vet_tracer.dto.response.IntrospectResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/token")
    APIResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        var result = authenticationService.authenticate(request);

        return APIResponse.success(result);

    }

    @PostMapping("/introspect")
    APIResponse<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);

        return APIResponse.<IntrospectResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/logout")
    APIResponse<Void> logout(@RequestBody LogoutRequest request) throws JOSEException, ParseException {
        authenticationService.logout(request);
        return APIResponse.<Void>builder()
                .build();
    }
}
