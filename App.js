import React, { useState, useEffect } from 'react';
import Pdfviewer from './components/PdfViewer';
import Wizard from './components/Wizard';

function App() {
  const [pdfUrl, setPdfUrl] = useState('');
  const [wizardData, setWizardData] = useState({});

  useEffect(() => {
    // Make a GET request to your backend to retrieve the PDF URL
    fetch('/api/getPdfUrl')
      .then(response => response.json())
      .then(data => setPdfUrl(data.url))
      .catch(error => console.error(error));
  }, []);

  const handleWizardSubmit = (data) => {
    // Make a POST request to your backend with the wizard data
    fetch('/api/saveWizardData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => setWizardData(data))
      .catch(error => console.error(error));
  }

  return (
    <div>
      <Pdfviewer pdfUrl={pdfUrl} />
      <Wizard onSubmit={handleWizardSubmit} />
    </div>
  );
}

export default App;
