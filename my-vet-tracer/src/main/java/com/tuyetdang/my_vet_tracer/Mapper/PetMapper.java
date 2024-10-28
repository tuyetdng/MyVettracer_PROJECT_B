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
    // PetResponse toUserResponse(Pet pet);


    PetMapper INSTANCE = Mappers.getMapper(PetMapper.class);
    @Mappings({
            @Mapping(source = "ownerUser.idUser", target = "ownerUser.idUser")
    })
    PetResponse toUserResponse(Pet pet);

    void updatePet(@MappingTarget Pet pet, UpdatePetRequest request);

}
