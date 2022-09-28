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
    private Integer maxHoursPerSession;
    private Integer daysPerWeekAvailable;
    private Date createdAt;
    @Column(length = 50)
    private String signature;
    @Column(length = 2000)
    private String description;
    private boolean disabled;

    public Service(){}
    public Service(
        Integer id,
        String mentorId,
        Integer price,
        Integer rating,
        Integer maxHoursPerSession,
        Integer daysPerWeekAvailable,
        Date createdAt,
        String signature,
        String description,
        Boolean disabled){
        this.id = id;
        this.mentorId = mentorId;
        this.price = price;
        this.rating = rating;
        this.maxHoursPerSession = maxHoursPerSession;
        this.daysPerWeekAvailable = daysPerWeekAvailable;
        this.createdAt = createdAt;
        this.signature = signature;
        this.description = description;
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

    public Integer getMaxHoursPerSession() {
        return this.maxHoursPerSession;
    }

    public void setMaxHoursPerSession(Integer maxHoursPerSession) {
        this.maxHoursPerSession = maxHoursPerSession;
    }

    public Integer getDaysPerWeekAvailable() {
        return this.daysPerWeekAvailable;
    }

    public void setDaysPerWeekAvailable(Integer daysPerWeekAvailable) {
        this.daysPerWeekAvailable = daysPerWeekAvailable;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
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
