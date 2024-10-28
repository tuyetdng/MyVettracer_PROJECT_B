package com.tuyetdang.my_vet_tracer.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error"),
    INVALID_KEY(1001, "Invalid message key"),
    USER_EXISTED(1002, "User existed"),
    USERNAME_INVALID(1003, "UserName must be at least 3 characters"),
    PASSWORD_INVALID(1004, "Password must be at least 5 characters and at most 20 characters"),
    USER_NOT_EXISTED(1005, "User not existed"),
    PET_NOT_EXISTED(1006, "Pet not existed"),
    UNAUTHENTICATED(1007, "Unauthenticated");


    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    int code;
    String message;
}
