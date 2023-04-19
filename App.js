import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Document, Page } from 'react-pdf';
import SignatureCanvas from 'react-signature-canvas';

function App() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [signature, setSignature] = useState(null);
  const [error, setError] = useState(null);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handlePinChange(event) {
    setPin(event.target.value);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleClearSignature() {
    signature.clear();
  }

  function handleSaveSignature() {
    const signatureData = signature.toDataURL();
    fetch('/signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, pin, signatureData }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Signature saved successfully!');
        } else {
          setError(data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred while saving the signature.');
      });
  }

  return (
    <div className="App">
      <div className="PDFViewer">
        <Document
          file="/path/to/pdf/document.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div className="PDFControls">
          <Button
            variant="contained"
            color="primary"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </Button>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <Button
            variant="contained"
            color="primary"
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </Button>
        </div>
      </div>
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        label="PIN"
        variant="outlined"
        type="password"
        inputProps={{ maxLength: 4 }}
        size={4}
        style={{ marginLeft: '10px' }}
        inputMode="numeric"
        pattern="[0-9]{4}"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        required
        value={pin}
        onChange={handlePinChange}
      />
      <SignatureCanvas
        ref={(ref) => setSignature(ref)}
        canvasProps={{ className: 'SignatureCanvas' }}
      />
      <div className="SignatureButtons">
        <Button variant="contained" color="primary" onClick={handleClearSignature}>
          Clear
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveSignature}>
            Save
        </Button>
        </div>
        {error && (
            <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
        )}
        </div>
    );
}

export default App;
