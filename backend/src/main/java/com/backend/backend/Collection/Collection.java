package com.backend.backend.Collection;


import com.backend.backend.Card.Card;
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
    String publicity;


    @ManyToOne
    @JoinColumn(name = "card_id", referencedColumnName = "card_id", nullable = false)
    @JsonBackReference
    Card card;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    User user;

    @Column(name = "name")
    String name;


    public String getPublicity() {
        return publicity;
    }

    public Card getCard() {
        return card;
    }

    public User getUser() {
        return user;
    }

    public Integer getId() {
        return id;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public void setPublicity(String publicity) {
        this.publicity = publicity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
