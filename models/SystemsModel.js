const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const systemsModelSchema = new mongoose.Schema({
  name: String,
  // dashboardState: []   // Array holds JSON data object (index 0).
  modelData_id: { type: Schema.Types.ObjectId, ref: 'JsonData' }   // _id for document in sourcedata collection.
}, { timestamps: true });

const SystemsModel = mongoose.model('SystemsModel', systemsModelSchema);

module.exports = SystemsModel;
