package com.versed.services.service;

import java.security.Principal;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class ServiceService {
    private final ServiceRepository repository;

    @Autowired
    public ServiceService(ServiceRepository repository){
        this.repository = repository;
    }

    public List<Service> findAll(){
        return this.repository.findAll();
    }

    public Map<String, Object> findOne(Integer id){
        Optional<Service> findService = this.repository.findById(id);

        HashMap hm = new HashMap<>();

        if(!findService.isPresent()){
            hm.put("message", "Service does not exist");
            hm.put("service", null);

            return hm;
        } 

        hm.put("service", findService.get());

        return hm;
    }

    public Map<String, Object> insert(Service service, Principal principal){
        HashMap hm = new HashMap<>();

        // If user is a mentor
        String userId = principal.getName().replace("auth0|", "");

        service.setMentorId(userId);
        service.setCreatedAt(new Date());
        service.setRating(0);

        Service savedService = this.repository.save(service);

        hm.put("message", "Service was created successfully");
        hm.put("success", true);
        hm.put("service", savedService);

        return hm;
    }
}
