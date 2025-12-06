package com.backend.backend.User;

public class UserRequest {
    private String username;
    private String email;
    private String passwd;
    private Double rating;

    // getters and setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPasswd() { return passwd; }
    public void setPasswd(String passwd) { this.passwd = passwd; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
}
