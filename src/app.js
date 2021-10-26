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
      history:[],
      likes:[] 
    }

    this.toggledisplay = this.toggledisplay.bind(this);
    this.changelike=this.changelike.bind(this);
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
    this.setState({history: data.history.history,likes: data.history.likes});
    
  })
  }
  changelike(i, action ){
    let likes = this.state.likes;
    if(action=='inc'){
      likes[i]=likes[i]+1;
    }
    else if(action=='dec'&&likes[i]>0){
     likes[i]=likes[i]-1;
    }
  this.setState( {
    likes:likes
  })
  fetch('/like',{method:'POST',body:likes}).then(response=>response.json).then(response=>console.log(response)).catch(err=>{console.log(err)})
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
            return <Photo key={item} index={i} likes={this.state.likes[i]} username={item.split('/')[1]} changelike={this.changelike} />;
          }): this.state.display==="upload"? <Upload username={this.state.username}/> : <Profile countofpics={this.state.countofpics} username={this.state.username}/>}
        </div>
        <footer className="controls">
          <div className="timeline">
          <button id="timebtn" onClick={()=>{this.toggledisplay("timeline")}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-view-list" viewBox="0 0 16 16">
  <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2zm0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14z"/>
</svg></button>
          </div>
          <div className="upload">
            <button id="uploadbtn" onClick={()=>{this.toggledisplay("upload")}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg></button>
          </div>
          <div className="profile">
          <button id="uploadbtn" onClick={()=>{this.toggledisplay("profile")}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></button>
          </div>
        </footer>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));


