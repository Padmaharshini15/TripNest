# TripNest Backend

## Overview

TripNest Backend is a RESTful API built using Spring Boot for the TripNest Tourism Management System. It provides secure authentication, tourist spot management, booking management, wishlist functionality, reviews, and admin dashboard analytics.

---

## Tech Stack

- Java 17
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- Postman

---

## Features

- User Registration & Login
- Admin Login
- JWT Authentication
- Role-Based Authorization (User/Admin)
- Tourist Spot Management
- Wishlist Management
- Booking Management
- Reviews & Ratings
- Admin Dashboard Analytics
- RESTful APIs

---

## Project Structure

```
src/
 ├── main/
 │   ├── java/
 │   └── resources/
 └── test/
```

---

## Database

Import the SQL script located in:

```
database/sample_data.sql
```

Update the database credentials in:

```
src/main/resources/application.properties
```

---

## Running the Application

Clone the repository and navigate to the backend folder.

```bash
mvn clean install
```

Run the application:

```bash
mvn spring-boot:run
```

The backend runs at:

```
http://localhost:8080
```

---

## API Testing

Postman files are available in:

```
postman/
```

Import:

- tripnest.postman_collection.json
- tripnest_environment.json

Follow:

```
postman/postman_testing_guide.md
```

---

## Security

- Spring Security
- JWT Authentication
- BCrypt Password Encryption
- Role-Based Access Control

---

