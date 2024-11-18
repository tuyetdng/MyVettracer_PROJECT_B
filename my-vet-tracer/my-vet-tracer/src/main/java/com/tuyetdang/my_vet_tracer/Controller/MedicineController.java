package com.tuyetdang.my_vet_tracer.Controller;

import com.tuyetdang.my_vet_tracer.Entity.Medicine;
import com.tuyetdang.my_vet_tracer.Entity.Vaccine;
import com.tuyetdang.my_vet_tracer.Service.MedicineService;
import com.tuyetdang.my_vet_tracer.dto.request.CreateMedicineRequest;
import com.tuyetdang.my_vet_tracer.dto.request.CreateVaccineRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateMedicineRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateVaccineRequest;
import com.tuyetdang.my_vet_tracer.dto.response.APIResponse;
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

    @PostMapping("/addmedicine")
    APIResponse<Medicine> createMedicine(@RequestBody @Valid CreateMedicineRequest request) {
        APIResponse<Medicine> apiResponse = new APIResponse<>();
        apiResponse.setResult(medicineService.createMedicine(request));
        return apiResponse;
    }

    @GetMapping("/getmedicines/{mec_id}")
    MedicineResponse getMedicines(@PathVariable int mec_id) {
        return medicineService.getMedicines(mec_id);
    }

    @GetMapping("/getmedicines")
    public List<MedicineResponse> getMedicines() {
        return medicineService.getMedicines();
    }

    @PutMapping("/updatemedicine/{mec_id}")
    MedicineResponse updateMedicine(@PathVariable Integer mec_id, @RequestBody @Valid UpdateMedicineRequest request) {
        return medicineService.updateMedicine(mec_id, request);
    }

    @DeleteMapping("/deletemedicine/{mec_id}")
    String deleteMedicine(@PathVariable Integer mec_id) {
        medicineService.deleteMedicine(mec_id);
        return "Medicine deleted";
    }
}
