const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true"`;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Amazon-Turkey Scraper API');
});

// Get Product Details
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com.tr/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {}
});

// Get Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com.tr/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {}
});

// Get Product Offers
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com.tr/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {}
});

// Get Search Results
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com.tr/s?k=${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (error) {}
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
