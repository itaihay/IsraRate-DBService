'use strict';

// Dependencies
const express = require('express'),
    router = express.Router(),
    ApiModule = 'users',
    ApiObj = require(`../apiObjects/${ApiModule}`),
    debug = require('debug')(`App:Api:${ApiModule}`),
    routeSanity = require('../middleware/routeSanity'),
    l = require('../config').util;

let api = {};

/* ========= [ CORE APIs ] ========= */

// GET RAW FEED COUNT
api.getUserById = async (req, res) => {
    var id = req.query.id;

    ApiObj.getUserById(id)
        .then(data => res.status(200).json(l.res(false, data)))
        .catch(err => res.status(500).json(l.res(err, [])));
};

/* =====================  ROUTES  ===================== */

router
    .route(`/${ApiModule}/GetUserById`)
    .get(api.getUserById);

module.exports = router;
