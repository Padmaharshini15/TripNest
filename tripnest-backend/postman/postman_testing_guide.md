# TripNest Tourism Management System API - Postman Testing Guide

This comprehensive guide describes the HTTP API surface of the TripNest backend and provides detailed steps for verification testing using the provided Postman Collection.

---

## Postman Collection Variables Configuration

All requests in the Postman Collection are configured to use **Collection Variables** directly. This means you do not need to manage or import a separate environment.

| Variable Name | Default Value | Description |
| :--- | :--- | :--- |
| `jwtToken` | *(Empty string)* | Dynamically captured JWT bearer token of the active user session. |

---

## Testing Workflow: Obtaining & Using JWT Authentication Tokens

1. **Automatic Extraction**: The Postman Collection includes a **Test Script** on both the **2. Login User** and **3. Admin Login** requests. 
2. When you execute either login request, the script automatically parses the token from the response body and sets the `jwtToken` collection variable:
   ```javascript
   var jsonData = pm.response.json();
   if (jsonData.token) {
       pm.collectionVariables.set("jwtToken", jsonData.token);
       console.log("Saved jwtToken to collection variable: " + jsonData.token);
   }
   ```
3. **Authorization Header**: All secured requests are configured to use **Bearer Token** authorization with the token value `{{jwtToken}}`. You do not need to copy-paste tokens manually.

---

## API Testing Checklist

Use this checklist to verify that all components are working correctly:

- [x] Database schema is initialized matching `sample_data.sql`.
- [x] Regular user registration succeeds and login yields a token.
- [x] Admin login succeeds and yields a token.
- [x] User profile can be retrieved and updated successfully.
- [x] Password updates correctly (and old password invalidation is verified).
- [x] Tourist spot listing, ID query, search, and category/price filtering return valid JSON lists.
- [x] Admin spots CRUD functions (adds, updates, deletes).
- [x] Wishlist adding, fetching, and removing perform correctly.
- [x] Bookings creation triggers total price luxury tax calculation (+12%) and outputs receipts.
- [x] Reviews creation automatically triggers recalculation of Tourist Spot rating and review count.
- [x] Admin dashboard returns correct aggregated financial and registry statistics.

---

## Sample SQL Data for Testing

To pre-populate your MySQL database with mock data before running Postman tests, execute the queries found in [sample_data.sql](file:///c:/Users/Administrator/Downloads/TMS/tripnest-backend/sample_data.sql).

---

## API Documentation Reference (Ordered Testing Flow)

### 1. Register User
- **HTTP Method**: `POST`
- **Endpoint**: `http://localhost:8080/api/auth/register`
- **Headers**:
  - `Content-Type: application/json`
- **Authorization Required**: No
- **Sample Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "user@tripnest.com",
    "phone": "+1234567890",
    "password": "password"
  }
  ```
- **Sample Success Response** (HTTP 200 OK):
  ```text
  User registered successfully
  ```
- **Sample Error Response** (HTTP 400 Bad Request - Email Exists):
  ```json
  {
    "message": "Email Address already in use!"
  }
  ```
- **Validation Error Example** (Missing Name / Password Too Short):
  ```json
  {
    "name": "Name cannot be blank",
    "password": "Password must be at least 6 characters long"
  }
  ```

---

### 2. Login User
- **HTTP Method**: `POST`
- **Endpoint**: `http://localhost:8080/api/auth/login`
- **Headers**:
  - `Content-Type: application/json`
- **Authorization Required**: No
- **Sample Request Body**:
  ```json
  {
    "email": "user@tripnest.com",
    "password": "password"
  }
  ```
- **Sample Success Response** (HTTP 200 OK):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQHRyaXBuZXN0LmNvbSIsImlhdCI6MTc4Mzc... ",
    "email": "user@tripnest.com",
    "name": "John Doe",
    "role": "ROLE_USER"
  }
  ```
- **Sample Error Response** (HTTP 401 Unauthorized - Invalid Credentials):
  ```json
  {
    "message": "Bad credentials"
  }
  ```

---

### 3. Admin Login
- **HTTP Method**: `POST`
- **Endpoint**: `http://localhost:8080/api/auth/admin-login`
- **Headers**:
  - `Content-Type: application/json`
- **Authorization Required**: No
- **Sample Request Body**:
  ```json
  {
    "email": "admin@tripnest.com",
    "password": "password"
  }
  ```
