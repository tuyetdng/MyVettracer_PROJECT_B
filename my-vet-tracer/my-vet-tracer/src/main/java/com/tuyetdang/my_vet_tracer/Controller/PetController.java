package com.tuyetdang.my_vet_tracer.Controller;

import com.tuyetdang.my_vet_tracer.Entity.Pet;
import com.tuyetdang.my_vet_tracer.Service.PetService;
import com.tuyetdang.my_vet_tracer.dto.request.CreatePetRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdatePetRequest;
import com.tuyetdang.my_vet_tracer.dto.response.APIResponse;
import com.tuyetdang.my_vet_tracer.dto.response.PetResponse;
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
    APIResponse<Pet> createPet(@RequestBody @Valid CreatePetRequest request) {
        APIResponse<Pet> apiResponse = new APIResponse<>();
        apiResponse.setResult(petService.createPet(request));
        return apiResponse;
    }

//    @GetMapping("/getpets")
//    List<Pet> getPets() {
//        return petService.getPets();
//    }

    @GetMapping("/{pet_id}")
    PetResponse getPets(@PathVariable int pet_id) {
        return petService.getPets(pet_id);
    }

    @GetMapping()
    public List<PetResponse> getPets() {
        return petService.getPets();
    }

    @PutMapping("/{pet_id}")
    PetResponse updateUser(@PathVariable Integer pet_id, @RequestBody @Valid UpdatePetRequest request) {
        return petService.updatePet(pet_id, request);
    }

    //    @DeleteMapping("/deletepet/{pet_id}")
    @DeleteMapping("/{pet_id}")
    String deleteUser(@PathVariable Integer pet_id) {
        petService.deletePet(pet_id);
        return "Pet deleted";
    }
}
