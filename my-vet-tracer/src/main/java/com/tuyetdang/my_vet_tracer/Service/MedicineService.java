package com.tuyetdang.my_vet_tracer.Service;

import com.tuyetdang.my_vet_tracer.Entity.Medicine;
import com.tuyetdang.my_vet_tracer.Entity.Pet;
import com.tuyetdang.my_vet_tracer.Entity.VetUser;
import com.tuyetdang.my_vet_tracer.Mapper.MedicineMapper;
import com.tuyetdang.my_vet_tracer.Repository.MedicineRepository;
import com.tuyetdang.my_vet_tracer.Repository.PetRepository;
import com.tuyetdang.my_vet_tracer.Repository.VetUserRepository;
import com.tuyetdang.my_vet_tracer.dto.request.CreateMedicineRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateMedicineRequest;
import com.tuyetdang.my_vet_tracer.dto.response.MedicineResponse;
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
public class MedicineService {
    MedicineRepository medicineRepository;
    VetUserRepository vetUserRepository;
    PetRepository petRepository;
    MedicineMapper medicineMapper;

    public Medicine createMedicine(CreateMedicineRequest request) {
        VetUser vetUser = vetUserRepository.findById(request.getIdUser())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Pet pet = petRepository.findById(request.getIdPet())
                .orElseThrow(() -> new AppException(ErrorCode.PET_NOT_EXISTED));

        Medicine medicine = medicineMapper.toMedicine(request);

        medicine.setVetUser(vetUser);
        medicine.setPet(pet);

        return medicineRepository.save(medicine);
    }

    public MedicineResponse getMedicines(Integer Id) {
        return medicineMapper.toMedicineResponse(medicineRepository.findById(Id)
                .orElseThrow(() -> new RuntimeException("Medicine not found")));
    }

    public List<MedicineResponse> getMedicines() {
        List<Medicine> medicines = medicineRepository.findAll();

        return medicines.stream()
                .map(medicineMapper::toMedicineResponse)
                .collect(Collectors.toList());
    }

    public MedicineResponse updateMedicine(Integer med_id, UpdateMedicineRequest request) {
        Medicine medicine = medicineRepository.findById(med_id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));
        medicineMapper.updateMedicine(medicine, request);
        return medicineMapper.toMedicineResponse(medicineRepository.save(medicine));
    }

    public void deleteMedicine(Integer med_id) {
        medicineRepository.deleteById(med_id);
    }
}
