import React, { useState, useEffect } from 'react';

function Pdfviewer() {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    // Fetch the PDF URL from the backend
    fetch('http://localhost:3000/api/getPdfUrl')
      .then(response => response.json())
      .then(data => setPdfUrl(data.pdfUrl))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {pdfUrl ? (
        <iframe src={pdfUrl} width="100%" height="500px" />
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
}

export default Pdfviewer;
