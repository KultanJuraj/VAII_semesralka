package com.backend.backend.Card;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CardService {

    private final CardRepository cardRepository;
    private final CardVesrionRepository versionRepo;

    public CardService(CardRepository cardRepository, CardVesrionRepository versionRepo) {
        this.cardRepository = cardRepository;
        this.versionRepo = versionRepo;
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

    @Transactional(readOnly = true)
    public Map<String, Object> getCardAndVersionByVersionId(Integer versionId) {
        CardVersion version = versionRepo.findWithCardAndRelationsById(versionId)
                .orElseThrow(() -> new IllegalArgumentException("Version not found: " + versionId));

        Card card = version.getCard();

        Map<String, Object> result = new HashMap<>();
        result.put("card", card);
        result.put("version", version);
        return result;
    }
}
