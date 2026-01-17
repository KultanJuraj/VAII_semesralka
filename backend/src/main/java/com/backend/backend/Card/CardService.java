package com.backend.backend.Card;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    public Card getCardById(Integer id) {
        return cardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Card not found: " + id));
    }

    public Optional<Card> getCardWithVersions(Integer id) {
        return cardRepository.findWithVersionsById(id);
    }

    public Optional<Card> getCard(Integer id) {
        return cardRepository.findById(id);
    }
}
