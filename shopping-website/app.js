const express = require('express');
const bodyParser = require('body-parser');
const Sentiment = require('sentiment');

const app = express();
const PORT = process.env.PORT || 3000;
const sentiment = new Sentiment();

// Sample products data
const products = [
  { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 10, reviews: [] },
  { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 20, reviews: [] },
  { id: 3, name: 'Product 3', description: 'Description of Product 3', price: 30, reviews: [] }
];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username.length < 15 && password.length > 8) {
    res.redirect('/catalog');
  } else {
    res.send('Invalid username or password');
  }
});

app.get('/catalog', (req, res) => {
  res.render('catalog', { products });
});

app.get('/product/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(prod => prod.id === id);
  if (!product) {
    res.send('Product not found');
  } else {
    res.render('product', { product });
  }
});

app.post('/product/:id/review', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(prod => prod.id === id);
  if (!product) {
    res.send('Product not found');
  } else {
    const review = req.body.review;
    const analysis = sentiment.analyze(review);
    product.reviews.push({ text: review, sentiment: analysis });
    res.redirect(`/product/${id}`);
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
