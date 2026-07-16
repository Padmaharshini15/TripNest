package com.tripnest.service;

import com.tripnest.dto.BookingDto;
import com.tripnest.entity.Booking;
import com.tripnest.entity.TouristSpot;
import com.tripnest.entity.User;
import com.tripnest.exception.BadRequestException;
import com.tripnest.exception.ResourceNotFoundException;
import com.tripnest.repository.BookingRepository;
import com.tripnest.repository.TouristSpotRepository;
import com.tripnest.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final TouristSpotRepository spotRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, TouristSpotRepository spotRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.spotRepository = spotRepository;
    }

    @Transactional
    public BookingDto createBooking(String email, BookingDto dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User session not found"));
        
        TouristSpot spot = spotRepository.findById(dto.getSpotId())
                .orElseThrow(() -> new ResourceNotFoundException("Destination spot not found"));
        
        if (dto.getTravelers() <= 0) {
            throw new BadRequestException("Travelers size must be greater than zero");
        }

        // Calculate dynamic pricing total (Unit * travelers + 12% luxury tax)
        BigDecimal base = spot.getPrice().multiply(BigDecimal.valueOf(dto.getTravelers()));
        BigDecimal tax = base.multiply(BigDecimal.valueOf(0.12));
        BigDecimal finalTotal = base.add(tax);

        // Generate unique receipt code
        String bookingId = "TN-2026-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();

        Booking booking = Booking.builder()
                .bookingId(bookingId)
                .user(user)
                .spot(spot)
                .travelDate(dto.getTravelDate())
                .travelers(dto.getTravelers())
                .totalPrice(finalTotal)
                .status("PENDING")
                .build();

        Booking saved = bookingRepository.save(booking);
        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public List<BookingDto> getGuestBookings(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        return bookingRepository.findByUserOrderByTravelDateDesc(user).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public BookingDto cancelBooking(String email, Long id) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking registration not found"));
        
        if (!booking.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Unauthorized access to delete this booking ticket");
        }

        if (!booking.getStatus().equals("PENDING") && !booking.getStatus().equals("APPROVED")) {
            throw new BadRequestException("Completed or cancelled tickets cannot be altered");
        }

        booking.setStatus("CANCELLED");
        Booking saved = bookingRepository.save(booking);
        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public List<BookingDto> getAllBookingsAdmin() {
        return bookingRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public BookingDto updateBookingStatusAdmin(Long id, String status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking node not found"));
        
        if (!List.of("APPROVED", "CANCELLED", "COMPLETED", "PENDING").contains(status)) {
            throw new BadRequestException("Invalid status update code matching parameters");
        }
        
        booking.setStatus(status);
        Booking saved = bookingRepository.save(booking);
        return mapToDto(saved);
    }

    private BookingDto mapToDto(Booking entity) {
        BookingDto dto = new BookingDto();
        dto.setId(entity.getId());
        dto.setBookingId(entity.getBookingId());
        dto.setSpotId(entity.getSpot().getId());
        dto.setSpotTitle(entity.getSpot().getTitle());
        dto.setImageUrl(entity.getSpot().getImageUrl());
        dto.setTravelDate(entity.getTravelDate());
        dto.setTravelers(entity.getTravelers());
        dto.setTotalPrice(entity.getTotalPrice());
        dto.setStatus(entity.getStatus());
        return dto;
    }
}
