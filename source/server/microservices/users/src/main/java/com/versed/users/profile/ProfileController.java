package com.versed.users.profile;

import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/users")
@CrossOrigin()
public class ProfileController {
    private final ProfileService service;

    @Autowired
    public ProfileController(ProfileService service){
        this.service = service;
    }

    @GetMapping("/profile/me")
    public Map<String, Object> findMyProfile(Principal principal){
        return this.service.findMyProfile(principal);
    }

    @GetMapping(value = "/profile/{id}")
    public Map<String, Object> findByUserId(@PathVariable String id){
        return this.service.findByUserId(id);
    }

    @PostMapping(value ="/profile")
    public Map<String, Object> insert(@RequestBody Profile profile, Principal principal){
        return this.service.insert(profile, principal);
    }
}
