'use strict';

const bunyan = require('bunyan');
const BunyanSlack = require('bunyan-slack');

let log = {};


// check if process runs on travis
if (!process.env.travis) {

    const service = require('../../../package.json').name;

    log = bunyan.createLogger({
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
                // log everthing above level warning to rotating file
                type: 'rotating-file',
                level: bunyan.WARN,     // log all warnings and above
                path: '/var/log/locator/error/error_' + service + '.log',
                period: '7d',   // rotate after a week
                count: 2        // keep 2 back copies
            },
            {
                // send fatal errors to slack
                stream: new BunyanSlack({
                    webhook_url: process.env['SLACK_ERROR_CHANNEL']
                }),
                level: process.env['SLACK_LOGLEVEL'] || bunyan.FATAL
            }
        ]
    }).child({service: service});


} else {

    // travis --> use "normal" logger
    log = bunyan.createLogger({name: 'travis_locator'});

}

module.exports = log;
