package com.example.splitease.service;

import com.example.splitease.dto.LoginDTO;
import com.example.splitease.model.User;
import com.example.splitease.repository.UserRepository;
import com.example.splitease.response.Response;
import com.example.splitease.security.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@AllArgsConstructor
public class UserService {


    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;

    public String createAccount(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "Account Created Successfully!";
    }

    public ResponseEntity<?> login(LoginDTO loginDTO){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getUsername(),loginDTO.getPassword()));
        if(authentication.isAuthenticated()){
            UserDetails user = (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(new Response<Map<String,String>>(200,true,"Login Successfully", Map.of("token",jwtUtil.generateToken(loginDTO.getUsername()),"email",user.getUsername()), LocalDateTime.now()));
        }else{
            return ResponseEntity.badRequest().body(new Response<String>(401,false,"Login Failed","",LocalDateTime.now()));
        }
    }

}
