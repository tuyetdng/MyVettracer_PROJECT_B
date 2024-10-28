package com.tuyetdang.my_vet_tracer.Mapper;

import com.tuyetdang.my_vet_tracer.Entity.Medicine;
import com.tuyetdang.my_vet_tracer.dto.request.CreateMedicineRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateMedicineRequest;
import com.tuyetdang.my_vet_tracer.dto.response.MedicineResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface MedicineMapper {
    Medicine toMedicine(CreateMedicineRequest request);

    MedicineMapper INSTANCE = Mappers.getMapper(MedicineMapper.class);
    @Mappings({
            @Mapping(source = "vetUser.idUser", target = "vetUser.idUser"),
            @Mapping(source = "pet.idPet", target = "pet.idPet")
    })
    MedicineResponse toMedicineResponse(Medicine medicine);

    void updateMedicine(@MappingTarget Medicine medicine, UpdateMedicineRequest request);

}
