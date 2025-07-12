package kacpercream.room_reservation.controller;

import kacpercream.room_reservation.ReservationDto;
import kacpercream.room_reservation.model.Reservation;
import kacpercream.room_reservation.model.Room;
import kacpercream.room_reservation.repository.ReservationRepository;
import kacpercream.room_reservation.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
        // time check
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

        reservationRepository.save(reservation);
        return ResponseEntity.ok("Rezerwacja zapisana pomyślnie");
    }
}
