'use strict';

const fns = {};

fns.get = function(msg, next) {
    console.log(msg || next);
};

module.exports = fns;