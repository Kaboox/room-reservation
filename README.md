Room Reservation - Full Stack Application

This is a complete full-stack web application that provides a system for managing and booking rooms. The project demonstrates a secure, decoupled architecture using a Java/Spring Boot backend API and a React.js frontend.

🚀 Key Features

Secure Authentication: Full user registration and login system implemented with Spring Security and JSON Web Tokens (JWT).

Role Management: Handles different user roles (e.g., ROLE_USER, ROLE_ADMIN) for authorization.

Room Management: Full CRUD (Create, Read, Update, Delete) functionality for managing rooms (for admins).

Reservation System: Functionality for authenticated users to create, view, and manage their reservations.

Automatic Data Seeding: The application automatically seeds the database on startup with test users and sample rooms to ensure it's runnable and testable immediately after setup.

💻 Tech Stack

Backend
Java
Spring Boot
Spring Security

Primary relational database.
PostgreSQL
Spring Data JPA

Frontend
React.js
(CSS/Tailwind)
🛠️ How to Run Locally

Prerequisites

Java Development Kit (JDK 17+ or 21+)

Node.js (LTS version) & npm

PostgreSQL server running locally (e.g., on port 5432)

1. Backend Setup (Spring Boot)

Clone the repository.

Create Database: Using pgAdmin or psql, create a new, empty database:

CREATE DATABASE room_reservation;


Configure: Open src/main/resources/application.properties and update the database credentials (username and password) to match your local PostgreSQL setup:

spring.datasource.url=jdbc:postgresql://localhost:5432/room_reservation
spring.datasource.username=postgres
spring.datasource.password=YOUR_POSTGRES_PASSWORD


Run: Start the application from your IDE (e.g., IntelliJ) by running the RoomReservationApplication.java main class.

The API will be available at http://localhost:8080.

2. Frontend Setup (React)

Navigate to the frontend directory (e.g., frontend/).

Install dependencies: npm install

Start the client: npm start (or npm run dev if you use Vite)

The React application will be available at http://localhost:5173 (lub na porcie, na którym go uruchamiasz).

🔑 Test Credentials

The application automatically seeds the database (DataInitializer.java) with the following test accounts upon startup:

User
Username - testuser
Password - password123

Admin 
Username - admin
Password - admin123
