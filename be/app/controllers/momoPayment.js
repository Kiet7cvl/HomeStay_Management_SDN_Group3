// const crypto = require('crypto');
// const https = require('https');

// exports.createMoMoPayment = async (req, res) => {
//     try {
//         // Parameters for MoMo payment
//         const accessKey = 'F8BBA842ECF85';
//         const partnerCode = 'MOMO';
//         const redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
//         const ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
//         const requestType = "captureWallet";
//         const amount = '50000';
//         const orderId = partnerCode + new Date().getTime();
//         const requestId = orderId;
//         const extraData = '';
//         const orderInfo = 'pay with MoMo';
//         const autoCapture = true;
//         const lang = 'vi';
//         const orderGroupId = '';

//         // Construct raw signature
//         const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

//         // Generate signature using HMAC SHA256
//         const signature = crypto.createHmac('sha256', secretKey)
//                                 .update(rawSignature)
//                                 .digest('hex');

//         // Prepare JSON request body
//         const requestBody = JSON.stringify({
//             partnerCode: partnerCode,
//             partnerName: "Test",
//             storeId: "MomoTestStore",
//             requestId: requestId,
//             amount: amount,
//             orderId: orderId,
//             orderInfo: orderInfo,
//             redirectUrl: redirectUrl,
//             ipnUrl: ipnUrl,
//             lang: lang,
//             requestType: requestType,
//             autoCapture: autoCapture,
//             extraData: extraData,
//             orderGroupId: orderGroupId,
//             signature: signature
//         });

//         // Create HTTPS request options
//         const options = {
//             hostname: 'test-payment.momo.vn',
//             port: 443,
//             path: '/v2/gateway/api/create',
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Content-Length': Buffer.byteLength(requestBody)
//             }
//         };

//         // Send the HTTPS request to MoMo endpoint
//         const reqMoMo = https.request(options, (response) => {
//             let data = '';

//             // A chunk of data has been received.
//             response.on('data', (chunk) => {
//                 data += chunk;
//             });

//             // The whole response has been received.
//             response.on('end', () => {
//                 console.log('MoMo API Response:', JSON.parse(data));
//                 res.status(200).json(JSON.parse(data));
//             });
//         });

//         // Handle HTTPS request error.
//         reqMoMo.on('error', (error) => {
//             console.error('Error calling MoMo API:', error);
//             res.status(500).json({ error: 'Failed to call MoMo API', message: error.message });
//         });

//         // Write JSON data to request body.
//         reqMoMo.write(requestBody);
//         reqMoMo.end();

//     } catch (error) {
//         console.error('Error creating MoMo payment:', error);
//         res.status(500).json({ error: 'Failed to create MoMo payment', message: error.message });
//     }
// };
