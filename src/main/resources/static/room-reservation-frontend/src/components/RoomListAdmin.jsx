import { useEffect, useState } from "react";

function RoomListAdmin() {

    const [rooms, setRooms] = useState([]);
    const [editedRoom, setEditedRoom] = useState({
        name: '',
        capacity: ""
    })
    const [editingRoom, setEditingRoom] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8080/rooms')
            .then((res) => res.json())
            .then((data) => setRooms(data)
    )
    .catch((err) => {
        console.log('Błąd podczas pobierania pokoi:', err)
    });
    }, []);

    const handleChange = (e) => {
        console.log(e.target.name)
        setEditedRoom({ ...editedRoom, [e.target.name]: e.target.value});
    };

    const deleteRoom = (id) => {
        fetch(`http://localhost:8080/rooms/${id}`, {
            method: "DELETE",
            headers: {
                'X-Role': localStorage.getItem('role') || 'USER'
            }
        })
        .then(() => setRooms(rooms.filter(r => r.id != id)))
        .catch(err => console.log*('Błąd usuwania:', err))
    }


    const editRoom = (id, roomName, roomCapacity) => {
        setEditingRoom(id)
        setEditedRoom({
            name: roomName,
            capacity: roomCapacity
        })
    }

    const submitEditRoom = async () => {
        try {
            const res = await fetch(`http://localhost:8080/rooms/${editingRoom}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-Role': localStorage.getItem('role')
            },
            body: JSON.stringify(editedRoom),
            })
        if (!res.ok) throw new Error('Błąd aktualizacji');
        alert('Pokój zaktualizowany');
        setEditingRoom(null);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="bg-white p-4 rounded shadow">
            {editingRoom && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow w-80">
                         <h3 className="text-xl font-bold mb-4">Edytuj pokój</h3>
                        <input
                            type="text"
                            name="name"
                            value={editedRoom.name}
                            onChange={handleChange}
                            className="w-full mb-2 p-2 border rounded"
                            placeholder="Numer pokoju"
                        />
                        <input
                            type="number"
                            name="capacity"
                            value={editedRoom.capacity}
                            onChange={handleChange}
                            className="w-full mb-2 p-2 border rounded"
                            placeholder="Pojemność"
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => submitEditRoom()} className="bg-blue-500 text-white px-4 py-2 rounded">Zapisz</button>
                            <button onClick={() => setEditingRoom(null)} className="bg-gray-300 px-4 py-2 rounded">Anuluj</button>
                        </div>
                    </div>
                </div>
                )}

            <h2>Available Rooms</h2>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id} className="flex gap-2 border p-2 mb-2 rounded">
                        <span>{room.name} - {room.capacity} osób</span>
                        <button onClick={() => deleteRoom(room.id)}  className="bg-red-500 text-white px-2 py-1 rounded">Usuń</button>
                        <button onClick={() => editRoom(room.id, room.name, room.capacity)}  className="bg-green-500 text-white px-2 py-1 rounded">Edytuj</button>
                        
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RoomListAdmin