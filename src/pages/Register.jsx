import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthPage() {
    const [tab, setTab] = useState("login");
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const navigate = useNavigate(); // Для перенаправления

    // Google Login
    const loginWithGoogle = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            localStorage.setItem("user", JSON.stringify(codeResponse));
        },
        onError: (error) => console.log("Login Failed:", error),
    });

    useEffect(() => {
        if (user?.access_token) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    setProfile(res.data);
                    localStorage.setItem("profile", JSON.stringify(res.data));
                    navigate("/profile"); // Перенаправление на профиль
                })
                .catch((err) => console.log("Error fetching user data:", err));
        }
    }, [user, navigate]);

    const logOut = () => {
        googleLogout();
        setUser(null);
        setProfile(null);
        localStorage.removeItem("user");
        localStorage.removeItem("profile");
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (tab === "register") {
            console.log("Registering user:", formData);
            // После успешной регистрации или входа перенаправить:
            navigate("/profile");
        } else {
            console.log("Logging in user:", formData);
            // После успешного входа перенаправить:
            navigate("/profile");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Authentication
                </h2>
                {/* Вкладки */}
                <div className="flex justify-around mb-6">
                    <button
                        className={`px-4 py-2 font-medium ${tab === "login" ? "text-blue-500" : "text-gray-500"}`}
                        onClick={() => setTab("login")}
                    >
                        Login
                    </button>
                    <button
                        className={`px-4 py-2 font-medium ${tab === "register" ? "text-blue-500" : "text-gray-500"}`}
                        onClick={() => setTab("register")}
                    >
                        Register
                    </button>
                </div>

                {/* Форма */}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                    >
                        {tab === "login" ? "Login" : "Register"}
                    </button>
                </form>

                <div className="text-center my-4 text-gray-500">OR</div>

                {/* Google Sign-In */}
                {profile ? (
                    <div className="text-center">
                        <img
                            className="w-16 h-16 rounded-full mx-auto mb-2"
                            src={profile.picture}
                            alt="User"
                        />
                        <p className="text-sm">Welcome, {profile.name}</p>
                        <button
                            onClick={logOut}
                            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                        >
                            Log out
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={loginWithGoogle}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                    >
                        Sign in with Google 🚀
                    </button>
                )}
            </div>
        </div>
    );
}

export default AuthPage;
