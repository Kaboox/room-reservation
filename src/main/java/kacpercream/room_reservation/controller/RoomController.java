package kacpercream.room_reservation.controller;

import kacpercream.room_reservation.model.Room;
import kacpercream.room_reservation.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody Room room, @RequestHeader("X-Role") String role) {

        if (room.getName() == null || room.getName().isBlank() || room.getCapacity() <= 0) {
            return ResponseEntity.badRequest().body("Nieprawidlowe dane");
        }

        if (!role.equals("ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Brak dostępu");
        }

        Room savedRoom = roomRepository.save(room);
        return ResponseEntity.ok(savedRoom);
    }
}
