package com.backend.backend.Collection;

import com.backend.backend.Card.CardVersion;
import com.backend.backend.Card.CardVesrionRepository;
import com.backend.backend.User.User;
import com.backend.backend.User.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CollectionService {

    private final CollectionHeaderRepository collectionHRepo;
    private final CollectionItemRepository collectionIRepo;
    private final CardVesrionRepository cardVesrionRepository;
    private final UserRepository userRepository;

    public CollectionService(CollectionHeaderRepository collectionHRepo, CollectionItemRepository collectionIRepo, CardVesrionRepository cardVesrionRepository, UserRepository userRepository) {
        this.collectionHRepo = collectionHRepo;
        this.collectionIRepo = collectionIRepo;
        this.cardVesrionRepository = cardVesrionRepository;
        this.userRepository = userRepository;
    }


    @Transactional(readOnly = true)
    public CollectionHeader getCollectionById(Integer collectionId) {
        return this.collectionHRepo.findWithItemsById(collectionId)
                .orElseThrow(() -> new IllegalArgumentException("Collection not found: " + collectionId));
    }

    @Transactional(readOnly = true)
    public List<CardVersion> getVersionsByCollectionId(Integer collectionId) {
        return this.collectionIRepo.findByCollection_Id(collectionId)
                .stream()
                .map(CollectionItem::getCardVersion)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CollectionHeader> getCollectionsByUser(Integer userId) {
        return this.collectionHRepo.findByUser_UserId(userId);
    }

    @Transactional
    public void deleteCollection(Integer collectionId, Integer currentUserId) {
        CollectionHeader header = collectionHRepo.findById(collectionId)
                .orElseThrow(() -> new IllegalArgumentException("Collection not found: " + collectionId));

        if (!header.getUser().getUserId().equals(currentUserId)) {
            throw new AccessDeniedException("User does not own the collection");
        }

        collectionHRepo.deleteById(collectionId);
    }

    @Transactional
    public CollectionHeader updateCollection(Integer collectionId, String name, Boolean publicity, Integer currentUserId) {
        CollectionHeader header = collectionHRepo.findById(collectionId)
                .orElseThrow(() -> new IllegalArgumentException("Collection not found: " + collectionId));

        if (!header.getUser().getUserId().equals(currentUserId)) {
            throw new AccessDeniedException("User does not own the collection");
        }

        if (name != null) header.setName(name);
        if (publicity != null) header.setPublicity(publicity);
        return collectionHRepo.save(header);
    }

    @Transactional
    public void removeVersionFromCollection(Integer collectionId, Integer versionId, Integer currentUserId) {
        CollectionItem item = collectionIRepo.findByCollection_IdAndCardVersion_Id(collectionId, versionId)
                .orElseThrow(() -> new IllegalArgumentException("Version not found in collection"));

        if (!item.getCollection().getUser().getUserId().equals(currentUserId)) {
            throw new AccessDeniedException("User does not own the collection");
        }

        collectionIRepo.delete(item);
    }

    @Transactional
    public CollectionItem addVersionToCollection(Integer collectionId, Integer versionId, Integer currentUserId) {
        CollectionHeader header = collectionHRepo.findById(collectionId)
                .orElseThrow(() -> new IllegalArgumentException("Collection not found: " + collectionId));

        // ownership check
        if (!header.getUser().getUserId().equals(currentUserId)) {
            throw new AccessDeniedException("User does not own the collection");
        }

        CardVersion version = cardVesrionRepository.findById(versionId)
                .orElseThrow(() -> new IllegalArgumentException("CardVersion not found: " + versionId));

        if (collectionIRepo.findByCollection_IdAndCardVersion_Id(collectionId, versionId).isPresent()) {
            throw new IllegalStateException("Version already present in collection");
        }

        CollectionItem item = new CollectionItem();
        item.setCollection(header);
        item.setCardVersion(version);
        return collectionIRepo.save(item);
    }

    @Transactional
    public CollectionHeader createCollectionForUser(Integer userId, String name, Boolean publicity, Integer currentUserId) {
        // ensure authenticated user matches requested userId
        if (!userId.equals(currentUserId)) {
            throw new AccessDeniedException("User is not allowed to create a collection for another user");
        }

        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));
        CollectionHeader header = new CollectionHeader();
        header.setUser(user);
        header.setName(name);
        header.setPublicity(publicity != null ? publicity : Boolean.FALSE);
        return collectionHRepo.save(header);
    }

}
