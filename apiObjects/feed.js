'use strict';

// Dependencies
const mongoose = require('mongoose'),
    Model = mongoose.models.Feed,
    api = {};

const debug = require('debug')('App:ApiObject:feed');
//const l = require('../config').util;

const csvReader = require('csvtojson');

const ModelOptions = {
    mutable: Model.GetFieldsByOption('mutable'),
    search: Model.GetFieldsByOption('search'),
};


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

// Add (array)
api.add = (data) => {
    return Model.insertMany(data);
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
                    new: true
                })
                .then(data => {
                    (data.toObject() || null);
                });
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

module.exports = api;
