package com.tripnest.controller;

import com.tripnest.dto.BookingDto;
import com.tripnest.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<BookingDto> createBooking(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody BookingDto dto) {

        System.out.println("========== BOOKING API HIT ==========");
        System.out.println("User : " + userDetails.getUsername());
        System.out.println("Booking Data : " + dto);

        return ResponseEntity.ok(
                bookingService.createBooking(userDetails.getUsername(), dto)
        );
    }


    @GetMapping("/my")
    public ResponseEntity<List<BookingDto>> getMyBookings(
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                bookingService.getGuestBookings(userDetails.getUsername())
        );
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<BookingDto> cancelBooking(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {

        return ResponseEntity.ok(
                bookingService.cancelBooking(userDetails.getUsername(), id)
        );
    }


    // -------- ADMIN ENDPOINTS --------

    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingDto>> getAllBookingsAdmin() {

        return ResponseEntity.ok(
                bookingService.getAllBookingsAdmin()
        );
    }


    @PutMapping("/admin/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookingDto> updateBookingStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return ResponseEntity.ok(
                bookingService.updateBookingStatusAdmin(id, status)
        );
    }
}