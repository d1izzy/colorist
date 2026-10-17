const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const pricePath = path.join(__dirname, '../data/price.json');

router.get('/', function(req, res) {
  res.render('index', { title: 'Мастер-колорист Настя | Челябинск' });
});

router.get('/price', function(req, res) {
  const price = JSON.parse(fs.readFileSync(pricePath, 'utf-8'));
  res.render('price', { title: 'Прайс-лист | Окрашивания', price: price });
});

router.post('/booking', function(req, res) {
  console.log('Новая заявка:', req.body);
  res.json({ status: 'ok', message: 'Заявка принята! Мы свяжемся с вами.' });
});

module.exports = router;
