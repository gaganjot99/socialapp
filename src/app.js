import React from "react";
import ReactDOM from "react-dom";
import Photo from "./photo.js";

import Profile from "./profile.js";
import Upload from "./upload.js";





class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      display : "timeline"
    }

    this.toggledisplay = this.toggledisplay.bind(this);
  }

  componentDidMount(){
    fetch('/loggedin').then(data=>data.json()).then(result=> 
      {
        this.setState({username: result.data});
      }
      )
      .catch((e)=>{console.log(e)});
  }

  

  toggledisplay(show){
    this.setState({
      display: show
    })
  }

  render() {
    const pics = [1, 2, 3, 4, 5, 6];
    
    return (
      <div className="appcontainer">
        <header className="heading">
          <h4>pandora</h4>
          <h5>{this.state.username}</h5>
        </header>

        <div className="activityboard">
        {/* {pics.map((item,i) => {
            return <Photo key={item} index={i} username={"username" + item} />;
          })} */}
          
          {this.state.display==="timeline"? pics.map((item,i) => {
            return <Photo key={item} index={i} username={"username" + item} />;
          }): this.state.display==="upload"? <Upload username={this.state.username}/> : <Profile username={this.state.username}/>}
        </div>
        <footer>
          <div className="timeline">
          <button id="timebtn" onClick={()=>{this.toggledisplay("timeline")}}><i className="bi bi-house-door-fill"></i></button>
          </div>
          <div className="upload">
            <button id="uploadbtn" onClick={()=>{this.toggledisplay("upload")}}><i className="bi bi-plus-square-fill"></i></button>
          </div>
          <div className="profile">
          <button id="uploadbtn" onClick={()=>{this.toggledisplay("profile")}}><i className="bi bi-person-circle"></i></button>
          </div>
        </footer>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));


