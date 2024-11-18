package com.tuyetdang.my_vet_tracer.dto.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.logging.Level;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CreateSystemUserRequest {
    @Size(min = 3, message = "USERNAME_INVALID")
    String userName;
    String email;
    String phoneNum;
    @Size(min = 5, max = 20, message = "PASSWORD_INVALID")
    String password;
    Integer userType;

}
