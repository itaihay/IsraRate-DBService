'use strict';

// Dependencies
const express = require('express'),
    router = express.Router(),
    ApiModule = 'geo',
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
api.getAllGeoCountries = (req, res) => {

    ApiObj.get()
        .then(data => res.status(200).json(l.res(false, data)))
        .catch(err => res.status(500).json(l.res(err, [])));
};

/* =====================  ROUTES  ===================== */

router
    .route(`/${ApiModule}/GetGeoCountries`)
    .get(api.getAllGeoCountries);

module.exports = router;
