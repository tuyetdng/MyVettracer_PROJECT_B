package com.tuyetdang.my_vet_tracer.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateAppointmentRequest {
    String time;
    Integer isConfirmed;
    String ownerName;
    String veterinarian;
}
