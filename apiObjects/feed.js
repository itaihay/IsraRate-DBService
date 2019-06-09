'use strict';

// Dependencies
const mongoose = require('mongoose'),
    Model = require('../models/feed'),
    api = {};

const debug = require('debug')('App:ApiObject:feed');
//const l = require('../config').util;

const csvReader = require('csvtojson');
const _ = require('lodash');

const ModelOptions = {
    mutable: Model.GetFieldsByOption('mutable'),
    search: Model.GetFieldsByOption('search'),
};

const geoApi = require('./geo');


/*
========= [ CORE METHODS ] =========
*/

// getRawFeed
api.get = (isRaw, limit, fromDate, toDate) => {

    let res = {
        data: {},
        count: 0
    };

    let query = null;

    if (isRaw) {
        query = { "tag": -100 };
    }
    else {
        if (fromDate && toDate) {
            query =
                {
                    "tag": { "$ne": -100 },
                    "created_at": {
                        "$gte": new Date(fromDate).toISOString(),
                        "$lt": new Date(toDate).toISOString()
                    }
                };
        }
    }

    return Model.find(query)
        .limit(limit)
        .exec()
        .then((list) => {
            res.tweets = list;
            return Model.estimatedDocumentCount();
        })
        .then(count => {
            res.count = count;
            return res;
        });
};
// getRawFeed
api.getRandom = (date) => {

    let res = {
        data: {}
    };

    let query = null;

    if (!date) {
        query = ([
            { "$match": { "tag": { "$ne": -100 } } },
            { "$sample": { size: 1 } }
        ])
    }
    else {

        let fromDate = new Date(date);
        let toDate = new Date(date);


        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(23, 59, 59, 59);

        query = ([
            {
                "$match": {
                    "tag": { "$ne": -100 },
                    "created_at": {
                        "$gte": new Date(fromDate),
                        "$lt": new Date(toDate)
                    }
                }
            },
            { "$sample": { size: 1 } }
        ]);
    }

    return Model.aggregate(query)
        .exec()
        .then((list) => {
            res.tweets = list;
            return res;
        });
};


api.getScoreRange = (fromDate, toDate) => {
    return Model.find({ created_at: { $gte: fromDate, $lte: toDate }, tag: {$ne: -100} }).exec().then(function (docs, err) {
        if (err) console.error('error occur while trying to find feed: \n' + err);
        let feeds = docs.map(feed => feed._doc);
        let daysScore = [];
        feeds.forEach(feed => {
            //TODO: change to real score field when created
            daysScore.push({ date: getStringFullYear(feed.created_at), score: feed.tag });
        });

        // create scores array of dates with their scored data
        return _(daysScore).groupBy('date')
            .map((objs, key) => ({ 'date': key, 'score': _.sumBy(objs, 'score') }))
            .value();
    });
};


api.add = (data) => {
    if (data) {
        let newData = data.map(tweet => (
            {
                id: tweet.id_str,
                user_id: tweet.user.id_str,
                text: tweet.text,
                place: tweet.place,
                created_at: tweet.created_at,
                geo: tweet.geo,
                likes: tweet.favorite_count,
                comments: (tweet.in_reply_to_user_id_str ? tweet.in_reply_to_user_id_str.count : 0),
                tag: -100
            }));

        return Model.insertMany(newData);
    }

    throw "No Data!";
};

// PUT
api.setTagArray = (dataArray) => {
    return Promise.all(
        dataArray.map(updateData => {

            Model.findOneAndUpdate({
                id: updateData.id
            }, {
                    $set: { "tag": updateData.tag }
                }, {

                })
                .then(data => {
                    (data.toObject() || null);
                });

            if (updateData.place != null && updateData.tag !== 0) {
                let promise = geoApi.handleNewGeoCountry(updateData);
            }
        })
    );
};

/*
========= [ TOOLS ] =========
*/

api.dataResultMap = (jsonObjArr) => {
    return {
        total: jsonObjArr.length,
        _ids: jsonObjArr.map(x => x._id)
    };
};

function getStringFullYear(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

module.exports = api;
