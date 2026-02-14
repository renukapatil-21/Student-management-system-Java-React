package com.studentmanagement.dto;

import java.time.LocalDateTime;

public class RecentActivityDto {
    private String type;
    private String message;
    private String time;
    private LocalDateTime timestamp;

    public RecentActivityDto() {}

    public RecentActivityDto(String type, String message, String time, LocalDateTime timestamp) {
        this.type = type;
        this.message = message;
        this.time = time;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}