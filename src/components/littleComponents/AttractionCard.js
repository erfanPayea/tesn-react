import React from 'react';
import {Link} from 'react-router-dom';

// Define the AttractionCard component
const AttractionCard = ({attraction}) => {
    return (
        <div className="attraction-card">
            <Link to={`/attraction/${attraction.id}/f`}>
                <img src={attraction.image} width={600} alt={attraction.name}/>
                <h3>{attraction.name}</h3>
            </Link>
            <p>{attraction.description}</p>
        </div>
    );
};

export default AttractionCard;
