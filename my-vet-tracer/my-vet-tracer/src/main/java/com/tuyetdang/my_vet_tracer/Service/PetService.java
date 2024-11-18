package com.tuyetdang.my_vet_tracer.Service;

import com.tuyetdang.my_vet_tracer.Entity.OwnerUser;
import com.tuyetdang.my_vet_tracer.Entity.Pet;
import com.tuyetdang.my_vet_tracer.Entity.VetUser;
import com.tuyetdang.my_vet_tracer.Mapper.PetMapper;
import com.tuyetdang.my_vet_tracer.Repository.OwnerUserRepository;
import com.tuyetdang.my_vet_tracer.Repository.PetRepository;
import com.tuyetdang.my_vet_tracer.Repository.VetUserRepository;
import com.tuyetdang.my_vet_tracer.dto.request.CreatePetRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdatePetRequest;
import com.tuyetdang.my_vet_tracer.dto.response.PetResponse;
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
public class PetService {
    PetRepository petRepository;
    OwnerUserRepository ownerUserRepository;
    VetUserRepository vetUserRepository;
    PetMapper petMapper;

    public Pet createPet(CreatePetRequest request) {
        VetUser vetUser = vetUserRepository.findById(request.getIdVetUser())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        OwnerUser ownerUser = ownerUserRepository.findById(request.getIdOwnerUser())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Pet pet = petMapper.toPet(request);

        pet.setVetUser(vetUser);
        pet.setOwnerUser(ownerUser);
        return petRepository.save(pet);

    }

    public PetResponse getPets(Integer Id) {
        return petMapper.toUserResponse(petRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Pet not found")));
    }

    public List<PetResponse> getPets() {
        List<Pet> pets = petRepository.findAll();

        return pets.stream()
                .map(petMapper::toUserResponse)
                .collect(Collectors.toList());
    }

    public PetResponse updatePet(Integer pet_id, UpdatePetRequest request) {
        Pet pet = petRepository.findById(pet_id)
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        VetUser vetUser = vetUserRepository.findById(request.getIdVetUser())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        petMapper.updatePet(pet, request);
        pet.setVetUser(vetUser);

        return petMapper.toUserResponse(petRepository.save(pet));
    }

    public void deletePet(Integer pet_id) {
        petRepository.deleteById(pet_id);
    }
}
