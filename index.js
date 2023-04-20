import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

function App() {
  const [pdfUrl, setPdfUrl] = useState('');
  const [signature, setSignature] = useState({ name: '', pin: '' });

  // Make GET request to retrieve PDF document
  const getPDF = async () => {
    try {
      const response = await axios.get('/api/pdf');
      setPdfUrl(response.data.pdfUrl);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPDF();
  }, []);
  // Make POST request to submit signature
  const submitSignature = async () => {
    try {
      const response = await axios.post('/api/signature', signature);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={getPDF}>
        Get PDF
      </Button>
      {pdfUrl && <iframe src={pdfUrl} width="100%" height="500px" />}
      <TextField
        label="Name"
        value={signature.name}
        onChange={(e) => setSignature({ ...signature, name: e.target.value })}
      />
      <TextField
        label="PIN"
        value={signature.pin}
        onChange={(e) => setSignature({ ...signature, pin: e.target.value })}
      />
      <Button variant="contained" onClick={submitSignature}>
        Submit Signature
      </Button>
    </div>
  );
}

export default App;