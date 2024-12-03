package com.tuyetdang.my_vet_tracer.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class AppointmentResponse {
    Integer idAppointment;
    String time;
    String ownerName;
    String veterinarian;
    Integer isConfirmed;
    PetIdDTO pet;
    VetUserIdDTO vetUser;
}
