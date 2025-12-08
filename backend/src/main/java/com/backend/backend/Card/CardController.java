package com.backend.backend.Card;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cards")
@CrossOrigin(origins = "http://localhost:4200")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    // GET /cards
    @GetMapping
    public List<Card> getAllCards() {
        return cardService.getAllCards();
    }

    // GET /cards/{id}
    @GetMapping("/{id}")
    public Card getCardById(@PathVariable Integer id) {
        return cardService.getCardById(id);
    }
}
