import React, {useEffect} from 'react';
import "./FloatingWindow.css"
import useLocalStorageState from "../UseLocalStorageState";
const FloatingWindow = ({ onClose , type}) => {
    const [data, setData] = useLocalStorageState("following", [{}]);
    const handleBackClick = () => {
        onClose();
    };


    async function getData() {
        let address;
        console.log(type)
        if(type === 1)
            address = "followers";
        else if(type === 2)
            address = "following";
        else
            return;
        // Perform login logic here with username and password
        // For example, you can send an API request or handle authentication logic
        try {
            // Send the POST request to the server
            const response = await fetch('http://127.0.0.1:8000/user/' + address, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                }
            });

            const result = await response.json();
            if (response.ok)
                setData(result);
            else {
                alert(result['message']);
            }
        } catch (error) {
            alert("some problems happen");
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            alert("please login first");
            return;
        }
        getData();
    }, []);


    return (
        <div className="overlay">
            <div className="floating-window">
                <div className="user-container">
                    {data.map(following => (
                        <ul>
                            {following.cantact && (
                                <div key={following.id}  className="following">
                                    <span>{following.cantact.username}</span>
                                    {/* Include other properties of nested_field as needed */}
                                </div>
                            )}
                        </ul>
                    ))}
                </div>

                <button onClick={handleBackClick}>Back</button>
                {/* Your floating window content goes here */}
            </div>
        </div>
    );
};

export default FloatingWindow;