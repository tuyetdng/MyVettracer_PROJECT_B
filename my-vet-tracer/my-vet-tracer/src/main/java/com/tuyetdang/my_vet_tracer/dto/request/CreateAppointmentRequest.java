package com.tuyetdang.my_vet_tracer.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateAppointmentRequest {
    String time;
    String ownerName;
    String veterinarian;
    Integer isConfirmed;
    Integer idUser;
    Integer idPet;
}
