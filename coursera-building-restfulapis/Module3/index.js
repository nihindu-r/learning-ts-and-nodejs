const express = require('express');

const app = express();
const loggerMiddleware = (req, res, next) => {
    const currentTimestamp = new Date().toISOString();
    console.log(`[${currentTimestamp} ${req.method} ${req.url}]`);
    next()
}

app.use(loggerMiddleware);
app.get('/', (req,res) => {
    res.send('hello world!')
});

app.listen(8080, () => {
    console.log('server is running on port 8080')
});