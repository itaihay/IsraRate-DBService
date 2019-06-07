'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let fields = {
    
    id: { 
		type: String, 
		mutable: true, 
		search: true,
		unique: true
	},
    
    user_id: { 
		type: String, 
		mutable: true, 
		search: true
	},
    
    created_at: { 
		type: Date,
		default: Date.now, 
		mutable: true, 
		search: true 
	},
    
    text: { 
		type: String, 
		mutable: true, 
		search: true
	},
    
    place: { 
		type: String, 
		mutable: true, 
		search: true
	},
    
    geo: { 
		type: Array, 
		mutable: true, 
		search: true
	},
    
    likes: { 
		type: Number, 
		mutable: true, 
		search: true
	},
    
    comments: { 
		type: Number, 
		mutable: true, 
		search: true
	},

		tag: { 
			type: Number, 
			default: -100,
			mutable: true, 
			search: true
}
    
};

let ModelSchema = new Schema(fields,{ collection: 'feeds' });

// Helper Functions 
ModelSchema.statics.GetFieldsByOption = function (fieldOptionName) {
    return Object.keys(this.schema.paths).filter(fld =>
        this.schema.paths[fld].options[fieldOptionName]
    );
};

module.exports = mongoose.model('Feed', ModelSchema);
