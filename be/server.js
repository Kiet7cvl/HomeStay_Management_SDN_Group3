require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const httpErrors = require('http-errors');
const bodyParser = require('body-parser');
const db = require('./app/models');
const { UserRouter , AuthRouter, RoomRouter} = require('./routes/index')
//Khoi tao express web server
const app = express();

//Bo sung cac middleware kiem soat hoat dong cua client toi sebserver
app.use(bodyParser.json());
app.use(morgan("dev"));

//Router toi web root
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to RESTFull API'
    });
});


//Tiep nhan cac request tu client
app.use('/', AuthRouter);
app.use('/room', RoomRouter)

app.use(async (req, res, next) => {
    next(httpErrors.NotFound());
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

//Tiep nhan cac req(s)
app.listen(process.env.PORT || 8080, process.env.HOST_NAME, () => {
    console.log(`Server is running at: ${process.env.HOST_NAME}:${process.env.PORT}`);
    db.connectDB();
});