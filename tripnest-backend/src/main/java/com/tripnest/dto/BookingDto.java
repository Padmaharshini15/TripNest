package com.tripnest.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class BookingDto {
    private Long id;
    private String bookingId;
    private Long spotId;
    private String spotTitle;
    private String imageUrl;
    private LocalDate travelDate;
    private Integer travelers;
    private BigDecimal totalPrice;
    private String status;
}
