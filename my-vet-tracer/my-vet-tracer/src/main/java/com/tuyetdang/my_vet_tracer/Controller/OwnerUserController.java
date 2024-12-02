package com.tuyetdang.my_vet_tracer.Controller;

import com.tuyetdang.my_vet_tracer.Entity.OwnerUser;
import com.tuyetdang.my_vet_tracer.Service.OwnerUserService;
import com.tuyetdang.my_vet_tracer.dto.request.CreaterSystemOwnerUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateSystemOwnerUserRequest;
import com.tuyetdang.my_vet_tracer.dto.response.APIResponse;
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
    APIResponse<OwnerUser> createUser(@RequestBody @Valid CreaterSystemOwnerUserRequest request) {
        APIResponse<OwnerUser> apiResponse = new APIResponse<>();
        apiResponse.setResult(userService.createUser(request));
        return apiResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping()
    List<OwnerUserResponse> getUsers() {

        return userService.getUsers();
    }

    @GetMapping("/{user_id}")
    OwnerUserResponse getUsers(@PathVariable int user_id) {

        return userService.getUsers(user_id);
    }

    @GetMapping("/myinfo")
    APIResponse<OwnerUserResponse> getMyInfo() {
        return APIResponse.<OwnerUserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }

    @PutMapping("/{user_id}")
    OwnerUserResponse updateUser(@PathVariable Integer user_id, @RequestBody @Valid UpdateSystemOwnerUserRequest request) {
        return userService.updateUser(user_id, request);
    }

    @DeleteMapping("/{user_id}")
    String deleteUser(@PathVariable Integer user_id) {
        userService.deleteUser(user_id);
        return "User deleted";
    }
}
