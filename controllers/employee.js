// Import Models.
const Employee = require('../models/Employee.js');

// Create Controller Object.
const employeeController = {};

// Define Controller Methods.

// List All
employeeController.list = function(req, res) {
  Employee.find({}).exec(function (err, employees) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("employees/index", {employees: employees});
    }
  });
};

// Find by _id
employeeController.show = function(req, res) {
  Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("employees/show", {employee: employee});
    }
  });
};

// Create (redirect to form)
employeeController.create = function(req, res) {
  res.render("employees/create");
};

// Save new Employee
employeeController.save = function(req, res) {
  var employee = new Employee(req.body);

  employee.save(function(err) {
    if(err) {
      console.log(err);
      res.render("employees/create");
    } else {
      console.log("Successfully created new Employee.");
      res.redirect("/employees/show/"+employee._id);
    }
  });
};

// Edit Employee
employeeController.edit = function(req, res) {
  Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("employees/edit", {employee: employee});
    }
  });
};

// Update Employee
employeeController.update = function(req, res) {
  Employee.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, employee) {
    if (err) {
      console.log(err);
      res.render("employees/edit", {employee: req.body});
    }
    res.redirect("/employees/show/"+employee._id);
  });
};

// Delete Employee
employeeController.delete = function(req, res) {
  Employee.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Employee deleted!");
      res.redirect("/employees");
    }
  });
};

// Export controller.
module.exports = employeeController;
