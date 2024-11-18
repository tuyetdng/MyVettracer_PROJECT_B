package com.tuyetdang.my_vet_tracer.Repository;

import com.tuyetdang.my_vet_tracer.Entity.OwnerUser;
import com.tuyetdang.my_vet_tracer.Entity.VetUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VetUserRepository extends JpaRepository<VetUser, Integer> {
    boolean existsByUserName(String userName);
    Optional<VetUser> findByUserName(String userName);

}