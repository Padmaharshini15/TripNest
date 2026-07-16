package com.tripnest.controller;

import com.tripnest.dto.WishlistItemDto;
import com.tripnest.service.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping("/{spotId}")
    public ResponseEntity<WishlistItemDto> addToWishlist(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long spotId) {
        WishlistItemDto dto = wishlistService.addToWishlist(userDetails.getUsername(), spotId);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<WishlistItemDto>> getWishlist(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<WishlistItemDto> list = wishlistService.getWishlist(userDetails.getUsername());
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{spotId}")
    public ResponseEntity<Void> removeFromWishlist(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long spotId) {
        wishlistService.removeFromWishlist(userDetails.getUsername(), spotId);
        return ResponseEntity.noContent().build();
    }
}
