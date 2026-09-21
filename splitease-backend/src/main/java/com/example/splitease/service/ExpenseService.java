package com.example.splitease.service;

import com.example.splitease.dto.AddMemberDTO;
import com.example.splitease.dto.DeleteExpenseDTO;
import com.example.splitease.exception.ExpenseNotFoundException;
import com.example.splitease.exception.GroupNotFoundException;
import com.example.splitease.exception.SplitExpenseNotFoundException;
import com.example.splitease.exception.UserNotFoundException;
import com.example.splitease.model.*;
import com.example.splitease.repository.SplitExpenseRepository;
import org.springframework.stereotype.Service;

import com.example.splitease.dto.AddExpenseDTO;
import com.example.splitease.repository.ExpenseRepository;
import com.example.splitease.repository.GroupRepository;
import com.example.splitease.repository.UserRepository;

import lombok.AllArgsConstructor;

import java.lang.reflect.Member;
import java.util.ArrayList;

@Service
@AllArgsConstructor
public class ExpenseService {
    
    public final ExpenseRepository expenseRepository;
    public final GroupRepository groupRepository;
    public final UserRepository userRepository;
    public final SplitExpenseRepository splitExpenseRepository;

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

    public String deleteExpense(DeleteExpenseDTO deleteExpenseDTO) throws SplitExpenseNotFoundException {
        if(expenseRepository.existsById(deleteExpenseDTO.getExpenseId())){

            Expense expense = expenseRepository.findById(deleteExpenseDTO.getExpenseId()).get();
//            splitExpenseRepository.deleteAll(expense.getSplits());
            expense.getSplits().clear();
            expenseRepository.delete(expense);
            return "Expense was deleted";

        }else{
            throw new ExpenseNotFoundException();
        }
    }

    public String autoSplitExpense(AddExpenseDTO addExpenseDTO){
        if(groupRepository.existsById(addExpenseDTO.getGroupId())){
            if(userRepository.existsById(addExpenseDTO.getUserId())){
                User user = userRepository.findById(addExpenseDTO.getUserId()).get();
                Group group = groupRepository.findById(addExpenseDTO.getGroupId()).get();
                Expense expense = new Expense(null,group,user,addExpenseDTO.getDescription(),addExpenseDTO.getTotalAmount(),addExpenseDTO.getOwnersShare(),new ArrayList<SplitExpense>());
                expenseRepository.save(expense);
                Double remainingAmount = expense.getTotalAmount() - expense.getOwnersShare();
                Integer totalMembers = group.getMembers().size()-1;
                Double equalShare = remainingAmount/totalMembers;
                for(User member:group.getMembers()){
                    if(!member.getId().equals(addExpenseDTO.getUserId())){
                        SplitExpense splitExpense = new SplitExpense(null,expense,member,equalShare, PaymentStatus.DUE);
                        splitExpenseRepository.save(splitExpense);
                        expense.getSplits().add(splitExpense);
                        expenseRepository.save(expense);
                    }
                }
                return "Auto Split assigned to members.";
            }else{
                throw new UserNotFoundException();
            }
        }else{
            throw new GroupNotFoundException("Group not found.");
        }
    }
}
