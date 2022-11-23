package com.versed.users.profile;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.versed.users.user.User;
import com.versed.users.user.UserRepository;

@Component
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProfileService(ProfileRepository profileRepository, UserRepository userRepository){
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }
    
    public Map<String, Object> findMyProfile(Principal principal){
        HashMap<String,Object> hm = new HashMap<String, Object>();

        String userId = principal.getName().replace("auth0|", "");

        Optional<Profile> profile = this.profileRepository.findByUserId(userId);

        if(!profile.isPresent()){
            hm.put("message", "Profile does not exist");
            hm.put("profile", null);
            hm.put("success", false);

            return hm;
        } 

        hm.put("profile", profile.get());
        hm.put("success", true);

        return hm;
    }

    public Map<String, Object> findByUserId(String id){
        HashMap<String,Object> hm = new HashMap<String, Object>();

        Optional<Profile> profile = this.profileRepository.findByUserId(id);

        if(!profile.isPresent()){
            hm.put("message", "Profile does not exist");
            hm.put("profile", null);
            hm.put("success", false);

            return hm;
        } 

        hm.put("profile", profile.get());
        hm.put("success", true);

        return hm;
    }

    public Map<String, Object> insert(Profile body, Principal principal){
        HashMap<String, Object> hm = new HashMap<String, Object>();

        String userId = principal.getName().replace("auth0|", "");

        Optional<User> _user = this.userRepository.findById(userId);

        if(_user.isPresent()){
            User user = _user.get();
            //set user
            body.setUser(user);
            //set profile
            user.setProfile(body);
            //user save
            this.userRepository.save(user);

        	hm.put("message", "Profile was created successfully");
        	hm.put("success", true);
        	hm.put("profile", body);

        	return hm;
        }

        hm.put("message", "User not found");
        hm.put("success", false);

        return hm;
    }
}
