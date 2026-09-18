package com.example.splitease.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddMemberDTO {

    private String phoneNumber;
    private Integer groupId;

}
