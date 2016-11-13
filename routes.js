const express = require('express');
const router = express.Router();
const stocks = require('./stocks');
const io;
const userStocks = {
    symbols: [
        'GOOG',
        'APPL',
    ],
};

// Configure Endpoints
router.post('/stockUpdate', (req, res) => {
    io.sockets.emit('update', req.body.symbol);
    stocks.getStocks(req.body.symbol, (err, res) => {
        if (err) console.error(err);

        res.send({prices: res});
    });
});

router.get('/clear', (req,res) => {
    io.sockets.emit('clear', {});
    res.send({});
});

router.get('/stocks', (req,res) => {
    res.send(userStocks);
});

module.exports = function (socket) {
    io = socket
    return router;
};
