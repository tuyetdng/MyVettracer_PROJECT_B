package com.tuyetdang.my_vet_tracer.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateVaccineRequest {
    String vacName;
    String date;
    String dose;
    Double total;
}
