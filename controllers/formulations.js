const Formulation = require('../models/Formulation.js');

const formulationsController = {};

// List All
formulationsController.list = function(req, res) {
  Formulation.find({}).exec(function (err, formulations) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("formulations/index", {
        title: 'Formulations',
        formulations: formulations
      });
    }
  });
};

// Find by _id
formulationsController.show = function(req, res) {
  Formulation.findOne({_id: req.params.id}).exec(function (err, formulation) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("formulations/show", {
        title: 'Formulation Details',
        formulation: formulation
      });
    }
  });
};

// Create (redirect to form)
formulationsController.create = function(req, res) {
  res.render("formulations/create", {
    title: 'Create Formulation'
  });
};

// Save new Formulation
formulationsController.save = function(req, res) {
  var formulation = new Formulation(req.body);

  formulation.save(function(err) {
    if(err) {
      console.log(err);
      res.render("formulations/create");
    } else {
      console.log("Successfully created new Formulation.");
      res.redirect("/formulations/show/"+formulation._id);
    }
  });
};

// Edit Formulation
formulationsController.edit = function(req, res) {
  Formulation.findOne({_id: req.params.id}).exec(function (err, formulation) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("formulations/edit", {
        title: 'Edit Formulation',
        formulation: formulation
      });
    }
  });
};

// Update Formulation
formulationsController.update = function(req, res) {
  Formulation.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, formulation) {
    if (err) {
      console.log(err);
      res.render("formulations/edit", {
        title: 'Update Formulation',
        formulation: req.body
      });
    }
    res.redirect("/formulations/show/"+formulation._id);
  });
};

// Delete Formulation
formulationsController.delete = function(req, res) {
  Formulation.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Formulation deleted!");
      res.redirect("/formulations");
    }
  });
};

// Export controller.
module.exports = formulationsController;
