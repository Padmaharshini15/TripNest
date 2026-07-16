package com.tripnest.service;

import com.tripnest.dto.DashboardAnalyticsDto;
import com.tripnest.dto.UserProfileDto;
import com.tripnest.entity.Booking;
import com.tripnest.repository.BookingRepository;
import com.tripnest.repository.TouristSpotRepository;
import com.tripnest.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AnalyticsService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final TouristSpotRepository spotRepository;

    public AnalyticsService(UserRepository userRepository, BookingRepository bookingRepository, TouristSpotRepository spotRepository) {
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.spotRepository = spotRepository;
    }

    @Transactional(readOnly = true)
    public DashboardAnalyticsDto getDashboardAnalytics() {
        long totalUsers = userRepository.count();
        long totalSpots = spotRepository.count();
        List<Booking> bookings = bookingRepository.findAll();

        long totalBookings = bookings.size();
        long pending = 0;
        long approved = 0;
        long completed = 0;
        long cancelled = 0;
        BigDecimal totalRevenue = BigDecimal.ZERO;

        for (Booking booking : bookings) {
            String status = booking.getStatus();
            if ("PENDING".equalsIgnoreCase(status)) {
                pending++;
            } else if ("APPROVED".equalsIgnoreCase(status)) {
                approved++;
                totalRevenue = totalRevenue.add(booking.getTotalPrice());
            } else if ("COMPLETED".equalsIgnoreCase(status)) {
                completed++;
                totalRevenue = totalRevenue.add(booking.getTotalPrice());
            } else if ("CANCELLED".equalsIgnoreCase(status)) {
                cancelled++;
            }
        }

        return DashboardAnalyticsDto.builder()
                .totalUsers(totalUsers)
                .totalBookings(totalBookings)
                .totalSpots(totalSpots)
                .totalRevenue(totalRevenue)
                .pendingBookings(pending)
                .approvedBookings(approved)
                .completedBookings(completed)
                .cancelledBookings(cancelled)
                .build();
    }

    @Transactional(readOnly = true)
    public List<UserProfileDto> getAllUsers() {
        List<com.tripnest.entity.User> users = userRepository.findAll();
        users.sort((u1, u2) -> u2.getId().compareTo(u1.getId()));
        
        List<UserProfileDto> dtos = new java.util.ArrayList<>();
        for (com.tripnest.entity.User user : users) {
            dtos.add(UserProfileDto.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .email(user.getEmail())
                    .phone(user.getPhone())
                    .role(user.getRole())
                    .createdAt(user.getCreatedAt())
                    .build());
        }
        return dtos;
    }
}
