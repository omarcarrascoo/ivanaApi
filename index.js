const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/user.route")
const authRoutes = require("./routes/auth.route")
const productsRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.route")
const ordersRoutes = require("./routes/order.route")
const productImageRoutes = require ("./routes/productImages.route.js")
const eventRoutes = require("./routes/events.route")
const cors = require('cors');
const path = require('path');



const app = express()
app.use(cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:3000', 'http://localhost:8000','http://143.110.234.115', 'http://localhost:3001']
  }));
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB CONNECTED SUCCESFULLY"))
    .catch((err) => {
        console.error(err);
    })
app.use(express.json())
app.use('/public', express.static('public'));
// Serve panel and view files
app.use('/panel', express.static(path.join(__dirname, 'panel')));
app.use(express.static(path.join(__dirname, 'view')));
//ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", ordersRoutes);
app.use('/api/productImage', productImageRoutes);
app.use('/api/events', eventRoutes);


// Serve panel and view routes
app.get('/panel/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'panel/index.html'));
  });
  
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/index.html'));
  });

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
})