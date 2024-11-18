package com.tuyetdang.my_vet_tracer.Service;

import com.tuyetdang.my_vet_tracer.Entity.User;
import com.tuyetdang.my_vet_tracer.Mapper.UserMapper;
import com.tuyetdang.my_vet_tracer.Repository.UserRepository;
import com.tuyetdang.my_vet_tracer.dto.request.CreateSystemUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateSystemUserRequest;
import com.tuyetdang.my_vet_tracer.dto.response.UserResponse;
import com.tuyetdang.my_vet_tracer.exception.AppException;
import com.tuyetdang.my_vet_tracer.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;

    public User createUser(CreateSystemUserRequest request) {
        if (userRepository.existsByUserName(request.getUserName())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        User user = userMapper.toUser(request);

//        CreateSystemUserRequest request1 = CreateSystemUserRequest.builder()
//                .userName(request.getUserName())
//                .password(request.getPassword())
//                .email(request.getEmail())
//                .phoneNum(request.getPhoneNum())
//                .build();

        return userRepository.save(user);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public UserResponse getUsers(Integer Id) {
        return userMapper.toUserResponse(userRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("User not found")));
    }

    public UserResponse updateUser(Integer user_id, UpdateSystemUserRequest request) {
        User user = userRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userMapper.updateUser(user, request);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteUser(Integer user_id) {
        userRepository.deleteById(user_id);
    }
}
