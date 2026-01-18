package com.backend.backend.Card;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CardVesrionRepository extends JpaRepository<CardVersion, Integer> {
    List<CardVersion> findAllByCardId(Integer cardId);
    @Query("""
      select v
      from CardVersion v
      join fetch v.card c
      left join fetch c.cardType
      left join fetch c.manaValue
      where v.id = :versionId
    """)
    Optional<CardVersion> findWithCardAndRelationsById(@Param("versionId") Integer versionId);
}
