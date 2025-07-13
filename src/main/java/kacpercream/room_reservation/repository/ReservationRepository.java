package kacpercream.room_reservation.repository;

import kacpercream.room_reservation.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByRoom_Id(Long roomId);

}
