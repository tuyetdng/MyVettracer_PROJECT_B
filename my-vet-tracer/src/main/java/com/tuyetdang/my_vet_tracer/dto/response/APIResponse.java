package com.tuyetdang.my_vet_tracer.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder(toBuilder = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class APIResponse<T>{
    int code = 1000; //response success
    String message;
    T result;

    public static  <T> APIResponse<T> success(T result) {
        return APIResponse.<T>builder()
                .code(1000)
                .message("SUCCESS")
                .result(result)
                .build();
    }
}
