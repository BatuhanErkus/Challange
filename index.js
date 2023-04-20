const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const signaturePad = require('signature_pad');

const app = express();
const port = 3000;

// Configure multer to handle file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './pdf');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.pdf') {
      cb(new Error('Only PDF files are allowed'));
      return;
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 10 // 10MB
  }
});

app.use(express.static('public'));

app.post('/signature', upload.single('pdfFile'), async (req, res) => {
  const { name, pin } = req.body;
  const pdfFile = req.file;

  if (!pdfFile) {
    res.status(400).json({ error: 'Please select a PDF file' });
    return;
  }

  if (pin !== '1337') {
    res.status(401).json({ error: 'Invalid PIN' });
    return;
  }

  try {
    // Load the PDF file
    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream(`./pdf/${pdfFile.filename}`));

    // Create the signature canvas
    const signature = req.body.signature;
    const canvas = new signaturePad(signature);
    canvas.fromDataURL(signature);

    // Add the signature to the PDF file
    pdfDoc.image(canvas.toDataURL('image/jpeg'), {
      align: 'center',
      valign: 'center'
    });

    // Finalize the PDF file
    pdfDoc.end();

    // Return the signed PDF file
    res.json({ signedPdfUrl: `/pdf/${pdfFile.filename}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
});

// Serve the signed PDF file
app.get('/pdf/:filename', (req, res) => {
  const filePath = `./pdf/${req.params.filename}`;
  if (!fs.existsSync(filePath)) {
    res.status(404).send('File not found');
    return;
  }
  res.sendFile(path.join(__dirname, filePath));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
