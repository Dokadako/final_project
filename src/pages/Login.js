import React, { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login submitted:", { email, password });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Login</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <label className="block">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full mt-2"
                    />
                </label>
                <label className="block mt-4">
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 w-full mt-2"
                    />
                </label>
                <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
