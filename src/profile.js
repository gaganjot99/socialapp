import { render } from "react-dom";
import React from "react";

const Profile = (props)=>{
    return (
        <div>
       <div id = "profile-pic"></div>
       <div id = "usertitle">{props.username}</div>
       <div id= "alluploaded"></div>
        </div>
    );
};

export default Profile;