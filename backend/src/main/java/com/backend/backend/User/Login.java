package com.backend.backend.User;

import jakarta.persistence.*;

@Entity
@Table(name = "login")
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "login_id")
    private Integer loginId;

    @Column(unique = true, nullable = false, length = 28)
    private String username;

    @Column(name = "e_mail", length = 30)
    private String eMail;

    @Column(name = "passwd", length = 64)
    private String passwd;

    @OneToOne(mappedBy = "login", cascade = CascadeType.ALL)
    private User user;

    // getters and setters
    public Integer getLoginId() { return loginId; }
    public void setLoginId(Integer loginId) { this.loginId = loginId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEMail() { return eMail; }
    public void setEMail(String eMail) { this.eMail = eMail; }

    public String getPasswd() { return passwd; }
    public void setPasswd(String passwd) { this.passwd = passwd; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
