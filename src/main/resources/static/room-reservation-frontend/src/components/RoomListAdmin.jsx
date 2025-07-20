
import { useRooms } from "../contexts/RoomsContext";

function RoomListAdmin() {


    const {rooms, deleteRoom, setEditingRoom, editRoom, updateRoom, editingRoom, editedRoom, setEditedRoom} = useRooms();

    
    

    const handleChange = (e) => {
        console.log(e.target.name)
        setEditedRoom({ ...editedRoom, [e.target.name]: e.target.value});
    };


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
                            min={1}
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => updateRoom(editingRoom, editedRoom)} className="bg-blue-500 text-white px-4 py-2 rounded">Zapisz</button>
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