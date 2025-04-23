// Description: This is the main server file that sets up the HTTP server and routes requests to the appropriate controller functions.
const http = require('http');
const url = require('url');
const { connectDB } = require('./db');
const {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProduct
} = require('./controllers/productController');

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  if (path === '/products' && method === 'GET') {
    await getAllProducts(res);
  } else if (path === '/products' && method === 'POST') {
    await addProduct(req, res);
  } else if (path.startsWith('/products/') && method === 'DELETE') {
    const id = path.split('/')[2];
    await deleteProduct(req, res, id);
  } else if (path.startsWith('/products/') && method === 'PUT') {
    const id = path.split('/')[2];
    await updateProduct(req, res, id);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

connectDB().then(() => {
  server.listen(3000, () => {
    console.log('🚀 Serveur lancé sur http://localhost:3000');
  });
});
