
require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
var cors = require('cors')
const httpErrors = require('http-errors');
const bodyParser = require('body-parser');
const db = require('./app/models');
const PayOS = require('@payos/node');
const { UserRouter , AuthRouter, RoomRouter, CategoryRouter, Payment} = require('./routes/index')

//Khoi tao express web server
const app = express();
app.use(cors());

const payos = new PayOS('9aec171d-ba4b-4d61-a1a4-e669ac-93edad',
    '74e13b6f-4654-49ac-a79e-6faee0df6203',
    'a28294f902cf99f50fbf690dac0b783936b6040f3abfc097add6c31687795ea7');
app.use(express.static('public'));
app.use(express.json());

const YOUR_DOMAIN = process.env.PORT;
app.post('/create-payment-link', async(req,res)=> {
   const order = {
    amount: 10000,
    description: 'Thanh toan hoa don',
    orderCode: 10,
    returnUrl: `${YOUR_DOMAIN}/success.html`,
    cancelUrl: `${YOUR_DOMAIN}/cancel.html`,
   };

   const paymentLink = await payos.createPaymentLink(order);
   res.redirect(303, paymentLink.checkoutUrl);
})

app.post('/receive-hook', async(req, res) => {
    console.log(req.body);
    res.json();
})

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

// app.use('/api/payments', Payment);
app.use('/', AuthRouter);
app.use('/room', RoomRouter);
app.use('/', CategoryRouter);
// app.use('/payment', Payment)
app.use('/payment', Payment);

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

// console.log('process.env.HOST_NAME', process.env.CLIENT_ID);
//Tiep nhan cac req(s)
app.listen(process.env.PORT || 8080, process.env.HOST_NAME, () => {
    console.log(`Server is running at: ${process.env.HOST_NAME}:${process.env.PORT}`);
    db.connectDB();
});