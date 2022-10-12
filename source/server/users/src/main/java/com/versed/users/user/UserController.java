package com.versed.users.user;

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
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    /*@GetMapping()
    public Map<String, Object> findAll(){
        return this.userService.findAll();
    }*/

    @GetMapping(value = "{id}")
    public Map<String, Object> findByUserId(@PathVariable String id){
        return this.userService.findByUserId(id);
    }

    @PostMapping()
    public Map<String, Object> insert(@RequestBody User user){
        return this.userService.insert(user);
    }
}
