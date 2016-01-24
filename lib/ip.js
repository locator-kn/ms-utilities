'use strict';

const request = require('request');
const lru = require('lru-cache')(50);

const fns = {};


const fetchIpInfoFromServer = (ipAdress, cb) => {
    request.get({
        url: 'http://freegeoip.net/json/' + ipAdress,
        json: true
    }, (err, resp, data) => {
        cb(data);
    });
};


fns.get = function (ipAdress, next) {
    let ipNumbers = ipAdress.split('.');
    let twoDigits = `${ipNumbers[0]}.${ipNumbers[1]}`;
    console.time('retrieving ip information');
    let result = lru.get(twoDigits);

    if(!result) {
        fetchIpInfoFromServer(ipAdress, resp => {
            lru.set(twoDigits, 'value');
            console.timeEnd('retrieving ip information');
            next(null, resp);
        });
    } else {
        console.timeEnd('retrieving ip information');
        next(null, result);
    }
};

module.exports = fns;