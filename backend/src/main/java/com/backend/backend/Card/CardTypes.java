package com.backend.backend.Card;

import jakarta.persistence.*;

@Entity
@Table(name = "card_types")
public class CardTypes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "car_type")
    private String type;

    @Column(name = "card_sub")
    private String subType;

    @Column(name = "legend")
    private boolean legend;

    public String getType() {
        return type;
    }

    public String getSubType() {
        return subType;
    }

    public boolean isLegend() {
        return legend;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
