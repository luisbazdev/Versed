package com.versed.sessions.user;

public class UserResponse {
    private String message;
    private String success;
    private User user;

    public UserResponse() {}

    public UserResponse(String message, String success, User user) {
        this.message = message;
        this.success = success;
        this.user = user;
    }
    
    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSuccess() {
        return this.success;
    }

    public void setSuccess(String success) {
        this.success = success;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
