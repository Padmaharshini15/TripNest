package com.tripnest.service;

import com.tripnest.dto.TouristSpotDto;
import com.tripnest.entity.TouristSpot;
import com.tripnest.exception.ResourceNotFoundException;
import com.tripnest.mapper.SpotMapper;
import com.tripnest.repository.TouristSpotRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SpotService {

    private final TouristSpotRepository spotRepository;

    public SpotService(TouristSpotRepository spotRepository) {
        this.spotRepository = spotRepository;
    }

    @Transactional(readOnly = true)
    public List<TouristSpotDto> getAllActiveSpots() {
        return spotRepository.findByStatus("ACTIVE").stream()
                .map(SpotMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TouristSpotDto getSpotById(Long id) {
        TouristSpot spot = spotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tourist spot not found with id: " + id));
        return SpotMapper.toDto(spot);
    }

    @Transactional(readOnly = true)
    public List<TouristSpotDto> searchSpots(String query) {
        return spotRepository.searchSpots(query).stream()
                .map(SpotMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TouristSpotDto> filterSpots(String category, String location, java.math.BigDecimal minPrice, java.math.BigDecimal maxPrice, java.math.BigDecimal minRating) {
        return spotRepository.findByStatus("ACTIVE").stream()
                .filter(s -> category == null || category.trim().isEmpty() || s.getCategory().equalsIgnoreCase(category.trim()))
                .filter(s -> location == null || location.trim().isEmpty() || s.getLocation().toLowerCase().contains(location.trim().toLowerCase()))
                .filter(s -> minPrice == null || s.getPrice().compareTo(minPrice) >= 0)
                .filter(s -> maxPrice == null || s.getPrice().compareTo(maxPrice) <= 0)
                .filter(s -> minRating == null || s.getRating().compareTo(minRating) >= 0)
                .map(SpotMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public TouristSpotDto createSpot(TouristSpotDto dto) {
        TouristSpot spot = SpotMapper.toEntity(dto);
        spot.setStatus("ACTIVE");
        spot.setRating(BigDecimal.valueOf(5.0));
        spot.setTotalReviews(0);
        TouristSpot saved = spotRepository.save(spot);
        return SpotMapper.toDto(saved);
    }

    @Transactional
    public TouristSpotDto updateSpot(Long id, TouristSpotDto dto) {
        TouristSpot existing = spotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tourist spot not found with id: " + id));
        
        existing.setTitle(dto.getTitle());
        existing.setLocation(dto.getLocation());
        existing.setCategory(dto.getCategory());
        existing.setDescription(dto.getDescription());
        existing.setPrice(dto.getPrice());
        existing.setDuration(dto.getDuration());
        existing.setImageUrl(dto.getImageUrl());
        existing.setWeather(dto.getWeather());
        existing.setFacilities(dto.getFacilities());
        
        TouristSpot updated = spotRepository.save(existing);
        return SpotMapper.toDto(updated);
    }

    @Transactional
    public void deleteSpot(Long id) {
        TouristSpot spot = spotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tourist spot not found with id: " + id));
        // Soft delete
        spot.setStatus("INACTIVE");
        spotRepository.save(spot);
    }

    @Transactional(readOnly = true)
    public List<TouristSpotDto> getAllSpotsAdmin() {
        return spotRepository.findAll().stream()
                .map(SpotMapper::toDto)
                .collect(Collectors.toList());
    }
}