- **Sample Success Response** (HTTP 200 OK):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkB0cmlwbmVzdC5jb20iLCJpYXQiOjE... ",
    "email": "admin@tripnest.com",
    "name": "Jane Admin",
    "role": "ROLE_ADMIN"
  }
  ```
- **Sample Error Response** (HTTP 400 Bad Request - Role Restriction):
  ```json
  {
    "message": "Unauthorized access to administrative logs"
  }
  ```

---

### 4. Get User Profile
- **HTTP Method**: `GET`
- **Endpoint**: `http://localhost:8080/api/users/profile`
- **Headers**:
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_USER` or `ROLE_ADMIN`)
- **Sample Success Response** (HTTP 200 OK):
  ```json
  {
    "id": 2,
    "name": "John Doe",
    "email": "user@tripnest.com",
    "phone": "+1234567890",
    "role": "ROLE_USER",
    "createdAt": "2026-07-11T16:20:00"
  }
  ```
- **Sample Error Response** (HTTP 401 Unauthorized - Missing Token):
  ```json
  {
    "message": "Full authentication is required to access this resource"
  }
  ```

---

### 5. Update User Profile
- **HTTP Method**: `PUT`
- **Endpoint**: `http://localhost:8080/api/users/profile`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_USER` or `ROLE_ADMIN`)
- **Sample Request Body**:
  ```json
  {
    "name": "John Updated",
    "phone": "+1999999999"
  }
  ```
- **Sample Success Response** (HTTP 200 OK):
  ```json
  {
    "id": 2,
    "name": "John Updated",
    "email": "user@tripnest.com",
    "phone": "+1999999999",
    "role": "ROLE_USER",
    "createdAt": "2026-07-11T16:20:00"
  }
  ```
- **Validation Error Example** (Missing fields):
  ```json
  {
    "phone": "Phone number cannot be blank"
  }
  ```

---

### 6. Change Password
- **HTTP Method**: `PUT`
- **Endpoint**: `http://localhost:8080/api/users/change-password`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_USER` or `ROLE_ADMIN`)
- **Sample Request Body**:
  ```json
  {
    "oldPassword": "password",
    "newPassword": "newpassword123"
  }
  ```
- **Sample Success Response** (HTTP 200 OK):
  ```text
  Password changed successfully
  ```
- **Sample Error Response** (HTTP 400 Bad Request - Password Mismatch):
  ```json
  {
    "message": "Current password does not match existing password"
  }
  ```

---

### 7. Get All Tourist Spots
- **HTTP Method**: `GET`
- **Endpoint**: `http://localhost:8080/api/spots/public`
- **Authorization Required**: No
- **Sample Success Response** (HTTP 200 OK):
  ```json
  [
    {
      "id": 1,
      "title": "Ooty Hills",
      "location": "Tamil Nadu, India",
      "category": "Hill Station",
      "description": "Beautiful hill station famous for tea gardens and lakes",
      "price": 5000.00,
      "duration": "3 Days / 2 Nights",
      "imageUrl": "ooty.jpg",
      "rating": 4.50,
      "totalReviews": 12,
      "weather": "Cool, 18°C",
      "facilities": "Hotel, Food, Transport"
    }
  ]
  ```

---

### 8. Get Tourist Spot By ID
- **HTTP Method**: `GET`
- **Endpoint**: `http://localhost:8080/api/spots/public/1`
- **Authorization Required**: No
- **Sample Success Response** (HTTP 200 OK):
  ```json
  {
    "id": 1,
    "title": "Ooty Hills",
    "location": "Tamil Nadu, India",
    "category": "Hill Station",
    "description": "Beautiful hill station famous for tea gardens and lakes",
    "price": 5000.00,
    "duration": "3 Days / 2 Nights",
    "imageUrl": "ooty.jpg",
    "rating": 4.50,
    "totalReviews": 12,
    "weather": "Cool, 18°C",
    "facilities": "Hotel, Food, Transport"
  }
  ```
- **Sample Error Response** (HTTP 404 Not Found):
  ```json
  {
    "message": "Tourist spot not found with id: 99"
  }
  ```

---

### 9. Search Tourist Spots
- **HTTP Method**: `GET`
- **Endpoint**: `http://localhost:8080/api/spots/public/search?query=Ooty`
- **Authorization Required**: No
- **Sample Success Response** (HTTP 200 OK):
  ```json
  [
    {
      "id": 1,
      "title": "Ooty Hills",
      "location": "Tamil Nadu, India",
      "category": "Hill Station",
      "price": 5000.00,
      "duration": "3 Days / 2 Nights"
    }
  ]
  ```

---

