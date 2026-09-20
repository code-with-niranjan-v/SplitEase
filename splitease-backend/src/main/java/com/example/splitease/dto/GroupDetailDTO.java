package com.example.splitease.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupDetailDTO {

    private Integer id;
    private String name;
    private List<MemberDTO> members;
    private Double totalExpense;
    private Double yourShare;
    private Double youOwe;
    private Double youGet;
    private List<ExpenseDTO> expenses;


}
