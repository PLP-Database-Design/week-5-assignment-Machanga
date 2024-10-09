const express = require('express')
const app = express()
const mysql = require('mysql2');
const dotenv = require ('dotenv');
const cors = require('cors');

app.use(express.json());
app.use(cors()); 
dotenv.config();

// connect to the DB
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);

db.connect((err) => {
    if(err) return console.log("Error connecting to the database.");

    console.log("DB connected successfully as id: ", db.threadId);

    // Question 1 goes here
    // http://localhost:3000
    app.get('/', (req, res) => {
        // retrieve data from the database
        db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json('Error retrieving data.');
            }
            else{
                res.json(results);
            }
        });
    });


    // Question 2 goes here
    // http://localhost:3000/providers
    app.get('/providers', (req, res) => {
        // retrieve data from the database
        db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json('Error retrieving data.');
            }
            else{
                res.json(results);
            }
        });
    });

    // Question 3 goes here
    // http://localhost:3000/patients/Gan
    app.get('/patients/:firstName', (req, res) => {
        // retrieve data from the database
        const {firstName} = req.params;
        db.query('SELECT * FROM patients WHERE first_name = ?', [firstName], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json('Error retrieving data.');
            }
            else{
                res.json(results);
            }
        });
    });

    // Question 4 goes here
    // http://localhost:3000/providers/specialty/surgery
    app.get('/providers/specialty/:specialty', (req, res) => {
        // retrieve data from the database
        const {specialty} = req.params;
        db.query('SELECT * FROM providers WHERE provider_specialty = ?', [specialty], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json('Error retrieving data.');
            }
            else{
                res.json(results);
            }
        });
    });
});

// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
});
