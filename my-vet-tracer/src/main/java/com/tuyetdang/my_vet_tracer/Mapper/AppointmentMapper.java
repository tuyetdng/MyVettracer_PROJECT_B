package com.tuyetdang.my_vet_tracer.Mapper;

import com.tuyetdang.my_vet_tracer.Entity.Appointment;
import com.tuyetdang.my_vet_tracer.dto.request.CreateAppointmentRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateAppointmentRequest;
import com.tuyetdang.my_vet_tracer.dto.response.AppointmentResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {
    Appointment toAppointment(CreateAppointmentRequest request);

    AppointmentMapper INSTANCE = Mappers.getMapper(AppointmentMapper.class);
    @Mappings({
            @Mapping(source = "vetUser.idUser", target = "vetUser.idUser"),
            @Mapping(source = "pet.idPet", target = "pet.idPet")
    })
    AppointmentResponse toAppointmentResponse(Appointment appointment);

    void updateAppointment(@MappingTarget Appointment appointment, UpdateAppointmentRequest request);

}