### 10. Filter Tourist Spots
- **HTTP Method**: `GET`
- **Endpoint**: `http://localhost:8080/api/spots/public/filter?category=Hill Station&minPrice=3000&maxPrice=6000&minRating=4`
- **Authorization Required**: No
- **Sample Success Response** (HTTP 200 OK):
  ```json
  [
    {
      "id": 1,
      "title": "Ooty Hills",
      "location": "Tamil Nadu, India",
      "category": "Hill Station",
      "price": 5000.00,
      "rating": 4.50
    }
  ]
  ```

---

### 11. Add Tourist Spot (Admin)
- **HTTP Method**: `POST`
- **Endpoint**: `http://localhost:8080/api/admin/spots`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_ADMIN`)
- **Sample Request Body**:
  ```json
  {
    "title": "Varkala Cliff Beach",
    "location": "Kerala, India",
    "category": "Beach",
    "description": "Beautiful red cliffs facing the Arabian Sea.",
    "price": 3500.00,
    "duration": "2 Days / 1 Night",
    "imageUrl": "varkala.jpg",
    "weather": "Sunny, 29°C",
    "facilities": "Cliff Resorts, Seafood, Paragliding"
  }
  ```
- **Sample Success Response** (HTTP 200 OK):
  ```json
  {
    "id": 6,
    "title": "Varkala Cliff Beach",
    "location": "Kerala, India",
    "category": "Beach",
    "description": "Beautiful red cliffs facing the Arabian Sea.",
    "price": 3500.00,
    "duration": "2 Days / 1 Night",
    "imageUrl": "varkala.jpg",
    "rating": 5.00,
    "totalReviews": 0,
    "weather": "Sunny, 29°C",
    "facilities": "Cliff Resorts, Seafood, Paragliding"
  }
  ```
- **Sample Error Response** (HTTP 403 Forbidden - Regular User Attempt):
  ```json
  {
    "message": "Access Denied"
  }
  ```

---

### 12. Update Tourist Spot (Admin)
- **HTTP Method**: `PUT`
- **Endpoint**: `http://localhost:8080/api/admin/spots/1`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_ADMIN`)
- **Sample Request Body**:
  ```json
  {
    "title": "Varkala Cliff Beach Updated",
    "location": "Kerala, India",
    "category": "Beach",
    "description": "Premium golden sands and active paragliding cliffs.",
    "price": 4000.00,
    "duration": "2 Days / 1 Night",
    "imageUrl": "varkala_updated.jpg",
    "weather": "Sunny, 28°C",
    "facilities": "Cliff Resorts, Seafood, Paragliding, Surfing"
  }
  ```
- **Sample Success Response** (HTTP 200 OK):
  ```json
  {
    "id": 1,
    "title": "Varkala Cliff Beach Updated",
    "price": 4000.00,
    "imageUrl": "varkala_updated.jpg"
  }
  ```

---

### 13. Delete Tourist Spot (Admin)
- **HTTP Method**: `DELETE`
- **Endpoint**: `http://localhost:8080/api/admin/spots/1`
- **Headers**:
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_ADMIN`)
- **Sample Success Response** (HTTP 204 No Content):
  *(Empty Response Body)*

---

### 14. Add to Wishlist
- **HTTP Method**: `POST`
- **Endpoint**: `http://localhost:8080/api/wishlist/3`
- **Headers**:
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_USER` or `ROLE_ADMIN`)
- **Sample Success Response** (HTTP 200 OK):
  ```json
  {
    "id": 3,
    "spotId": 3,
    "spotTitle": "Munnar Plantations",
    "price": 6000.00,
    "imageUrl": "munnar.jpg"
  }
  ```
- **Sample Error Response** (HTTP 400 Bad Request - Already Added):
  ```json
  {
    "message": "Tourist spot already exists in your wishlist"
  }
  ```

---

### 15. Get Wishlist
- **HTTP Method**: `GET`
- **Endpoint**: `http://localhost:8080/api/wishlist`
- **Headers**:
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_USER` or `ROLE_ADMIN`)
- **Sample Success Response** (HTTP 200 OK):
  ```json
  [
    {
      "id": 1,
      "spotId": 1,
      "spotTitle": "Ooty Hills",
      "price": 5000.00,
      "imageUrl": "ooty.jpg"
    }
  ]
  ```

---

### 16. Remove from Wishlist
- **HTTP Method**: `DELETE`
- **Endpoint**: `http://localhost:8080/api/wishlist/3`
- **Headers**:
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_USER` or `ROLE_ADMIN`)
- **Sample Success Response** (HTTP 204 No Content):
  *(Empty Response Body)*

---

### 17. Create Booking
- **HTTP Method**: `POST`
- **Endpoint**: `http://localhost:8080/api/bookings`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_USER` or `ROLE_ADMIN`)
- **Sample Request Body**:
  ```json
  {
    "spotId": 2,
    "travelDate": "2026-12-25",
    "travelers": 2
  }
  ```
