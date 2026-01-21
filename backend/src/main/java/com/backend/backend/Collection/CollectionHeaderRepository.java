package com.backend.backend.Collection;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface CollectionHeaderRepository extends JpaRepository<CollectionHeader,Integer> {
    @EntityGraph(attributePaths = {"items", "items.cardVersion", "user"})
    List<CollectionHeader> findByUser_UserId(Integer userId);

    @EntityGraph(attributePaths = {"items", "items.cardVersion", "user"})
    Optional<CollectionHeader> findWithItemsById(Integer headerId);

    List<CollectionHeader> getAllByPublicity(Boolean publicity);

    CollectionHeader getByIdAndPublicityIsTrue(Integer id, Boolean publicity);
}
