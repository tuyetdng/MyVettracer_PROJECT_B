package com.tuyetdang.my_vet_tracer.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class OwnerUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idOwnerUser;
    String img;
    String userName;
    String email;
    String phoneNum;
    String password;
    String fullName;
    String dob;
    String gender;
    Integer numOfPet;

    @OneToMany(mappedBy = "ownerUser", cascade = CascadeType.ALL)
    @JsonIgnore
    List<Pet> pets = new ArrayList<>();

    @ManyToMany
    Set<Role> roles;

}
