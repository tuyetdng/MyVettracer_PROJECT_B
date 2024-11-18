package com.tuyetdang.my_vet_tracer.Mapper;

import com.tuyetdang.my_vet_tracer.Entity.Vaccine;
import com.tuyetdang.my_vet_tracer.dto.request.CreateVaccineRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateVaccineRequest;
import com.tuyetdang.my_vet_tracer.dto.response.VaccineResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface VaccineMapper {
    Vaccine toVaccine(CreateVaccineRequest request);

    VaccineMapper INSTANCE = Mappers.getMapper(VaccineMapper.class);
    @Mappings({
            @Mapping(source = "vetUser.idVetUser", target = "vetUser.idVetUser"),
            @Mapping(source = "pet.idPet", target = "pet.idPet")
    })
    VaccineResponse toVaccineResponse(Vaccine vaccine);

    void updateVaccine(@MappingTarget Vaccine vaccine, UpdateVaccineRequest request);

}
