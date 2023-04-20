import React, { useState, useRef } from 'react';

function App() {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [signature, setSignature] = useState(null);
  const canvasRef = useRef(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!name || !pin  || !signature) {
      alert('Please fill in all fields and sign the document');
      return;
    }
    if (!pdfFile) {
      alert('Please select a PDF file');
      return;
    }
    
    // Create a new FormData object and append the required data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('pin', pin);
    formData.append('pdfFile', pdfFile);
    formData.append('signature', signature);
  
    try {
      // Send the form data to the server using fetch
      const response = await fetch('/signature', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        // If the response is successful, open the signed PDF in a new window
        const data = await response.json();
        window.open(data.signedPdfUrl, '_blank');
      } else {
        // If the response is not successful, show an error message
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };
  

  const handleSignature = (signatureCanvas) => {
    setSignature(signatureCanvas);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="pin">PIN:</label>
          <input type="password" id="pin" value={pin} onChange={(event) => setPin(event.target.value)} />
        </div>
        <div className="makeStyles-canvasContainer-1">
          <canvas id="signature-canvas" ref={canvasRef} onPointerUp={(event) => handleSignature(event.target)}></canvas>
        </div>
        <div>
          <label htmlFor="pdf-file-input">Select PDF file</label>
          <input type="file" id="pdf-file-input" onChange={(event) => setPdfFile(event.target.files[0])} />
        </div>
        <div>
          <button type="button" onClick={handleClear}>Clear</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
