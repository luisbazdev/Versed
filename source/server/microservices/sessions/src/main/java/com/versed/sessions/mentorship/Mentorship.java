package com.versed.sessions.mentorship;

import java.util.Date;

public class Mentorship {
    private Integer id;
    private String mentorId;
    private String studentId;
    private Integer serviceId;
    private Integer price;
    private Date expiresAt;
    private Date lastSession;
    private Date createdAt;
    private boolean disabled;

    public Mentorship(){}

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMentorId() {
        return this.mentorId;
    }

    public void setMentorId(String mentorId) {
        this.mentorId = mentorId;
    }

    public String getStudentId() {
        return this.studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public Integer getServiceId() {
        return this.serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public Integer getPrice() {
        return this.price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Date getExpiresAt() {
        return this.expiresAt;
    }

    public void setExpiresAt(Date expiresAt) {
        this.expiresAt = expiresAt;
    }

    public Date getLastSession() {
        return this.lastSession;
    }

    public void setLastSession(Date lastSession) {
        this.lastSession = lastSession;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isDisabled() {
        return this.disabled;
    }

    public boolean getDisabled() {
        return this.disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }

}
