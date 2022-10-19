package com.versed.users.user;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

@Component
public class UserService {
    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository){
        this.repository = repository;
    }

    public Map<String, Object> findAll(){
        HashMap<String, Object> hm = new HashMap<String, Object>();

        List<User> users = this.repository.findAll();

        hm.put("success", true);
        hm.put("users", users);

        return hm;
    }

    public Map<String, Object> findByUserId(String id){
        HashMap<String, Object> hm = new HashMap<String, Object>();

        Optional<User> user = this.repository.findByUserId(id);

        if(user.isPresent()){
            hm.put("success", true);
            hm.put("user", user.get());
            return hm;
        }

        hm.put("message", "User not found");
        hm.put("success", false);
        hm.put("user", null);

        return hm;
    }

    public Map<String, Object> insert(User user){
        HashMap<String, Object> hm = new HashMap<String, Object>();

        Optional<User> userExists = this.repository.findByUserId(user.getUserId());

        if(userExists.isPresent()){
            hm.put("message", "User already exists");
            hm.put("success", false);

            return hm;
        }

        User savedUser = this.repository.save(user);

        hm.put("message", "User was created successfully");
        hm.put("success", true);
        hm.put("user", savedUser);

        return hm;
    }
}
