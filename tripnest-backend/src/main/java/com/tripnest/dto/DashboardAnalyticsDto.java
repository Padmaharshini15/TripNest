package com.tripnest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardAnalyticsDto {
    private Long totalUsers;
    private Long totalBookings;
    private Long totalSpots;
    private BigDecimal totalRevenue;
    private Long pendingBookings;
    private Long approvedBookings;
    private Long completedBookings;
    private Long cancelledBookings;
}
