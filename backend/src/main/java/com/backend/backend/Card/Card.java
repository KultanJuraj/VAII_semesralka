package com.backend.backend.Card;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<CardVersion> versions = new ArrayList<>();

    public Integer getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public CardTypes getCardType() {
        return this.cardType;
    }

    public ManaValue getManaValue() {
        return this.manaValue;
    }

    public String getOracleText() {
        return this.oracleText;
    }

    public String getFlavorText() {
        return this.flavorText;
    }

    public void addVersion(CardVersion version) {
        version.setCard(this);
        versions.add(version);
    }

    public void removeVersion(CardVersion version) {
        versions.remove(version);
        version.setCard(null);
    }
}

