package com.tuyetdang.my_vet_tracer.Repository;

import com.tuyetdang.my_vet_tracer.Entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface PetRepository extends JpaRepository<Pet, Integer> {
   List<Pet> findByVetUser_idVetUser(Integer idVetUser);

   List<Pet> findByOwnerUser_idOwnerUser(Integer idOwnerUser);
}