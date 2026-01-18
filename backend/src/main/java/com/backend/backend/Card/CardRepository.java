package com.backend.backend.Card;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Integer> {

    @EntityGraph(attributePaths = {"versions"})
    Optional<Card> findWithVersionsById(Integer id);
    @Query("""
      select distinct c
      from Card c
      left join fetch c.versions v
      left join fetch c.cardType
      left join fetch c.manaValue
      where c.id = :id
    """)
    Optional<Card> findWithVersionsAndRelationsById(@Param("id") Integer id);
}
