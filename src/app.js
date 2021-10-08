import React from 'react';
import ReactDOM from 'react-dom';
import Photo from './photo.js';

class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:"user__name",
            


        }
    }

render(){
    const pics=[1,2,3,4,5,6]
    return (
<div className="appcontainer">
    <header className='heading'>
        <h4>pandora</h4>
        <h5>{this.state.username}</h5>

    </header>
   
    <div className="activityboard">
       {pics.map(item=>{
           return (<Photo key = {item} />)
       })} 
    </div>
    <footer>
        <div className="timeline">
        <i class="bi bi-house-door-fill"></i>
        </div>
        <div className="upload">
        <i class="bi bi-plus-square-fill"></i>
        </div>
        <div className="profile">
        <i class="bi bi-person-circle"></i>
        </div>
    </footer>

</div>
    )
    }
};

ReactDOM.render(<App />, document.getElementById('app'));