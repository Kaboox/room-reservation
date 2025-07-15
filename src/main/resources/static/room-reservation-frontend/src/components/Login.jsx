import { useState } from "react"

function Login({onLogin}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // fake login
        if (username == "admin" && password == "admin123") {
            localStorage.setItem("role", "ADMIN")
            onLogin("ADMIN")
        } else {
            localStorage.setItem("role", "USER");
            onLogin("USER");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-white p-4 rounded shadow max-w-sm mx-auto">
            <h2 className="text-lg font-bold">Logowanie</h2>
            <input type="text" 
                placeholder="Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 border rounded"
                required
            />
            <input type="password" 
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded"
                required
            />
            <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" type="submit">
                Zaloguj
            </button>
        
        </form>
    )
}

export default Login;