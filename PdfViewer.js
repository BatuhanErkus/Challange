import React from 'react';
import { Document, Page } from 'react-pdf';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  pdfContainer: {
    width: '100%',
    height: '600px',
    margin: '20px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    overflow: 'auto',
  },
}));

function PDFViewer({ url }) {
  const classes = useStyles();
  const [numPages, setNumPages] = React.useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className={classes.pdfContainer}>
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
}

export default PDFViewer;