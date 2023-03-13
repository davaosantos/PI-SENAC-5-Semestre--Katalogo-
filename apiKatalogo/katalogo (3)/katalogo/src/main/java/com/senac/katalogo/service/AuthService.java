package com.senac.katalogo.service;


import com.senac.katalogo.model.User;
import com.senac.katalogo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public String authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return user.getProfile();
        }
        return null;
    }
}
