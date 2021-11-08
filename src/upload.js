import { render } from "react-dom";
import React, {useState} from "react";



 const Upload = (props) => {
     const [status, setStatus]=useState(false);

     

     const previewpic=() => {
        let preview = document.getElementById("preview");
        let fileTypes = [
         'image/jpeg',
         'image/pjpeg',
         'image/png'
     ];
     
         while (preview.firstChild) {
             preview.removeChild(preview.firstChild)
         }
     
         let curFiles = document.getElementById("uploadinput").files
         if (curFiles.length !== 0) {
          
     
                 if (fileTypes.includes(curFiles[0].type)) {
                     let image = document.createElement('img');
                     image.src = window.URL.createObjectURL(curFiles[0]);
     
                     preview.appendChild(image);
                     setStatus(false);
                 }
     
                 
             }
         }

    const handleClick = (e) =>{
      e.preventDefault();
      
      let preview = document.getElementById("preview");
      while(preview.hasChildNodes()){
      preview.removeChild(preview.firstChild);
      }
      let text = document.createElement('h2');
      text.innerText = "Uploading";
      preview.appendChild(text);
      




      let curFile = document.getElementById("uploadinput").files;
    const formData = new FormData();
    formData.append('myfile',curFile[0])
      const requestOptions = {
        method: 'POST',
      
        body: formData
    };
    fetch('/upload', requestOptions)
        .then(response => response.json())
        .then(data => {
            preview.removeChild(preview.firstChild);
            setStatus(data.status)});
   
      
      

    }  

    return (
        <div>
            <form id="form1" action="/upload" method="post" encType="multipart/form-data">
                <div className="photo" id="preview">{status?<h2>picture uploaded</h2>:null}</div>
               
                <input onChange={previewpic}  id="uploadinput" type='file' name="uploaded_photo" hidden></input>
                <div className='uploadbtns'>
                    <label className="btn" htmlFor="uploadinput">Upload Image</label>
                <input type='submit' onClick={handleClick} className='submitbtn' value='Upload' disabled={status}></input>
                </div>
            </form>
        </div>
    );
};

export default Upload;