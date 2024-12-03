package com.tuyetdang.my_vet_tracer.dto.request;

//import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateSystemOwnerUserRequest {
    String email;
    String phoneNum;
    String img;
    String fullName;
    String dob;
    String gender;
    Integer numOfPet;
    List<String> roles;
}
