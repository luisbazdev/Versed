package com.versed.sessions.session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {
    private final SessionService service;

    @Autowired
    public SessionController(SessionService service){
        this.service = service;
    }

    @GetMapping
    public Map<String, Object> findMySessions(Principal principal){
        return this.service.findMySessions(principal);
    }

    @PostMapping()
    public Map<String, Object> insert(Principal principal, @RequestBody Session session){
        return this.service.insert(principal, session);
    }
}
