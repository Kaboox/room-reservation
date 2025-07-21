import { createContext, useEffect, useState } from "react";
import { useContext } from "react";



const ReservationsContext = createContext();

export function ReservationsProvider({children}) {

    const [reservations, setReservations] = useState([])

    const [formData, setFormData] = useState({
        roomId: '',
        startDate: '',
        endDate: '',
        clientName: '',
    });

    const [status, setStatus] = useState('');

     useEffect(() => {
        fetch("http://localhost:8080/reservations")
            .then(res => res.json())
            .then(data => setReservations(data))
            .catch(err => console.log('Błąd pobierania rezerwacji', err))      
    }, [])

    const addReservation = async () => {
        try {
            const res = await fetch('http://localhost:8080/reservations', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!res.ok) throw new Error("Błąd zapisu do bazy danych");
            setStatus('Zarezerwowano pomyślnie!');
            setFormData({
                roomId: '',
                startDate: '',
                endDate: '',
                clientName: '',
            })
            const newReservation = await res.json();
            setReservations(prev => [...prev, newReservation])
        } catch (error) {
            console.log("Błąd rezerwacji: ", error)
        }

    }

    const deleteReservation = (id) => {
        fetch(`http://localhost:8080/reservations/${id}`, {
            method: "DELETE",
            headers: {
                'X-Role': localStorage.getItem('role') || 'USER'
            }
        })
        .then(() => setReservations(reservations.filter(r => r.id !== id)))
        .catch(err => console.log('Błąd usuwania:', err))
    }


    return (
        <ReservationsContext.Provider value={{reservations, addReservation, formData, setFormData, status, deleteReservation}}>
            {children}
        </ReservationsContext.Provider>
    )
}

export function useReservations() {
    return useContext(ReservationsContext);
}