package com.tuyetdang.my_vet_tracer.Repository;

import com.tuyetdang.my_vet_tracer.Entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineRepository  extends JpaRepository<Medicine, Integer> {
    List<Medicine> findByVetUser_idVetUser(Integer idVetUser);
    List<Medicine> findByPet_idPet(Integer idPet);
}
