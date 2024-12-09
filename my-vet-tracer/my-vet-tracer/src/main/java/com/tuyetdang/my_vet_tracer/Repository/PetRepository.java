package com.tuyetdang.my_vet_tracer.Repository;

import com.tuyetdang.my_vet_tracer.Entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Integer> {
   // boolean existsByOwnerUser_idUser(Integer idUser);
}