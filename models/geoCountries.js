'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let fields = {

    type: {
        type: String,
        mutable: true,
        search: true,
    },

    id: {
        type: String,
        mutable: true,
        search: true
    },

    properties: {
        type: Object,
        mutable: true,
        search: true
    },

    geometry: {
        type: Object,
        mutable: true,
        search: true
    }
};

let ModelSchema = new Schema(fields,{ collection: 'geoCountries' });

// Helper Functions
ModelSchema.statics.GetFieldsByOption = function (fieldOptionName) {
    return Object.keys(this.schema.paths).filter(fld =>
        this.schema.paths[fld].options[fieldOptionName]
    );
};

module.exports = mongoose.model('GeoCountries', ModelSchema);
