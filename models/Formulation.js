const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formulationSchema = new mongoose.Schema({
  name: String,
  description: String,
  configurations: [{ type: Schema.Types.ObjectId, ref: 'FormulationConfiguration' }],   // Array of subdocument _ids in the formulationConfigurations collection.
  insights: [{ type: Schema.Types.ObjectId, ref: 'Insight' }]   // Array of subdocument _ids in the insights collection.
}, { timestamps: true });

const Formulation = mongoose.model('Formulation', formulationSchema);

module.exports = Formulation;
