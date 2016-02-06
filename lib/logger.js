'use strict';

const bunyan = require('bunyan');
const BunyanSlack = require('bunyan-slack');


const service = require('../../../package.json').name;

let log = bunyan.createLogger({
    name: 'locator',
    src: process.env['NODE_ENV'] != 'production', // don't log source in production, cause its slow
    serializers: {
        err: bunyan.stdSerializers.err  // pretty error messages
    },
    streams: [
        {
            // log everything above level debug to console
            stream: process.stdout,
            level: bunyan.DEBUG
        },
        {
            // log everything above level warning to rotating file
            type: 'rotating-file',
            level: process.env['FILE_LOGLEVEL'] || 100,     // log all warnings and above
            path: (process.env['PATH_LOGFILE_ERROR'] || '/' ) + service + '.log',
            period: '7d',   // rotate after a week
            count: 2        // keep 2 back copies
        },
        {
            // send fatal errors to slack
            stream: new BunyanSlack({
                webhook_url: process.env['SLACK_ERROR_CHANNEL'] || ' '
            }),
            level: process.env['SLACK_LOGLEVEL'] || 100
        }
    ]
}).child({service: service});


module.exports = log;
