package com.example.splitease.exception;

public class ExpenseNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ExpenseNotFoundException() {
        super("Expense Not Found.");
    }
}