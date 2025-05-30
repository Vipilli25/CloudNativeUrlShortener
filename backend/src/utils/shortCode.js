const { customAlphabet } = require('nanoid');

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const generateShortCode = customAlphabet(alphabet, 6); // 6-character code

module.exports = generateShortCode;
