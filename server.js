const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// In-memory data store
let events = [];

// API Endpoints
app.get('/api/events', (req, res) => res.json(events));

app.post('/api/events', (req, res) => {
    const newEvent = {
        id: events.length + 1,
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        description: req.body.description,
    };
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// Render Views
app.get('/', (req, res) => res.render('index', { events }));
app.get('/events', (req, res) => res.render('events', { events }));

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
