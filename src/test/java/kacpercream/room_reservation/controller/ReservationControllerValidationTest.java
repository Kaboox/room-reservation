package kacpercream.room_reservation.controller;

import kacpercream.room_reservation.ReservationDto;
import kacpercream.room_reservation.model.Room;
import kacpercream.room_reservation.repository.ReservationRepository;
import kacpercream.room_reservation.repository.RoomRepository;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ReservationControllerValidationTest {

    private final ReservationRepository reservationRepository = mock(ReservationRepository.class);
    private final RoomRepository roomRepository = mock(RoomRepository.class);
    private final ReservationController controller = new ReservationController();

    public ReservationControllerValidationTest() {
        controller.roomRepository = roomRepository;
        controller.reservationRepository = reservationRepository;
    }

    @Test
    public void testCreateReservation_endDateBeforeStartDate() {
        ReservationDto dto = new ReservationDto();
        dto.setRoomId(1L);
        dto.setStartDate(LocalDate.now().plusDays(5));
        dto.setEndDate(LocalDate.now().plusDays(2)); // zła kolejność
        dto.setClientName("Zły Klient");

        Room room = new Room();
        room.setId(1L);

        when(roomRepository.findById(1L)).thenReturn(Optional.of(room));

        BindingResult bindingResult = mock(BindingResult.class);
        when(bindingResult.hasErrors()).thenReturn(false);

        ResponseEntity<?> response = controller.createReservation(dto, bindingResult);

        assertEquals(400, response.getStatusCodeValue(), "Powinien być BAD_REQUEST");
        assertNotNull(response.getBody(), "Body odpowiedzi nie może być null");
        verify(reservationRepository, never()).save(any());
    }
}
