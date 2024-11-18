package com.tuyetdang.my_vet_tracer.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class VetUserResponse {
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
}
