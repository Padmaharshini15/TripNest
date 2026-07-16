package com.tripnest.mapper;

import com.tripnest.dto.TouristSpotDto;
import com.tripnest.entity.TouristSpot;

public class SpotMapper {

    public static TouristSpotDto toDto(TouristSpot entity) {
        if (entity == null) return null;
        
        TouristSpotDto dto = new TouristSpotDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setLocation(entity.getLocation());
        dto.setCategory(entity.getCategory());
        dto.setDescription(entity.getDescription());
        dto.setPrice(entity.getPrice());
        dto.setDuration(entity.getDuration());
        dto.setImageUrl(entity.getImageUrl());
        dto.setRating(entity.getRating());
        dto.setTotalReviews(entity.getTotalReviews());
        dto.setWeather(entity.getWeather());
        dto.setFacilities(entity.getFacilities());
        return dto;
    }

    public static TouristSpot toEntity(TouristSpotDto dto) {
        if (dto == null) return null;
        
        TouristSpot entity = new TouristSpot();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setLocation(dto.getLocation());
        entity.setCategory(dto.getCategory());
        entity.setDescription(dto.getDescription());
        entity.setPrice(dto.getPrice());
        entity.setDuration(dto.getDuration());
        entity.setImageUrl(dto.getImageUrl());
        entity.setRating(dto.getRating());
        entity.setTotalReviews(dto.getTotalReviews());
        entity.setWeather(dto.getWeather());
        entity.setFacilities(dto.getFacilities());
        return entity;
    }
}
