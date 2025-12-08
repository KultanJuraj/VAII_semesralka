package com.backend.backend.Card;

import jakarta.persistence.*;

@Entity
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id")
    private Integer id;

    @Column(name = "card_name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "card_type_id", referencedColumnName = "card_type_id")
    private CardTypes cardType;

    @ManyToOne
    @JoinColumn(name = "m_value_id", referencedColumnName = "m_value_id")
    private ManaValue manaValue;

    @Column(name = "oracle_text")
    private String oracleText;

    @Column(name = "flavor_text")
    private String flavorText;

    @Column(name = "card_image")
    private String cardImage;

    @Column(name = "rarity")
    private String rarity;

    @Column(name = "expansion")
    private String expansion;

    public String getExpansion() {
        return expansion;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public CardTypes getCardType() {
        return cardType;
    }

    public ManaValue getManaValue() {
        return manaValue;
    }

    public String getOracleText() {
        return oracleText;
    }

    public String getFlavorText() {
        return flavorText;
    }

    public String getCardImage() {
        return cardImage;
    }

    public String getRarity() {
        return rarity;
    }
}

