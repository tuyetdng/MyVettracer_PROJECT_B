package com.tuyetdang.my_vet_tracer.Repository;

import com.tuyetdang.my_vet_tracer.Entity.OwnerUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OwnerUserRepository extends JpaRepository<OwnerUser, Integer> {
    boolean existsByUserName(String userName);

    Optional<OwnerUser> findByUserName(String userName);
}