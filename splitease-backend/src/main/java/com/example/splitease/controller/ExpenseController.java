package com.example.splitease.controller;

import com.example.splitease.response.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.splitease.dto.AddExpenseDTO;
import com.example.splitease.model.Expense;
import com.example.splitease.service.ExpenseService;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/expense")
public class ExpenseController {
    
    public final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService){
        this.expenseService = expenseService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewExpense(@RequestBody AddExpenseDTO addExpenseDTO){
        return ResponseEntity.ok(new Response<String>(200,true,expenseService.addExpense(addExpenseDTO),null, LocalDateTime.now()));
    }


}
