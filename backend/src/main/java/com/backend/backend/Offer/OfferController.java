package com.backend.backend.Offer;

import com.backend.backend.Collection.CollectionHeader;
import com.backend.backend.Collection.CollectionItem;
import com.backend.backend.Collection.CollectionService;
import com.backend.backend.Security.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/offer")
public class OfferController {
    private OfferService offerService;
    private CollectionService collectionService;

    public OfferController(OfferService offerService, CollectionService collectionService) {
        this.offerService = offerService;
        this.collectionService = collectionService;
    }


    @PutMapping("/postOffer/{itemId}/{userId}")
    ResponseEntity<Offer> createOffer(@PathVariable Integer itemId, @RequestBody Offer payload,
                                      @AuthenticationPrincipal UserDetailsImpl user, @PathVariable Integer userId) {
        try {
            String text = payload.getText();
            Offer created = this.offerService.createOffer(user.getUserId(),text,itemId,userId);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(created.getOfferId())
                    .toUri();

            return ResponseEntity.created(location).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
