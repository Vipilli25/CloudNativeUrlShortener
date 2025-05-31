const { dynamoDB, TableName } = require('../db/dynamoClient');
const generateShortCode = require('../utils/shortCode');

const BASE_URL = 'http://localhost:3000'; // Replace later with actual domain

exports.shortenUrl = async (req, res) => {
    const { longUrl } = req.body;

    if (!longUrl) return res.status(400).json({ error: 'Missing longUrl' });

    const code = generateShortCode();
    const shortUrl = `${BASE_URL}/${code}`;

    const params = {
        TableName,
        Item: {
            code,
            longUrl,
            createdAt: Date.now(),
        },
    };
    

    try {
        await dynamoDB.put(params).promise();
        return res.status(201).json({ shortUrl });
    } catch (err) {
        console.error('Error saving to DynamoDB:', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.redirectToUrl = async (req, res) => {
    const { code } = req.params;

    const params = {
        TableName,
        Key: { code },
    };

    try {
        const result = await dynamoDB.get(params).promise();
        if (!result.Item) return res.status(404).json({ error: 'Not found' });

        return res.redirect(result.Item.longUrl);
    } catch (err) {
        console.error('Error fetching from DynamoDB:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};
