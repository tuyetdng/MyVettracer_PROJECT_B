package com.tuyetdang.my_vet_tracer.Controller;

import com.tuyetdang.my_vet_tracer.Entity.Pet;
import com.tuyetdang.my_vet_tracer.Entity.Vaccine;
import com.tuyetdang.my_vet_tracer.Service.VaccineService;
import com.tuyetdang.my_vet_tracer.dto.request.CreatePetRequest;
import com.tuyetdang.my_vet_tracer.dto.request.CreateVaccineRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdatePetRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateVaccineRequest;
import com.tuyetdang.my_vet_tracer.dto.response.APIResponse;
import com.tuyetdang.my_vet_tracer.dto.response.MedicineResponse;
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

    @PostMapping()
    APIResponse<VaccineResponse> createVaccine(@RequestBody @Valid CreateVaccineRequest request) {
        return APIResponse.<VaccineResponse>builder()
                .result(vaccineService.createVaccine(request))
                .build();
    }

    @GetMapping("/{vac_id}")
    APIResponse<VaccineResponse> getVaccines(@PathVariable int vac_id) {
        return  APIResponse.<VaccineResponse>builder()
                .result(vaccineService.getVaccines(vac_id))
                .build();
    }

    @GetMapping()
    public  APIResponse<List<VaccineResponse>> getVaccines() {
        return  APIResponse.<List<VaccineResponse>>builder()
                .result(vaccineService.getVaccines())
                .build();
    }

    @GetMapping("/vet-vac/{user_id}")
    APIResponse<List<VaccineResponse>> getVaccinesByVetID(@PathVariable int user_id) {
        return APIResponse.<List<VaccineResponse>>builder()
                .result(vaccineService.getVaccinesByVetID(user_id))
                .build();
    }

    @GetMapping("/pet-vac/{idPet}")
    APIResponse<List<VaccineResponse>> getVaccinesByPetID(@PathVariable int idPet) {
        return APIResponse.<List<VaccineResponse>>builder()
                .result(vaccineService.getVaccinesByPetID(idPet))
                .build();
    }
    @PutMapping("/{vac_id}")
    APIResponse<VaccineResponse>  updateVaccine(@PathVariable Integer vac_id, @RequestBody @Valid UpdateVaccineRequest request) {
        return  APIResponse.<VaccineResponse>builder()
                .result(vaccineService.updateVaccine(vac_id, request))
                .build();
    }

    @DeleteMapping("/{vac_id}")
    String deleteUser(@PathVariable Integer vac_id) {
        vaccineService.deleteVaccine(vac_id);
        return "Vaccine deleted";
    }
}
