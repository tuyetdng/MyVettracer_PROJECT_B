package com.tuyetdang.my_vet_tracer.Mapper;

import com.tuyetdang.my_vet_tracer.Entity.Pet;
import com.tuyetdang.my_vet_tracer.dto.request.CreatePetRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdatePetRequest;
import com.tuyetdang.my_vet_tracer.dto.response.PetResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PetMapper {
    Pet toPet(CreatePetRequest request);

    PetMapper INSTANCE = Mappers.getMapper(PetMapper.class);
    @Mappings({
            @Mapping(source = "vetUser.idVetUser", target = "vetUser.idVetUser"),
            @Mapping(source = "ownerUser.idOwnerUser", target = "ownerUser.idOwnerUser")
    })
    PetResponse toUserResponse(Pet pet);

    void updatePet(@MappingTarget Pet pet, UpdatePetRequest request);

}
