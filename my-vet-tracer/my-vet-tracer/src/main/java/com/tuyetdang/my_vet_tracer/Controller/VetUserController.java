package com.tuyetdang.my_vet_tracer.Controller;

import com.tuyetdang.my_vet_tracer.Entity.VetUser;
import com.tuyetdang.my_vet_tracer.Service.VetUserService;
import com.tuyetdang.my_vet_tracer.dto.request.CreaterSystemVetUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateSystemVetUserRequest;
import com.tuyetdang.my_vet_tracer.dto.response.APIResponse;
import com.tuyetdang.my_vet_tracer.dto.response.OwnerUserResponse;
import com.tuyetdang.my_vet_tracer.dto.response.PetResponse;
import com.tuyetdang.my_vet_tracer.dto.response.VetUserResponse;
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
@RequestMapping("/vetuser")
public class VetUserController {
    VetUserService userService;

    @PostMapping()
    APIResponse<VetUserResponse> createUser(@RequestBody @Valid CreaterSystemVetUserRequest request) {
        return APIResponse.<VetUserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }

    @GetMapping()
    APIResponse<List<VetUserResponse>> getUsers() {
        return APIResponse.<List<VetUserResponse>>builder()
                .result(userService.getUsers())
                .build();
    }

    @GetMapping("/{user_id}")
    APIResponse<VetUserResponse> getUsers(@PathVariable int user_id) {
        return APIResponse.<VetUserResponse>builder()
                .result(userService.getUsers(user_id))
                .build();
    }

    @GetMapping("/myinfo")
    APIResponse<VetUserResponse> getMyInfo() {
        return APIResponse.<VetUserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }


    @PutMapping("/{user_id}")
    APIResponse<VetUserResponse> updateUser(@PathVariable Integer user_id, @RequestBody @Valid UpdateSystemVetUserRequest request) {
        return APIResponse.<VetUserResponse>builder()
                .result(userService.updateUser(user_id, request))
                .build();
    }

    @DeleteMapping("/{user_id}")
    String deleteUser(@PathVariable Integer user_id) {
        userService.deleteUser(user_id);
        return "User deleted";
    }
}
