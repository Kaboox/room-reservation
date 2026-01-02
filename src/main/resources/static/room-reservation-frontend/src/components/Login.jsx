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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Logowanie</h2>
                
                {error && <p className="text-red-500 text-center bg-red-100 p-2 rounded border border-red-200">{error}</p>}
                
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Login</label>
                    <input type="text" 
                        placeholder="Wpisz login"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Hasło</label>
                    <input type="password" 
                        placeholder="Wpisz hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button className="bg-blue-600 text-white font-bold py-3 mt-4 rounded hover:bg-blue-700 transition duration-200 shadow-md" type="submit">
                    Zaloguj się
                </button>
            
            </form>
        </div>
    )
}

export default Login;