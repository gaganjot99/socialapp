import { render } from "react-dom";
import React, {useState} from "react";



 const Upload = (props) => {
     const [status, setStatus]=useState(true);

     

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
      setStatus(true);
      let preview = document.getElementById("preview");
      while(preview.hasChildNodes()){
      preview.removeChild(preview.firstChild);
      }
      let text = document.createElement('h2');
      text.innerText = "Photo Uploaded";
      preview.appendChild(text);
    }  

    return (
        <div>
            <form action="/upload" method="post" encType="multipart/form-data">
                <label className="btn" htmlFor="uploadinput">Upload Image</label>
                <input onChange={previewpic}  id="uploadinput" type='file' name="uploaded_photo" hidden></input>
                <div className="photo" id="preview"></div>
                <input type='submit' onClick={handleClick} value='Upload' disabled={status}></input>
            </form>
        </div>
    );
};

export default Upload;