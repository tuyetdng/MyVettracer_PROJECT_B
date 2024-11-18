package com.tuyetdang.my_vet_tracer.Controller;

import com.tuyetdang.my_vet_tracer.Entity.User;
import com.tuyetdang.my_vet_tracer.Service.UserService;
import com.tuyetdang.my_vet_tracer.dto.request.CreateSystemUserRequest;
import com.tuyetdang.my_vet_tracer.dto.request.UpdateSystemUserRequest;
import com.tuyetdang.my_vet_tracer.dto.response.APIResponse;
import com.tuyetdang.my_vet_tracer.dto.response.UserResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)       //remove @Autowire
@RequestMapping("/user")
public class UserController {
    UserService userService;

    @PostMapping("/adduser")
    APIResponse<User> createUser(@RequestBody @Valid CreateSystemUserRequest request) {
        APIResponse<User> apiResponse = new APIResponse<>();
        apiResponse.setResult(userService.createUser(request));
        return apiResponse;
    }

    @GetMapping("/getusers")
    List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/getusers/{user_id}")
    UserResponse getUsers(@PathVariable int user_id) {
        return userService.getUsers(user_id);
    }

    @PutMapping("/updateuser/{user_id}")
    UserResponse updateUser(@PathVariable Integer user_id, @RequestBody @Valid UpdateSystemUserRequest request) {
        return userService.updateUser(user_id, request);
    }

    @DeleteMapping("/deleteuser/{user_id}")
    String deleteUser(@PathVariable Integer user_id) {
        userService.deleteUser(user_id);
        return "User deleted";
    }

}
