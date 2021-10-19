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
      display : "timeline",
      countofpics: 0,
      history:['/jack_watson/12'] 
    }

    this.toggledisplay = this.toggledisplay.bind(this);
  }

  componentDidMount(){
    fetch('/loggedin').then(data=>data.json()).then(result=> 
      {
        this.setState({username: result.data,
        countofpics: result.countofpics});
      }
      )
      .catch((e)=>{console.log(e)});
      
  fetch('/history').then(data=>data.json()).then(data=>{
    this.setState({history: data.history.history});
    
  })
  }

  

  toggledisplay(show){
    this.setState({
      display: show
    })
  }

  render() {
    
    
    return (
      <div className="appcontainer">
        <header className="heading">
          <h4>pandora</h4>
          <div className="profileheader"><div className="profileicon"><img  src="/profile/0" /></div>
          <h5>{this.state.username}</h5>
          </div>
        </header>
        <hr></hr>
        <div className="activityboard">
       
          
          {this.state.display==="timeline"? this.state.history.map((item,i) => {
            return <Photo key={item} index={i} username={item.split('/')[1]} />;
          }): this.state.display==="upload"? <Upload username={this.state.username}/> : <Profile countofpics={this.state.countofpics} username={this.state.username}/>}
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


