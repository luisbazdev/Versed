package com.versed.sessions.session;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private final WebClient userClient;
    private final WebClient mentorshipClient;

    @Autowired
    public SessionService(SessionRepository repository, WebClient.Builder builder){
        this.repository = repository;
        this.userClient = builder.baseUrl("http://localhost:8080/api/users/").build();
        this.mentorshipClient = builder.baseUrl("http://localhost:8082/api/mentorships/").build();
    }

    public Map<String, Object> findMySessions(Principal principal){
        String userId = principal.getName();

        HashMap<String, Object> hm = new HashMap<String, Object>();
        
        List<Session> sessions = this.repository.findByStudentIdOrMentorId(userId, userId);

        hm.put("user_id", userId);
        hm.put("sessions", sessions);
        hm.put("success", true);

        return hm;
    }

    public Map<String, Object> insert(Principal principal, Session session){
        HashMap<String, Object> hm = new HashMap<String, Object>();

        String userId = principal.getName();

        UserResponse userResponse = userClient
                    .get()
                    .uri("{id}", userId)
                    .retrieve()
                    .bodyToMono(UserResponse.class)
                    .block();

        User user = userResponse.getUser();

        // check if user is a mentor     
        if(user == null || user.getOccupation() != "mentor"){
            hm.put("success", false);
            hm.put("message", "You are not allowed to do this");

            return hm;
        }

        Integer mentorshipId = session.getMentorship_id();

        MentorshipResponse mentorshipResponse = mentorshipClient
        .get()
        .uri("{id}", mentorshipId)
        .retrieve()
        .bodyToMono(MentorshipResponse.class)
        .block();

        Mentorship mentorship = mentorshipResponse.getMentorship();

        // check if mentorship exists and the principal is the mentor of it
        if(mentorship == null || mentorship.getMentorId() != userId){
            hm.put("success", false);
            hm.put("message", "You are not allowed to do this");
            return hm;
        }
        // check if mentorship has expired or is disabled
        if(mentorship.getDisabled() == true){
        //if(mentorship.getExpiresAt() < new Date() || mentorship.getDisabled() == true){
            hm.put("success", false);
            hm.put("message", "Mentorship is not available");
            return hm;
        }

        session.setMentorId(userId);
        Session _session = this.repository.save(session);

        hm.put("success", true);
        hm.put("session", _session);
        hm.put("message", "Session successfully created");

        return hm;
    }
}
