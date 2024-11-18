package com.tuyetdang.my_vet_tracer.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class VaccineResponse {
    Integer idVac;
    String vacName;
    String date;
    String dose;
    Double total;
    PetIdDTO pet;
    VetUserIdDTO vetUser;
}
