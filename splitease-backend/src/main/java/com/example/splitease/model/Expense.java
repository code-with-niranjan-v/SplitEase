package com.example.splitease.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name="expenses")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Expense {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    private Group group;

    @ManyToOne
    private User paidBy;

    private String description;

    private Double totalAmount;

    @Column(nullable = false)
    private Double ownersShare;

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    private List<SplitExpense> splits;


}
