import { useRooms } from "../contexts/RoomsContext";

function RoomList() {

    const {rooms} = useRooms()

   


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