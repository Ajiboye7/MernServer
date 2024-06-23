require('dotenv').config();

const express = require('express');
const workoutRoute = require('./routes/workoutRoute');
const mongoose = require('mongoose');
const userRoute = require('./routes/UserRoute');

//express app
const app = express();

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Middleware for parsing request body
app.use(express.json());

app.use('/workouts', workoutRoute);

app.use('/user', userRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to DataBase & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
