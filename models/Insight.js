const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
  name: String
  // Need to develop schema for insight model.
}, { timestamps: true });

const Insight = mongoose.model('Insight', insightSchema);

module.exports = Insight;
