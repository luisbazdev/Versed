package com.versed.users.payment;

import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.versed.users.user.User;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="users_payment_methods", uniqueConstraints = { @UniqueConstraint(columnNames = { "user_id", "gateway" }) })
public class Method {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    private String gateway;
    private String fullName;
    private String accountId;
    private String email;

    public Method() {
    }

    public Method(String gateway, String fullName, String accountId, String email) {
        this.gateway = gateway;
        this.fullName = fullName;
        this.accountId = accountId;
        this.email = email;
    }


    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getGateway() {
        return this.gateway;
    }

    public void setGateway(String gateway) {
        this.gateway = gateway;
    }

    public String getFullName() {
        return this.fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAccountId() {
        return this.accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}
