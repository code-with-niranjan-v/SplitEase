package com.example.splitease.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.splitease.model.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group,Integer>{

}
