const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/Carpooling', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

app.use(express.static('public'));


// define schema
const rideSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true,
        match: /\S+@\S+\.\S+/
    },
    arrivaltime: {
        type: String,
        required: true,
        min: 0,
        max: 24
    },
    arrivalplace: {
        type: String,
        required: true
    },
    endplace: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    passenger: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    date: {
        type: String,
        required: true
    },
    no: {
        type: Number,
        required: true
        // min: 1,
        // max: 10
    }
});


//model for schema
const Ride = mongoose.model('Ride', rideSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/createride', (req, res) => {
    res.sendFile(__dirname + '/public/createride.html');
});

app.post('/createride', async (req, res) => {
    try {
        const ride = new Ride({
            username: req.body.username,
            gender: req.body.gender,
            email: req.body.email,
            arrivaltime: req.body.arrivaltime,
            arrivalplace: req.body.arrivalplace,
            endplace: req.body.endplace,
            price: req.body.price,
            passenger: req.body.passenger,
            date: req.body.date,
            no: req.body.no
        });
        const savedRide = await ride.save();
        // res.status(201).json(savedRide);
        res.send('Form submitted successfully,!! Thankyou !!');
    } catch (error) {
        console.error('Error saving ride to database', error);
        res.status(500).send('Error saving ride to database');
    }
});

app.get('/bookride', async (req, res) => {
    try {
        const endplace = req.query.endplace;
        let rides = await Ride.find({});
        if (endplace) {
            rides = rides.filter(ride => ride.endplace.toLowerCase().includes(endplace.toLowerCase()));
        }
        res.render('main', { rides: rides, endplace: endplace });
    } catch (error) {
        console.error('Error getting rides from database', error);
        res.status(500).send('Error getting rides from database');
    }
});

  

const port = 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});


app.get('/public/bookride.css', function(req, res) {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public', 'bookride.css'));
});