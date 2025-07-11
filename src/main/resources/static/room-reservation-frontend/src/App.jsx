import RoomList from "./components/RoomList"
import ReservationForm from "./components/ReservationForm"


function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Room Reservation SyStem</h1>
      <div>
       <RoomList />
       <ReservationForm />
      </div>
    </div>
  )

}

export default App