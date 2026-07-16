package com.tripnest.repository;

import com.tripnest.entity.Review;
import com.tripnest.entity.TouristSpot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findBySpot(TouristSpot spot);
    List<Review> findBySpotOrderByCreatedAtDesc(TouristSpot spot);
}