- **Sample Success Response** (HTTP 200 OK):
  ```json
  {
    "id": 3,
    "bookingId": "TN-2026-F9A2",
    "spotId": 2,
    "spotTitle": "Kodaikanal Lake",
    "imageUrl": "kodaikanal.jpg",
    "travelDate": "2026-12-25",
    "travelers": 2,
    "totalPrice": 10080.00,
    "status": "PENDING"
  }
  ```
  > [!NOTE]
  > Total Price calculation: (Price of Spot: 4500 * 2 Travelers) = 9000. Luxury tax (+12%) = 1080. Final total = 10080.00.

---

### 18. Get My Bookings
- **HTTP Method**: `GET`
- **Endpoint**: `http://localhost:8080/api/bookings/my`
- **Headers**:
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_USER` or `ROLE_ADMIN`)
- **Sample Success Response** (HTTP 200 OK):
  ```json
  [
    {
      "id": 1,
      "bookingId": "TN-2026-X8Y2",
      "spotId": 1,
      "spotTitle": "Ooty Hills",
      "travelDate": "2026-08-15",
      "travelers": 2,
      "totalPrice": 11200.00,
      "status": "APPROVED"
    }
  ]
  ```

---

### 19. Cancel Booking
- **HTTP Method**: `DELETE`
- **Endpoint**: `http://localhost:8080/api/bookings/1`
- **Headers**:
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_USER` or `ROLE_ADMIN`)
- **Sample Success Response** (HTTP 200 OK):
  ```json
  {
    "id": 1,
    "bookingId": "TN-2026-X8Y2",
    "status": "CANCELLED"
  }
  ```

---

### 20. Get All Bookings (Admin)
- **HTTP Method**: `GET`
- **Endpoint**: `http://localhost:8080/api/bookings/admin/all`
- **Headers**:
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_ADMIN`)
- **Sample Success Response** (HTTP 200 OK):
  ```json
  [
    {
      "id": 1,
      "bookingId": "TN-2026-X8Y2",
      "spotTitle": "Ooty Hills",
      "totalPrice": 11200.00,
      "status": "APPROVED"
    }
  ]
  ```

---

### 21. Update Booking Status (Admin)
- **HTTP Method**: `PUT`
- **Endpoint**: `http://localhost:8080/api/bookings/admin/1/status?status=APPROVED`
- **Headers**:
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_ADMIN`)
- **Sample Success Response** (HTTP 200 OK):
  ```json
  {
    "id": 1,
    "bookingId": "TN-2026-X8Y2",
    "status": "APPROVED"
  }
  ```
- **Sample Error Response** (HTTP 400 Bad Request - Invalid Status):
  ```json
  {
    "message": "Invalid status update code matching parameters"
  }
  ```

---

### 22. Add Review
- **HTTP Method**: `POST`
- **Endpoint**: `http://localhost:8080/api/reviews`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_USER` or `ROLE_ADMIN`)
- **Sample Request Body**:
  ```json
  {
    "spotId": 2,
    "rating": 5,
    "comment": "Absolutely breathtaking! The views are unmatched."
  }
  ```
- **Sample Success Response** (HTTP 200 OK):
  ```json
  {
    "id": 5,
    "spotId": 2,
    "userName": "John Doe",
    "rating": 5,
    "comment": "Absolutely breathtaking! The views are unmatched.",
    "createdAt": "2026-07-11T16:21:55"
  }
  ```

---

### 23. Get Reviews
- **HTTP Method**: `GET`
- **Endpoint**: `http://localhost:8080/api/reviews/2`
- **Authorization Required**: No
- **Sample Success Response** (HTTP 200 OK):
  ```json
  [
    {
      "id": 5,
      "spotId": 2,
      "userName": "John Doe",
      "rating": 5,
      "comment": "Absolutely breathtaking! The views are unmatched.",
      "createdAt": "2026-07-11T16:21:55"
    }
  ]
  ```

---

### 24. Admin Dashboard Analytics
- **HTTP Method**: `GET`
- **Endpoint**: `http://localhost:8080/api/admin/dashboard`
- **Headers**:
  - `Authorization: Bearer {{jwtToken}}`
- **Authorization Required**: Yes (`ROLE_ADMIN`)
- **Sample Success Response** (HTTP 200 OK):
  ```json
  {
    "totalUsers": 2,
    "totalBookings": 2,
    "totalSpots": 5,
    "totalRevenue": 11200.00,
    "pendingBookings": 1,
    "approvedBookings": 1,
    "completedBookings": 0,
    "cancelledBookings": 0
  }
  ```
