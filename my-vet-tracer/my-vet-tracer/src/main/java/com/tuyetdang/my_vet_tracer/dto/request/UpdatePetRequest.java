package com.tuyetdang.my_vet_tracer.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdatePetRequest {
    String img;
    String petType;
    String petName;
    Integer age;
    String sex;
    String weight;
    String height;
    String identification;
    Integer idVetUser;

}
