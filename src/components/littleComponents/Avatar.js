import React from "react";

const Avatar = (props) => {
    return (
        <div className="profile-picture">
            <img src={props.avatarPath}
                 alt="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"/>
        </div>
    )
}

export default Avatar;
