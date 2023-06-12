import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import React, { useState } from "react";
import Dropzone from 'react-dropzone';
import './App.css';
function App() {
  const [qr, setqr] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  
  const QrCodeDownload = async () => {
    const canvas = await (
      await html2canvas(document.getElementById("canvas"))
    ).toDataURL();

    if (canvas) {
      setqr(canvas);
      const a = document.createElement("a");
      a.download = "QrCode.png";
      a.href = canvas;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      setFile(URL.createObjectURL(uploadedFile));
    }
  };

  return (
    <>
    <div className="container text-center">
    <h1>QR Code Generator</h1>
    <div className="grid-container"> 
    <div className="full-width">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      ></textarea>
    </div>
    <div className="grid-item">
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {file ? (
              <img src={file} alt="Uploaded" className="uploaded-image" />
            ) : (
              <p>Drag 'n' drop an image here, or click to select files</p>
            )}
          </div>
        )}
      </Dropzone>
      </div>
      <div className="grid-item">
      <div id="canvas" className="qr-code-container">
         <QRCodeCanvas
          value={text}
          size={300}
          bgColor={"#ffffff"}
          fgColor={"black"}
          level={"L"}
          includeMargin={false}
          imageSettings={{
            // src: "/shubham.png",
            src: file,
            x: undefined,
            y: undefined,
            height: 70,
            width: 70,
            excavate: true,
            gap: 40,
            style: {
              borderRadius: 30,
            },
          }}
        />
       </div>
        
      
        <button
          onClick={() => QrCodeDownload()}
          className="btn btn-primary center full-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud-arrow-down-fill" viewBox="0 0 16 16">
  <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z"/>
</svg>
          Download
        </button>
        </div>
      </div>
      
   
    </div>
    </>
  );
}
export default App;