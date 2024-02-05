import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useLocalStorageState from "../components/UseLocalStorageState";

const MainCityPage = () => {
    const navigate = useNavigate();
    const [cities, setCities] = useLocalStorageState("alCities", [{}]);

    async function getData() {
        try {
            const response = await fetch('http://127.0.0.1:8000/experience/all-cities', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                }
            });

            const result = await response.json();
            if (response.ok)
                setCities(result["cities"]);
            else {
                alert(result['message']);
                navigate("/");
            }

        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    // const cities = [
    //     {id: 1, name: 'City 1'},
    //     {id: 2, name: 'City 2'},
    //     // Add more cities as needed
    // ];

    return (
        <div className="main-city-page">
            <h1>All Cities</h1>
            <ul>
                {cities.map(city => (
                    <li key={city.id}>
                        <Link to={`/city/${city.id}`}>{city.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MainCityPage;
