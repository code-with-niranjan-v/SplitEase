package com.example.splitease.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response<T> {
    private Integer status;
    private String message;
    private T data;
    private LocalDateTime timeStamp;
}
