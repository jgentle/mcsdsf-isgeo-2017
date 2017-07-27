const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const insightSchema = new mongoose.Schema({
  name: String,
  description: String,
  configurationData_id: { type: Schema.Types.ObjectId, ref: 'DataSource' },   // _id for subdocument in datasources collection.
  insightData_id: { type: Schema.Types.ObjectId, ref: 'DataSource' },   // _id for subdocument in datasources collection.
  isValidated: Boolean   // check to ensure all subsubdocuments have been validated.
}, { timestamps: true });

const Insight = mongoose.model('Insight', insightSchema);

module.exports = Insight;
