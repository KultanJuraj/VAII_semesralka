package com.backend.backend.Collection;

import com.backend.backend.Card.CardVersion;
import com.backend.backend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CollectionRepository extends JpaRepository<Collection, Integer> {
    List<Collection> findByUser(User user);

    List<Collection> findByUserUserId(Integer userId);


    List<Collection> findByUser_UserId(Integer userId);

    Optional<Collection> findByIdAndUser_UserId(Integer collectionId, Integer userId);

    Optional<Collection> findByUser_UserIdAndVersion_Id(Integer userId, Integer versionId);
    List<CardVersion> findByCollectionId(Integer CollectionId);

}
