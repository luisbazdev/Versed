package com.versed.mentorships.profile;

// import com.versed.mentorships.user.User;

public class Profile {
    private Integer id;
    private String name;
    private String picture;
    private String description;
    private String location;

    public Profile() {}

    public Profile(String name, String picture, String description, String location) {
        this.name = name;
        this.picture = picture;
        this.description = description;
        this.location = location;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPicture() {
        return this.picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
