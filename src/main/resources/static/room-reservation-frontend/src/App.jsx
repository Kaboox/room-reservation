import RoomList from "./components/RoomList"
import ReservationForm from "./components/ReservationForm"
import ReservationList from "./components/ReservationList"
import RoomListAdmin from "./components/RoomListAdmin"
import { useState } from "react"
import Login from "./components/Login"
import AdminRoomForm from "./components/AdminRoomForm"
import { RoomsProvider } from "./contexts/RoomsContext"
import { ReservationsProvider } from "./contexts/ReservationsContext"
import { AuthProvider } from "./contexts/AuthContext"


function App() {
  const [role, setRole] = useState(localStorage.getItem("role"))
  
  const handleLogin = (loggedRole) => {
    setRole(loggedRole);

  }

  const handleLogout = () => {
    localStorage.removeItem("role")
    setRole(null);
  }

  if (!role) {
    return <Login onLogin={handleLogin}></Login>
  }
  
  return (
    <AuthProvider>
      <RoomsProvider>
        <ReservationsProvider>
          <div className="min-h-screen bg-gray-100 p-6">

          <h1 className="text-3xl font-bold text-center mb-8">Room Reservation SyStem</h1>
          <button onClick={handleLogout} className="mb-4 bg-red-500 text-white px-4 py-2 rounded">
            Wyloguj
          </button>
          <div>
          <RoomList />
          <ReservationForm />
          <ReservationList isAdmin={role==="ADMIN"}></ReservationList>
          </div>
          {role === "ADMIN" && <AdminRoomForm></AdminRoomForm>}
          {role === "ADMIN" && <RoomListAdmin />}
        </div>
      </ReservationsProvider>
      </RoomsProvider>
    </AuthProvider>
  )

}

export default App