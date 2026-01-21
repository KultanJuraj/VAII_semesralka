package com.backend.backend.Offer;

import com.backend.backend.Collection.CollectionItem;
import com.backend.backend.Collection.CollectionItemRepository;
import com.backend.backend.User.User;
import com.backend.backend.User.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class OfferService {

    private OfferRepository offerRepository;
    private CollectionItemRepository collectionItemRepository;
    private UserRepository userRepository;

    public OfferService(OfferRepository offerRepository, CollectionItemRepository collectionItemRepository, UserRepository userRepository) {
        this.offerRepository = offerRepository;
        this.collectionItemRepository = collectionItemRepository;
        this.userRepository = userRepository;
    }

    public Offer createOffer(Integer userId, String text, Integer item_id,  Integer currentUser) {
        if(!currentUser.equals(userId)) {
            throw new AccessDeniedException("User is not allowed to create a collection for another user");
        }
        CollectionItem item = this.collectionItemRepository.getById(item_id);
        User user = this.userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));
        if(item.equals(null)) {
            System.out.println("This item doens't exist");
        }
        Offer offer = new Offer();
        offer.setItem(item);
        offer.setText(text);
        return this.offerRepository.save(offer);
    }

}
