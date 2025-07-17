import { useEffect, useState } from "react";

function RoomListAdmin() {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/rooms')
            .then((res) => res.json())
            .then((data) => setRooms(data)
    )
    .catch((err) => {
        console.log('Błąd podczas pobierania pokoi:', err)
    });
}, []);


    return (
        <div className="bg-white p-4 rounded shadow">
            <h2>Available Rooms</h2>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id} className="flex gap-2 border p-2 mb-2 rounded">
                        <span>{room.name} - {room.capacity} osób</span>
                        <button  className="bg-red-500 text-white px-2 py-1 rounded">Usuń</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RoomListAdmin