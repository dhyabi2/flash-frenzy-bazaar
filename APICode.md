```javascript
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const BOOKMARKS_FILE = path.join(DATA_DIR, 'bookmarks.json');
const LIKES_FILE = path.join(DATA_DIR, 'likes.json');

// Ensure data directory exists
fs.mkdir(DATA_DIR, { recursive: true }).catch(console.error);

// Helper function to read JSON file
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Helper function to write JSON file
async function writeJsonFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await readJsonFile(PRODUCTS_FILE);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// Add a new product
app.post('/api/products', async (req, res) => {
  try {
    const products = await readJsonFile(PRODUCTS_FILE);
    const newProduct = {
      id: Date.now(),
      ...req.body,
      likes: 0
    };
    products.push(newProduct);
    await writeJsonFile(PRODUCTS_FILE, products);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const products = await readJsonFile(PRODUCTS_FILE);
    const updatedProducts = products.filter(product => product.id !== parseInt(req.params.id));
    await writeJsonFile(PRODUCTS_FILE, updatedProducts);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Get all bookmarks
app.get('/api/bookmarks', async (req, res) => {
  try {
    const bookmarks = await readJsonFile(BOOKMARKS_FILE);
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve bookmarks' });
  }
});

// Add a bookmark
app.post('/api/bookmarks', async (req, res) => {
  try {
    const bookmarks = await readJsonFile(BOOKMARKS_FILE);
    const newBookmark = req.body;
    bookmarks.push(newBookmark);
    await writeJsonFile(BOOKMARKS_FILE, bookmarks);
    res.status(201).json(newBookmark);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add bookmark' });
  }
});

// Remove a bookmark
app.delete('/api/bookmarks/:id', async (req, res) => {
  try {
    const bookmarks = await readJsonFile(BOOKMARKS_FILE);
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== parseInt(req.params.id));
    await writeJsonFile(BOOKMARKS_FILE, updatedBookmarks);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove bookmark' });
  }
});

// Add a like
app.post('/api/likes', async (req, res) => {
  try {
    const { productId, ip } = req.body;
    const likes = await readJsonFile(LIKES_FILE);
    const products = await readJsonFile(PRODUCTS_FILE);

    const existingLike = likes.find(like => like.productId === productId && like.ip === ip);
    if (existingLike) {
      return res.status(400).json({ error: 'Already liked' });
    }

    likes.push({ productId, ip });
    await writeJsonFile(LIKES_FILE, likes);

    const product = products.find(p => p.id === productId);
    if (product) {
      product.likes = (product.likes || 0) + 1;
      await writeJsonFile(PRODUCTS_FILE, products);
    }

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add like' });
  }
});

// Get likes for a product
app.get('/api/likes/:productId', async (req, res) => {
  try {
    const likes = await readJsonFile(LIKES_FILE);
    const productLikes = likes.filter(like => like.productId === parseInt(req.params.productId));
    res.json({ count: productLikes.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve likes' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```