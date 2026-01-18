package com.backend.backend.Collection;

import com.backend.backend.Card.CardVersion;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/collections")
public class CollectionControler {

    private CollectionService collectionService;


    public CollectionControler(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping("/user/{userId}")
    public List<Collection> getByUser(@PathVariable Integer userId) {
        return this.collectionService.getCollectionByUserId(userId);
    }

    @PostMapping("/users/{userId}/collections")
    public ResponseEntity<Collection> createCollection(
            @PathVariable("userId") Integer userId,
            @RequestBody Map<String, Object> body) {

        String name = body.get("name") == null ? null : body.get("name").toString();
        Boolean publicity = body.get("publicity") == null ? Boolean.FALSE : Boolean.valueOf(body.get("publicity").toString());

        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        System.out.println(userId);
        Collection saved = collectionService.createCollectionForUser(userId, name, publicity);
        return ResponseEntity.created(URI.create("/users/" + userId + "/collections/" + saved.getId()))
                .body(saved);
    }

    @DeleteMapping("/{collectionId}")
    public ResponseEntity<Void> deleteCollection(@PathVariable Integer userId,
                                                 @PathVariable Integer collectionId) {
        try {
            collectionService.deleteCollection(userId, collectionId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{collectionId}")
    public ResponseEntity<Collection> patchCollection(@PathVariable Integer userId,
                                                      @PathVariable Integer collectionId,
                                                      @RequestBody Map<String, Object> body) {
        String name = body.containsKey("name") ? (String) body.get("name") : null;
        Boolean publicity = null;
        if (body.containsKey("publicity")) {
            Object o = body.get("publicity");
            publicity = o == null ? null : Boolean.valueOf(o.toString());
        }

        try {
            Collection updated = collectionService.updateCollectionMetadata(userId, collectionId, name, publicity);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{collectionId}/version")
    public ResponseEntity<Collection> removeVersion(@PathVariable Integer userId,
                                                    @PathVariable Integer collectionId) {
        try {
            Collection updated = collectionService.removeVersionFromCollection(userId, collectionId);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{collectionId}/version")
    public ResponseEntity<Collection> addVersion(@PathVariable Integer userId,
                                                 @PathVariable Integer collectionId,
                                                 @RequestBody(required = false) Map<String, Object> body,
                                                 @RequestParam(required = false) Integer versionId) {
        Integer vId = versionId;
        if (vId == null && body != null) {
            Object o = body.get("versionId");
            vId = o == null ? null : Integer.valueOf(o.toString());
        }
        if (vId == null) {
            return ResponseEntity.badRequest().build();
        }

        try {
            Collection updated = collectionService.addVersionToCollection(userId, collectionId, vId);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(null);
        }
    }

    @GetMapping("{userId}/{id}")
    public List<CardVersion>
}
