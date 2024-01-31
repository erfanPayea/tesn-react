import React, {useState} from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Home.css'; // Import CSS for styling

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform login logic here with username and password
        // For example, you can send an API request or handle authentication logic
        console.log('Login submitted:', username, password);

        // Prepare the data object
        const data = {
            username: username,
            password: password
        };

        try {
            // Send the POST request to the server
            const response = await fetch('http://127.0.0.1:8000/user/token', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            if(response.ok) {
                const token = result["token"];
                localStorage.setItem("token", token);
                alert("Success!");
            }else
                alert(result['message']);

        } catch (error) {
            // Handle any error that occurred during the request
            // console.error('Error:', error);
            setError("username and password did not matched");
        }
    };

    return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Welcome to Travel Social Network!</h1>
        <p>Connect with fellow travelers, share your experiences, and discover new destinations.</p>
      </div>
      <div className="auth-form">
        <h2>Sign In or Sign Up</h2>
          <form onSubmit={handleSubmit}>
              <input type="text" value={username} placeholder="username" required={true}
                     onChange={(e) => setUsername(e.target.value)}/>
              <input type="password" value={password} placeholder="Password" required={true}
                     onChange={(e) => setPassword(e.target.value)}/>
              <button type="submit">Sign In</button>
              {/* Change the anchor tag to a Link component */}
              <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
              <p>{error}</p>
          </form>
      </div>
    </div>
  );
};

export default Home;
