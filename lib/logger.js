'use strict';

const bunyan = require('bunyan');
const BunyanSlack = require('bunyan-slack');
const service = require('../../../package.json').name;

const log = bunyan.createLogger({
    name: 'locator',
    streams: [
        {
            stream: new BunyanSlack({
                webhook_url: process.env['SLACK_ERROR_CHANNEL']
            }),
            level: bunyan.FATAL
        },
        {
            stream: process.stdout,
            level: bunyan.DEBUG
        },
        {
            type: 'rotating-file',
            level: bunyan.WARN,     // log all warnings and above
            path: '/var/log/locator/error/error.log',
            period: '1d',   // daily rotation
            count: 14        // keep 14 back copies
        }
    ]
}).child({service: service});

const fns = {};

fns.fatal = log.fatal;

fns.error = log.error;

fns.warn = log.warn;

fns.info = log.info;

fns.debug = log.debug;

fns.trace = log.trace; // TOOD: does nothing, tbd

module.exports = fns;
