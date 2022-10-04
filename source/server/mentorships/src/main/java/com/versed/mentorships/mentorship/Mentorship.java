package com.versed.mentorships.mentorship;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Mentorship {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String mentorId;
    private String studentId;
    private Integer serviceId;
    private Date expiresAt;
    private Date lastSession;
    private Date createdAt;
    private boolean disabled;

    public Mentorship(){}
    public Mentorship(
        String mentorId,
        String studentId,
        Integer serviceId, 
        Date expiresAt, 
        Date createdAt, 
        boolean disabled) {
        this.mentorId = mentorId;
        this.studentId = studentId;
        this.serviceId = serviceId;
        this.expiresAt = expiresAt;
        this.createdAt = createdAt;
        this.disabled = disabled;
    }
    public Mentorship(
        Integer id, 
        String mentorId,
        String studentId,
        Integer serviceId, 
        Date expiresAt, 
        Date lastSession, 
        Date createdAt, 
        boolean disabled) {
        this.id = id;
        this.mentorId = mentorId;
        this.studentId = studentId;
        this.serviceId = serviceId;
        this.expiresAt = expiresAt;
        this.lastSession = lastSession;
        this.createdAt = createdAt;
        this.disabled = disabled;
    }


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
