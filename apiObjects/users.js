'use strict';

// Dependencies
const Twitter = require('twitter'),
    api = {};

var client = new Twitter({
    consumer_key: 'Iegl84BRf5IkU2hHz4Fue6iUh',
    consumer_secret: 'ZdfiWfq70ApEMEcIIDvx1bhL6Lq0KKHAOi9WSTcaMPXglBwHUt',
    access_token_key: '1127609302284427264-r8xZx41oPiJAfyFwH7FP5lgQCV3Iam',
    access_token_secret: 'MHdSQPuZHczXle7cILLFN0NFZ7cZ6gwq0rShqVw1ubMmU'
});

const debug = require('debug')('App:ApiObject:feed');
//const l = require('../config').util;

const _ = require('lodash');

/*
========= [ CORE METHODS ] =========
*/

// getRawFeed
api.getUserById = (id) => {
    var params = {user_id: id};

    return client.get('users/show', params).then((user, response) => {
        // if (response.status >= 200)
        return user;
    }).catch(error => {
        console.error('An error occured', error);
        return error;
    });
};

module.exports = api;
