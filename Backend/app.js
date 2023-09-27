const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db.config");
const userRouter = require("./controllers/user");
const handleError = require('./utils/errorHandler');
const { isLoggedIn } = require("./controllers/middleware");
const parkingRouter = require("./controllers/parking");
const paymentMethodRouter = require("./controllers/paymentMethod");
const bookingRouter = require("./controllers/booking");
const spaceRouter = require("./controllers/spaceRouter");
const cors = require('cors');
const dotenv = require("dotenv").config();

// Set body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Connect Database
connectDB();

// Define a route for the root URL
app.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
});

// Use routers for different resources
app.use("/user", userRouter);
app.use("/parking", parkingRouter);
app.use("/paymentMethod", paymentMethodRouter);
app.use("/booking", bookingRouter);
app.use("/space", spaceRouter);
app.use("/review", reviewRouter); // Make sure 'reviewRouter' is imported

// Error handling middleware
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    handleError(error, res);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});
