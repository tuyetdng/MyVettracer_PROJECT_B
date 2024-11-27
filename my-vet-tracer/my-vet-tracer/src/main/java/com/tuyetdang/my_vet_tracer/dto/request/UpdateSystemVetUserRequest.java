package com.tuyetdang.my_vet_tracer.dto.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateSystemVetUserRequest {
    String email;
    String phoneNum;
    @Size(min = 5, max = 20, message = "PASSWORD_INVALID")
    String password;
    String fullName;
    String dob;
    String gender;
    String nameOfConsultingRoom;
    String clinicAddress;
    String qualification;
    String experience;
    Integer authentication;
    List<String> roles;
}
