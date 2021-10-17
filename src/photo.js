import { render } from "react-dom";
import React from "react";

const Photo = (props) => {
  const src = `/media/${props.index}`;
  const profilesrc = `/propic/${props.username}/0`;
  return (
    <div className="photocontainer">
     <div className="profileheader"><div className="profileicon"><img  src={profilesrc} /></div>
      <h2>{props.username}</h2>
      </div> 
      <div className="photo">
        <img src={src} />
      </div>
    </div>
  );
};

export default Photo;
