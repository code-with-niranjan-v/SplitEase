package com.example.splitease.controller;

import com.example.splitease.dto.LoginDTO;
import com.example.splitease.response.Response;
import com.example.splitease.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.splitease.model.User;
import com.example.splitease.repository.UserRepository;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/users")
@Validated
@AllArgsConstructor
public class UserController {

    private final UserService userService;


    @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody User user){

        return ResponseEntity.ok(new Response<String>(200,true,userService.createAccount(user),"", LocalDateTime.now()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO){
        return userService.login(loginDTO);
    }
    
}
