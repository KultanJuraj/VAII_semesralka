package com.backend.backend.Collection;


import com.backend.backend.Card.Card;
import com.backend.backend.Card.CardVersion;
import com.backend.backend.User.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table (name = "card_collection")
public class Collection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "collection_id")
    Integer id;

    @Column(name = "publicity")
    Boolean publicity;


    @ManyToOne
    @JoinColumn(name = "version_id", referencedColumnName = "version_id", nullable = false)
    @JsonBackReference
    CardVersion cardVersion;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    User user;

    @Column(name = "name")
    String name;


    public Boolean getPublicity() {
        return publicity;
    }

    public CardVersion getCard() {
        return this.cardVersion;
    }

    public User getUser() {
        return this.user;
    }

    public Integer getId() {
        return this.id;
    }

    public void setVersion(CardVersion cardVersion) {
        this.cardVersion = cardVersion;
    }

    public void setPublicity(Boolean publicity) {
        this.publicity = publicity;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
