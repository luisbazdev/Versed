package com.versed.users.payment;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

import com.versed.users.user.User;
import com.versed.users.user.UserRepository;

@Component
public class MethodService {
    private final MethodRepository methodRepository;
    private final UserRepository userRepository;

    @Autowired
    public MethodService(MethodRepository methodRepository, UserRepository userRepository){
        this.methodRepository = methodRepository;
        this.userRepository = userRepository;
    }

    public Map<String, Object> findByUserId(String id){
        HashMap<String, Object> hm = new HashMap<String, Object>();

        Optional<User> user = this.userRepository.findByUserId(id);

        if(user.isPresent()){
            Integer userId = user.get().getId();

        	List<Method> methods = this.methodRepository.findByUserId(userId);

        	hm.put("user_id", id);
        	hm.put("methods", methods);
        	hm.put("success", true);

        	return hm;
        }

        hm.put("user_id", id);
        hm.put("message", "User not found");
        hm.put("success", false);

        return hm;
    }

    public Map<String, Object> insert(String id, Method method){
        HashMap<String, Object> hm = new HashMap<String, Object>();

        Optional<User> user = this.userRepository.findByUserId(id);

        if(user.isPresent()){
        	method.setUser(user.get());
        	Method savedMethod = this.methodRepository.save(method);

        	hm.put("message", "Method was created successfully");
        	hm.put("success", true);
        	hm.put("method", savedMethod);

        	return hm;
        }

        hm.put("message", "User not found");
        hm.put("success", false);

        return hm;
    }
}
