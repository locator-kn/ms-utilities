'use strict';

const path = require('path');
const pwd = path.join(__dirname, '..', '/.env');
require('dotenv').config({path: pwd});

const Hoek = require('hoek');

const ObjectID = require('mongodb').ObjectID;


const fns = {
    reporter: require('./reporter'),
    slack: require('./slack')
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