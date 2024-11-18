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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)       //remove @Autowire
@RequestMapping("/owneruser")
public class OwnerUserController {
    OwnerUserService userService;

    @PostMapping("/addowneruser")
    APIResponse<OwnerUser> createUser(@RequestBody @Valid CreaterSystemOwnerUserRequest request) {
        APIResponse<OwnerUser> apiResponse = new APIResponse<>();
        apiResponse.setResult(userService.createUser(request));
        return apiResponse;
    }

    @GetMapping("/getownerusers")
    List<OwnerUser> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/getownerusers/{user_id}")
    OwnerUserResponse getUsers(@PathVariable int user_id) {
        return userService.getUsers(user_id);
    }

    @PutMapping("/updateowneruser/{user_id}")
    OwnerUserResponse updateUser(@PathVariable Integer user_id, @RequestBody @Valid UpdateSystemOwnerUserRequest request) {
        return userService.updateUser(user_id, request);
    }

    @DeleteMapping("/deleteowneruser/{user_id}")
    String deleteUser(@PathVariable Integer user_id) {
        userService.deleteUser(user_id);
        return "User deleted";
    }
}
