package com.tuyetdang.my_vet_tracer.Controller;

import com.tuyetdang.my_vet_tracer.Entity.OwnerUser;
import com.tuyetdang.my_vet_tracer.Entity.VetUser;
import com.tuyetdang.my_vet_tracer.Service.OwnerUserService;
import com.tuyetdang.my_vet_tracer.Service.VetUserService;
import com.tuyetdang.my_vet_tracer.dto.request.CreaterSystemOwnerUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.CreaterSystemVetUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateSystemOwnerUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateSystemVetUserRequest;
import com.tuyetdang.my_vet_tracer.dto.response.APIResponse;
import com.tuyetdang.my_vet_tracer.dto.response.OwnerUserResponse;
import com.tuyetdang.my_vet_tracer.dto.response.VetUserResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)       //remove @Autowire
@RequestMapping("/vetuser")
public class VetUserController {
    VetUserService userService;

    @PostMapping("/addvetuser")
    APIResponse<VetUser> createUser(@RequestBody @Valid CreaterSystemVetUserRequest request) {
        APIResponse<VetUser> apiResponse = new APIResponse<>();
        apiResponse.setResult(userService.createUser(request));
        return apiResponse;
    }

    @GetMapping("/getvetusers")
    List<VetUser> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/getvetusers/{user_id}")
    VetUserResponse getUsers(@PathVariable int user_id) {
        return userService.getUsers(user_id);
    }

    @PutMapping("/updatevetuser/{user_id}")
    VetUserResponse updateUser(@PathVariable Integer user_id, @RequestBody @Valid UpdateSystemVetUserRequest request) {
        return userService.updateUser(user_id, request);
    }

    @DeleteMapping("/deletevetuser/{user_id}")
    String deleteUser(@PathVariable Integer user_id) {
        userService.deleteUser(user_id);
        return "User deleted";
    }
}
