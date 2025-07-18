import { useEffect, useState } from "react";
function ReservationForm() {

    const [formData, setFormData] = useState({
        roomId: '',
        startDate: '',
        endDate: '',
        clientName: '',
    });

    const [status, setStatus] = useState('');
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/rooms')
            .then(res => res.json())
            .then(data => setRooms(data))
            .catch(err => console.log('Błąd pobierania pokoi:', err))
    }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Wysylanie...');

        try {
            const res = await fetch('http://localhost:8080/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Błąd zapisu do bazy danych');
            //const data = await res.json();
            setStatus('Zarezerwowano pomyślnie!');
            //console.log('Opodiwedź z backendu:', data);
        } catch (error) {
            setStatus('Błąd rezerwacji');
            console.log(error);
        }
    };

    

    return (
        <div>
            <h2>Make a reservation</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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