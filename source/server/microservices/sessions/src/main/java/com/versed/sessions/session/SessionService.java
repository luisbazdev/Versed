package com.versed.sessions.session;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.versed.sessions.user.User;
import com.versed.sessions.user.UserResponse;
import com.versed.sessions.mentorship.Mentorship;
import com.versed.sessions.mentorship.MentorshipResponse;

@Service
public class SessionService {
    private final SessionRepository repository;
    private final WebClient mentorshipClient;

    @Autowired
    public SessionService(SessionRepository repository, WebClient.Builder builder){
        this.repository = repository;
        this.mentorshipClient = builder.baseUrl("http://localhost:1235/api/mentorships/").build();
    }

    public Map<String, Object> findMySessions(Principal principal){
        String userId = principal.getName().replace("auth0|", "");

        HashMap<String, Object> hm = new HashMap<String, Object>();
        
        List<Session> sessions = this.repository.findByStudentIdOrMentorId(userId, userId);

        hm.put("user_id", userId);
        hm.put("sessions", sessions);
        hm.put("success", true);

        return hm;
    }

    public Map<String, Object> findById(Integer id, Principal principal){
        String userId = principal.getName().replace("auth0|", "");

        HashMap<String, Object> hm = new HashMap<String, Object>();

        Optional<Session> exists = this.repository.findById(id);
        
        if(exists.isPresent()){

            Session session = exists.get();

            if(!session.getMentorId().equals(userId) && !session.getStudentId().equals(userId)){
                hm.put("message", "You are not allowed to do this");
                hm.put("success", false);
                return hm;
            }

            hm.put("session", session);
            hm.put("success", true);
        }
        else{
            hm.put("message", "Session does not exist");
            hm.put("session", null);
            hm.put("success", false);
        }

        return hm;
    }

    public Map<String, Object> insert(Principal principal, Session session){
        HashMap<String, Object> hm = new HashMap<String, Object>();

        String userId = principal.getName().replace("auth0|", "");

        Integer mentorshipId = session.getMentorshipId();

        MentorshipResponse mentorshipResponse = mentorshipClient
        .get()
        .uri("{id}", mentorshipId)
        .retrieve()
        .bodyToMono(MentorshipResponse.class)
        .block();

        Mentorship mentorship = mentorshipResponse.getMentorship();

        // check if the principal is the mentor of it
        if(!mentorship.getMentorId().equals(userId)){
            System.out.println(mentorship.getMentorId());
            System.out.println(userId);
            hm.put("success", false);
            hm.put("message", "You are not allowed to do this");
            return hm;
        }

        session.setMentorId(userId);
        session.setCreated_at(new Date());
        Session _session = this.repository.save(session);

        hm.put("success", true);
        hm.put("session", _session);
        hm.put("message", "Session successfully created");

        return hm;
    }
}
