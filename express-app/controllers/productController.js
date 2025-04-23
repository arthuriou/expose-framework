const Product = require('../models/Product');

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits', error });
  }
};

// Créer un nouveau produit
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du produit', error });
  }
};

// Récupérer un produit par son ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du produit', error });
  }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du produit', error });
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit', error });
  }
}; 