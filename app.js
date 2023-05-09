const express = require('express');
const moment = require('moment');
const app = express();

// Middleware to check if the current time is within working hours
const workingHoursMiddleware = (req, res, next) => {
  const now = moment();
  const dayOfWeek = now.day();
  const hourOfDay = now.hour();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay <= 17) {
    // If it is currently within working hours, continue with the request
    next();
  } else {
    // Otherwise, respond with an error message
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Set up the view engine to use EJS templates
app.set('view engine', 'ejs');

// Use the working hours middleware for all requests
app.use(workingHoursMiddleware);

// Set up the routes for the home, services, and contact pages
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
