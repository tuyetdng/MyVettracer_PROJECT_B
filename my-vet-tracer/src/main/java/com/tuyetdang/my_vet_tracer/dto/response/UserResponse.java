package com.tuyetdang.my_vet_tracer.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserResponse {
    Integer idUser;
    String userName;
    Integer userType;
    String email;
    String phoneNum;
    String password;
}
