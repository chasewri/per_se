const User = require('../models/userModel');
const Recipe = require('../models/recipeModel');
const Category = require('../models/categoryModel')

module.exports = {
    index,
    new: newRecipe,
    myRecipes,
    create,
    show,
    
}
function show(req, res) {
    Recipe.findById(req.params.id, function(err, recipe) {
        res.render('recipes/show', {
            user: req.user,
            recipe: recipe
        });
    });
}

function newRecipe(req, res) {
    Category.find({}, function(err, categories) {  
        res.render('recipes/new', 
        { 
            user: req.user,
            title: 'Create a New Recipe',
            categories: categories
        })
    })
}
function index(req, res) {
    Recipe.find({}, function(err, recipes) {
        res.render('recipes/index', { user: req.user, recipes: recipes });
    })
}
function myRecipes(req, res) {
    Recipe.find({author: req.user._id}, function(err, recipes) {
        res.render('recipes/myRecipes', { 
            user: req.user, 
            recipes: recipes,
            title: 'My Recipe Collection' 
        });
    })
}
function create(req, res) {
    req.body.author = req.user._id;
    req.body.authorName = req.user.name;
    const newRecipe = new Recipe(req.body);
    newRecipe.save(function(err) {
        if (err) return res.redirect('/recipes/new');
        console.log(newRecipe);
        res.redirect('/recipes/myRecipes');
    })

}