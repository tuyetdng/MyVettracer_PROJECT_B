package com.tuyetdang.my_vet_tracer.Controller;

import com.tuyetdang.my_vet_tracer.Entity.Medicine;
import com.tuyetdang.my_vet_tracer.Entity.Vaccine;
import com.tuyetdang.my_vet_tracer.Service.MedicineService;
import com.tuyetdang.my_vet_tracer.dto.request.CreateMedicineRequest;
import com.tuyetdang.my_vet_tracer.dto.request.CreateVaccineRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateMedicineRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateVaccineRequest;
import com.tuyetdang.my_vet_tracer.dto.response.APIResponse;
import com.tuyetdang.my_vet_tracer.dto.response.AppointmentResponse;
import com.tuyetdang.my_vet_tracer.dto.response.MedicineResponse;
import com.tuyetdang.my_vet_tracer.dto.response.VaccineResponse;
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
@RequestMapping("/medicine")
public class MedicineController {
    MedicineService medicineService;

    @PostMapping()
    APIResponse<MedicineResponse> createMedicine(@RequestBody @Valid CreateMedicineRequest request) {
        return APIResponse.<MedicineResponse>builder()
                .result(medicineService.createMedicine(request))
                .build();
    }

    @GetMapping("/{mec_id}")
    APIResponse<MedicineResponse> getMedicines(@PathVariable int mec_id) {
        return  APIResponse.<MedicineResponse>builder()
                .result(medicineService.getMedicines(mec_id))
                .build();
    }

    @GetMapping()
    public APIResponse<List<MedicineResponse>> getMedicines() {
        return APIResponse.<List<MedicineResponse>>builder()
                .result(medicineService.getMedicines())
                .build();
    }

    @GetMapping("/vet-med/{user_id}")
    APIResponse<List<MedicineResponse>> getMedicinesByVetID(@PathVariable int user_id) {
        return APIResponse.<List<MedicineResponse>>builder()
                .result(medicineService.getMedicinesByVetID(user_id))
                .build();
    }

    @GetMapping("/pet-med/{idPet}")
    APIResponse<List<MedicineResponse>> getMedicinesByPetID(@PathVariable int idPet) {
        return APIResponse.<List<MedicineResponse>>builder()
                .result(medicineService.getMedicinesByPetID(idPet))
                .build();
    }

    @PutMapping("/{mec_id}")
    APIResponse<MedicineResponse> updateMedicine(@PathVariable Integer mec_id, @RequestBody @Valid UpdateMedicineRequest request) {
        return  APIResponse.<MedicineResponse>builder()
                .result(medicineService.updateMedicine(mec_id, request))
                .build();
    }

    @DeleteMapping("/{mec_id}")
    String deleteMedicine(@PathVariable Integer mec_id) {
        medicineService.deleteMedicine(mec_id);
        return "Medicine deleted";
    }
}
