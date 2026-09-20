package com.example.splitease.service;

import java.util.ArrayList;
import java.util.List;

import com.example.splitease.dto.*;
import com.example.splitease.exception.GroupNotFoundException;
import com.example.splitease.exception.UserNotFoundException;
import com.example.splitease.model.*;
import com.example.splitease.repository.ExpenseRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.splitease.repository.GroupRepository;
import com.example.splitease.repository.UserRepository;

@Service
@AllArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final ExpenseRepository expenseRepository;



    public String createGroup(AddGroupDTO addGroupDTO){
        List<User> users = new ArrayList<>();
        if(userRepository.existsById(addGroupDTO.getUserId())){
            User user = userRepository.findById(addGroupDTO.getUserId()).get();
            users.add(user);
            Group group = new Group(null,addGroupDTO.getGroupName(),user,null,users);
            groupRepository.save(group);
            return "Group Created Successfully.";
        }

        throw new UserNotFoundException();
        
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
            throw new UserNotFoundException();
        }

    }

    public List<GroupListDTO> listGroups(Integer userId){
        if(userRepository.existsById(userId)){
            User user = userRepository.findById(userId).get();
            List<GroupListDTO> groups = new ArrayList<>();
            for(Group g: user.getGroups()){
                GroupListDTO groupListDTO = new GroupListDTO(g.getGroupId(),g.getGroupName(),g.getMembers().size());
                groups.add(groupListDTO);
            }
            return groups;
        }else {
            throw new UserNotFoundException();
        }
    }

    public GroupDetailDTO getGroupDetails(Integer id,User currentUser){
        if(groupRepository.existsById(id)){
            Group group = groupRepository.findById(id).get();
            List<Expense> expenses = expenseRepository.findExpenseByGroup(group);
            List<MemberDTO> members = new ArrayList<>();
            for(User user:group.getMembers()){
                MemberDTO memberDTO = new MemberDTO(user.getId(), user.getName(), user.getEmail());
                members.add(memberDTO);
            }
            Double totalExpense = 0.00;
            Double yourShare = 0.00;
            Double youOwe = 0.00;
            Double youGet = 0.00;
            List<ExpenseDTO> expenseDTOList = new ArrayList<>();
            for(Expense expense:expenses){
                Double currentShare = 0.00;
                String status = "";
                Integer splitId = 0;
                for(SplitExpense splitExpense:expense.getSplits()){
                    if(splitExpense.getUser().getId().equals(currentUser.getId())){
                        yourShare += splitExpense.getShare();
                        currentShare = splitExpense.getShare();
                        status = splitExpense.getStatus().toString();
                        if (splitExpense.getStatus() == PaymentStatus.DUE) {
                            youOwe += splitExpense.getShare();
                        }
                        splitId = splitExpense.getId();
                    }
                }

                if(expense.getPaidBy().getId().equals(currentUser.getId())){
                    youGet += (expense.getTotalAmount() - expense.getOwnersShare());
                    currentShare = expense.getOwnersShare();
                    status = PaymentStatus.PAID.toString();
                }
                totalExpense += expense.getTotalAmount();
                MemberDTO memberDTO = new MemberDTO(expense.getPaidBy().getId(),expense.getPaidBy().getName(),expense.getPaidBy().getEmail());
                ExpenseDTO expenseDTO = new ExpenseDTO(expense.getId(),expense.getDescription(),expense.getTotalAmount(),memberDTO,currentShare,status,splitId);
                expenseDTOList.add(expenseDTO);
            }
            return new GroupDetailDTO(id,group.getGroupName(),members,totalExpense,yourShare,youOwe,youGet,expenseDTOList);

        }else{
            throw new GroupNotFoundException("Group not found.");
        }
    }
}
