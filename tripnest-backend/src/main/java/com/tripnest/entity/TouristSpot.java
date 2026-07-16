package com.tripnest.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "tourist_spots")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TouristSpot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 150)
    private String location;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false, length = 50)
    private String duration;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(precision = 3, scale = 2)
    private BigDecimal rating;

    @Column(name = "total_reviews")
    private Integer totalReviews;

    @Column(nullable = false, length = 100)
    private String weather;

    @Column(nullable = false, length = 255)
    private String facilities; // comma-separated strings

    @Column(nullable = false, length = 20)
    private String status; // 'ACTIVE', 'INACTIVE'

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (rating == null) rating = BigDecimal.ZERO;
        if (totalReviews == null) totalReviews = 0;
        if (status == null) status = "ACTIVE";
    }
}
