package com.example.splitease.service;

import com.example.splitease.exception.GroupNotFoundException;
import com.example.splitease.exception.UserNotFoundException;
import com.example.splitease.model.SplitExpense;
import org.springframework.stereotype.Service;

import com.example.splitease.dto.AddExpenseDTO;
import com.example.splitease.model.Expense;
import com.example.splitease.model.Group;
import com.example.splitease.model.User;
import com.example.splitease.repository.ExpenseRepository;
import com.example.splitease.repository.GroupRepository;
import com.example.splitease.repository.UserRepository;

import lombok.AllArgsConstructor;

import java.util.ArrayList;

@Service
@AllArgsConstructor
public class ExpenseService {
    
    public final ExpenseRepository expenseRepository;
    public final GroupRepository groupRepository;
    public final UserRepository userRepository;

    public String addExpense(AddExpenseDTO addExpenseDTO){
        if(userRepository.existsById(addExpenseDTO.getUserId())){
            if(groupRepository.existsById(addExpenseDTO.getGroupId())){
                User user = userRepository.findById(addExpenseDTO.getUserId()).get();
                Group group = groupRepository.findById(addExpenseDTO.getGroupId()).get();
                Expense expense = new Expense(null,group,user,addExpenseDTO.getDescription(),addExpenseDTO.getTotalAmount(),addExpenseDTO.getOwnersShare(),new ArrayList<SplitExpense>());
                expenseRepository.save(expense);
                return "Expense was created.";
            }
            else{
                throw new GroupNotFoundException("Group not found.");
            }
        }else{
            System.out.println("Error 1");
            throw new UserNotFoundException();
        }
    }

}
