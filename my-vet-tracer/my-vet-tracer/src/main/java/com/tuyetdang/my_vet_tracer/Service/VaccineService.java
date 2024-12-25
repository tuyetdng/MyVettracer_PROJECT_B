package com.tuyetdang.my_vet_tracer.Service;

import com.tuyetdang.my_vet_tracer.Entity.Medicine;
import com.tuyetdang.my_vet_tracer.Entity.Pet;
import com.tuyetdang.my_vet_tracer.Entity.Vaccine;
import com.tuyetdang.my_vet_tracer.Entity.VetUser;
import com.tuyetdang.my_vet_tracer.Mapper.VaccineMapper;
import com.tuyetdang.my_vet_tracer.Repository.PetRepository;
import com.tuyetdang.my_vet_tracer.Repository.VaccineRepository;
import com.tuyetdang.my_vet_tracer.Repository.VetUserRepository;
import com.tuyetdang.my_vet_tracer.dto.request.CreateVaccineRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateVaccineRequest;
import com.tuyetdang.my_vet_tracer.dto.response.MedicineResponse;
import com.tuyetdang.my_vet_tracer.dto.response.VaccineResponse;
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
public class VaccineService {
    VaccineRepository vaccineRepository;
    VetUserRepository vetUserRepository;
    PetRepository petRepository;
    VaccineMapper vaccineMapper;

    public VaccineResponse createVaccine(CreateVaccineRequest request) {
        VetUser vetUser = vetUserRepository.findById(request.getIdUser())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Pet pet = petRepository.findById(request.getIdPet())
                .orElseThrow(() -> new AppException(ErrorCode.PET_NOT_EXISTED));

        Vaccine vaccine = vaccineMapper.toVaccine(request);

        vaccine.setVetUser(vetUser);
        vaccine.setPet(pet);

        return vaccineMapper.toVaccineResponse(vaccine);
    }

    public VaccineResponse getVaccines(Integer Id) {
        return vaccineMapper.toVaccineResponse(vaccineRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Vaccine not found")));
    }

    public List<VaccineResponse> getVaccines() {
        List<Vaccine> vaccines = vaccineRepository.findAll();

        return vaccines.stream()
                .map(vaccineMapper::toVaccineResponse)
                .collect(Collectors.toList());
    }

    public List<VaccineResponse> getVaccinesByVetID(Integer idVetUser) {
        List<Vaccine> vaccines = vaccineRepository.findByVetUser_idVetUser(idVetUser);

        return vaccines.stream()
                .map(vaccineMapper::toVaccineResponse)
                .collect(Collectors.toList());
    }

    public List<VaccineResponse> getVaccinesByPetID(Integer idPet) {
        List<Vaccine> vaccines = vaccineRepository.findByPet_idPet(idPet);

        return vaccines.stream()
                .map(vaccineMapper::toVaccineResponse)
                .collect(Collectors.toList());
    }

    public VaccineResponse updateVaccine(Integer vac_id, UpdateVaccineRequest request) {
        Vaccine vaccine = vaccineRepository.findById(vac_id)
                .orElseThrow(() -> new RuntimeException("Vaccine not found"));
        vaccineMapper.updateVaccine(vaccine, request);
        return vaccineMapper.toVaccineResponse(vaccineRepository.save(vaccine));
    }

    public void deleteVaccine(Integer vac_id) {
        vaccineRepository.deleteById(vac_id);
    }
}
