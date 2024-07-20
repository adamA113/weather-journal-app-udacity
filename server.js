// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
// const bodyParser = require('body-parser'); //deprecated not needed any more

//Here we are configuring express to use body-parser as middle-ware.
// app.use(bodyParser.urlencoded({ extended: false })); //deprecated not needed any more
// app.use(bodyParser.json()); //deprecated not needed any more

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// GET route
const sendData = (req, res) => {
    res.send(projectData);
};
app.get('/all', sendData);

// POST route
const saveData = (req, res) => {
    projectData = req.body;
    res.status(200).send(projectData);
}
app.post('/add', saveData);


// Setup Server
const port = 3000;
const listening = () => {
    console.log(`running on localhost: ${port}`);
};
const server = app.listen(port, listening);