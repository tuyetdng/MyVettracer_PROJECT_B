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

import java.util.ArrayList;
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

    public AppointmentResponse createAppointment(CreateAppointmentRequest request) {
        VetUser vetUser = vetUserRepository.findById(request.getIdUser())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Pet pet = petRepository.findById(request.getIdPet())
                .orElseThrow(() -> new AppException(ErrorCode.PET_NOT_EXISTED));

        Appointment appointment = appointmentMapper.toAppointment(request);

        appointment.setVetUser(vetUser);
        appointment.setPet(pet);

        return appointmentMapper.toAppointmentResponse(appointmentRepository.save(appointment));
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

    //Is confirmed
    public List<AppointmentResponse> getIsConfirmedAppointmentsByVetID(Integer idVetUser) {
        List<Appointment> appointments = appointmentRepository.findByVetUser_idVetUser(idVetUser);

        List<Appointment> result = new ArrayList<>();

        for (int i = 0; i < appointments.size(); i++) {
                if (appointments.get(i).getIsConfirmed() == 1) {
                    result.add(appointments.get(i));
                }
        }

        return result.stream()
                .map(appointmentMapper::toAppointmentResponse)
                .collect(Collectors.toList());
    }

    //Is not confirmed
    public List<AppointmentResponse> getIsNotConfirmedAppointmentsByVetID(Integer idVetUser) {
        List<Appointment> appointments = appointmentRepository.findByVetUser_idVetUser(idVetUser);

        List<Appointment> result = new ArrayList<>();

        for (int i = 0; i < appointments.size(); i++) {
            if (appointments.get(i).getIsConfirmed() == 0) {
                result.add(appointments.get(i));
            }
        }

        return result.stream()
                .map(appointmentMapper::toAppointmentResponse)
                .collect(Collectors.toList());
    }

    public List<AppointmentResponse> getAppointmentsByPetID(Integer idPet) {
        List<Appointment> appointments = appointmentRepository.findByPet_idPet(idPet);

        return appointments.stream()
                .map(appointmentMapper::toAppointmentResponse)
                .collect(Collectors.toList());
    }

    public AppointmentResponse confirmAppointment(Integer idAppointment) {
        Appointment appointment = appointmentRepository.findById(idAppointment)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (appointment.getIsConfirmed() == 0) {
            appointment.setIsConfirmed(1);
        } else {
            throw new RuntimeException("Appointment not found");
        }

        return appointmentMapper.toAppointmentResponse(appointmentRepository.save(appointment));
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
