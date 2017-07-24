const Formulation = require('../models/Formulation.js');

const formulationController = {};

// List All
formulationController.list = function(req, res) {
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
formulationController.show = function(req, res) {
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
formulationController.create = function(req, res) {
  res.render("formulations/create", {
    title: 'Create Formulation'
  });
};

// Save new Formulation
formulationController.save = function(req, res) {
  var formulation = new Formulation(req.body);

  formulation.save(function(err) {
    if(err) {
      console.log(err);
      res.render("formulations/create");
    } else {
      console.log("Successfully created an formulation.");
      res.redirect("/formulations/show/"+formulation._id);
    }
  });
};

// Edit Formulation
formulationController.edit = function(req, res) {
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
formulationController.update = function(req, res) {
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
formulationController.delete = function(req, res) {
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
module.exports = formulationController;
