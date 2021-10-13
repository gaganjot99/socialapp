import { render } from "react-dom";
import React from "react";

const Photo = (props) => {
  const src = `/media/${props.index}`
  return (
    <div className="photocontainer">
      <h2>{props.username}</h2>
      <div className="photo">
        <img src={src} />
      </div>
    </div>
  );
};

export default Photo;
