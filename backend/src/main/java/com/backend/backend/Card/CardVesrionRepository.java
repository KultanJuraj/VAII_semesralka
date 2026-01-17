package com.backend.backend.Card;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardVesrionRepository extends JpaRepository<CardVersion, Integer> {
    List<CardVersion> findAllByCardId(Integer cardId);
}
