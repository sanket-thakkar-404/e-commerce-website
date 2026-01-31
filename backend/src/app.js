const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')


const userRoutes = require('./routes/users.routes')
const productRoutes = require('./routes/product.routes')
const orderRoutes = require('./routes/orders.routes')
const ownerRoutes = require('./routes/owner.routes')
const wishlistRoutes = require('./routes/wishlist.routes')

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send("server is running for e-commerce")
})



app.use('/api/users', userRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);


module.exports = app;