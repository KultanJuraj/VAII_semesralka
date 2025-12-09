package com.backend.backend.User;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public void getUser(Authentication auth) {
    }


    @PostMapping("/postUser")
    public void postUser(@RequestBody User user) {
        userService.saveUser(user);
    }

    @PutMapping("/putUser/{userId}")
    public User updateUser(@PathVariable int userId, @RequestBody User user) {
        user.setUserId(userId);
        return userService.updateUser(userId, user);
    }

    @GetMapping("/userLogged")
    public ResponseEntity<User> getCurrentUser(Authentication auth) {
        return userService.getUserByUsername(auth.getName()).map(ResponseEntity::ok).orElseThrow();
    }

    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable int userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }
}