-- TripNest Travel Platform Sample Data Script
USE tripnest;

-- Clean previous tables in order
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE reviews;
TRUNCATE TABLE wishlists;
TRUNCATE TABLE bookings;
TRUNCATE TABLE tourist_spots;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Users (Password is 'password' for all, BCrypt hashed)
-- Admin User: admin@tripnest.com
-- Regular User: user@tripnest.com
INSERT INTO users (id, name, email, phone, password, role, created_at, updated_at) VALUES
(1, 'Jane Admin', 'admin@tripnest.com', '+1234567890', '$2a$10$/.aDGbXIVPvRTAYp9A3UsO3TcLX4FXo6S5gNlbzj3UUrsM/TNJSkW', 'ROLE_ADMIN', NOW(), NOW()),
(2, 'John User', 'user@tripnest.com', '+1987654321', '$2a$10$/.aDGbXIVPvRTAYp9A3UsO3TcLX4FXo6S5gNlbzj3UUrsM/TNJSkW', 'ROLE_USER', NOW(), NOW());

-- 2. Insert Tourist Spots
INSERT INTO tourist_spots (id, title, location, category, description, price, duration, image_url, rating, total_reviews, weather, facilities, status) VALUES
(1, 'Ooty Hills', 'Tamil Nadu, India', 'Hill Station', 'Beautiful hill station famous for tea gardens and lakes', 5000.00, '3 Days / 2 Nights', 'ooty.jpg', 4.50, 2, 'Cool, 18°C', 'Hotel, Food, Transport', 'ACTIVE'),
(2, 'Kodaikanal Lake', 'Tamil Nadu, India', 'Hill Station', 'Popular hill station known for its scenic beauty and lake', 4500.00, '2 Days / 1 Night', 'kodaikanal.jpg', 4.00, 1, 'Cold, 14°C', 'Hotel, Boating, Food', 'ACTIVE'),
(3, 'Munnar Plantations', 'Kerala, India', 'Nature', 'Famous for green tea plantations and misty mountains', 6000.00, '4 Days / 3 Nights', 'munnar.jpg', 5.00, 1, 'Pleasant, 20°C', 'Resort, Guide, Transport', 'ACTIVE'),
(4, 'Goa Beach Resort', 'Goa, India', 'Beach', 'Famous beach destination for tourists with water activities', 8000.00, '3 Days / 2 Nights', 'goa.jpg', 4.70, 0, 'Sunny, 28°C', 'Hotel, Water Sports, Food', 'ACTIVE'),
(5, 'Taj Mahal', 'Agra, India', 'Historical', 'World famous historical monument of love', 3000.00, '1 Day', 'tajmahal.jpg', 4.80, 0, 'Hot, 32°C', 'Guide, Parking, Food', 'ACTIVE'),
(6, 'Alleppey Backwaters', 'Kerala, India', 'Nature', 'Experience the serene backwaters, traditional houseboats, lush coconut groves, and breathtaking sunsets of Alleppey.', 7500.00, '3 Days / 2 Nights', 'alleppey.jpg', 4.90, 0, 'Pleasant, 27°C', 'Houseboat, Hotel, Food, Transport', 'ACTIVE'),
(7, 'Mysore Palace', 'Karnataka, India', 'Historical', 'Visit the magnificent Mysore Palace, one of India''s most iconic royal heritage sites showcasing Indo-Saracenic architecture.', 4500.00, '2 Days / 1 Night', 'mysorepalace.jpg', 4.80, 0, 'Warm, 29°C', 'Guide, Parking, Food', 'ACTIVE');

-- 3. Insert Wishlist Items
INSERT INTO wishlists (id, user_id, spot_id, created_at) VALUES
(1, 2, 1, NOW()), -- John User has Ooty Hills in wishlist
(2, 2, 3, NOW()); -- John User has Munnar Plantations in wishlist

-- 4. Insert Bookings
INSERT INTO bookings (id, booking_id, user_id, spot_id, travel_date, travelers, total_price, status) VALUES
(1, 'TN-2026-X8Y2', 2, 1, '2026-08-15', 2, 11200.00, 'APPROVED'), -- Base: 10000 + 12% tax = 11200
(2, 'TN-2026-B3K8', 2, 2, '2026-09-10', 1, 5040.00, 'PENDING');  -- Base: 4500 + 12% tax = 5040

-- 5. Insert Reviews
INSERT INTO reviews (id, user_id, spot_id, rating, comment, created_at) VALUES
(1, 2, 1, 5, 'Amazing tea gardens and perfect cool weather!', NOW()),
(2, 2, 1, 4, 'Very scenic place, booking was smooth.', NOW()),
(3, 2, 2, 4, 'Wonderful boating experience near the lake.', NOW()),
(4, 2, 3, 5, 'Lush green valleys, must visit once in a lifetime.', NOW());
