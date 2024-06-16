const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWEARE
app.use(morgan('dev'));

app.use(express.json());

app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  req.requstTime = new Date().toISOString();
  next();
});


// 3  ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// CATCH INVALID ROUTE
app.all('*', (req, res, next) =>  { 
  res.status(404).json({
    message: `CUKAM ${req.method} ${req.ip}`
  })
})


module.exports = app;