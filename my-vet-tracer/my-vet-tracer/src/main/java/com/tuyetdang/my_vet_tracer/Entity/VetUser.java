package com.tuyetdang.my_vet_tracer.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class VetUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idVetUser;
    String userName;
    String email;
    String phoneNum;
    String password;
    String fullName;
    String dob;
    String gender;
    String nameOfConsultingRoom;
    String clinicAddress;
    String qualification;
    String experience;
    Integer authentication;

    @ManyToMany
    Set<Role> roles;

    @OneToMany(mappedBy = "vetUser", cascade = CascadeType.ALL)
    @JsonIgnore
    List<Pet> pets = new ArrayList<>();

    @OneToMany(mappedBy = "vetUser", cascade = CascadeType.ALL)
    @JsonIgnore
    List<Vaccine> vacs = new ArrayList<>();

    @OneToMany(mappedBy = "vetUser", cascade = CascadeType.ALL)
    @JsonIgnore
    List<Medicine> meds = new ArrayList<>();

    @OneToMany(mappedBy = "vetUser", cascade = CascadeType.ALL)
    @JsonIgnore
    List<Appointment> appointments = new ArrayList<>();

}
