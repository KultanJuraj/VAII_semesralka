package com.backend.backend.Collection;

import com.backend.backend.Card.CardRepository;
import com.backend.backend.User.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollectionService {

    private CollectionRepository collectionRepository;

    public CollectionService(CollectionRepository collectionRepository) {
        this.collectionRepository = collectionRepository;
    }

    public List<Collection> getCollectionsByUser(User user) {
        return collectionRepository.findByUser(user);
    }

    public List<Collection> getCollectionByUserId(Integer id) {
        return collectionRepository.findByUserUserId(id);
    }

    public List<Collection> getCollectionsByUserIdWithCard(Integer id) {
        return this.collectionRepository.findUserWithCardById(id);
    }

}
