package com.tuyetdang.my_vet_tracer.Controller;

import com.tuyetdang.my_vet_tracer.Entity.Appointment;
import com.tuyetdang.my_vet_tracer.Service.AppointmentService;
import com.tuyetdang.my_vet_tracer.dto.request.CreateAppointmentRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateAppointmentRequest;
import com.tuyetdang.my_vet_tracer.dto.response.APIResponse;
import com.tuyetdang.my_vet_tracer.dto.response.AppointmentResponse;
import com.tuyetdang.my_vet_tracer.dto.response.OwnerUserResponse;
import com.tuyetdang.my_vet_tracer.dto.response.PetResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)       //remove @Autowire
@RequestMapping("/appointment")
public class AppointmentController {
    AppointmentService appointmentService;

    @PostMapping()
    APIResponse<AppointmentResponse> createAppointment(@RequestBody @Valid CreateAppointmentRequest request) {
        return APIResponse.<AppointmentResponse>builder()
                .result(appointmentService.createAppointment(request))
                .build();
    }

    @GetMapping("/{app_id}")
    APIResponse<AppointmentResponse> getAppointments(@PathVariable int app_id) {
        return APIResponse.<AppointmentResponse>builder()
                .result(appointmentService.getAppointments(app_id))
                .build();
    }

    @GetMapping()
    public APIResponse<List<AppointmentResponse>> getAppointments() {
        return APIResponse.<List<AppointmentResponse>>builder()
                .result(appointmentService.getAppointments())
                .build();
    }

    @GetMapping("/isconfirmed/{user_id}")
    APIResponse<List<AppointmentResponse>> getIsConfirmedAppointmentsByVetID(@PathVariable int user_id) {
        return APIResponse.<List<AppointmentResponse>>builder()
                .result(appointmentService.getIsConfirmedAppointmentsByVetID(user_id))
                .build();
    }

    @GetMapping("/notconfirmed/{user_id}")
    APIResponse<List<AppointmentResponse>> getIsNotConfirmedAppointmentsByVetID(@PathVariable int user_id) {
        return APIResponse.<List<AppointmentResponse>>builder()
                .result(appointmentService.getIsNotConfirmedAppointmentsByVetID(user_id))
                .build();
    }

    @GetMapping("/pet-app/{idPet}")
    APIResponse<List<AppointmentResponse>> getAppointmentsByPetID(@PathVariable int idPet) {
        return APIResponse.<List<AppointmentResponse>>builder()
                .result(appointmentService.getAppointmentsByPetID(idPet))
                .build();
    }

    @PatchMapping("/confirm/{id}")
    public APIResponse<AppointmentResponse> confirmAppointment(@PathVariable Integer id) {
        return APIResponse.<AppointmentResponse>builder()
                .result(appointmentService.confirmAppointment(id))
                .build();
    }
    @PutMapping("/{app_id}")
    APIResponse<AppointmentResponse> updateAppointment(@PathVariable Integer app_id, @RequestBody @Valid UpdateAppointmentRequest request) {
        return  APIResponse.<AppointmentResponse>builder()
                .result(appointmentService.updateAppointment(app_id, request))
                .build();
    }

    @DeleteMapping("/{app_id}")
    String deleteAppointment(@PathVariable Integer app_id) {
        appointmentService.deleteAppointment(app_id);
        return "Appointment deleted";
    }
}
