'use strict';

const fns = {};

const noop = () => {};

fns.getReporterAct = function(msg, next) {
    this.prior(msg, next);
    msg.origin_role = msg.role;
    msg.role = 'reporter';

    this.act(msg, noop);
};

module.exports = fns;