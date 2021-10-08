import { render } from "react-dom";
import React from "react";

const Photo = (props) => {
  
  return (<div className='photocontainer'>
      <h2>{props.username}</h2>
      <div className="photo">
      </div>
      </div>)
  
};

export default Photo;

