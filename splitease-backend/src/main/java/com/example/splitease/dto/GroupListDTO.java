package com.example.splitease.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupListDTO {

    private Integer id;

    private String name;

    private Integer totalMembers;

}
