package com.example.splitease.service;

import java.util.ArrayList;
import java.util.List;

import com.example.splitease.dto.AddMemberDTO;
import com.example.splitease.exception.GroupNotFoundException;
import com.example.splitease.exception.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.splitease.dto.AddGroupDTO;
import com.example.splitease.model.Group;
import com.example.splitease.model.User;
import com.example.splitease.repository.GroupRepository;
import com.example.splitease.repository.UserRepository;

@Service
public class GroupService {
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public GroupService(GroupRepository groupRepository, UserRepository userRepository){
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    public Group createGroup(AddGroupDTO addGroupDTO){
        List<User> users = new ArrayList<>();
        if(userRepository.existsById(addGroupDTO.getUserId())){
            User user = userRepository.findById(addGroupDTO.getUserId()).get();
            users.add(user);
            Group group = new Group(null,addGroupDTO.getGroupName(),user,null,users);
            return groupRepository.save(group);
        }

        return null;
        
    }

    public void addMemberToGroup(AddMemberDTO addMemberDTO) throws UserNotFoundException,GroupNotFoundException {
        if(userRepository.existsByPhoneNumber(addMemberDTO.getPhoneNumber())){
            if(groupRepository.existsById(addMemberDTO.getGroupId())){
                Group group = groupRepository.findById(addMemberDTO.getGroupId()).get();
                User user = userRepository.findUserByPhoneNumber(addMemberDTO.getPhoneNumber()).get();
                group.getMembers().add(user);
                groupRepository.save(group);
            }else{
                throw new GroupNotFoundException("Group not Found.");
            }
        }else{
            throw new UserNotFoundException("User Not Found");
        }

    }
}
