import React, { useState, useEffect } from "react";

function ProfilePage() {
    const [profile, setProfile] = useState(() => {
        return JSON.parse(localStorage.getItem("profile")) || {};
    });

    const [editingProfile, setEditingProfile] = useState(false);
    const [editingAddress, setEditingAddress] = useState(false);
    const [view, setView] = useState('profile');
    const [updatedProfile, setUpdatedProfile] = useState(profile);
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        setUpdatedProfile(profile);
        if (profile.avatar) {
            setAvatar(profile.avatar);
        }
    }, [profile]);

    const handleSaveProfile = () => {
        setProfile({ ...profile, ...updatedProfile });
        localStorage.setItem("profile", JSON.stringify({ ...profile, ...updatedProfile }));
        setEditingProfile(false);
    };

    const handleSaveAddress = () => {
        setProfile({ ...profile, ...updatedProfile });
        localStorage.setItem("profile", JSON.stringify({ ...profile, ...updatedProfile }));
        setEditingAddress(false);
    };

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                setAvatar(e.target.result);
                setUpdatedProfile({ ...updatedProfile, avatar: e.target.result });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="flex min-h-screen bg-black text-white">
            <aside className="w-1/4 p-4 bg-[#1a1a1a]">
                <div className="flex flex-col items-center">
                    <div className="mb-4 cursor-pointer" onClick={() => document.getElementById('avatar-input').click()}>
                        {avatar ? (
                            <img src={avatar} alt="Avatar" className="rounded-full w-32 h-32 object-cover" />
                        ) : (
                            <div className="rounded-full w-32 h-32 bg-gray-700 flex items-center justify-center">
                                No Avatar
                            </div>
                        )}
                    </div>
                    <input type="file" onChange={handleAvatarChange} id="avatar-input" className="hidden" />
                </div>
                <nav className="mt-6">
                    <ul>
                        <li className={`mb-2 cursor-pointer ${view === 'profile' && 'underline'}`} onClick={() => setView('profile')}>
                            Profile
                        </li>
                        <li className={`mb-2 cursor-pointer ${view === 'address' && 'underline'}`} onClick={() => setView('address')}>
                            Address
                        </li>
                        <li className="cursor-pointer">Logout</li>
                    </ul>
                </nav>
            </aside>
            <main className="w-3/4 p-6">
                {view === 'profile' ? (
                    <div>
                        {!editingProfile ? (
                            <div>
                                <div className="mb-4">
                                    <h1 className="mb-4 font-bold text-2xl">Profile</h1>
                                    <p className="mb-2"><strong>First Name:</strong> {profile.firstName || "N/A"}</p>
                                    <p className="mb-2"><strong>Last Name:</strong> {profile.lastName || "N/A"}</p>
                                    <p className="mb-2"><strong>Display Name:</strong> {profile.displayName || "N/A"}</p>
                                    <p className="mb-2"><strong>Email Address:</strong> {profile.email || "N/A"}</p>
                                </div>
                                <button onClick={() => setEditingProfile(true)} className="bg-[#ff9f00] text-black font-bold py-2 px-4 rounded transition duration-300 hover:bg-[#e88e00]">
                                    Edit Profile
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="first-name" className="block mb-1 text-gray-400">First Name</label>
                                    <input type="text" id="first-name" placeholder="First Name" value={updatedProfile.firstName || ""} onChange={(e) => setUpdatedProfile({ ...updatedProfile, firstName: e.target.value })} className="w-full p-3 bg-[#1a1a1a] rounded border border-[#333] focus:outline-none focus:border-yellow-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="last-name" className="block mb-1 text-gray-400">Last Name</label>
                                    <input type="text" id="last-name" placeholder="Last Name" value={updatedProfile.lastName || ""} onChange={(e) => setUpdatedProfile({ ...updatedProfile, lastName: e.target.value })} className="w-full p-3 bg-[#1a1a1a] rounded border border-[#333] focus:outline-none focus:border-yellow-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="display-name" className="block mb-1 text-gray-400">Display Name</label>
                                    <input type="text" id="display-name" placeholder="Display Name" value={updatedProfile.displayName || ""} onChange={(e) => setUpdatedProfile({ ...updatedProfile, displayName: e.target.value })} className="w-full p-3 bg-[#1a1a1a] rounded border border-[#333] focus:outline-none focus:border-yellow-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block mb-1 text-gray-400">Email Address</label>
                                    <input type="email" id="email" placeholder="Email Address" value={updatedProfile.email || ""} onChange={(e) => setUpdatedProfile({ ...updatedProfile, email: e.target.value })} className="w-full p-3 bg-[#1a1a1a] rounded border border-[#333] focus:outline-none focus:border-yellow-500" />
                                </div>
                                <button onClick={handleSaveProfile} className="bg-[#ff9f00] text-black font-bold py-2 px-4 rounded transition duration-300 hover:bg-[#e88e00]">
                                    Save Profile
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {!editingAddress ? (
                            <div>
                                <div className="mb-4">
                                    <h1 className="mb-4 font-bold text-2xl">Address</h1>
                                    <p className="mb-2"><strong>Country:</strong> {profile.country || "N/A"}</p>
                                    <p className="mb-2"><strong>City:</strong> {profile.city || "N/A"}</p>
                                    <p className="mb-2"><strong>Region:</strong> {profile.region || "N/A"}</p>
                                    <p className="mb-2"><strong>Postal Code:</strong> {profile.postalCode || "N/A"}</p>
                                    <p className="mb-2"><strong>Street:</strong> {profile.street || "N/A"}</p>
                                    <p className="mb-2"><strong>Apartment/House:</strong> {profile.apartment || "N/A"}</p>
                                </div>
                                <button onClick={() => setEditingAddress(true)} className="bg-[#ff9f00] text-black font-bold py-2 px-4 rounded transition duration-300 hover:bg-[#e88e00]">
                                    Edit Address
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="country" className="block mb-1 text-gray-400">Country</label>
                                    <input type="text" id="country" placeholder="Country" value={updatedProfile.country || ""} onChange={(e) => setUpdatedProfile({ ...updatedProfile, country: e.target.value })} className="w-full p-3 bg-[#1a1a1a] rounded border border-[#333] focus:outline-none focus:border-yellow-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="city" className="block mb-1 text-gray-400">City</label>
                                    <input type="text" id="city" placeholder="City" value={updatedProfile.city || ""} onChange={(e) => setUpdatedProfile({ ...updatedProfile, city: e.target.value })} className="w-full p-3 bg-[#1a1a1a] rounded border border-[#333] focus:outline-none focus:border-yellow-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="region" className="block mb-1 text-gray-400">Region</label>
                                    <input type="text" id="region" placeholder="Region" value={updatedProfile.region || ""} onChange={(e) => setUpdatedProfile({ ...updatedProfile, region: e.target.value })} className="w-full p-3 bg-[#1a1a1a] rounded border border-[#333] focus:outline-none focus:border-yellow-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="postal-code" className="block mb-1 text-gray-400">Postal Code</label>
                                    <input type="text" id="postal-code" placeholder="Postal Code" value={updatedProfile.postalCode || ""} onChange={(e) => setUpdatedProfile({ ...updatedProfile, postalCode: e.target.value })} className="w-full p-3 bg-[#1a1a1a] rounded border border-[#333] focus:outline-none focus:border-yellow-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="street" className="block mb-1 text-gray-400">Street</label>
                                    <input type="text" id="street" placeholder="Street" value={updatedProfile.street || ""} onChange={(e) => setUpdatedProfile({ ...updatedProfile, street: e.target.value })} className="w-full p-3 bg-[#1a1a1a] rounded border border-[#333] focus:outline-none focus:border-yellow-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="apartment" className="block mb-1 text-gray-400">Apartment/House</label>
                                    <input type="text" id="apartment" placeholder="Apartment/House" value={updatedProfile.apartment || ""} onChange={(e) => setUpdatedProfile({ ...updatedProfile, apartment: e.target.value })} className="w-full p-3 bg-[#1a1a1a] rounded border border-[#333] focus:outline-none focus:border-yellow-500" />
                                </div>
                                <button onClick={handleSaveAddress} className="bg-[#ff9f00] text-black font-bold py-2 px-4 rounded transition duration-300 hover:bg-[#e88e00]">
                                    Save Address
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default ProfilePage;