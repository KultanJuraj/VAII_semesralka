package com.backend.backend.Card;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "mana_value")
@JsonIgnoreProperties("cards")
public class ManaValue {


    @Column(name = "w_value")
    private Integer w;

    @Column(name = "u_value")
    private Integer u;

    @Column(name = "b_value")
    private Integer b;

    @Column(name = "r_value")
    private Integer r;

    @Column(name = "g_value")
    private Integer g;

    @Column(name = "c_value")
    private Integer c;

    @Column(name = "total_value")
    private Integer total;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "m_value_id")
    private Integer id;

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return this.id;
    }

    public Integer getW() {
        return this.w;
    }

    public Integer getU() {
        return this.u;
    }

    public Integer getB() {
        return this.b;
    }

    public Integer getR() {
        return this.r;
    }

    public Integer getG() {
        return this.g;
    }

    public Integer getC() {
        return this.c;
    }

    public Integer getTotal() {
        return this.total;
    }
}
