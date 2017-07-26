const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
  name: String,
  // dashboardState: []   // Array holds JSON data object (index 0).
  dashboardState: { type: Schema.Types.ObjectId, ref: 'JsonData' }   // _id for document in sourcedata collection.
}, { timestamps: true });

const Insight = mongoose.model('Insight', insightSchema);

module.exports = Insight;
