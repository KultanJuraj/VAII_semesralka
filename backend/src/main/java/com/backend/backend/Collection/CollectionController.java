package com.backend.backend.Collection;

import com.backend.backend.Card.CardVersion;
import com.backend.backend.Security.UserDetailsImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/collections")
public class CollectionController {

    private final CollectionService collectionService;

    public CollectionController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping("/{collectionId}/versions")
    public ResponseEntity<List<CardVersion>> getCollectionVersions(@PathVariable Integer collectionId) {
        try {
            List<CardVersion> versions = collectionService.getCollectionById(collectionId)
                    .getItems()
                    .stream()
                    .map(CollectionItem::getCardVersion)
                    .toList();
            if (versions.isEmpty()) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(versions);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{collectionId}")
    public ResponseEntity<CollectionHeader> getCollection(@PathVariable Integer collectionId){
        try {
            CollectionHeader header = this.collectionService.getCollectionById(collectionId);
            return ResponseEntity.ok(header);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<CollectionHeader>> getCollectionsByUser(@PathVariable Integer userId) {
        List<CollectionHeader> headers = this.collectionService.getCollectionsByUser(userId);
        return ResponseEntity.ok(headers);
    }

    @DeleteMapping("/{collectionId}")
    public ResponseEntity<Void> deleteCollection(@PathVariable Integer collectionId,
                                                 @AuthenticationPrincipal UserDetailsImpl currentUser) {
        try {
            this.collectionService.deleteCollection(collectionId, currentUser.getUserId());
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{collectionId}")
    public ResponseEntity<CollectionHeader> updateCollection(@PathVariable Integer collectionId,
                                                             @RequestBody CollectionHeader payload,
                                                             @AuthenticationPrincipal UserDetailsImpl currentUser) {
        try {
            CollectionHeader updated = this.collectionService.updateCollection(collectionId, payload.getName(), payload.getPublicity(), currentUser.getUserId());
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{collectionId}/versions/{versionId}")
    public ResponseEntity<Void> removeVersion(@PathVariable Integer collectionId,
                                              @PathVariable Integer versionId,
                                              @AuthenticationPrincipal UserDetailsImpl currentUser) {
        try {
            this.collectionService.removeVersionFromCollection(collectionId, versionId, currentUser.getUserId());
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{collectionId}/versions/{versionId}")
    public ResponseEntity<?> addVersion(@PathVariable Integer collectionId,
                                        @PathVariable Integer versionId,
                                        @AuthenticationPrincipal UserDetailsImpl currentUser) {
        try {
            CollectionItem created = this.collectionService.addVersionToCollection(collectionId, versionId, currentUser.getUserId());
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/users/{userId}")
    public ResponseEntity<CollectionHeader> createCollection(@PathVariable Integer userId,
                                                             @RequestBody CollectionHeader payload,
                                                             @AuthenticationPrincipal UserDetailsImpl currentUser) {
        try {
            String name = payload.getName();
            Boolean publicity = payload.getPublicity();
            CollectionHeader created = this.collectionService.createCollectionForUser(userId, name, publicity, currentUser.getUserId());

            URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(created.getId())
                    .toUri();

            return ResponseEntity.created(location).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

}