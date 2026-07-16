package com.tripnest.service;

import com.tripnest.dto.ReviewDto;
import com.tripnest.entity.Review;
import com.tripnest.entity.TouristSpot;
import com.tripnest.entity.User;
import com.tripnest.exception.ResourceNotFoundException;
import com.tripnest.repository.ReviewRepository;
import com.tripnest.repository.TouristSpotRepository;
import com.tripnest.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final TouristSpotRepository spotRepository;
    private final UserRepository userRepository;

    public ReviewService(ReviewRepository reviewRepository, TouristSpotRepository spotRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.spotRepository = spotRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ReviewDto addReview(String email, ReviewDto dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User session not found"));

        TouristSpot spot = spotRepository.findById(dto.getSpotId())
                .orElseThrow(() -> new ResourceNotFoundException("Tourist spot not found with id: " + dto.getSpotId()));

        Review review = Review.builder()
                .user(user)
                .spot(spot)
                .rating(dto.getRating())
                .comment(dto.getComment())
                .build();

        Review saved = reviewRepository.save(review);

        // Recalculate TouristSpot statistics
        List<Review> reviews = reviewRepository.findBySpot(spot);
        int total = reviews.size();
        double sum = reviews.stream().mapToInt(Review::getRating).sum();
        double avg = total > 0 ? sum / total : 0.0;

        spot.setTotalReviews(total);
        spot.setRating(BigDecimal.valueOf(avg).setScale(2, RoundingMode.HALF_UP));
        spotRepository.save(spot);

        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public List<ReviewDto> getReviewsBySpot(Long spotId) {
        TouristSpot spot = spotRepository.findById(spotId)
                .orElseThrow(() -> new ResourceNotFoundException("Tourist spot not found with id: " + spotId));

        return reviewRepository.findBySpotOrderByCreatedAtDesc(spot).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private ReviewDto mapToDto(Review review) {
        return ReviewDto.builder()
                .id(review.getId())
                .spotId(review.getSpot().getId())
                .userName(review.getUser().getName())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
