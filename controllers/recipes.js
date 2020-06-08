const User = require("../models/userModel");
const Recipe = require("../models/recipeModel");
const Category = require("../models/categoryModel");

module.exports = {
  index,
  new: newRecipe,
  myRecipes,
  create,
  show,
  edit,
  update,
  delete: deleteOne,
};

function deleteOne(req, res) {
  Recipe.findByIdAndDelete(req.params.id, function (err) {
    res.redirect("/recipes/myrecipes");
  });
}

function edit(req, res) {
  Recipe.findById(req.params.id, function (err, recipe) {
    Category.find({}, function (err, categories) {
      res.render("recipes/update", {
        user: req.user,
        recipe: recipe,
        title: `Edit ${recipe.name}`,
        categories: categories,
      });
    });
  });
}

function update(req, res) {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (
    err
  ) {
    res.redirect("/recipes/myrecipes");
  });
}

function show(req, res) {
  Recipe.findById(req.params.id, function (err, recipe) {
    res.render("recipes/show", {
      user: req.user,
      recipe: recipe,
    });
  });
}

function newRecipe(req, res) {
  Category.find({}, function (err, categories) {
    res.render("recipes/new", {
      user: req.user,
      title: "Create a New Recipe",
      categories: categories,
    });
  });
}
function index(req, res) {
  Recipe.find({})
  .sort({ updatedAt: -1 })
  .exec(function(err, recipes) {
    res.render("recipes/index", {
       user: req.user, 
       recipes: recipes,
       title: 'Newest Recipes' 
      });
  });
}
function myRecipes(req, res) {
  Recipe.find({ author: req.user._id }, function (err, recipes) {
    res.render("recipes/myRecipes", {
      user: req.user,
      recipes: recipes,
      title: "My Recipe Collection",
    });
  });
}
function create(req, res) {
  req.body.author = req.user._id;
  req.body.authorName = req.user.name;
  const newRecipe = new Recipe(req.body);
  newRecipe.save(function (err) {
    if (err) return res.redirect("/recipes/new");
    console.log(newRecipe);
    res.redirect("/recipes/myRecipes");
  });
}
