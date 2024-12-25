package com.tuyetdang.my_vet_tracer.Repository;

import com.tuyetdang.my_vet_tracer.Entity.OwnerUser;
import com.tuyetdang.my_vet_tracer.Entity.Pet;
import com.tuyetdang.my_vet_tracer.Entity.VetUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface PetRepository extends JpaRepository<Pet, Integer> {
    List<Pet> findByVetUser_idVetUser(Integer idVetUser);

    List<Pet> findByOwnerUser_idOwnerUser(Integer idOwnerUser);

    //
    @Query("SELECT p.ownerUser FROM Pet p WHERE p.idPet = :idPet")
    Optional<OwnerUser> findOwnerUserByIdPet(@Param("idPet") Integer idPet);

    @Query("SELECT p.vetUser FROM Pet p WHERE p.idPet = :idPet")
    Optional<VetUser> findVetUserByIdPet(@Param("idPet") Integer idPet);

}