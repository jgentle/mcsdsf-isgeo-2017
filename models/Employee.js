// const bcrypt = require('bcrypt-nodejs');
// const crypto = require('crypto');
const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
  name: String,
  address: String,
  position: String,
  salary: Number,
  updated_at: { type: Date, default: Date.now },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
