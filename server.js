const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Admin@1234',
  database: 'mydb'
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define API routes
app.post('/api/savePrescription', (req, res) => {
    const prescription = req.body;
    console.log('prescription', req.body)
    const sql = 'INSERT INTO prescriptions (full_name, mobile_no, age, address, prescription_details) VALUES (?, ?, ?, ?, ?)';
    const values = [prescription.fullName, prescription.mobileNo, prescription.age, prescription.address, prescription.prescriptionDetails];
  
    // Execute the query
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error saving prescription:', err);
        res.status(500).json({ error: 'Failed to save prescription' });
      } else {
        console.log('Prescription saved successfully');
        res.json({ message: 'Prescription saved successfully' });
      }
    });
  });
  
  // ...
  

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
