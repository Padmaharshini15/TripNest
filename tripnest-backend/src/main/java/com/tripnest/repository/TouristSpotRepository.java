package com.tripnest.repository;

import com.tripnest.entity.TouristSpot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TouristSpotRepository extends JpaRepository<TouristSpot, Long> {
    List<TouristSpot> findByStatus(String status);
    List<TouristSpot> findByCategoryAndStatus(String category, String status);
    
    @Query("SELECT s FROM TouristSpot s WHERE s.status = 'ACTIVE' AND " +
           "(LOWER(s.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.location) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<TouristSpot> searchSpots(@Param("query") String query);
}
