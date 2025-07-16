import { useState } from "react"

function AdminRoomForm () {

    const [roomData, setRoomData] = useState({
        name: '',
        capacity: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setRoomData({ ...roomData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch('http://localhost:8080/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Role': 'ADMIN'
                },
                body: JSON.stringify({
                    name: roomData.name,
                    capacity: parseInt(roomData.capacity)
                })
            })

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg)
            }

            setStatus("Pokój dodany pomyślnie!");
        } catch (error) {
            setStatus(`Błąd: ${error.message}`)
        }
    }


    return (
        <div>
            <h2>Dodaj nowy pokój</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                    type="text" 
                    name="name"
                    value={roomData.name}
                    placeholder="Numer pokoju..."
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required 
                />
                <input 
                    type="text"
                    name="capacity"
                    value={roomData.capacity}
                    placeholder="Ilość miejsc"
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required 
                />
                <button type="submit">Dodaj pokój</button>
                <p>{status}</p>
        </form>
        </div>
    )

}

export default AdminRoomForm