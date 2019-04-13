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
api.get = (isRaw,limit,fromDate,toDate) => {

    let res = {
        data: {},
        count: 0
    };

    let query = null;

    if(isRaw)
    {
        query = {"tag":-100};
    }
    else
    {
        if(fromDate && toDate)
        {
            query = 
            {
                "tag": {"$ne": -100},
                "created_at": {
                    "$gte":  new Date(fromDate).toISOString(),
                    "$lt":  new Date(toDate).toISOString()
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
    data.forEach((post) => {
        dataToSave = new Model(post);
        dataToSave.tag = -100; //TODO
        dataToSave.save()
            .then(() => dataToSave.toObject());
     });

    return true;
};

// PUT
api.edit = (dataArray) => {

    dataArray.tweets.array.forEach(updateData => {
    
        let finalData = {};
        ModelOptions.mutable.forEach(prop => {
            if (typeof updateData[prop] !== 'undefined') {
                finalData[prop] = updateData[prop];
            }
        });

        return Model.findOneAndUpdate({
                _id: id
            }, {
                $set: finalData
            }, {
                new: true
            })
            .then(data => {
                returnObj = returnObj && (data.toObject() || null);
            }); // eo Model.findOneAndUpdate
    });

    return returnObj;
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
