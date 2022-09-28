package com.versed.services.service;

import java.security.Principal;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Page;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ServiceController {
    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService){
        this.serviceService = serviceService;
    }
    
    @GetMapping(value = "{id}")
    public Map<String, Object> findOne(@PathVariable Integer id){
        return this.serviceService.findOne(id);
    }

    @PostMapping
    public Map<String, Object> insert(@RequestBody Service service, Principal principal){
        return this.serviceService.insert(service, principal);
    }
}
