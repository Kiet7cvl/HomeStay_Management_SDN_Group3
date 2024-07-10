require('dotenv').config();
const crypto = require('crypto');
const https = require('https');

const createMoMoPayment = async (req, res) => {
    const { amount, orderInfo, paymentCode } = req.body;

    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const redirectUrl = process.env.MOMO_REDIRECT_URL;
    const ipnUrl = process.env.MOMO_IPN_URL;
    const requestType = "captureWallet";
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const extraData = '';
    const autoCapture = true;
    const lang = 'vi';

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

    const requestBody = JSON.stringify({
        partnerCode,
        partnerName: 'Test',
        storeId: 'MomoTestStore',
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        lang,
        requestType,
        autoCapture,
        extraData,
        orderGroupId: '',
        signature,
    });

    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody),
        },
    };

    const momoReq = https.request(options, (momoRes) => {
        let data = '';

        momoRes.on('data', (chunk) => {
            data += chunk;
        });

        momoRes.on('end', () => {
            const response = JSON.parse(data);
            if (response.resultCode === 0) {
                res.status(200).json({ data: response, status: 200 });
            } else {
                res.status(400).json({ error: response, status: 400 });
            }
        });
    });

    momoReq.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
        res.status(500).json({ error: 'Internal Server Error', status: 500 });
    });

    momoReq.write(requestBody);
    momoReq.end();
};

module.exports = {
    createMoMoPayment,
};
