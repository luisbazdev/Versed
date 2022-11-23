package com.versed.mentorships.mentorship;

import java.security.Principal;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;
import java.util.Date;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.reactive.function.client.WebClient;

import com.versed.mentorships.service.Service;

@Controller
public class MentorshipService {
    private final MentorshipRepository repository;
    private final WebClient userClient;

    @Autowired
    public MentorshipService(MentorshipRepository repository, WebClient.Builder builder){
        this.repository = repository;
        this.userClient = builder.baseUrl("http://localhost:8080/api/users/profile/").build();
    }

    public Map<String, Object> find(Principal principal){
        String userId = principal.getName().replace("auth0|", "");

        HashMap<String, Object> hm = new HashMap<String, Object>();

        List<Mentorship> mentorships = this.repository.findByStudentIdOrMentorId(userId, userId);

        hm.put("success", true);
        hm.put("mentorships", mentorships);

        return hm;
    }

    public Map<String, Object> findOne(Integer id, Principal principal){
        Optional<Mentorship> exists = repository.findById(id);

        HashMap<String, Object> hm = new HashMap<String, Object>();

        if(!exists.isPresent()){
            hm.put("message", "Mentorship does not exist");
            hm.put("mentorship", null);
            hm.put("success", false);
            
            return hm;
        }

        Mentorship mentorship = exists.get();
        
        // String userId = principal.getName();

        // if(userId != mentorship.getMentorId() && userId != mentorship.getStudentId()){
        //     hm.put("message", "You do not have enough permissions for this action");
        //     hm.put("mentorship", null);
        //     hm.put("success", false);

        //     return hm;
        // }

        hm.put("mentorship", mentorship);
        hm.put("success", true);

        return hm;
    }

    public Map<String, Object> insert(Service body){
        HashMap<String, Object> hm = new HashMap<String, Object>();

        LocalDateTime expiresAt = LocalDateTime.now().plusWeeks(body.getMentoringWeeks());

        Mentorship mentorship = new Mentorship(
            body.getMentorId(), 
            body.getStudentId(), 
            body.getServiceId(), 
            body.getPrice(), 
            expiresAt,
            new Date(), 
            false
        );

        hm.put("message", "Mentorship successfully created");
        hm.put("mentorship", this.repository.save(mentorship));
        hm.put("success", true);
        
        return hm;
    }
}
