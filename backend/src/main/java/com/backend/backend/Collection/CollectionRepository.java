package com.backend.backend.Collection;

import com.backend.backend.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CollectionRepository extends JpaRepository<Collection, Integer> {
    List<Collection> findByUser(User user);

    List<Collection> findByUserUserId(Integer userId);


    List<Collection> findUserWithCardById(@Param("userId") Integer userId);
}
