package kacpercream.room_reservation.repository;

import kacpercream.room_reservation.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
