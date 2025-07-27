package kacpercream.room_reservation.controller;

import kacpercream.room_reservation.ReservationDto;
import kacpercream.room_reservation.model.Reservation;
import kacpercream.room_reservation.model.Room;
import kacpercream.room_reservation.repository.ReservationRepository;
import kacpercream.room_reservation.repository.RoomRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ReservationControllerTest {



    private final ReservationRepository reservationRepository = mock(ReservationRepository.class);
    private final RoomRepository roomRepository = mock(RoomRepository.class);
    private final ReservationController controller = new ReservationController();

    public ReservationControllerTest() {
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
        room.setName("Test Room");
        room.setCapacity(2);

        when(roomRepository.findById(1L)).thenReturn(Optional.of(room));
        when(reservationRepository.findByRoom_Id(1L)).thenReturn(Collections.emptyList());

        Reservation saved = new Reservation();
        saved.setClientName("Jan Kowalski");
        when(reservationRepository.save(any())).thenReturn(saved);

        BindingResult bindingResult = mock(BindingResult.class);
        when(bindingResult.hasErrors()).thenReturn(false); // zakładamy brak błędów walidacji

        ResponseEntity<?> response = controller.createReservation(dto, bindingResult);

        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof Reservation);
        verify(reservationRepository, times(1)).save(any());
    }


    @Test
    public void shouldReturnBadRequest_whenEndDateBeforeStartDate() {
        // given
        ReservationDto dto = new ReservationDto();
        dto.setRoomId(1L);
        dto.setStartDate(LocalDate.of(2025, 8, 20));
        dto.setEndDate(LocalDate.of(2025, 8, 15)); // zła kolejność
        dto.setClientName("Zły Klient");

        Room room = new Room();
        room.setId(1L);

        when(roomRepository.findById(1L)).thenReturn(Optional.of(room));

        BindingResult bindingResult = mock(BindingResult.class);
        when(bindingResult.hasErrors()).thenReturn(false); // zakładamy brak błędów walidacji
        // when
        ResponseEntity<?> response = controller.createReservation(dto, bindingResult);

        // then
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertTrue(response.getBody().toString().contains("Data zakończenia musi być po dacie rozpoczęcia"));

        // upewniamy się, że nic nie zapisano
        verify(reservationRepository, never()).save(any());
    }


}
