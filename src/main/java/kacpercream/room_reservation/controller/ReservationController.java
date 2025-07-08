package kacpercream.room_reservation.controller;

import kacpercream.room_reservation.model.Reservation;
import kacpercream.room_reservation.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        // time check
        return reservationRepository.save(reservation);
    }
}
