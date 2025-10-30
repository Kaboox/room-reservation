package kacpercream.room_reservation.controller;

import jakarta.validation.Valid;
import kacpercream.room_reservation.ReservationDto;
import kacpercream.room_reservation.model.Reservation;
import kacpercream.room_reservation.model.Room;
import kacpercream.room_reservation.repository.ReservationRepository;
import kacpercream.room_reservation.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    RoomRepository roomRepository;

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody @Valid ReservationDto dto, BindingResult result) {
        if (result.hasErrors()) {
            String errorMsg = result.getFieldErrors().stream()
                    .map(e -> e.getField() + ": " + e.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(errorMsg);
        }

        Optional<Room> optionalRoom = roomRepository.findById(dto.getRoomId());
        if (optionalRoom.isEmpty()) {
            return ResponseEntity.badRequest().body("Room with ID " + dto.getRoomId() + " doesn't exist");
        }

        Room room = optionalRoom.get();


        if(dto.getEndDate().isBefore(dto.getStartDate())) {
            return ResponseEntity.badRequest().body("End date must be after Start date");
        }

        // check if the room is available - collision
        List<Reservation> reservations = reservationRepository.findByRoom_Id(room.getId());
        for (Reservation existing : reservations) {
            if (!(dto.getEndDate().isBefore(existing.getStartDate())) &&
                    !(dto.getStartDate().isAfter(existing.getEndDate()))) {
                return ResponseEntity.badRequest().body(
                        "Room is already reserved in this date: " +
                                existing.getStartDate() + " - " + existing.getEndDate());
            }
        }

        Reservation reservation = new Reservation();
        reservation.setRoom(room);
        reservation.setStartDate(dto.getStartDate());
        reservation.setEndDate(dto.getEndDate());
        reservation.setClientName(dto.getClientName());
        
        Reservation saved = reservationRepository.save(reservation);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Long id, Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Not authorized");
        }

        if (!reservationRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        reservationRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
