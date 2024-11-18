package com.tuyetdang.my_vet_tracer.Service;

import com.tuyetdang.my_vet_tracer.Entity.VetUser;
import com.tuyetdang.my_vet_tracer.Mapper.VetUserMapper;
import com.tuyetdang.my_vet_tracer.Repository.VetUserRepository;
import com.tuyetdang.my_vet_tracer.dto.request.CreaterSystemVetUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateSystemVetUserRequest;
import com.tuyetdang.my_vet_tracer.dto.response.VetUserResponse;
import com.tuyetdang.my_vet_tracer.exception.AppException;
import com.tuyetdang.my_vet_tracer.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VetUserService  {
    VetUserRepository userRepository;
    VetUserMapper userMapper;

    public VetUser createUser(CreaterSystemVetUserRequest request) {
        if (userRepository.existsByUserName(request.getUserName())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        VetUser user = userMapper.toUser(request);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

//        CreateSystemUserRequest request1 = CreateSystemUserRequest.builder()
//                .userName(request.getUserName())
//                .password(request.getPassword())
//                .email(request.getEmail())
//                .phoneNum(request.getPhoneNum())
//                .build();

        return userRepository.save(user);
    }

    public List<VetUser> getUsers() {
        return userRepository.findAll();
    }

    public VetUserResponse getUsers(Integer Id) {
        return userMapper.toUserResponse(userRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Veterinarian User not found")));
    }

    public VetUserResponse updateUser(Integer user_id, UpdateSystemVetUserRequest request) {
        VetUser user = userRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("Veterinarian User not found"));
        userMapper.updateUser(user, request);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteUser(Integer user_id) {
        userRepository.deleteById(user_id);
    }
}