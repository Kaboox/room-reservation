import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { useAuth } from "./AuthContext";



const ReservationsContext = createContext();

export function ReservationsProvider({children}) {

    const [reservations, setReservations] = useState([])

    const { token } = useAuth();

    const [formData, setFormData] = useState({
        roomId: '',
        startDate: '',
        endDate: '',
        clientName: '',
    });

    const [status, setStatus] = useState('');

     useEffect(() => {
        fetch("http://localhost:8080/reservations", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => setReservations(data))
            .catch(err => console.log('Błąd pobierania rezerwacji', err))      
    }, [token])

    const addReservation = async () => {
        try {
            const res = await fetch('http://localhost:8080/reservations', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
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
                 "Authorization": `Bearer ${token}`,
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