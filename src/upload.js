import { render } from "react-dom";
import React, { useState } from "react";

const Upload = (props) => {
  const [status, setStatus] = useState(false);
  let preview = document.getElementById("preview");
  let text = document.createElement("h2");

  const previewpic = () => {
    preview = document.getElementById("preview");
    let fileTypes = ["image/jpeg", "image/pjpeg", "image/png"];
    setStatus(false);
    while (preview.hasChildNodes()) {
      preview.removeChild(preview.firstChild);
    }

    let curFiles = document.getElementById("uploadinput").files;
    if (curFiles.length !== 0) {
      if (fileTypes.includes(curFiles[0].type)) {
        let image = document.createElement("img");
        image.src = window.URL.createObjectURL(curFiles[0]);

        preview.appendChild(image);
      }
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    while (preview.hasChildNodes()) {
      preview.removeChild(preview.firstChild);
    }
    text.innerText = "Uploading";
    preview.appendChild(text);

    let curFile = document.getElementById("uploadinput").files;
    const formData = new FormData();
    formData.append("myfile", curFile[0]);
    const requestOptions = {
      method: "POST",

      body: formData,
    };
    fetch("/upload", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        preview.removeChild(preview.firstChild);
        text.innerText = "Uploaded";
        preview.appendChild(text);
        props.updatehistory();
      });
  };

  return (
    <div>
      <form
        id="form1"
        action="/upload"
        method="post"
        encType="multipart/form-data"
      >
        <div className="photo" id="preview"></div>

        <input
          onChange={previewpic}
          id="uploadinput"
          type="file"
          name="uploaded_photo"
          hidden
        ></input>
        <div className="uploadbtns">
          <label className="btn" htmlFor="uploadinput">
            Select Image
          </label>
          <input
            type="submit"
            onClick={handleClick}
            className="submitbtn"
            value="Upload"
            disabled={status}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default Upload;
