package com.example.splitease.controller;

import com.example.splitease.dto.AddMemberDTO;
import com.example.splitease.response.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.splitease.dto.AddGroupDTO;
import com.example.splitease.model.Group;
import com.example.splitease.service.GroupService;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/group")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService){
        this.groupService = groupService;
    }

    @PostMapping("/create")
    public Group addGroup(@RequestBody AddGroupDTO addGroupDTO){
        return groupService.createGroup(addGroupDTO);
    }

    @PostMapping("/addmember")
    public ResponseEntity<?> addMember(@RequestBody AddMemberDTO addMemberDTO){
        groupService.addMemberToGroup(addMemberDTO);
        return ResponseEntity.ok(new Response<String>(HttpStatus.OK.value(),"Success","User added to the group Successfully", LocalDateTime.now()));
    }
    
}
