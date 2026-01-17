package com.backend.backend.Collection;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/collections")
public class CollectionControler {

    private CollectionService collectionService;


    public CollectionControler(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    @GetMapping("/user/{userId}")
    public List<Collection> getByUser(@PathVariable Integer id) {
        return this.collectionService.getCollectionByUserId(id);
    }
}
