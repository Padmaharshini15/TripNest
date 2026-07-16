package com.tripnest.controller;

import com.tripnest.dto.TouristSpotDto;
import com.tripnest.service.SpotService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping
public class SpotController {

    private final SpotService spotService;

    public SpotController(SpotService spotService) {
        this.spotService = spotService;
    }

    @GetMapping({"/api/spots/public/active", "/api/spots/public"})
    public ResponseEntity<List<TouristSpotDto>> getActiveSpots() {
        return ResponseEntity.ok(spotService.getAllActiveSpots());
    }

    @GetMapping("/api/spots/public/{id}")
    public ResponseEntity<TouristSpotDto> getSpotById(@PathVariable Long id) {
        return ResponseEntity.ok(spotService.getSpotById(id));
    }

    @GetMapping("/api/spots/public/search")
    public ResponseEntity<List<TouristSpotDto>> searchSpots(@RequestParam String query) {
        return ResponseEntity.ok(spotService.searchSpots(query));
    }

    @GetMapping("/api/spots/public/filter")
    public ResponseEntity<List<TouristSpotDto>> filterSpots(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) BigDecimal minRating) {
        return ResponseEntity.ok(spotService.filterSpots(category, location, minPrice, maxPrice, minRating));
    }

    // --- Admin Restricted Access ---
    
    @GetMapping("/api/admin/spots/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TouristSpotDto>> getAllSpotsAdmin() {
        return ResponseEntity.ok(spotService.getAllSpotsAdmin());
    }

    @PostMapping("/api/admin/spots")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TouristSpotDto> createSpot(@Valid @RequestBody TouristSpotDto dto) {
        return ResponseEntity.ok(spotService.createSpot(dto));
    }

    @PutMapping("/api/admin/spots/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TouristSpotDto> updateSpot(@PathVariable Long id, @Valid @RequestBody TouristSpotDto dto) {
        return ResponseEntity.ok(spotService.updateSpot(id, dto));
    }

    @DeleteMapping("/api/admin/spots/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSpot(@PathVariable Long id) {
        spotService.deleteSpot(id);
        return ResponseEntity.noContent().build();
    }
}