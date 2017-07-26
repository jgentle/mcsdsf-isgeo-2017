// Create Controller Object.
const informationController = {};

// Define Controller Methods.
informationController.tutorial = (req, res) => {
  res.render('information/tutorial', {
    title: 'Tutorial'
  });
};

informationController.faq = (req, res) => {
  res.render('information/faq', {
    title: 'FAQs'
  });
};


informationController.about = (req, res) => {
  res.render('information/about', {
    title: 'About'
  });
};

// Export Controller.
module.exports = informationController;
