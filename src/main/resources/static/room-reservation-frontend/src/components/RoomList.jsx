import { useEffect, useState } from "react";

function RoomList() {

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
                    <li key={room.id} className="border p-2 mb-2 rounded">
                        {room.name} - {room.capacity} osób
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RoomList