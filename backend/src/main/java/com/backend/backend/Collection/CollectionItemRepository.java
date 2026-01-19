package com.backend.backend.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CollectionItemRepository extends JpaRepository<CollectionItem, Integer> {

        List<CollectionItem> findByCollection_Id(Integer collectionId);
    Optional<CollectionItem> findByCollection_IdAndCardVersion_Id(Integer collectionId, Integer versionId);
}
