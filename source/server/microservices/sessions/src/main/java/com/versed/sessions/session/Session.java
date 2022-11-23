package com.versed.sessions.session;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
@Table(name="sessions")
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String studentId;
    private String mentorId;
    private Integer mentorshipId;
    private Date created_at;
    private Date finished_at;

    public Session() {}
    public Session(
        String studentId, 
        String mentorId,
        Integer mentorshipId,
        Date created_at 
    ) {
        this.studentId = studentId;
        this.mentorId = mentorId;
        this.mentorshipId = mentorshipId;
        this.created_at = created_at;
    } 

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStudentId() {
        return this.studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getMentorId() {
        return this.mentorId;
    }

    public void setMentorId(String mentorId) {
        this.mentorId = mentorId;
    }

    public Integer getMentorshipId() {
        return this.mentorshipId;
    }

    public void setMentorshipId(Integer mentorshipId) {
        this.mentorshipId = mentorshipId;
    }

    public Date getCreated_at() {
        return this.created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Date getFinished_at() {
        return this.finished_at;
    }

    public void setFinished_at(Date finished_at) {
        this.finished_at = finished_at;
    }

}
