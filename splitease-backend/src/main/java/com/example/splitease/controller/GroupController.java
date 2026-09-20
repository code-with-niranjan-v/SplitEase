package com.example.splitease.controller;

import com.example.splitease.dto.*;
import com.example.splitease.model.User;
import com.example.splitease.response.Response;
import com.example.splitease.security.service.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.example.splitease.model.Group;
import com.example.splitease.service.GroupService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/group")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService){
        this.groupService = groupService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> addGroup(@RequestBody AddGroupDTO addGroupDTO){
        return ResponseEntity.ok(new Response<String>(200,true, groupService.createGroup(addGroupDTO),null,LocalDateTime.now() ));
    }

    @PostMapping("/addmember")
    public ResponseEntity<?> addMember(@RequestBody AddMemberDTO addMemberDTO){
        groupService.addMemberToGroup(addMemberDTO);
        return ResponseEntity.ok(new Response<String>(HttpStatus.OK.value(),true,"Success","User added to the group Successfully", LocalDateTime.now()));
    }

    @PostMapping("/list")
    public ResponseEntity<?> getGroupListing(@RequestBody GroupListRequestDTO groupListRequestDTO){
        return ResponseEntity.ok(new Response<List<GroupListDTO>>(200,true,"Groups retrieved.",groupService.listGroups(groupListRequestDTO.getUserId()),LocalDateTime.now()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGroupById(@PathVariable Integer id, @AuthenticationPrincipal UserPrincipal user){
        return ResponseEntity.ok(new Response<GroupDetailDTO>(200,true,"Group Details Retrieved.",groupService.getGroupDetails(id,user.getUser()),LocalDateTime.now()));
    }
    
}
