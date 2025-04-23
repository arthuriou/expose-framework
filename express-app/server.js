const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Connexion à MongoDB avec options
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    // Démarrage du serveur uniquement après la connexion à MongoDB
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erreur de connexion à MongoDB:', err);
    process.exit(1); // Arrête l'application en cas d'échec de connexion
  }); 