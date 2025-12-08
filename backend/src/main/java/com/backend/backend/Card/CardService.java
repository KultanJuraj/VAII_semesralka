package com.backend.backend.Card;

import org.springframework.stereotype.Service;
import java.util.List;

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
}
