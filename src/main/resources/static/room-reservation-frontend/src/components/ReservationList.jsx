import { useReservations } from "../contexts/ReservationsContext";

function ReservationList ({isAdmin}) {
    
    const {reservations, deleteReservation} = useReservations()

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