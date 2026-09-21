package com.example.splitease.exception;

public class MemberNotInGroupException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public MemberNotInGroupException() {
        super("Member not in group exception.");
    }
}