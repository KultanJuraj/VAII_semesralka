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
    private String image;

    @Column(name = "rarity")
    private String rarity;


    @Column(name = "expansion")
    private String expansion;


    public Integer getId() {
        return this.id;
    }

    public String getImage() {
        return this.image;
    }

    public String getRarity() {
        return this.rarity;
    }

    public String getExpansion() {
        return this.expansion;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public Card getCard() {
        return this.card;
    }
}