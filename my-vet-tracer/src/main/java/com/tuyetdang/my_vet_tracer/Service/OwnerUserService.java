package com.tuyetdang.my_vet_tracer.Service;

import com.tuyetdang.my_vet_tracer.Entity.OwnerUser;
import com.tuyetdang.my_vet_tracer.Mapper.OwnerUserMapper;
import com.tuyetdang.my_vet_tracer.Repository.OwnerUserRepository;
import com.tuyetdang.my_vet_tracer.dto.request.CreateSystemUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.CreaterSystemOwnerUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateSystemOwnerUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateSystemUserRequest;
import com.tuyetdang.my_vet_tracer.dto.response.OwnerUserResponse;
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
public class OwnerUserService {
    OwnerUserRepository userRepository;
    OwnerUserMapper userMapper;

    public OwnerUser createUser(CreaterSystemOwnerUserRequest request) {
        if (userRepository.existsByUserName(request.getUserName())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        OwnerUser user = userMapper.toUser(request);

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

    public List<OwnerUser> getUsers() {
        return userRepository.findAll();
    }

    public OwnerUserResponse getUsers(Integer Id) {
        return userMapper.toUserResponse(userRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Owner User not found")));
    }

    public OwnerUserResponse updateUser(Integer user_id, UpdateSystemOwnerUserRequest request) {
        OwnerUser user = userRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("Owner User not found"));
        userMapper.updateUser(user, request);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteUser(Integer user_id) {
        userRepository.deleteById(user_id);
    }
}
