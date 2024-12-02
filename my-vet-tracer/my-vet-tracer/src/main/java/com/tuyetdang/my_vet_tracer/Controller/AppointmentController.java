package com.tuyetdang.my_vet_tracer.Controller;

import com.tuyetdang.my_vet_tracer.Entity.Appointment;
import com.tuyetdang.my_vet_tracer.Service.AppointmentService;
import com.tuyetdang.my_vet_tracer.dto.request.CreateAppointmentRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateAppointmentRequest;
import com.tuyetdang.my_vet_tracer.dto.response.APIResponse;
import com.tuyetdang.my_vet_tracer.dto.response.AppointmentResponse;
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
    APIResponse<Appointment> createAppointment(@RequestBody @Valid CreateAppointmentRequest request) {
        APIResponse<Appointment> apiResponse = new APIResponse<>();
        apiResponse.setResult(appointmentService.createAppointment(request));
        return apiResponse;
    }

    @GetMapping("/{app_id}")
    AppointmentResponse getAppointments(@PathVariable int app_id) {
        return appointmentService.getAppointments(app_id);
    }

    @GetMapping()
    public List<AppointmentResponse> getAppointments() {
        return appointmentService.getAppointments();
    }

    @PutMapping("/{app_id}")
    AppointmentResponse updateAppointment(@PathVariable Integer app_id, @RequestBody @Valid UpdateAppointmentRequest request) {
        return appointmentService.updateAppointment(app_id, request);
    }

    @DeleteMapping("/{app_id}")
    String deleteAppointment(@PathVariable Integer app_id) {
        appointmentService.deleteAppointment(app_id);
        return "Appointment deleted";
    }
}
