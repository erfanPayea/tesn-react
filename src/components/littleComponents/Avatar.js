import React from "react";
import {useNavigate} from "react-router-dom";

const Avatar = (props) => {
    const navigate = useNavigate();
    return (
        <div className="profile-picture">
            <img src={props.avatarPath} onClick={() => navigate("/user/" + props.userId)}
                 alt="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"/>
        </div>
    )
}

export default Avatar;
