package com.backend.backend.Collection;


import com.backend.backend.Card.CardVersion;
import jakarta.persistence.*;

@Entity
@Table(name = "collection_item")
public class CollectionHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "collection_id", referencedColumnName = "collectio_id")
    @Column(name = "collection_id")
    private CollectionHeader collectionHeader;

    @ManyToOne
    @JoinColumn(name = "version_id", referencedColumnName = "version_id")
    @Column(name = "version_id")
    private CardVersion cardVersion;


    public CollectionHeader getCollectionHeader() {
        return collectionHeader;
    }

    public void setCollectionHeader(CollectionHeader collectionHeader) {
        this.collectionHeader = collectionHeader;
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
