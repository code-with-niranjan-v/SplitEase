package com.example.splitease.controller;

import com.example.splitease.exception.SplitExpenseNotFoundException;
import com.example.splitease.response.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.splitease.dto.SplitExpenseDTO;
import com.example.splitease.model.SplitExpense;
import com.example.splitease.service.SplitExpenseService;

import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@RestController
@AllArgsConstructor
@RequestMapping("/api/split")
public class SplitExpenseController {
    
    public final SplitExpenseService splitExpenseService;

    @PostMapping("/new")
    public ResponseEntity<?> createNewSplitExpense(@RequestBody SplitExpenseDTO splitExpenseDTO){
        return ResponseEntity.ok(new Response<String>(200,true,splitExpenseService.createNewSplitExpense(splitExpenseDTO),null, LocalDateTime.now()));
    }

    @PatchMapping("/paid/{id}")
    public ResponseEntity<?> updateStatusOfSplit(@PathVariable Integer id) throws SplitExpenseNotFoundException {
        return ResponseEntity.ok(new Response<String>(200,true,splitExpenseService.updateStatus(id),null,LocalDateTime.now()));
    }


}
