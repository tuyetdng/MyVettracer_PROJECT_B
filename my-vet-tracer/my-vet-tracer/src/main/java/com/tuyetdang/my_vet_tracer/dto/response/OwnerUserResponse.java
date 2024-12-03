package com.tuyetdang.my_vet_tracer.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class OwnerUserResponse {
    Integer idOwnerUser;
    String userName;
    String img;
    String email;
    String phoneNum;
//    String password;
    String fullName;
    String dob;
    String gender;
    Integer numOfPet;
    Set<RoleResponse> roles;
}
