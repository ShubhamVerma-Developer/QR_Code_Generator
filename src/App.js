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
    <div className="grid-container">
    <div className="App">
      <h1>QR Code Generator</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      ></textarea>

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

      <div id="canvas" className="qr-code-container">

         <QRCodeCanvas
          value={text}
          size={300}
          bgColor={"#ffffff"}
          fgColor={"#0a75ad"}
          level={"H"}
          includeMargin={false}
          imageSettings={{
            // src: "/shubham.png",
            src: file,
            x: undefined,
            y: undefined,
            height: 60,
            width: 60,
            excavate: true,
            style: {
              borderRadius: 30,
            },
          }}



        />
      </div>
      <div className="">
        <button
          onClick={() => QrCodeDownload()}
          className="btn"
        >
          <i className="fa fa-download mr-3"></i>
          Download
        </button>
      </div>
    </div>
    </div>
    
  );
  
}

export default App;