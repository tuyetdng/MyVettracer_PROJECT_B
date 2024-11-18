package com.tuyetdang.my_vet_tracer.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class PetResponse {
    Integer idPet;
    String img;
    String petType;
    String petName;
    Integer age;
    String sex;
    String weight;
    String height;
    String identification;
    OwnerUserIdDTO ownerUser;
    VetUserIdDTO vetUser;
}
