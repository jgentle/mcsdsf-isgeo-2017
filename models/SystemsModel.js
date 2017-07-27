const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const systemsModelSchema = new mongoose.Schema({
  name: String,
  description: String,
  modelData_id: { type: Schema.Types.ObjectId, ref: 'DataSource' },   // _id for document in datasources collection.
  configurations: [{ type: Schema.Types.ObjectId, ref: 'SystemsModelConfiguration' }]   // Array of subdocument _ids in the systemsModelConfigurations collection.
}, { timestamps: true });

const SystemsModel = mongoose.model('SystemsModel', systemsModelSchema);

module.exports = SystemsModel;
