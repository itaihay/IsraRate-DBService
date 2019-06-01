'use strict';

// Dependencies
const express = require('express'),
    router = express.Router(),
    ApiModule = 'feed',
    ApiObj = require(`../apiObjects/${ApiModule}`),
    debug = require('debug')(`App:Api:${ApiModule}`),
    routeSanity = require('../middleware/routeSanity'),
    l = require('../config').util;

const multer = require('multer'),
    upload = multer({
        dest: '/tmp/',
        limits: {
            fileSize: 1 * 1000 * 1000 * 25
        }
    });

let api = {};

/* ========= [ CORE APIs ] ========= */

// GET RAW FEED COUNT
api.getRawFeedCount = (req, res) => {
    var limit = (req.query.limit || 10) * 1;

    ApiObj.get(true, limit, null, null)
        .then(data => res.status(200).json(l.res(false, data)))
        .catch(err => res.status(500).json(l.res(err, [])));
};

// getscoredfeed
api.getScoredFeedDates = (req, res) => {
    var limit = (req.query.limit || 10) * 1;
    ApiObj.get(false, limit,req.query.from,req.query.to)
        .then(data => res.status(200).json(l.res(false, data)))
        .catch(err => res.status(500).json(l.res(err, [])));
};

// getRandomFeed
api.getRandomFeed = (req, res) => {
    ApiObj.getRandom(req.query.date)
        .then(data => res.status(200).json(l.res(false, data)))
        .catch(err => res.status(500).json(l.res(err, [])));
};

// POST
api.add = (req, res) => {
    ApiObj.add(req.body.data)
        .then(data => res.status(201).json(l.res(false, data)))
        .catch(err => res.status(500).json(l.res(err, null)));
};

// PUT
api.setTagArray = (req, res) => {
    ApiObj.setTagArray(req.body.tweets)
        .then(data => res.status(200).json(l.res(false, data)))
        .catch(err => res.status(err === 404 ? 404 : 500).json(l.res(err, null)));
};

/* =====================  ROUTES  ===================== */

router
    .route(`/${ApiModule}/GetRawFeedCount`)
    .get(api.getRawFeedCount);

router
    .route(`/${ApiModule}/Add`)
    .post(api.add);

router
    .route(`/${ApiModule}/SetScore`)
    .post(api.setTagArray);

router
    .route(`/${ApiModule}/GetScoredFeed`)
    .get(api.getScoredFeedDates);

    router
    .route(`/${ApiModule}/GetRandomFeed`)
    .get(api.getRandomFeed);


router.get(`/${ApiModule}/ScoreRange`, function (req, res) {
    let fromDate = req.query.fromDate;
    let toDate   = req.query.toDate;

    if (fromDate) {
        fromDate = Date.parse(fromDate);
        if (toDate) {
            toDate = Date.parse(toDate);
        } else {
            toDate = Date.now();
        }
    }

    if (isNaN(fromDate) || isNaN(toDate)) {
        res.sendStatus(400);
    } else {
        ApiObj.getScoreRange(fromDate, toDate)
            .then(data => {res.json(data)})
            .catch(err => res.status(err === 404 ? 404 : 500).json(l.res(err, [])));
    }
});

module.exports = router;
