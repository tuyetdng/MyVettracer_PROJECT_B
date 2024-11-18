package com.tuyetdang.my_vet_tracer.Controller;

import com.tuyetdang.my_vet_tracer.Entity.Pet;
import com.tuyetdang.my_vet_tracer.Entity.Vaccine;
import com.tuyetdang.my_vet_tracer.Service.VaccineService;
import com.tuyetdang.my_vet_tracer.dto.request.CreatePetRequest;
import com.tuyetdang.my_vet_tracer.dto.request.CreateVaccineRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdatePetRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateVaccineRequest;
import com.tuyetdang.my_vet_tracer.dto.response.APIResponse;
import com.tuyetdang.my_vet_tracer.dto.response.PetResponse;
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
@RequestMapping("/vaccine")
public class VaccineController {
    VaccineService vaccineService;

    @PostMapping("/addvaccine")
    APIResponse<Vaccine> createVaccine(@RequestBody @Valid CreateVaccineRequest request) {
        APIResponse<Vaccine> apiResponse = new APIResponse<>();
        apiResponse.setResult(vaccineService.createVaccine(request));
        return apiResponse;
    }

    @GetMapping("/getvaccines/{vac_id}")
    VaccineResponse getVaccines(@PathVariable int vac_id) {
        return vaccineService.getVaccines(vac_id);
    }

    @GetMapping("/getvaccines")
    public List<VaccineResponse> getVaccines() {
        return vaccineService.getVaccines();
    }

    @PutMapping("/updatevaccine/{vac_id}")
    VaccineResponse updateVaccine(@PathVariable Integer vac_id, @RequestBody @Valid UpdateVaccineRequest request) {
        return vaccineService.updateVaccine(vac_id, request);
    }

    @DeleteMapping("/deletevaccine/{vac_id}")
    String deleteUser(@PathVariable Integer vac_id) {
        vaccineService.deleteVaccine(vac_id);
        return "Vaccine deleted";
    }
}
