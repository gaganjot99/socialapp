import { render } from "react-dom";
import React from "react";

const Profile = (props)=>{
    let countofpics = props.countofpics;
    
    let arr = [];
    while(countofpics>0){
     arr.unshift(`/profile/${countofpics}`);
     countofpics--;
    }

    return (
        <div>
            <div id="profilespace">
       <div id = "profile_pic"><img src='/profile/0'></img></div>
       <div id = "usertitle">{props.username}</div>
       </div>
       <div id= "alluploaded">
       {arr.map((item,i)=>{
           return (<div className="profilepics" ><img src={item} key={i}></img></div>)
       })}
       </div>
        </div>
    );
};

export default Profile;