import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function AuthPage() {
    const [tab, setTab] = useState("login");
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const loginWithGoogle = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            localStorage.setItem("user", JSON.stringify(codeResponse));
        },
        onError: (error) => console.log("Login Failed:", error),
    });

    useEffect(() => {
        if (user?.access_token) {
            fetch(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: "application/json",
                    },
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setProfile(data);
                    localStorage.setItem("profile", JSON.stringify(data));
                    navigate("/profile");
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
            navigate("/profile");
        } else {
            console.log("Logging in user:", formData);
            navigate("/profile");
        }
    };

    return (
        <div className="bg-yellow-700">
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-transparent to-black">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
                    <h2 className="text-3xl font-bold text-gray-700 text-center mb-8">
                        Welcome Back!
                    </h2>
                    <div className="flex justify-around mb-6">
                        <button
                            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                                tab === "login"
                                    ? "bg-[#aa783d] text-white"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                            onClick={() => setTab("login")}
                        >
                            Login
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                                tab === "register"
                                    ? "bg-[#aa783d] text-white"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                            onClick={() => setTab("register")}
                        >
                            Register
                        </button>
                    </div>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-black">
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                required
                                className="w-full border focus:outline-none border-black focus:ring focus:ring-yellow-700 rounded-lg px-3 py-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">
                                Password
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                required
                                className="w-full border focus:outline-none border-black focus:ring focus:ring-yellow-700 rounded-lg px-3 py-2 mt-1"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                        >
                            {tab === "login" ? "Login" : "Register"}
                        </button>
                    </form>
                    <div className="text-center my-4 text-gray-500">OR</div>
                    {profile ? (
                        <div className="text-center">
                            <img
                                className="w-16 h-16 rounded-full mx-auto mb-2"
                                src={profile.picture}
                                alt="User"
                            />
                            <p className="text-sm text-gray-700">Welcome, {profile.name}</p>
                            <button
                                onClick={logOut}
                                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={loginWithGoogle}
                            className="w-full bg-black hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                        >
                            Sign in with Google 🚀
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthPage;