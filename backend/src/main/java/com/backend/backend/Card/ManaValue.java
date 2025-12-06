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
        return id;
    }

    public Integer getW() {
        return w;
    }

    public Integer getU() {
        return u;
    }

    public Integer getB() {
        return b;
    }

    public Integer getR() {
        return r;
    }

    public Integer getG() {
        return g;
    }

    public Integer getC() {
        return c;
    }

    public Integer getTotal() {
        return total;
    }
}
