const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Enseignant', 'Personnel'],
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
