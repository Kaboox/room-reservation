package kacpercream.room_reservation.controller;

import kacpercream.room_reservation.model.Room;
import kacpercream.room_reservation.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long id, @RequestHeader("X-Role") String role) {

        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Brak uprawnień");
        }

        if (!roomRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        roomRepository.deleteById(id);
        return ResponseEntity.ok("Usunięto pokój");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRoom(@PathVariable Long id, Authentication authentication, @RequestBody Room updatedRoom) {
        // Sprawdź, czy użytkownik ma rolę ADMIN
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Brak uprawnień do usuwania");
        }

        return roomRepository.findById(id)
                .map(existingRoom -> {
                    if (updatedRoom.getName() != null && !updatedRoom.getName().isBlank()) {
                        existingRoom.setName(updatedRoom.getName());
                    }

                    if (updatedRoom.getCapacity() > 0) {
                        existingRoom.setCapacity(updatedRoom.getCapacity());
                    }

                    roomRepository.save(existingRoom);
                    return ResponseEntity.ok("Pokój zaktualizowany");
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
