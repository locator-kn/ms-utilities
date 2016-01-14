var Slack = require('slack-node');


const fns = {};

fns.sendSlackError = (channel, text) => {
    var slack = new Slack();
    slack.setWebhook(channel);

    slack.webhook({
        text: JSON.stringify(text)
    });
};

module.exports = fns;
