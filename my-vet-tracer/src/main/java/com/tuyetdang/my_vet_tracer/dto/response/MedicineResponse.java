package com.tuyetdang.my_vet_tracer.dto.response;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class MedicineResponse {
    Integer idMed;
    String medName;
    String amount;
    String notice;
    String dose;
    Double total;
    PetIdDTO pet;
    VetUserIdDTO vetUser;
}
