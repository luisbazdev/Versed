package com.versed.users.payment;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/users")
//@CrossOrigin(origins = {"https://versed-test.vercel.app"})
public class MethodController {
    private final MethodService methodService;

    @Autowired
    public MethodController(MethodService methodService){
        this.methodService = methodService;
    }

    @GetMapping(value = "{id}/methods")
    public Map<String, Object> findByUserId(@PathVariable String id){
        return this.methodService.findByUserId(id);
    }

    @PostMapping(value = "{id}/methods")
    public Map<String, Object> insert(@PathVariable Integer id, @RequestBody Method method){
        return this.methodService.insert(id, method);
    }
}
