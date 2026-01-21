
package com.backend.backend.Collection;


import com.backend.backend.Card.CardVersion;
import com.backend.backend.User.User;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
@Table(name = "collection_header")
public class CollectionHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "collection_id")
    private Integer id;


    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;


    @OneToMany(mappedBy = "collection", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<CollectionItem> items = new ArrayList<>();

    @Column(name = "name")
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 20, message = "Name of collection must be between 3 and 20 characters")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Only letters, numbers, and underscores allowed")
    private String name;

    @Column(name = "publicity")
    private Boolean publicity;


    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getPublicity() {
        return publicity;
    }

    public void setPublicity(Boolean publicity) {
        this.publicity = publicity;
    }

    public Integer getId() {
        return this.id;
    }

    public List<CollectionItem> getItems() {
        return items;
    }

    public void setItems(List<CollectionItem> items) {
        this.items = items;
    }
}

