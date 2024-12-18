
import React, { useState } from 'react';
import axios from 'axios';

function PasswordReset() {
    const [email, setEmail] = useState('');

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/reset-password', { email });
            alert('Password reset email sent!');
        } catch (err) {
            alert('Error sending reset email');
        }
    };

    return (
        <form onSubmit={handlePasswordReset}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />
            <button type="submit">Reset Password</button>
        </form>
    );
}

export default PasswordReset;