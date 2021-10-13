import React from "react";
import ReactDOM from "react-dom";
import Photo from "./photo.js";





class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  componentDidMount(){
    const user =  fetch('/loggedin').then(data=>data.json()).then(result=> 
      {
        this.setState({username: result.data});
      }
      )
      .catch((e)=>{console.log(e)});
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
          {pics.map((item,i) => {
            return <Photo key={item} index={i} username={"username" + item} />;
          })}
        </div>
        <footer>
          <div className="timeline">
            <i className="bi bi-house-door-fill"></i>
          </div>
          <div className="upload">
            <i className="bi bi-plus-square-fill"></i>
          </div>
          <div className="profile">
            <i className="bi bi-person-circle"></i>
          </div>
        </footer>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));


