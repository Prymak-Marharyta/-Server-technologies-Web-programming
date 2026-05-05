require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const AppError = require('./utils/AppError');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

app.use((req, res, next) => {
  next(new AppError(`Маршрут ${req.originalUrl} не знайдено`, 404));
});


app.use((err, req, res, next) => {
  console.error('ERROR:', err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    name: err.name,
    stack: err.stack
  });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log('Server started');
    });
  })
  .catch(err => console.log(err));