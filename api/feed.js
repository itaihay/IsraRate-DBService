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

    ApiObj.get(false, limit)
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
api.postScoreData = (req, res) => {
    return ApiObj.edit(req.params.id, req.body.data)
        .then(data => res.status(200).json(l.res(false, data)))
        .catch(err => res.status(err === 404 ? 404 : 500).json(l.res(err, null)));
};

/* ========= [ SEARCH APIs ] ========= */

// SEARCH
api.search = (req, res) => {
    var skip = req.query.skip || null,
        limit = req.query.limit || 10,
        keyword = req.query.keyword || '',
        strict = l.parseBoolean(req.query.strict) || false;

    let k = {};
    keyword.split(',').forEach(kw => {
        let k1 = kw.split(':');
        k[k1[0]] = k1[1];
    });

    ApiObj.search(skip, limit, k, strict)
        .then(data => res.status(200).json(l.res(false, data)))
        .catch(err => res.status(err === 404 ? 404 : 500).json(l.res(err, null)));
};

// SEARCH ADVANCED
api.searchAdvanced = (req, res) => {
    var skip = req.query.skip || 0,
        limit = req.query.limit || 10;

    return ApiObj.searchAdvanced(skip, limit, req.body.data)
        .then(data => res.status(200).json(l.res(false, data)))
        .catch(err => res.status(err === 404 ? 404 : 500).json(l.res(err, null)));
};


/* ========= [ BULK APIs ] ========= */

// ADD BULK
api.addBulk = (req, res) => {
    return ApiObj.addBulk(req.file)
        .then(data => res.status(201).json(l.res(false, data)))
        .catch(err => res.status(500).json(l.res(err, null)));
};

// EDIT BULK
api.editBulk = (req, res) => {
    return ApiObj.editBulk(req.body.data, req.file)
        .then(data => res.status(200).json(l.res(false, data)))
        .catch(err => res.status(err === 404 ? 404 : 500).json(l.res(err, null)));
};

// DELETE BULK
api.deleteBulk = (req, res) => {
    return ApiObj.deleteBulk()
        .then(data => res.status(200).json(l.res(false, data)))
        .catch(err => res.status(err === 404 ? 404 : 500).json(l.res(err, null)));
};


/* =====================  ROUTES  ===================== */

router.post(`/${ApiModule}`, routeSanity.checkData, api.add);

/* router
    .route(`/${ApiModule}/:id`)
    .get(api.get)
    .put(routeSanity.checkData, api.edit)
    .delete(api.delete); */

router
    .route(`/${ApiModule}/GetRawFeedCount`)
    .get(api.getRawFeedCount);

router
.route(`/${ApiModule}/postScoreData`)
.post(api.postScoreData);

/* router
    .route(`/${ApiModule}s`)
    .get(api.getAll)
    .post(upload.single('file'), routeSanity.checkFile, api.addBulk)
    .put(routeSanity.checkData, upload.single('file'), routeSanity.checkFile, api.editBulk)
    .delete(api.deleteBulk); */

router.route(`/${ApiModule}s/search`)
    .get(api.search)
    .post(routeSanity.checkData, api.searchAdvanced);

router.get(`/${ApiModule}s/test`, (req, res) => {
    return ApiObj.test()
        .then(data => res.status(200).json(l.res(false, data)))
        .catch(err => res.status(err === 404 ? 404 : 500).json(l.res(err, null)));
});

router.get(`/${ApiModule}s/ScoreRange`, function (req, res) {
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
