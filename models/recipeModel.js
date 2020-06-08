const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./categoryModel");

const recipeSchema = new Schema(
  {
    updated: { type: Date, default: Date.now },
    name: {
      type: String,
      required: true,
    },
    imgUrl: String,
    ingredients: String,
    directions: String,
    description: String,
    category: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    authorName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
