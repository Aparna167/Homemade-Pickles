
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const FAST2SMS_API_KEY = '9366eeb7538a6a87584dc20480c0851f3442f036OrczpsbcGanKnTbHPGP3ca90h';

app.post('/send-sms', async (req, res) => {
    const { phone, message } = req.body;

    try {
        const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
            route: 'q',
            message: message,
            language: 'english',
            numbers: phone
        }, {
            headers: {
                'authorization': FAST2SMS_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        res.status(200).json({ success: true, response: response.data });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ success: false, error: 'SMS sending failed' });
    }
});

app.listen(3000, () => {
    console.log('SMS server running on http://localhost:3000');
});
