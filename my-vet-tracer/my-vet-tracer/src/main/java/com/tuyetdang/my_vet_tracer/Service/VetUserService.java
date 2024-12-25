package com.tuyetdang.my_vet_tracer.Service;

import com.tuyetdang.my_vet_tracer.Entity.OwnerUser;
import com.tuyetdang.my_vet_tracer.Entity.Role;
import com.tuyetdang.my_vet_tracer.Entity.VetUser;
import com.tuyetdang.my_vet_tracer.Mapper.VetUserMapper;
import com.tuyetdang.my_vet_tracer.Repository.RoleRepository;
import com.tuyetdang.my_vet_tracer.Repository.VetUserRepository;
import com.tuyetdang.my_vet_tracer.constant.PredefinedRole;
import com.tuyetdang.my_vet_tracer.dto.request.CreaterSystemVetUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateSystemVetUserRequest;
import com.tuyetdang.my_vet_tracer.dto.response.OwnerUserResponse;
import com.tuyetdang.my_vet_tracer.dto.response.PetResponse;
import com.tuyetdang.my_vet_tracer.dto.response.VetUserResponse;
import com.tuyetdang.my_vet_tracer.exception.AppException;
import com.tuyetdang.my_vet_tracer.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VetUserService {
    VetUserRepository userRepository;
    VetUserMapper userMapper;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;

    public VetUserResponse createUser(CreaterSystemVetUserRequest request) {
        if (userRepository.existsByUserName(request.getUserName())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        VetUser user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        HashSet<Role> roles = new HashSet<>();
        roleRepository.findById(PredefinedRole.VET_ROLE).ifPresent(roles::add);

        user.setRoles(roles);
        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        return userMapper.toUserResponse(user);
    }

//    @PreAuthorize("hasRole('ADMIN')")
    public List<VetUserResponse> getUsers() {
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public VetUserResponse getUsers(Integer Id) {
        return userMapper.toUserResponse(userRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Veterinarian User not found")));
    }

    public VetUserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        System.out.println("Authenticated user name: " + name);
        VetUser user = userRepository.findByUserName(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

//    @PostAuthorize("returnObject.userName == authentication.name")
    public VetUserResponse updateUser(Integer user_id, UpdateSystemVetUserRequest request) {
        VetUser user = userRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("Veterinarian User not found"));
        userMapper.updateUser(user, request);

//        user.setPassword(passwordEncoder.encode(request.getPassword()));

        var roles = roleRepository.findAllById(request.getRoles());
        user.setRoles(new HashSet<>(roles));
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(Integer user_id) {
        userRepository.deleteById(user_id);
    }


}