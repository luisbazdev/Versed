package com.versed.services.service;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String mentorId;
    private Integer price;
    private Integer rating;
    private Integer mentoringWeeks;
    private Date createdAt;   
    private String title;
    @Column(length = 50)
    private String signature;
    @Column(length = 2000)
    private String description;
    private boolean disabled;

    public Service(){}
    public Service(
        String mentorId,
        Integer price,
        Integer mentoringWeeks,
        String signature,
        String description
	){
        this.mentorId = mentorId;
        this.price = price;
        this.rating = 0;
        this.mentoringWeeks = mentoringWeeks;
        this.createdAt = new Date();
        this.signature = signature;
        this.description = description;
        this.disabled = false;
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

    public Integer getPrice() {
        return this.price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getRating() {
        return this.rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getMentoringWeeks() {
        return this.mentoringWeeks;
    }

    public void setMentoringWeeks(Integer mentoringWeeks) {
        this.mentoringWeeks = mentoringWeeks;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getTitle() {
    	return this.title;
    }

    public void setTitle(String title) {
    	this.title = title;
    }

    public String getSignature() {
        return this.signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
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
