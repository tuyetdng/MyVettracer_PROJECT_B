package com.tuyetdang.my_vet_tracer.Mapper;

import com.tuyetdang.my_vet_tracer.Entity.User;
import com.tuyetdang.my_vet_tracer.dto.request.CreateSystemUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateSystemUserRequest;
import com.tuyetdang.my_vet_tracer.dto.response.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(CreateSystemUserRequest request);
    UserResponse toUserResponse(User user);
    void updateUser(@MappingTarget User user, UpdateSystemUserRequest request);

}
