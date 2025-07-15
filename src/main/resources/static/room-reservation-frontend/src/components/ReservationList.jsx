import { useEffect, useState } from "react"

function ReservationList ({isAdmin}) {
    const [reservations, setReservations] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/reservations")
            .then(res => res.json())
            .then(data => setReservations(data))
            .catch(err => console.log('Błąd pobierania rezerwacji', err))      
    }, [])

    const deleteReservation = (id) => {
        fetch(`http://localhost:8080/reservations/${id}`, {
            method: "DELETE"
        })
        .then(() => setReservations(reservations.filter(r => r.id !== id)))
        .catch(err => console.log*('Błąd usuwania:', err))
    };

    return (
        <div className="bg-white p-4 rounded shadow mt-4">
            <h2 className="text-xl font-bold mb-4">Lista Rezerwacji</h2>
            <ul className="dividy-y">
                {reservations.map(reservation => (
                    <li key={reservation.id} className="py-2">
                        <p><strong>Klient: </strong>{reservation.clientName}</p>
                        <p><strong>Pokój: </strong>{reservation.room.name}</p>
                        <p><strong>Od: </strong>{reservation.startDate.slice(0,10)}</p>
                        <p><strong>Do: </strong>{reservation.endDate.slice(0,10)}</p>
                        {isAdmin && (
                            <button
                                className="mt-1 text-red-600 hover:underline"
                                onClick={() => deleteReservation(reservation.id)}
                            >Usuń
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ReservationList