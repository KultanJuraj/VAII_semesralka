package com.backend.backend.Card;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/cards")
@CrossOrigin(origins = "http://localhost:4200")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping
    public List<Card> getAllCards() {
        return cardService.getAllCards();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Card> getCard(@PathVariable Integer id,
                                        @RequestParam(defaultValue = "false") boolean includeVersions) {
        return (includeVersions
                ? cardService.getCardWithVersions(id)
                : cardService.getCard(id))
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/version/{versionId}/full")
    public ResponseEntity<Map<String, Object>> getCardWithVersion(@PathVariable Integer versionId) {
        try {
            Map<String, Object> payload = cardService.getCardAndVersionByVersionId(versionId);
            return ResponseEntity.ok(payload);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}