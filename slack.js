var Slack = require('slack-node');


const fns = {};

fns.sendSlackError = (channel, text) => {
    var slack = new Slack();
    slack.setWebhook(channel);

    slack.webhook({
        text: JSON.stringify(text)
    }, (err) => {
        if (err) {
            console.log(err);
        }
    });
};

module.exports = fns;
