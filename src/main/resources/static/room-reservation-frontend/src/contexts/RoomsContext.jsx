import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const RoomsContext = createContext();

// provider
export function RoomsProvider({children}) {
    const {token} = useAuth()
    const [rooms, setRooms] = useState([]);
    const [editedRoom, setEditedRoom] = useState({
        name: '',
        capacity: ""
    })
    const [editingRoom, setEditingRoom] = useState(null)



    useEffect(() => {
        fetch("http://localhost:8080/rooms", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => setRooms(data))
            .catch(err => console.log("Fetch error:", err))
    }, [token])

    const deleteRoom = async (id) => {
        try {
            await fetch(`http://localhost:8080/rooms/${id}`, {
                method: "DELETE",
                headers: {
                     "X-Role": localStorage.getItem("role") || "USER"
                }
            });
            setRooms((prev) => prev.filter((room) => room.id !== id));
        } catch (err) {
            console.log("Delete room error:", err);
        }
    }

    const editRoom = (id, roomName, roomCapacity) => {
        setEditingRoom(id)
        setEditedRoom({
            name: roomName,
            capacity: roomCapacity
        })
    }

     const updateRoom = async (id, roomData) => {
        if (!roomData.name.trim() || !roomData.capacity) {
            alert("Wszystkie pola muszą być wypełnione.");
            return;
        }
        try {
            const res = await fetch(`http://localhost:8080/rooms/${editingRoom}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-Role': localStorage.getItem('role')
            },
            body: JSON.stringify(roomData),
            })
        if (!res.ok) throw new Error('Błąd aktualizacji');
        setRooms(prev =>
            prev.map(room =>
                room.id === id ? { ...room, ...roomData } : room
      ))
        alert('Pokój zaktualizowany');
        setEditingRoom(null);
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <RoomsContext.Provider value={{rooms, setRooms, deleteRoom, editRoom, updateRoom, setEditingRoom, editingRoom, editedRoom, setEditedRoom}}>
            {children}
        </RoomsContext.Provider>
    )
}

export function useRooms() {
    return useContext(RoomsContext);
}