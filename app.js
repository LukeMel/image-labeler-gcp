const express = require('express');
const multer = require('multer');
const vision = require('@google-cloud/vision');
const path = require('path');

// Set up Google Cloud Vision Client
const client = new vision.ImageAnnotatorClient({
  keyFilename: 'service-account-key.json'
});

// Initialize Express
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Home Page
app.get('/', (req, res) => {
  res.render('index');
});

// Handle Image Upload and Label Detection
app.post('/upload', upload.single('image'), async (req, res) => {
  const filePath = req.file.path;

  // Call Vision API
  const [result] = await client.labelDetection(filePath);
  const labels = result.labelAnnotations.map(label => label.description);

  res.render('result', { labels: labels, imagePath: req.file.filename });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
