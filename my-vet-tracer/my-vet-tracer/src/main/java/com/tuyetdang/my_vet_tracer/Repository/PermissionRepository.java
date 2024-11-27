package com.tuyetdang.my_vet_tracer.Repository;


import com.tuyetdang.my_vet_tracer.Entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {
    boolean existsByName(String name);
}