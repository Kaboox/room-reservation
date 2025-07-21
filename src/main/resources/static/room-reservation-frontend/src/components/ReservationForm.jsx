import { useRooms } from "../contexts/RoomsContext";
import { useReservations } from "../contexts/ReservationsContext";
function ReservationForm() {

    const {rooms} = useRooms()
    const {addReservation, formData, setFormData, status} = useReservations();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h2>Make a reservation</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                addReservation(formData)
            }} className="flex flex-col gap-4">
                <select 
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                >
                <option value="" disabled>-- Wybierz pokój --</option>
                {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                        {room.name} (dla {room.capacity} osób)
                    </option>
                ))}
                </select>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />
                <input
                    type="text"
                    name="clientName"
                    placeholder="Twoje imię"
                    value={formData.clientName}
                    onChange={handleChange}
                    className="w-full border p-2"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Reserve
                </button>
                <p>{status}</p>
            </form>
        </div>
    )
}

export default ReservationForm