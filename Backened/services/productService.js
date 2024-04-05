const Product = require('../models/Product');

exports.createProduct = async ({ title, description, price, category, image, owner }) => {
  try {
    const product = new Product({
      title,
      description,
      price,
      category,
      image,
      owner
    });
    await product.save();
    return 'Product created successfully';
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getProducts = async () => {
  try {
    return await Product.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getProductById = async (id) => {
  try {
    return await Product.findById(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateProduct = async (id, { title, description, price, category, image }) => {
  try {
    return await Product.findByIdAndUpdate(id, { title, description, price, category, image }, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteProduct = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};
