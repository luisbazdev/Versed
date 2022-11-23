package com.versed.mentorships.service;

public class Service {
    private String studentId;
    private String mentorId;
    private Integer serviceId;
    private Integer price;
    private Integer mentoringWeeks;

    public Service(){}

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

    public Integer getMentoringWeeks() {
        return this.mentoringWeeks;
    }

    public void setMentoringWeeks(Integer mentoringWeeks) {
        this.mentoringWeeks = mentoringWeeks;
    }

}
