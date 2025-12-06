package com.backend.backend.User;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @MapsId   // share PK with Login
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("user")
    private Login login;

    @Column(name = "rating")
    private Double rating;

    // getters and setters
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public Login getLogin() { return login; }
    public void setLogin(Login login) { this.login = login; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
}
