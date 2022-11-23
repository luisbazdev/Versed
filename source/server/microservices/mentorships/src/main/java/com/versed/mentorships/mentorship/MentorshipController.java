package com.versed.mentorships.mentorship;

import java.security.Principal;

import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.versed.mentorships.service.Service;

@RestController
@RequestMapping("/api/mentorships")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:1240"}, allowCredentials = "true")
public class MentorshipController {
    private final MentorshipService service;

    @Autowired
    public MentorshipController(MentorshipService service){
        this.service = service;
    }

    @GetMapping(value = "/me")
    public Map<String, Object> find(Principal principal){
        return this.service.find(principal);
    }

    @GetMapping(value = "{id}")
    public Map<String, Object> findOne(@PathVariable Integer id, Principal principal){
        return this.service.findOne(id, principal);
    }

    @PostMapping()
    public Map<String, Object> insert(@RequestBody Service body){
        return this.service.insert(body);
    }
    
}
