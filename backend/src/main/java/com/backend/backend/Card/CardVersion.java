package com.backend.backend.Card;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "card_version")
public class CardVersion {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "version_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", referencedColumnName = "card_id", nullable = false)
    @JsonBackReference
    private Card card;


    @Column(name = "image")
    String image;

    @Column(name = "rarity")
    String rarity;


    @Column(name = "expansion")
    String expansion;


    public Integer getId() {
        return id;
    }

    public String getImage() {
        return image;
    }

    public String getRarity() {
        return rarity;
    }

    public String getExpansion() {
        return expansion;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public Card getCard() {
        return card;
    }
}