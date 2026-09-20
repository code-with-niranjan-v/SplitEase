package com.example.splitease.exception;

public class SplitExpenseNotFoundException extends Exception{

    public SplitExpenseNotFoundException(){
        super("Split Expense not found.");
    }

}
