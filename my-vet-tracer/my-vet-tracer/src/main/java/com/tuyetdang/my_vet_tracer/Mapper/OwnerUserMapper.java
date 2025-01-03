package com.tuyetdang.my_vet_tracer.Mapper;

import com.tuyetdang.my_vet_tracer.Entity.OwnerUser;
import com.tuyetdang.my_vet_tracer.dto.request.CreaterSystemOwnerUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateSystemOwnerUserRequest;
import com.tuyetdang.my_vet_tracer.dto.response.OwnerUserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;


@Mapper(componentModel = "spring")
public interface OwnerUserMapper {
    OwnerUser toUser(CreaterSystemOwnerUserRequest request);

    @Mapping(source = "idOwnerUser", target = "idOwnerUser")
    OwnerUserResponse toUserResponse(OwnerUser user);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget OwnerUser user, UpdateSystemOwnerUserRequest request);
}
