package com.tuyetdang.my_vet_tracer.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class OwnerUserResponse {
    Integer idUser;
    String userName;
    String email;
    String phoneNum;
    String password;
    String fullName;
    String dob;
    String gender;
    Integer numOfPet;
}
