package com.versed.users.user;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.JoinColumn;

import com.versed.users.payment.Method;
import com.versed.users.profile.Profile;

@Entity
@Table(name="users")
public class User {
    @Id
    private String id;
    private String occupation;
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Method> payment_methods;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    //@JoinColumn(name = "profile_id", referencedColumnName = "id")
    private Profile profile;

    public User() {}

    public User(String id, String occupation) {
        this.id = id;
        this.occupation = occupation;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOccupation() {
        return this.occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }


    public List<Method> getPayment_methods() {
        return this.payment_methods;
    }

    public void setPayment_methods(List<Method> payment_methods) {
        this.payment_methods = payment_methods;
    }

    public Profile getProfile() {
        return this.profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

}
