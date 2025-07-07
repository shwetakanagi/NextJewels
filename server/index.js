const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require('./routes/cart');

const ordersRoutes = require('./routes/orders');



const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/products", productRoutes);
app.use('/api/users', require('./routes/users'));


const authRoutes = require('./routes/authRoutes'); // ✅ import

// ✅ Mount the auth routes
app.use('/api/auth', authRoutes);

app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);

app.use('/api/admin/products', require('./routes/adminProducts'));
app.use('/api/admin/orders', require('./routes/adminOrders'));
app.use('/api/admin/users', require('./routes/adminUsers'));
// app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
