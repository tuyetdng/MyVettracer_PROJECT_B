package com.tuyetdang.my_vet_tracer.Controller;

import com.tuyetdang.my_vet_tracer.Entity.Pet;
import com.tuyetdang.my_vet_tracer.Service.PetService;
import com.tuyetdang.my_vet_tracer.dto.request.CreatePetRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdatePetRequest;
import com.tuyetdang.my_vet_tracer.dto.response.APIResponse;
import com.tuyetdang.my_vet_tracer.dto.response.OwnerUserResponse;
import com.tuyetdang.my_vet_tracer.dto.response.PetResponse;
import com.tuyetdang.my_vet_tracer.dto.response.VetUserResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/pet")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)       //remove @Autowire
public class PetController {
    PetService petService;

    @PostMapping()
    APIResponse<PetResponse> createPet(@RequestBody @Valid CreatePetRequest request) {
        return APIResponse.<PetResponse>builder()
                .result(petService.createPet(request))
                .build();
    }

    @GetMapping("/pet-vet/{user_id}")
    APIResponse<List<PetResponse>> getPetsOfVetUser(@PathVariable int user_id) {
        return APIResponse.<List<PetResponse>>builder()
                .result(petService.getPetsOfVetUser(user_id))
                .build();
    }

    @GetMapping("/pet-owner/{user_id}")
    APIResponse<List<PetResponse>> getPetsOfOwnerUser(@PathVariable int user_id) {
        return APIResponse.<List<PetResponse>>builder()
                .result(petService.getPetsOfOwnerUser(user_id))
                .build();
    }

    //
    @GetMapping("/pet-ownerpet/{pet_id}")
    APIResponse<OwnerUserResponse> getOwnerUserByIdPet(@PathVariable int pet_id) {
        return APIResponse.<OwnerUserResponse>builder()
                .result(petService.getOwnerUserByIdPet(pet_id))
                .build();
    }

    @GetMapping("/pet-vetpet/{pet_id}")
    APIResponse<VetUserResponse> getVetUserByIdPet(@PathVariable int pet_id) {
        return APIResponse.<VetUserResponse>builder()
                .result(petService.getVetUserByIdPet(pet_id))
                .build();
    }

    @GetMapping("/{pet_id}")
    APIResponse<PetResponse> getPets(@PathVariable int pet_id) {
        return APIResponse.<PetResponse>builder()
                .result(petService.getPets(pet_id))
                .build();
    }

    @GetMapping()
    public APIResponse<List<PetResponse>> getPets() {
        return APIResponse.<List<PetResponse>>builder()
                .result(petService.getPets())
                .build();
    }

    @PutMapping("/{pet_id}")
    APIResponse<PetResponse> updateUser(@PathVariable Integer pet_id, @RequestBody @Valid UpdatePetRequest request) {
        return APIResponse.<PetResponse>builder()
                .result(petService.updatePet(pet_id, request))
                .build();
    }

    //    @DeleteMapping("/deletepet/{pet_id}")
    @DeleteMapping("/{pet_id}")
    String deleteUser(@PathVariable Integer pet_id) {
        petService.deletePet(pet_id);
        return "Pet deleted";
    }
}
