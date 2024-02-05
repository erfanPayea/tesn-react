import React, {useEffect} from 'react';
import AttractionCard from '../components/littleComponents/AttractionCard';
import useLocalStorageState from "../components/UseLocalStorageState";
import {useNavigate, useParams} from "react-router-dom"; // Import your AttractionCard component

const CityPage = () => {
    const navigate = useNavigate();
    const {cityId} = useParams();
    const [attractions, setAttractions] = useLocalStorageState("cityAttractions", [{}]);

    async function getData() {
        try {
            const response = await fetch('http://127.0.0.1:8000/experience/city-attractions/' + cityId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'token ' + localStorage.getItem('token'),
                }
            });

            const result = await response.json();
            if (response.ok)
                setAttractions(result["attractions"]);
            else {
                alert(result['message']);
                navigate("../../");
            }

        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    // const attractions = [
    //     {
    //         id: 1,
    //         name: 'Attraction 1',
    //         imageUrl: '/attraction1.jpg',
    //         description: 'Description of Attraction 1',
    //         reviews: [
    //             {id: 1, caption: 'Review 1 for Attraction 1', rating: 4},
    //             {id: 2, caption: 'Review 2 for Attraction 1', rating: 5},
    //         ]
    //     },
    //     {
    //         id: 2,
    //         name: 'Attraction 2',
    //         imageUrl: '/attraction2.jpg',
    //         description: 'Description of Attraction 2',
    //         reviews: [
    //             {id: 3, caption: 'Review 1 for Attraction 2', rating: 3},
    //             {id: 4, caption: 'Review 2 for Attraction 2', rating: 4},
    //         ]
    //     },
    //     // Add more attractions as needed
    // ];


    return (
        <div className="city">
            <h1>Attractions: </h1>
            <div className="attraction-grid">
                {attractions.map(attraction => (
                    <AttractionCard key={attraction.id} attraction={attraction}/>
                ))}
            </div>
        </div>
    );
};

export default CityPage;
