// Create Controller Object.
const dashboardController = {};

// Define Controller Methods.
dashboardController.dashboard = (req, res) => {
  res.render('dashboard/dashboard', {
    title: 'Dashboard'
  });
};

dashboardController.populate = (req, res) => {
  res.render('dashboard/populate', {
    title: 'Populate'
  });
};

// Export Controller.
module.exports = dashboardController;
