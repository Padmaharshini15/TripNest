package com.tripnest.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class TouristSpotDto {
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 150)
    private String title;

    @NotBlank(message = "Location is required")
    @Size(max = 150)
    private String location;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    @NotBlank(message = "Duration description is required")
    private String duration;

    @NotBlank(message = "Image URL is required")
    @Size(max = 500)
    private String imageUrl;

    private BigDecimal rating;
    private Integer totalReviews;

    @NotBlank(message = "Weather details are required")
    private String weather;

    @NotBlank(message = "Facilities list is required")
    private String facilities;
}
