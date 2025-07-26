import { useState } from "react"

function Login({onLogin}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password})
            });

            if (!res.ok) throw new Error("Błędne dane logowania")
            
            const data = await res.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            onLogin(data.role);
        } catch (err) {
            setError("Logowanie nieudane");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-white p-4 rounded shadow max-w-sm mx-auto">
            <h2 className="text-lg font-bold">Logowanie</h2>
            {error && <p className="text-red-500">{error}</p>}
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