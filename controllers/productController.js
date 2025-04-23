// Description: Ce fichier contient les fonctions de gestion des produits.
// Il gère les opérations CRUD (Create, Read, Update, Delete) pour les produits.
// Importation des modules nécessaires

const { getProductCollection } = require('../models/productModel');
const { ObjectId } = require('mongodb');


async function getAllProducts(res) {
  const products = await getProductCollection().find().toArray();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(products));
}

async function addProduct(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    const product = JSON.parse(body);
    await getProductCollection().insertOne(product);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Produit ajouté' }));
  });
}

async function deleteProduct(req, res, id) {
  try {
    await getProductCollection().deleteOne({ _id: new ObjectId(id) });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Produit supprimé' }));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Erreur lors de la suppression', error: err.message }));
  }
}

async function updateProduct(req, res, id) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    try {
      const updates = JSON.parse(body);
      const result = await getProductCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: updates }
      );
      if (result.modifiedCount === 1) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Produit mis à jour' }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Produit non trouvé' }));
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Erreur lors de la mise à jour', error: err.message }));
    }
  });
}

module.exports = { getAllProducts, addProduct, deleteProduct, updateProduct };
