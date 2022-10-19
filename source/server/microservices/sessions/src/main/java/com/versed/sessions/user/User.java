package com.versed.sessions.user;

public class User {
    private Integer id;
    private String userId;
    private String occupation;

    public User() {}

    public User(Integer id, String userId, String occupation) {
        this.id = id;
        this.userId = userId;
        this.occupation = occupation;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getOccupation() {
        return this.occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }
}
