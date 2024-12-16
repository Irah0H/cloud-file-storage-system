const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

// Initialize AWS SDK
const s3 = new AWS.S3();
const app = express();
const port = 3000;

// Middleware for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Route to upload a file to S3
app.post('/upload', authenticateToken, upload.single('file'), (req, res) => {
    const file = req.file;
    const params = {
        Bucket: 'my-cloud-storage',
        Key: `${req.user.username}/${file.originalname}`,
        Body: file.buffer,
        ACL: 'private',
    };

    s3.upload(params, (err, data) => {
        if (err) {
            return res.status(500).send('Error uploading file.');
        }
        res.status(200).send(`File uploaded successfully. URL: ${data.Location}`);
    });
});

// Route to list files for the authenticated user
app.get('/files', authenticateToken, (req, res) => {
    const params = {
        Bucket: 'my-cloud-storage',
        Prefix: req.user.username + '/',
    };

    s3.listObjectsV2(params, (err, data) => {
        if (err) {
            return res.status(500).send('Error retrieving files.');
        }
        res.status(200).json(data.Contents);
    });
});

// Route to download a file
app.get('/download/:filename', authenticateToken, (req, res) => {
    const params = {
        Bucket: 'my-cloud-storage',
        Key: `${req.user.username}/${req.params.filename}`,
    };

    s3.getObject(params, (err, data) => {
        if (err) {
            return res.status(500).send('Error downloading file.');
        }
        res.attachment(req.params.filename);
        res.send(data.Body);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
