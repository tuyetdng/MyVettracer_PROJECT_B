package com.tuyetdang.my_vet_tracer.Service;

import com.tuyetdang.my_vet_tracer.Entity.Appointment;
import com.tuyetdang.my_vet_tracer.Entity.Pet;
import com.tuyetdang.my_vet_tracer.Entity.VetUser;
import com.tuyetdang.my_vet_tracer.Mapper.AppointmentMapper;
import com.tuyetdang.my_vet_tracer.Repository.AppointmentRepository;
import com.tuyetdang.my_vet_tracer.Repository.PetRepository;
import com.tuyetdang.my_vet_tracer.Repository.VetUserRepository;
import com.tuyetdang.my_vet_tracer.dto.request.CreateAppointmentRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateAppointmentRequest;
import com.tuyetdang.my_vet_tracer.dto.response.AppointmentResponse;
import com.tuyetdang.my_vet_tracer.exception.AppException;
import com.tuyetdang.my_vet_tracer.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AppointmentService {
    AppointmentRepository appointmentRepository;
    VetUserRepository vetUserRepository;
    PetRepository petRepository;
    AppointmentMapper appointmentMapper;

    public Appointment createAppointment(CreateAppointmentRequest request) {
        VetUser vetUser = vetUserRepository.findById(request.getIdUser())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Pet pet = petRepository.findById(request.getIdPet())
                .orElseThrow(() -> new AppException(ErrorCode.PET_NOT_EXISTED));

        Appointment appointment = appointmentMapper.toAppointment(request);

        appointment.setVetUser(vetUser);
        appointment.setPet(pet);

        return appointmentRepository.save(appointment);
    }

    public AppointmentResponse getAppointments(Integer Id) {
        return appointmentMapper.toAppointmentResponse(appointmentRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Appointment not found")));
    }

    public List<AppointmentResponse> getAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();

        return appointments.stream()
                .map(appointmentMapper::toAppointmentResponse)
                .collect(Collectors.toList());
    }

    public AppointmentResponse updateAppointment(Integer app_id, UpdateAppointmentRequest request) {
        Appointment appointment = appointmentRepository.findById(app_id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointmentMapper.updateAppointment(appointment, request);
        return appointmentMapper.toAppointmentResponse(appointmentRepository.save(appointment));
    }

    public void deleteAppointment(Integer app_id) {
        appointmentRepository.deleteById(app_id);
    }
}
