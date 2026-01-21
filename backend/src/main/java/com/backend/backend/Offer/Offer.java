package com.backend.backend.Offer;

import com.backend.backend.Collection.CollectionItem;
import jakarta.persistence.*;

@Entity
@Table(name = "offer")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "offer_id")
    private Integer offerId;

    @OneToOne
    @JoinColumn(referencedColumnName = "id", name = "item_id")
    private CollectionItem item;

    @Column(name = "text")
    private String text;

    public CollectionItem getItem() {
        return item;
    }

    public void setItem(CollectionItem item) {
        this.item = item;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getOfferId() {
        return offerId;
    }
}
