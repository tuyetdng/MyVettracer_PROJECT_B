package com.tuyetdang.my_vet_tracer.Controller;

import com.tuyetdang.my_vet_tracer.Entity.OwnerUser;
import com.tuyetdang.my_vet_tracer.Service.OwnerUserService;
import com.tuyetdang.my_vet_tracer.dto.request.CreaterSystemOwnerUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateSystemOwnerUserRequest;
import com.tuyetdang.my_vet_tracer.dto.response.APIResponse;
import com.tuyetdang.my_vet_tracer.dto.response.AppointmentResponse;
import com.tuyetdang.my_vet_tracer.dto.response.OwnerUserResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)       //remove @Autowire
@RequestMapping("/owneruser")
public class OwnerUserController {
    OwnerUserService userService;

    @PostMapping()
    APIResponse<OwnerUserResponse> createUser(@RequestBody @Valid CreaterSystemOwnerUserRequest request) {
        return APIResponse.<OwnerUserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping()
    APIResponse<List<OwnerUserResponse>> getUsers() {

        return APIResponse.<List<OwnerUserResponse>>builder()
                .result(userService.getUsers())
                .build();
    }

    @GetMapping("/{user_id}")
    APIResponse<OwnerUserResponse> getUsers(@PathVariable int user_id) {

        return APIResponse.<OwnerUserResponse>builder()
                .result(userService.getUsers(user_id))
                .build();
    }

    @GetMapping("viewOwner/{user_id}")
    APIResponse<OwnerUserResponse> viewOwnerUser(@PathVariable int user_id) {
        return APIResponse.<OwnerUserResponse>builder()
                .result(userService.viewOwnerUser(user_id))
                .build();
    }

    @GetMapping("/myinfo")
    APIResponse<OwnerUserResponse> getMyInfo() {
        return APIResponse.<OwnerUserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }

    @PutMapping("/{user_id}")
    APIResponse<OwnerUserResponse> updateUser(@PathVariable Integer user_id, @RequestBody @Valid UpdateSystemOwnerUserRequest request) {
        return APIResponse.<OwnerUserResponse>builder()
                .result(userService.updateUser(user_id, request))
                .build();
    }

    @DeleteMapping("/{user_id}")
    String deleteUser(@PathVariable Integer user_id) {
        userService.deleteUser(user_id);
        return "User deleted";
    }
}
