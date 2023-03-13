package com.senac.katalogo.controller;


import com.senac.katalogo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ApiController {

    @Autowired
    private AuthService authService;
    @RequestMapping(value = "/teste", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public String teste() {
        return "Ola katalogo";
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> credentials, HttpServletResponse response) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        String profile = authService.authenticate(username, password);
        if (profile != null) {
            response.addCookie(new Cookie("profile", profile));
            return "Login successful";
        } else {
            return "Invalid username or password";
        }
    }

}
