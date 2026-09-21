package com.example.splitease.service;

import com.example.splitease.exception.ExpenseNotFoundException;
import com.example.splitease.exception.MemberNotInGroupException;
import com.example.splitease.exception.SplitExpenseNotFoundException;
import com.example.splitease.exception.UserNotFoundException;
import com.example.splitease.model.User;
import org.springframework.stereotype.Service;

import com.example.splitease.dto.SplitExpenseDTO;
import com.example.splitease.model.Expense;
import com.example.splitease.model.PaymentStatus;
import com.example.splitease.model.SplitExpense;
import com.example.splitease.repository.ExpenseRepository;
import com.example.splitease.repository.SplitExpenseRepository;
import com.example.splitease.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SplitExpenseService {
    
    public final UserRepository userRepository;
    public final ExpenseRepository expenseRepository;
    public final SplitExpenseRepository splitExpenseRepository;

    public String createNewSplitExpense(SplitExpenseDTO splitExpenseDTO){
        if(userRepository.existsById(splitExpenseDTO.getUserId())){
            if(expenseRepository.existsById(splitExpenseDTO.getExpenseId())){
                User user = userRepository.findById(splitExpenseDTO.getUserId()).get();
                Expense expense = expenseRepository.findById(splitExpenseDTO.getExpenseId()).get();
                if(expense.getGroup().getMembers().contains(user)){
                    SplitExpense splitExpense = new SplitExpense(null, expense, user, splitExpenseDTO.getShare(),PaymentStatus.DUE);
                    splitExpenseRepository.save(splitExpense);
                    expense.getSplits().add(splitExpense);
                    expenseRepository.save(expense);
                    return "Split expense was created.";
                }else{
                    throw new MemberNotInGroupException();
                }

            }else{
                throw new ExpenseNotFoundException();
            }
        }else{
            throw new UserNotFoundException();
        }
    }

    public String updateStatus(Integer id) throws SplitExpenseNotFoundException {
        if(splitExpenseRepository.existsById(id)){
            SplitExpense splitExpense = splitExpenseRepository.findById(id).get();
            splitExpense.setStatus(PaymentStatus.PAID);
            splitExpenseRepository.save(splitExpense);
            return "Expense was paid.";

        }else{
            throw new SplitExpenseNotFoundException();
        }
    }
}
