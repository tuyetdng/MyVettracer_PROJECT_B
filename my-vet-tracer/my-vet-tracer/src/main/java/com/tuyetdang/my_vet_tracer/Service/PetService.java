package com.tuyetdang.my_vet_tracer.Service;

import com.tuyetdang.my_vet_tracer.Entity.OwnerUser;
import com.tuyetdang.my_vet_tracer.Entity.Pet;
import com.tuyetdang.my_vet_tracer.Entity.VetUser;
import com.tuyetdang.my_vet_tracer.Mapper.OwnerUserMapper;
import com.tuyetdang.my_vet_tracer.Mapper.PetMapper;
import com.tuyetdang.my_vet_tracer.Mapper.VetUserMapper;
import com.tuyetdang.my_vet_tracer.Repository.OwnerUserRepository;
import com.tuyetdang.my_vet_tracer.Repository.PetRepository;
import com.tuyetdang.my_vet_tracer.Repository.VetUserRepository;
import com.tuyetdang.my_vet_tracer.dto.request.CreatePetRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdatePetRequest;
import com.tuyetdang.my_vet_tracer.dto.response.OwnerUserResponse;
import com.tuyetdang.my_vet_tracer.dto.response.PetResponse;
import com.tuyetdang.my_vet_tracer.dto.response.VetUserResponse;
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
    OwnerUserMapper ownerUserMapper;
    VetUserMapper vetUserMapper;

    public PetResponse createPet(CreatePetRequest request) {
        VetUser vetUser = vetUserRepository.findById(request.getIdVetUser())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        OwnerUser ownerUser = ownerUserRepository.findById(request.getIdOwnerUser())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Pet pet = petMapper.toPet(request);

        pet.setVetUser(vetUser);
        pet.setOwnerUser(ownerUser);
        return petMapper.toUserResponse(pet);

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

    public List<PetResponse> getPetsOfVetUser(Integer vetUserId) {
        List<Pet> pets = petRepository.findByVetUser_idVetUser(vetUserId);

        return pets.stream()
                .map(petMapper::toUserResponse)
                .collect(Collectors.toList());
    }

    public List<PetResponse> getPetsOfOwnerUser(Integer idOwnerUser) {
        List<Pet> pets = petRepository.findByOwnerUser_idOwnerUser(idOwnerUser);

        return pets.stream()
                .map(petMapper::toUserResponse)
                .collect(Collectors.toList());
    }

//
    public OwnerUserResponse getOwnerUserByIdPet(Integer idPet) {
        OwnerUser ownerUser = petRepository.findOwnerUserByIdPet(idPet)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));


        return ownerUserMapper.toUserResponse(ownerUser);
    }

    public VetUserResponse getVetUserByIdPet(Integer idPet) {
        VetUser vetUser = petRepository.findVetUserByIdPet(idPet)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));


        return vetUserMapper.toUserResponse(vetUser);
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
