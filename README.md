# Projet d'API REST - Comparaison Node.js vs Express.js

Ce projet présente deux implémentations d'une API REST pour la gestion de produits :
1. Une version utilisant Node.js vanilla (pur)
2. Une version utilisant le framework Express.js

## Structure du Projet

```
.
├── server.js              # Version Node.js vanilla
├── express-app/           # Version Express.js
│   ├── server.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── .env
```

## Comparaison des Deux Versions

### 1. Configuration du Serveur

**Node.js Vanilla :**
```javascript
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;
  // Gestion manuelle des routes
});
```

**Express.js :**
```javascript
const app = express();
// Configuration simple et claire
app.use(express.json());
app.use(cors());
```

### 2. Gestion des Routes

**Node.js Vanilla :**
```javascript
if (path === '/products' && method === 'GET') {
  await getAllProducts(res);
} else if (path === '/products' && method === 'POST') {
  await addProduct(req, res);
}
```

**Express.js :**
```javascript
router.route('/products')
  .get(getAllProducts)
  .post(createProduct);
```

### 3. Traitement des Requêtes

**Node.js Vanilla :**
```javascript
let body = '';
req.on('data', chunk => body += chunk);
req.on('end', async () => {
  const product = JSON.parse(body);
  // Traitement
});
```

**Express.js :**
```javascript
app.post('/products', async (req, res) => {
  const product = req.body; // Déjà parsé
  // Traitement
});
```

### 4. Avantages et Inconvénients

#### Node.js Vanilla
**Avantages :**
- Contrôle total sur l'implémentation
- Pas de dépendances externes
- Parfait pour comprendre les bases

**Inconvénients :**
- Plus de code à écrire
- Gestion manuelle de nombreux aspects
- Plus difficile à maintenir

#### Express.js
**Avantages :**
- Code plus concis et lisible
- Middleware prêts à l'emploi
- Meilleure organisation
- Grande communauté

**Inconvénients :**
- Moins de contrôle sur certains aspects
- Dépendance à un framework
- Courbe d'apprentissage initiale

## Installation et Utilisation

### Prérequis
- Node.js
- MongoDB
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [url-du-projet]

# Installer les dépendances
npm install

# Pour la version Express
cd express-app
npm install
```

### Démarrage
```bash
# Version Node.js vanilla
node server.js

# Version Express
cd express-app
npm run dev
```

## API Endpoints

Les deux versions implémentent les mêmes endpoints :

- `GET /products` - Récupérer tous les produits
- `POST /products` - Créer un nouveau produit
- `GET /products/:id` - Récupérer un produit par ID
- `PUT /products/:id` - Mettre à jour un produit
- `DELETE /products/:id` - Supprimer un produit

## Conclusion

Ce projet démontre comment le même besoin peut être implémenté de deux façons différentes. Le choix entre Node.js vanilla et Express.js dépendra des besoins spécifiques du projet :

- Pour des applications simples ou pour l'apprentissage : Node.js vanilla
- Pour des applications plus complexes ou en production : Express.js 