import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import React, { useState } from "react";
import Dropzone from 'react-dropzone';
import { AiFillCopy, AiOutlineDownload } from "react-icons/ai";

function App() {
  const [qr, setqr] = useState("");
  const [url, seturl] = useState("");
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

  const QrCodeCopy = () => {
    navigator.clipboard.writeText(qr);
  };

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      setFile(URL.createObjectURL(uploadedFile));
    }
  };

  return (
    <div className="container mx-auto w-[320px]">
      <div className="mb-4">
        <p className="text-2xl">Generate QrCode</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm  mb-2">Write something</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={(e) => seturl(e.target.value)}
        />
      </div>

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

      <div id="canvas" className="border p-2 relative">
        <QRCodeCanvas
          value={url}
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
            height: 40,
            width: 40,
            borderRadius: 40/2,
            excavate: true,
          }}
        />
      </div>
      <div className="flex w-[300px] mt-4 p-4 space-x-2 items-center justify-center">
        <button
          onClick={() => QrCodeDownload()}
          className="flex items-center justify-between bg-transparent hover:bg-[#0a75ad] text-[#0a75ad] font-semibold hover:text-white py-2 px-4 border border-[#0a75ad] hover:border-transparent rounded"
        >
          <AiOutlineDownload />
          Download
        </button>

        <button
          onClick={() => QrCodeCopy()}
          className="flex items-center  justify-between bg-transparent hover:bg-[#0a75ad] text-[#0a75ad] font-semibold hover:text-white py-2 px-4 border border-[#0a75ad] hover:border-transparent rounded"
        >
          <AiFillCopy />
          Copy
        </button>
      </div>
    </div>
  );
}

export default App;
