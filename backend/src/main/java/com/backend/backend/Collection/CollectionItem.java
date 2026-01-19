package com.backend.backend.Collection;

import com.backend.backend.Card.CardVersion;
import com.backend.backend.User.User;
import jakarta.persistence.*;

@Entity
@Table(name = "collection_item")
public class CollectionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "collection_id", referencedColumnName = "collection_id")
    private CollectionHeader collection;

    @ManyToOne
    @JoinColumn(name = "version_id", referencedColumnName = "version_id")
    private CardVersion cardVersion;


    public CollectionHeader getCollection() {
        return collection;
    }

    public void setCollection(CollectionHeader collection) {
        this.collection = collection;
    }

    public CardVersion getCardVersion() {
        return cardVersion;
    }

    public void setCardVersion(CardVersion cardVersion) {
        this.cardVersion = cardVersion;
    }

    public Integer getId() {
        return id;
    }


}

