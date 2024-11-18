package com.tuyetdang.my_vet_tracer.dto.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CreaterSystemOwnerUserRequest {
    @Size(min = 3, message = "USERNAME_INVALID")
    String userName;
    String email;
    String phoneNum;
    @Size(min = 5, max = 20, message = "PASSWORD_INVALID")
    String password;
    String fullName;
    String dob;
    String gender;
    Integer numOfPet;
}
