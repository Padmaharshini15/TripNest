package com.tripnest.service;

import com.tripnest.dto.WishlistItemDto;
import com.tripnest.entity.TouristSpot;
import com.tripnest.entity.User;
import com.tripnest.entity.WishlistItem;
import com.tripnest.exception.BadRequestException;
import com.tripnest.exception.ResourceNotFoundException;
import com.tripnest.repository.TouristSpotRepository;
import com.tripnest.repository.UserRepository;
import com.tripnest.repository.WishlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final TouristSpotRepository spotRepository;

    public WishlistService(WishlistRepository wishlistRepository, UserRepository userRepository, TouristSpotRepository spotRepository) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.spotRepository = spotRepository;
    }

    @Transactional
    public WishlistItemDto addToWishlist(String email, Long spotId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User session not found"));
        
        TouristSpot spot = spotRepository.findById(spotId)
                .orElseThrow(() -> new ResourceNotFoundException("Tourist spot not found with id: " + spotId));

        if (wishlistRepository.existsByUserAndSpot(user, spot)) {
            throw new BadRequestException("Tourist spot already exists in your wishlist");
        }

        WishlistItem item = WishlistItem.builder()
                .user(user)
                .spot(spot)
                .build();

        WishlistItem saved = wishlistRepository.save(item);
        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public List<WishlistItemDto> getWishlist(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User session not found"));

        return wishlistRepository.findByUser(user).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void removeFromWishlist(String email, Long spotId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User session not found"));

        TouristSpot spot = spotRepository.findById(spotId)
                .orElseThrow(() -> new ResourceNotFoundException("Tourist spot not found with id: " + spotId));

        WishlistItem item = wishlistRepository.findByUserAndSpot(user, spot)
                .orElseThrow(() -> new ResourceNotFoundException("Wishlist item not found for spot: " + spotId));

        wishlistRepository.delete(item);
    }

    private WishlistItemDto mapToDto(WishlistItem item) {
        return WishlistItemDto.builder()
                .id(item.getId())
                .spotId(item.getSpot().getId())
                .spotTitle(item.getSpot().getTitle())
                .price(item.getSpot().getPrice())
                .imageUrl(item.getSpot().getImageUrl())
                .build();
    }
}
