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

  // Login screen
  if (!role) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <Login onLogin={handleLogin} />
      </div>
    );
  }
  
  return (
    <AuthProvider>
      <RoomsProvider>
        <ReservationsProvider>
          <div className="min-h-screen bg-gray-100 pb-10">
            
            {/* --- Navbar --- */}
            <nav className="bg-white shadow-md mb-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <h1 className="text-2xl font-bold text-gray-800">
                    System Rezerwacji Sal
                  </h1>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">Zalogowany jako: <span className="font-bold">{role}</span></span>
                    <button 
                      onClick={handleLogout} 
                      className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded transition duration-150"
                    >
                      Wyloguj
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              
              {/* Section 1: Rooms List - available for everyone */}
              <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Dostępne Pokoje</h2>
                <RoomList />
              </section>

              {/* Section 2: Reservations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                   <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Zarezerwuj Pokój</h2>
                   <ReservationForm />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                   <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                     {role === "ADMIN" ? "Wszystkie Rezerwacje" : "Twoje Rezerwacje"}
                   </h2>
                   <ReservationList isAdmin={role==="ADMIN"} />
                </div>
              </div>

              {/* --- ADMIN PANEL --- */}
              {role === "ADMIN" && (
                <div className="mt-12 border-t-2 border-gray-300 pt-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    🛠️ Panel Administratora
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Adding rooms */}
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                      <h3 className="text-lg font-bold mb-4">Dodaj Nowy Pokój</h3>
                      <AdminRoomForm />
                    </div>

                    {/* Rooms management */}
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                      <h3 className="text-lg font-bold mb-4">Zarządzaj Pokojami (Usuń/Edytuj)</h3>
                      <RoomListAdmin />
                    </div>
                  </div>
                </div>
              )}

            </main>
          </div>
        </ReservationsProvider>
      </RoomsProvider>
    </AuthProvider>
  )
}

export default App