
const { getDB } = require('../db');

function getProductCollection() {
  return getDB().collection('products');
}

module.exports = { getProductCollection };
