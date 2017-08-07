// Create Controller Object.
const dashboardController = {};

// Define Controller Methods.
dashboardController.dashboard = (req, res) => {
  res.render('dashboard/dashboard', {
    title: 'Dashboard'
  });
};

// Export Controller.
module.exports = dashboardController;
