package kacpercream.room_reservation.controller;

import kacpercream.room_reservation.ReservationDto;
import kacpercream.room_reservation.model.Reservation;
import kacpercream.room_reservation.model.Room;
import kacpercream.room_reservation.repository.ReservationRepository;
import kacpercream.room_reservation.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private RoomRepository roomRepository;

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationDto dto) {
        Optional<Room> optionalRoom = roomRepository.findById(dto.getRoomId());
        if (optionalRoom.isEmpty()) {
            return ResponseEntity.badRequest().body("Pokój o ID " + dto.getRoomId() + " nie istnieje");
        }

        Room room = optionalRoom.get();

        Reservation reservation = new Reservation();
        reservation.setRoom(room);
        reservation.setStartDate(dto.getStartDate());
        reservation.setEndDate(dto.getEndDate());
        reservation.setClientName(dto.getClientName());

        if(dto.getEndDate().isBefore(dto.getStartDate())) {
            return ResponseEntity.badRequest().body("Data zakończenia musi być po dacie rozpoczęcia");
        }

        // check if the room is available - collision
        List<Reservation> reservations = reservationRepository.findByRoom_Id(reservation.getRoom().getId());
        for (Reservation reservation_in_database: reservations) {
            // check availability
            if (!(reservation.getEndDate().isBefore(reservation_in_database.getStartDate())) && !(reservation.getStartDate().isAfter(reservation_in_database.getEndDate()))) {
                return ResponseEntity.badRequest().body("Pokój jest już zarezerwowany w tym terminie: " +
                        reservation_in_database.getStartDate() + " - " + reservation_in_database.getEndDate());

            }
        }
        
        Reservation saved = reservationRepository.save(reservation);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Long id, Authentication authentication) {
        // Sprawdź, czy użytkownik ma rolę ADMIN
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Brak uprawnień do usuwania");
        }

        if (!reservationRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        reservationRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
