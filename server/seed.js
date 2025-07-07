const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const seedProducts = [
  {
    name: "Diamond Ring",
    price: 899,
    image: "https://www.25karats.com/jewelry-assets/pi/241040/thumb_250/wb1676.jpg",
    description: "Elegant diamond ring in 18K white gold.",
    category: "Rings",
    stock: 10,
  },
  {
    name: "Gold Necklace",
    price: 1299,
    image: "https://cdn1.jewelxy.com/live/img/business_product/360x360/Fqyzmaw7rO_20230214155408.jpg",
    description: "Traditional handcrafted gold necklace.",
    category: "Necklaces",
    stock: 7,
  },
  {
    name: "Silver Bracelet",
    price: 399,
    image: "https://kapal-laut.com/image/cache/catalog/KL/part_pics/SVPU22-250x250.jpg",
    description: "Sterling silver bracelet with minimal design.",
    category: "Bracelets",
    stock: 15,
  },
  {
    name: "Pearl Earrings",
    price: 499,
    image: "https://www.prouds.com.au/content/products/9ct-gold-cultured-fresh-water-pearl-drop-earrings-7689019-46430.jpg?canvas=1:1&auto=webp&optimize=high&width=375",
    description: "Freshwater pearls with gold hooks.",
    category: "Earrings",
    stock: 20,
  },
  {
  name: "Sapphire Ring",
  price: 799,
  image: "https://image.made-in-china.com/202f0j00liRVYhoWqBUf/925-Sterling-Silver-Ring-with-Small-Synthetic-Blue-Sapphire-Gemstone.webp",
  description: "Beautiful sapphire gemstone set in sterling silver.",
  category: "Rings",
  stock: 8,
},
{
  name: "Vintage Gold Pendant Necklace",
  price: 1399,
  image: "https://www.giva.co/cdn/shop/files/GDLPD035_1_1.jpg?v=1718687088&width=533",
  description: "Classic vintage pendant on a 14K gold chain.",
  category: "Necklaces",
  stock: 6,
},

{
  name: "Hoop Pearl Earrings",
  price: 549,
  image: "https://cdn.lisaangel.co.uk/image/cache/data/product-images/aw24/gr/pearl-drop-crystal-huggie-earrings-gold-4x3a2940c-opy-515x515.jpeg",
  description: "Elegant pearl earrings in classic hoop design.",
  category: "Earrings",
  stock: 18,
},
{
  name: "Rose Gold Band Ring",
  price: 699,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1U8nwSsNu-EOC6I86cvA9ktm4gHBFmPdHVA&s",
  description: "Simple rose gold band perfect for everyday wear.",
  category: "Rings",
  stock: 10,
},

{
  name: "Silver Charm Bracelet",
  price: 349,
  image: "https://www.thbaker.co.uk/pub/media/catalog/product/cache/0ee981ced8981837e32dc220b2727cd1/0/6/06-03-25120444_thomas-sabo_01.jpg",
  description: "Sterling silver bracelet with assorted charms.",
  category: "Bracelets",
  stock: 20,
},
{
  name: "Gold Drop Earrings",
  price: 479,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37JhcLFdTzxWpTEZp31EnC3QWjJ-A16o4Yg&s",
  description: "Elegant gold drop earrings with smooth finish.",
  category: "Earrings",
  stock: 22,
},
{
    name: "Gold Chain Necklace",
    price: 1299,
    image: "https://image.made-in-china.com/391f0j00jvhkfLuCHtgs/Luxury-Four-Leaf-Clover-18K-Gold-Stainless-Steel-Necklaces-Pendant-for-Gift-Women-prime-S-Day.webp",
    description: "Elegant 18K gold chain necklace with a minimalist design.",
    category: "Necklaces",
    stock: 12,
  },
  {
    name: "Gold Chain Bracelet",
    price: 599,
    image: "https://embellishgold.com/cdn/shop/collections/thin-chain-and-pendent-18k-gold-bracelets-for-women-product-shoot-with-light-pink-cloth-background--339576853.png?crop=center&height=1200&v=1707200800&width=1200",
    description: "Classic 18K gold chain bracelet for a timeless look.",
    category: "Bracelets",
    stock: 10,
  },

];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Clear existing products
    await Product.deleteMany({});
    // Insert seed products
    await Product.insertMany(seedProducts);
    console.log("Database seeded");

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
}

seedDB();
