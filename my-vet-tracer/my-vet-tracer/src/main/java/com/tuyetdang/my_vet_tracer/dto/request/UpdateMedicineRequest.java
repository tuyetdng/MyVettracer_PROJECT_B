package com.tuyetdang.my_vet_tracer.dto.request;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateMedicineRequest {
    String medName;
    String amount;
    String notice;
    String dose;
    Double total;
}