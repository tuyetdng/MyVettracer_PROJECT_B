package com.tuyetdang.my_vet_tracer.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class OwnerUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idUser;
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
}
