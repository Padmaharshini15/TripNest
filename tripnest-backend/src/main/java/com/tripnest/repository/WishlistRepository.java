package com.tripnest.repository;

import com.tripnest.entity.TouristSpot;
import com.tripnest.entity.User;
import com.tripnest.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {
    List<WishlistItem> findByUser(User user);
    Optional<WishlistItem> findByUserAndSpot(User user, TouristSpot spot);
    boolean existsByUserAndSpot(User user, TouristSpot spot);
}
