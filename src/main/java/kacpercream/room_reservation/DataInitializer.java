package kacpercream.room_reservation;

import kacpercream.room_reservation.model.Reservation;
import kacpercream.room_reservation.model.Room;
import kacpercream.room_reservation.model.User;
import kacpercream.room_reservation.repository.ReservationRepository;
import kacpercream.room_reservation.repository.RoomRepository;
import kacpercream.room_reservation.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Optional;

@Configuration
public class DataInitializer {


    @Bean
    public CommandLineRunner initDatabase(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            RoomRepository roomRepository,
            ReservationRepository reservationRepository
    ) {


        return args -> {

            // --- USERS SEED  ---
            Optional<User> existingUser = userRepository.findByUsername("testuser");
            if (existingUser.isEmpty()) {
                User testUser = new User();
                testUser.setUsername("testuser");
                testUser.setPassword(passwordEncoder.encode("password123"));
                testUser.setRole("ROLE_USER");
                userRepository.save(testUser);
                System.out.println("Created test user: 'testuser' (password123)");
            }
            Optional<User> existingAdmin = userRepository.findByUsername("admin");
            if (existingAdmin.isEmpty()) {
                User adminUser = new User();
                adminUser.setUsername("admin");
                adminUser.setPassword(passwordEncoder.encode("admin123"));
                adminUser.setRole("ROLE_ADMIN");
                userRepository.save(adminUser);
                System.out.println("Created admin user");
            }

            // --- ROOM SEED ---

            if (roomRepository.count() == 0) {

                Room roomA = new Room();
                roomA.setName("Sala Konferencyjna 'Słoneczna'");
                roomA.setCapacity(12);
                roomRepository.save(roomA);


                Room roomB = new Room();
                roomB.setName("Mała Sala 'Cicha'");
                roomB.setCapacity(4);
                roomRepository.save(roomB);

                System.out.println("Created rooms");

                // --- RESERVATION SEED  ---

                if (reservationRepository.count() == 0) {
                    Reservation res1 = new Reservation();
                    res1.setClientName("Jan Kowalski (Test)");
                    res1.setStartDate(LocalDate.now().plusDays(2));
                    res1.setEndDate(LocalDate.now().plusDays(4));
                    res1.setRoom(roomA);

                    reservationRepository.save(res1);
                    System.out.println("Created reservation");
                }
            }
        };
    }
}
