package com.backend.backend.Collection;

import com.backend.backend.Card.CardRepository;
import com.backend.backend.Card.CardVersion;
import com.backend.backend.Card.CardVesrionRepository;
import com.backend.backend.User.User;
import com.backend.backend.User.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CollectionService {

    private final CollectionRepository collectionRepository;
    private final UserRepository userRepository;
    private final CardVesrionRepository cardVesrionRepository;

    public CollectionService(CollectionRepository collectionRepository, UserRepository userRepository,
                             CardVesrionRepository cardVesrionRepository) {
        this.collectionRepository = collectionRepository;
        this.userRepository = userRepository;
        this.cardVesrionRepository = cardVesrionRepository;
    }

    public List<Collection> getCollectionByUserId(Integer userId) {
        return collectionRepository.findByUserUserId(userId);
    }

    public List<CardVersion> getCollectionById(Integer colletionId) {
        return collectionRepository.findByCollectionId(colletionId);
    }



    @Transactional
    public Collection createCollectionForUser(Integer userId, String name, Boolean publicity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

        Collection col = new Collection();
        col.setUser(user);
        col.setName(name);
        col.setPublicity(publicity != null ? publicity : Boolean.FALSE);
        col.setVersion(null);

        return collectionRepository.save(col);
    }


    @Transactional
    public Collection addVersionToCollection(Integer userId, Integer collectionId, Integer versionId) {
        Collection col = collectionRepository.findByIdAndUser_UserId(collectionId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Collection not found for user"));

        CardVersion version = cardVesrionRepository.findById(versionId)
                .orElseThrow(() -> new IllegalArgumentException("Version not found: " + versionId));

        // optional duplicate check
        collectionRepository.findByUser_UserIdAndVersion_Id(userId, versionId)
                .ifPresent(e -> { throw new IllegalStateException("Version already in one of user's collections"); });

        col.setVersion(version);
        return collectionRepository.save(col);
    }

    @Transactional
    public Collection removeVersionFromCollection(Integer userId, Integer collectionId) {
        Collection col = collectionRepository.findByIdAndUser_UserId(collectionId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Collection not found for user"));

        col.setVersion(null);
        return collectionRepository.save(col);
    }

    @Transactional
    public Collection updateCollectionMetadata(Integer userId, Integer collectionId, String name, Boolean publicity) {
        Collection col = collectionRepository.findByIdAndUser_UserId(collectionId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Collection not found for user"));

        if (name != null) {
            col.setName(name);
        }
        if (publicity != null) {
            col.setPublicity(publicity);
        }

        return collectionRepository.save(col);
    }

    @Transactional
    public void deleteCollection(Integer userId, Integer collectionId) {
        Collection col = collectionRepository.findByIdAndUser_UserId(collectionId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Collection not found for user"));
        collectionRepository.delete(col);
    }

}
