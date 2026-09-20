package com.example.splitease.repository;

import com.example.splitease.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.splitease.model.Expense;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense,Integer> {

    public List<Expense> findExpenseByGroup(Group group);

}
