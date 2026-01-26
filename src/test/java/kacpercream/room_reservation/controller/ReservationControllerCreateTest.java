package kacpercream.room_reservation.controller;

import kacpercream.room_reservation.ReservationDto;
import kacpercream.room_reservation.model.Reservation;
import kacpercream.room_reservation.model.Room;
import kacpercream.room_reservation.repository.ReservationRepository;
import kacpercream.room_reservation.repository.RoomRepository;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ReservationControllerCreateTest {

    private final ReservationRepository reservationRepository = mock(ReservationRepository.class);
    private final RoomRepository roomRepository = mock(RoomRepository.class);
    private final ReservationController controller = new ReservationController();

    public ReservationControllerCreateTest() {
        controller.roomRepository = roomRepository;
        controller.reservationRepository = reservationRepository;
    }

    @Test
    public void testCreateReservation_success() {
        ReservationDto dto = new ReservationDto();
        dto.setClientName("Janek Kowalski");
        dto.setStartDate(LocalDate.now().plusDays(1));
        dto.setEndDate(LocalDate.now().plusDays(2));
        dto.setRoomId(1L);

        Room room = new Room();
        room.setId(1L);
        room.setName("Sala Testowa");
        room.setCapacity(2);

        when(roomRepository.findById(1L)).thenReturn(Optional.of(room));
        when(reservationRepository.findByRoom_Id(1L)).thenReturn(Collections.emptyList());

        Reservation saved = new Reservation();
        saved.setClientName("Janek Kowalski");
        when(reservationRepository.save(any())).thenReturn(saved);

        BindingResult bindingResult = mock(BindingResult.class);
        when(bindingResult.hasErrors()).thenReturn(false);

        ResponseEntity<?> response = controller.createReservation(dto, bindingResult);

        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof Reservation);
        verify(reservationRepository, times(1)).save(any());
    }
}
