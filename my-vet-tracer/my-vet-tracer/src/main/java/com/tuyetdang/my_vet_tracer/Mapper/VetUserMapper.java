package com.tuyetdang.my_vet_tracer.Mapper;


import com.tuyetdang.my_vet_tracer.Entity.VetUser;
import com.tuyetdang.my_vet_tracer.dto.request.CreaterSystemVetUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateSystemVetUserRequest;
import com.tuyetdang.my_vet_tracer.dto.response.VetUserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface VetUserMapper {
    VetUser toUser(CreaterSystemVetUserRequest request);
    VetUserResponse toUserResponse(VetUser user);
    void updateUser(@MappingTarget VetUser user, UpdateSystemVetUserRequest request);
}
