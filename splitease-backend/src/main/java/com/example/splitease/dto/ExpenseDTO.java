package com.example.splitease.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseDTO {
    private Integer id;
    private String description;
    private Double amount;
    private MemberDTO paidBy;
    private Double yourShare;
    private String status;
    private Integer splitId;
}
