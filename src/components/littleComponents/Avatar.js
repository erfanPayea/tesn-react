import React from "react";
import {useNavigate} from "react-router-dom";

const Avatar = (props) => {
    const navigate = useNavigate();

    function goToUserPage() {
        if (String(props.userId) === String(localStorage.getItem("currentId")))
            navigate('/profile');
        else navigate("/user/" + props.userId)
    }

    return (
        <div className="profile-picture">
            <img src={props.avatarPath} onClick={goToUserPage}
                 alt="Avatar"/>
        </div>
    )
}

export default Avatar;
