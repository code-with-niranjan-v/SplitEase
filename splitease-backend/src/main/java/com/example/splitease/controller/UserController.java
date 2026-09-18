package com.example.splitease.controller;

import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.splitease.model.User;
import com.example.splitease.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public String register(@Valid @RequestBody User user){

        return userRepository.save(user).toString();
    }
    
}
