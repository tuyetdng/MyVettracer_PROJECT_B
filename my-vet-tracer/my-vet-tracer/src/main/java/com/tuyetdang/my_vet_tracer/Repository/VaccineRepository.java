package com.tuyetdang.my_vet_tracer.Repository;

import com.tuyetdang.my_vet_tracer.Entity.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VaccineRepository extends JpaRepository<Vaccine, Integer> {
    List<Vaccine> findByVetUser_idVetUser(Integer idVetUser);
    List<Vaccine> findByPet_idPet(Integer idPet);
}