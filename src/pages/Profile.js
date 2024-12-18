import React, { useState, useEffect } from "react";

function ProfilePage() {
    const [profile, setProfile] = useState(() => {
        return JSON.parse(localStorage.getItem("profile")) || {};
    });

    const [editing, setEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState(profile);

    const handleSave = () => {
        setProfile(updatedProfile);
        localStorage.setItem("profile", JSON.stringify(updatedProfile));
        setEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Profile
                </h2>
                {!editing ? (
                    <div>
                        <p><strong>Name:</strong> {profile.name || "N/A"}</p>
                        <p><strong>Email:</strong> {profile.email || "N/A"}</p>
                        <p><strong>Address:</strong> {profile.address || "N/A"}</p>
                        <button
                            onClick={() => setEditing(true)}
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                        >
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={updatedProfile.name || ""}
                            onChange={(e) => setUpdatedProfile({...updatedProfile, name: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-4">Email</label>
                        <input
                            type="email"
                            value={updatedProfile.email || ""}
                            onChange={(e) => setUpdatedProfile({...updatedProfile, email: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-4">Address</label>
                        <input
                            type="address"
                            value={updatedProfile.address || ""}
                            onChange={(e) => setUpdatedProfile({...updatedProfile, address: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                        />
                        <button
                            onClick={handleSave}
                            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;