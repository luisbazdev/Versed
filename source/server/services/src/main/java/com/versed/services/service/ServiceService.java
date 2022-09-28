package com.versed.services.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ServiceService {
    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceService(ServiceRepository serviceRepository){
        this.serviceRepository = serviceRepository;
    }

    public Map<String, Object> findOne(Integer id){
        Optional<Service> findService = this.serviceRepository.findById(id);

        HashMap hm = new HashMap<>();

        if(!findService.isPresent()){
            hm.put("message", "Service does not exist");
            hm.put("service", null);

            return hm;
        } 

        hm.put("service", findService.get());

        return hm;
    }

    public Map<String, Object> insert(Service body, Principal principal){
        HashMap hm = new HashMap<>();

        String userId = principal.getName();

        Service service = new Service(body);
        service.setMentorId(userId);

        hm.put("message", "Service was created successfully");
        hm.put("success", true);
        hm.put("service", savedService);

        return hm;
    }
}
