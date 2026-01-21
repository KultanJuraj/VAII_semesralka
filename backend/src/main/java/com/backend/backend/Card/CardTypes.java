package com.backend.backend.Card;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "card_types")
@JsonIgnoreProperties("cards")
public class CardTypes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_type_id")
    private Integer id;


    @Column(name = "car_type")
    private String type;

    @Column(name = "card_sub")
    private String subType;

    @Column(name = "legend")
    private boolean legend;

    public String getType() {
        return this.type;
    }

    public String getSubType() {
        return this.subType;
    }

    public boolean isLegend() {
        return this.legend;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return this.id;
    }
}
