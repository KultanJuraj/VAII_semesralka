package com.backend.backend.Card;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Integer> {

    @EntityGraph(attributePaths = {"versions"})
    Optional<Card> findWithVersionsById(Integer id);


}
