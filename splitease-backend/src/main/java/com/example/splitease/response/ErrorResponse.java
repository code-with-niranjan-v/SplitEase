package com.example.splitease.response;

import java.time.LocalDateTime;

public record ErrorResponse(
        LocalDateTime timestamp,
        int status,
        boolean success,
        String error,
        String message,
        String path
) {
}