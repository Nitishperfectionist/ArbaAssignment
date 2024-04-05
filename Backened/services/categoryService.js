const Category = require('../models/Category');

exports.createCategory = async ({ name, slug, image, owner }) => {
  try {
    const category = new Category({
      name,
      slug,
      image,
      owner
    });
    await category.save();
    return 'Category created successfully';
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getCategories = async () => {
  try {
    return await Category.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getCategoryById = async (id) => {
  try {
    return await Category.findById(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateCategory = async (id, { name, slug, image }) => {
  try {
    return await Category.findByIdAndUpdate(id, { name, slug, image }, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteCategory = async (id) => {
  try {
    return await Category.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};
