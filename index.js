'use strict';

const Hoek = require('hoek');

const ObjectID = require('mongodb').ObjectID;


const fns = {
    reporter: require('./lib/reporter'),
    slack: require('./lib/slack'),
    logger: require('./lib/logger')
};


fns.decorateNewDateData = (target) => {
    let isoDate = new Date().toISOString();
    return Hoek.merge(target, {
        create_date: isoDate,
        modified_date: isoDate
    });
};

fns.updateModifiedDate = (target) => {
    return Hoek.merge(target, {
        $currentDate: {
            modified_date: true
        }
    });
};

fns.safeObjectId = (objectIdString, idType) => {

    idType = idType || 'id';

    return new Promise((resolve) => {
        resolve(new ObjectID(objectIdString));

    }).catch(() => {
        throw new Error('Invalid ' + idType);
    });
};

module.exports = fns;
