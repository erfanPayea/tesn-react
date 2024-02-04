import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './SignUp.css';
import useLocalStorageState from "../components/UseLocalStorageState";

const SignUp = () => {
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatarImage, setAvatarImage] = useLocalStorageState('submitAvatarImage', null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (password === confirmation) {
            setError("")
        } else {
            setError("password and password confirmation did not match")
        }
    }, [password, confirmation]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (confirmation !== password) {
            setError("password and password confirmation did not match");
            return;
        }

        const formData = new FormData();
        formData.append("email", email);
        formData.append("avatarImage", avatarImage);

        try {
            const response = await fetch('http://127.0.0.1:8000/user/otp', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                localStorage.setItem('phone', phone);
                localStorage.setItem('email', email);
                setShowNotification(true);
                navigate('/verification');
            } else
                alert(result['message']);
        } catch (error) {
            // Handle any error that occurred during the request
            alert("error connecting server");
        }
    };


    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} placeholder="username" required={true}
                       onChange={(e) => setUsername(e.target.value)}/>
                <input type="email" value={email} placeholder="email" required={true}
                       onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" value={password} placeholder="Password" required={true}
                       onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" value={confirmation} placeholder="Confirm Password" required={true}
                       onChange={(e) => setConfirmation(e.target.value)}/>
                <input type="phone" value={phone} placeholder="phone"
                       onChange={(e) => setPhone(e.target.value)}/>
                <input
                    type="file"
                    accept="image/*"
                    onChange={event => setAvatarImage(event.target.files[0])}
                />
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to="/" className="signin-link">Sign In</Link></p>
                <p>{error}</p>
            </form>
            {showNotification && (
                <div className="notification">
                    Verification code sent to your email. Please check your inbox.
                </div>
            )}
        </div>
    );
};

export default SignUp;
