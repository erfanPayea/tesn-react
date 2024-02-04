// Verification.js

import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Verification = () => {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const verification = {
            email: localStorage.getItem('email'),
            otp: verificationCode
        };

        const data = {
            username: localStorage.getItem('username'),
            phone: localStorage.getItem('phone'),
            password: localStorage.getItem('password'),
            avatarPath: localStorage.getItem('avatarPath')
        };
        try {
            // Send the POST request to the server
            const response = await fetch('http://127.0.0.1:8000/user/otp/validator', {
                method: 'POST',
                body: JSON.stringify(verification),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            if (response.ok) {
                const token = result["token"]
                localStorage.setItem("token", token)
                navigate('/');
            } else
                alert(result['message']);
        } catch (error) {
            // Handle any error that occurred during the request
            alert("error in otp validation")
        }

        try {
            // Send the POST request to the server
            const secondResponse = await fetch('http://127.0.0.1:8000/user/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token')
                }


            });
            const result = await secondResponse.json();
            if (secondResponse.ok) {
                alert("your username and password set successfully")
            } else
                alert(result['message']);


        } catch (error) {
            // Handle any error that occurred during the request
            alert("error in setting username and password")
        }

    };

    return (
        <div className="verification-container">
            <h2>Verification</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button type="submit">Verify</button>
            </form>
            <p>Did not receive the code? <Link to="/signup">Resend</Link></p>
        </div>
    );
};

export default Verification;
