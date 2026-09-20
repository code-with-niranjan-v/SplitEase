package com.example.splitease.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.splitease.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    public Optional<User> findUserByPhoneNumber(String phoneNumber);

    public Boolean existsByPhoneNumber(String phoneNumber);

    public User findUserByEmail(String username);
}
