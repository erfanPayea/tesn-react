import React from "react";
import {useNavigate} from "react-router-dom";

const Avatar = (props) => {
    const navigate = useNavigate();
    return (
        <div className="profile-picture">
            <img src={props.avatarPath} onClick={() => navigate("/user/" + props.userId)}
                 alt="Avatar"/>
        </div>
    )
}

export default Avatar;
