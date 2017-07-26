const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
  name: String
}, { timestamps: true });

const Insight = mongoose.model('Insight', insightSchema);

module.exports = Insight;
