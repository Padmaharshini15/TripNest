package com.tripnest.controller;

import com.tripnest.dto.ReviewDto;
import com.tripnest.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ReviewDto> addReview(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody ReviewDto dto) {
        ReviewDto saved = reviewService.addReview(userDetails.getUsername(), dto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{spotId}")
    public ResponseEntity<List<ReviewDto>> getReviews(@PathVariable Long spotId) {
        List<ReviewDto> list = reviewService.getReviewsBySpot(spotId);
        return ResponseEntity.ok(list);
    }
}
