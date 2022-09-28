package com.versed.mentorships.mentorship;

import java.security.Principal;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class MentorshipService {
    private final MentorshipRepository repository;

    @Autowired
    public MentorshipService(MentorshipRepository repository){
        this.repository = repository;
    }

    public List<Mentorship> find(Principal principal){
        String userId = principal.getName();

        return this.repository.findByStudentIdOrMentorId(userId, userId);
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
        String userId = principal.getName();

        if(userId != mentorship.getMentorId() && userId != mentorship.getStudentId()){
            hm.put("message", "You do not have enough permissions for this action");
            hm.put("mentorship", null);
            hm.put("success", false);

            return hm;
        }

        hm.put("mentorship", exists.get());
        hm.put("success", true);

        return hm;
    }

    public Map<String, Object> insert(Mentorship body){
        HashMap<String, Object> hm = new HashMap<String, Object>();

        String userId = principal.getName();

        Mentorship mentorship = new Mentorship(body);
        mentorship.setId(userId);

        hm.put("message", "Mentorship successfully created");
        hm.put("mentorship", this.repository.save(mentorship));
        hm.put("success", true);
        
        return hm;
    }
}
