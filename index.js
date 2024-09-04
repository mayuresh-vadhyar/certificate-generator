require('dotenv').config();
const path = require('path');
const fs = require('fs');
const process = require('process');
const express = require('express');
const constants = require('./constants');
const { downloadCertificate } = require('./certificate-generator');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`:::   ${req.method} ${req.originalUrl}   :::`);
  next();
});
// app.use(express.static(__dirname));

function renderIndexPage(req, res) {
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading HTML file:', err);
      res.status(500).send('Server Error');
      return;
    }

    const modifiedData = data.replace('{{downloadCertificatePath}}', constants.downloadCertificatePath);
    res.send(modifiedData);
  });
}

app.get('/', renderIndexPage);


// Serve static files from the 'assets' directory
app.get('/assets/:file', (req, res) => {
  const fileName = req.params.file;
  const filePath = path.join(__dirname, 'assets', fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('File not found!');
    }
  });
});

app.get('/output/:file', (req, res) => {
  const fileName = req.params.file;
  const filePath = path.join(__dirname, 'output', fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('File not found!');
    }
  });
});

// Route to generate certificate
app.post('/downloadCertificate', downloadCertificate);

app.use((req, res, next) => {
  console.log(`:::   ${req.method} ${req.originalUrl}   :::`);
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
