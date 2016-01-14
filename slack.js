var Slack = require('slack-node');


const fns = {};

fns.sendSlackError = (text) => {
    var slack = new Slack();
    slack.setWebhook(process.env['SLACK_ERROR_CHANNEL']);

    slack.webhook({
        text: JSON.stringify(text)
    });
};

module.exports = fns;
