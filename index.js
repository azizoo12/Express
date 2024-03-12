const express = require('express');
const app = express();

// Middleware to check if the request is within working hours
const workingHoursMiddleware = (req, res, next) => {
    const date = new Date();
    const day = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = date.getHours(); // 0 to 23

    // Check if it's Monday to Friday and between 9 and 17 hours
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Continue to the next middleware/route handler
    } else {
        res.send('The website is only available during working hours (Monday to Friday, 9 to 17).');
    }
};

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Use the workingHoursMiddleware for all routes
app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

app.get('/services', (req, res) => {
    res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/views/contact.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
