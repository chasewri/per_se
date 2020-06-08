const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');

module.exports = {
  index,
};

function index(req, res, next) {

  Recipe.find({})
  .limit(6)
  .sort({ updatedAt: -1 })
  .exec(function(err, recipes) {
    res.render('index', { 
      title: 'Per Se Recipes',
      heroId: 'index-hero',
      recipes: recipes,
      user: req.user,
    });
  });
}