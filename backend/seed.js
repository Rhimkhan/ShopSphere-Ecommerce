const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Order = require('./models/Order');
const Review = require('./models/Review');
const Coupon = require('./models/Coupon');

dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config();
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Order.deleteMany();
    await Review.deleteMany();
    await Coupon.deleteMany();

    console.log('Cleared existing collections.');

    // 1. Create Admin & Customer Users
    const admin = await User.create({
      name: 'ShopSphere Admin',
      email: 'admin@shopsphere.com',
      password: 'Admin@123456',
      role: 'Admin',
      phone: '+1 (555) 019-2834',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    });

    const customer = await User.create({
      name: 'Alex Johnson',
      email: 'customer@shopsphere.com',
      password: 'Customer@123456',
      role: 'Customer',
      phone: '+1 (555) 839-2049',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      addresses: [
        {
          fullName: 'Alex Johnson',
          phone: '+1 (555) 839-2049',
          streetAddress: '742 Evergreen Terrace',
          city: 'Springfield',
          state: 'OR',
          postalCode: '97477',
          country: 'USA',
          isDefault: true,
        },
      ],
    });

    console.log('Created admin & customer user accounts.');

    // 2. Create Categories
    const categoriesData = [
      { name: 'Electronics', icon: 'FaLaptop', description: 'Smartphones, Laptops, Audio & Gadgets', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80' },
      { name: 'Fashion', icon: 'FaShirt', description: 'Trendy Clothing & Designer Apparel', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop&q=80' },
      { name: 'Shoes', icon: 'GiSneakers', description: 'Athletic, Casual & Designer Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80' },
      { name: 'Books', icon: 'FaBook', description: 'Bestsellers, Textbooks & Novels', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80' },
      { name: 'Home', icon: 'FaHome', description: 'Home Appliances & Modern Decor', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80' },
      { name: 'Sports', icon: 'FaBasketballBall', description: 'Fitness, Outdoor Gear & Apparel', image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=600&auto=format&fit=crop&q=80' },
      { name: 'Beauty', icon: 'FaPumpSoap', description: 'Skincare, Makeup & Personal Care', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80' },
      { name: 'Groceries', icon: 'FaAppleAlt', description: 'Fresh Produce, Snacks & Essentials', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80' },
      { name: 'Accessories', icon: 'FaGlasses', description: 'Watches, Sunglasses & Jewelry', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80' },
      { name: 'Furniture', icon: 'FaCouch', description: 'Chairs, Desks & Ergonomic Office Gear', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80' },
    ];

    const createdCategories = [];
    for (const cat of categoriesData) {
      const slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const c = await Category.create({ ...cat, slug });
      createdCategories.push(c);
    }

    console.log(`Created ${createdCategories.length} categories.`);

    // 3. Create Products
    const productsData = [
      {
        name: 'AeroPulse Noise-Canceling Wireless Headphones',
        description: 'Immerse yourself in rich, high-fidelity sound with adaptive active noise cancellation, 40-hour battery life, and ultra-soft memory foam ear cushions.',
        category: 'Electronics',
        brand: 'AeroAudio',
        price: 249.99,
        discount: 15,
        stock: 35,
        sku: 'ELE-AERO-001',
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
        ],
        specifications: [
          { key: 'Connectivity', value: 'Bluetooth 5.3' },
          { key: 'Battery Life', value: '40 Hours' },
          { key: 'Weight', value: '250g' },
        ],
        featured: true,
        trending: true,
        rating: 4.8,
        numReviews: 24,
      },
      {
        name: 'Quantum X Smartwatch Ultra',
        description: 'Titanium casing with AMOLED retina display, advanced heart rate tracking, dual-GPS navigation, and 100m water resistance.',
        category: 'Electronics',
        brand: 'Quantum',
        price: 399.00,
        discount: 10,
        stock: 18,
        sku: 'ELE-QUAN-002',
        images: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
        ],
        specifications: [
          { key: 'Display', value: '1.92" Super AMOLED' },
          { key: 'Waterproof', value: '10 ATM' },
        ],
        featured: true,
        trending: true,
        rating: 4.9,
        numReviews: 42,
      },
      {
        name: 'ProGlide Runner Pro Sneaker',
        description: 'Responsive nitrogen-infused foam midsole providing ultra-light cushion and energy return for long distance runners.',
        category: 'Shoes',
        brand: 'ProGlide',
        price: 129.95,
        discount: 20,
        stock: 50,
        sku: 'SHO-PROG-003',
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
        ],
        specifications: [
          { key: 'Arch Support', value: 'Neutral' },
          { key: 'Material', value: 'Breathable Mesh' },
        ],
        featured: true,
        trending: true,
        rating: 4.7,
        numReviews: 19,
      },
      {
        name: 'Urban Denim Overcoat Jacket',
        description: 'Classic heavy-duty vintage washed denim jacket with sherpa lining for maximum warmth and rugged street style.',
        category: 'Fashion',
        brand: 'DenimCraft',
        price: 89.99,
        discount: 0,
        stock: 25,
        sku: 'FAS-DENI-004',
        images: [
          'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
        ],
        specifications: [
          { key: 'Material', value: '100% Organic Cotton' },
          { key: 'Fit', value: 'Relaxed Fit' },
        ],
        featured: false,
        trending: true,
        rating: 4.5,
        numReviews: 11,
      },
      {
        name: 'Ergonomic Mesh Office Executive Chair',
        description: 'Fully adjustable lumbar support, 4D armrests, dynamic recline, and high-density breathable mesh backrest for all-day comfort.',
        category: 'Furniture',
        brand: 'ErgoMax',
        price: 299.00,
        discount: 25,
        stock: 8, // Low stock for alert testing
        sku: 'FUR-ERGO-005',
        images: [
          'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?w=800&auto=format&fit=crop&q=80',
        ],
        specifications: [
          { key: 'Weight Capacity', value: '330 lbs' },
          { key: 'Warranty', value: '5 Years' },
        ],
        featured: true,
        trending: false,
        rating: 4.6,
        numReviews: 33,
      },
      {
        name: 'Barista Touch Espresso Machine',
        description: 'Integrated precision conical burr grinder, automatic micro-foam milk texturing, and digital PID temperature control.',
        category: 'Home',
        brand: 'BaristaPro',
        price: 699.99,
        discount: 5,
        stock: 12,
        sku: 'HOM-BARI-006',
        images: [
          'https://images.unsplash.com/photo-1517668808822-9e428824603b?w=800&auto=format&fit=crop&q=80',
        ],
        specifications: [
          { key: 'Pressure', value: '15 Bar Italian Pump' },
          { key: 'Capacity', value: '2L Water Tank' },
        ],
        featured: true,
        trending: true,
        rating: 4.9,
        numReviews: 50,
      },
      {
        name: 'CleanSkin Botanicals Radiance Serum',
        description: 'Infused with Vitamin C, Hyaluronic Acid, and Niacinamide to brighten complexion, smooth fine lines, and hydrate deeply.',
        category: 'Beauty',
        brand: 'Botanica',
        price: 45.00,
        discount: 10,
        stock: 60,
        sku: 'BEA-BOTA-007',
        images: [
          'https://images.unsplash.com/photo-1608248597261-833257054346?w=800&auto=format&fit=crop&q=80',
        ],
        specifications: [
          { key: 'Volume', value: '50ml / 1.7 oz' },
          { key: 'Skin Type', value: 'All Skin Types' },
        ],
        featured: false,
        trending: true,
        rating: 4.8,
        numReviews: 15,
      },
      {
        name: 'The Art of Clean Code & System Design',
        description: 'Hardcover guide covering modern architecture, software design patterns, microservices, and refactoring strategies.',
        category: 'Books',
        brand: 'TechPress',
        price: 34.99,
        discount: 0,
        stock: 100,
        sku: 'BOO-TECH-008',
        images: [
          'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
        ],
        specifications: [
          { key: 'Format', value: 'Hardcover' },
          { key: 'Pages', value: '520 Pages' },
        ],
        featured: false,
        trending: false,
        rating: 4.9,
        numReviews: 8,
      },
    ];

    const createdProducts = [];
    for (const p of productsData) {
      const prod = await Product.create(p);
      createdProducts.push(prod);
    }

    console.log(`Created ${createdProducts.length} products.`);

    // 4. Create Coupons
    await Coupon.create({
      code: 'WELCOME10',
      discountPercentage: 10,
      expirationDate: new Date('2030-01-01'),
      minPurchaseAmount: 50,
    });
    await Coupon.create({
      code: 'SAVER20',
      discountPercentage: 20,
      expirationDate: new Date('2030-01-01'),
      minPurchaseAmount: 100,
    });
    await Coupon.create({
      code: 'SHOPSPHERE50',
      discountPercentage: 50,
      expirationDate: new Date('2030-01-01'),
      minPurchaseAmount: 200,
    });

    console.log('Created promo coupons.');

    // 5. Create Sample Reviews
    await Review.create({
      user: customer._id,
      product: createdProducts[0]._id,
      rating: 5,
      comment: 'Absolutely astounding sound quality! The noise cancellation blocks out airplane engine noise completely.',
      userName: customer.name,
      userAvatar: customer.avatar,
    });

    await Review.create({
      user: customer._id,
      product: createdProducts[1]._id,
      rating: 5,
      comment: 'Super fast interface, sleek design, and battery easily lasts 3 full days with normal tracking!',
      userName: customer.name,
      userAvatar: customer.avatar,
    });

    console.log('Created sample reviews.');

    // 6. Create Sample Orders
    await Order.create({
      user: customer._id,
      products: [
        {
          product: createdProducts[0]._id,
          name: createdProducts[0].name,
          image: createdProducts[0].images[0],
          price: createdProducts[0].price,
          quantity: 1,
        },
      ],
      shippingAddress: customer.addresses[0],
      paymentMethod: 'Stripe',
      paymentStatus: 'Completed',
      orderStatus: 'Delivered',
      isPaid: true,
      paidAt: new Date(),
      isDelivered: true,
      deliveredAt: new Date(),
      itemsPrice: 249.99,
      taxPrice: 20.0,
      shippingPrice: 0.0,
      discountPrice: 25.0,
      totalPrice: 244.99,
      trackingNumber: 'TRK-984029',
    });

    await Order.create({
      user: customer._id,
      products: [
        {
          product: createdProducts[2]._id,
          name: createdProducts[2].name,
          image: createdProducts[2].images[0],
          price: createdProducts[2].price,
          quantity: 2,
        },
      ],
      shippingAddress: customer.addresses[0],
      paymentMethod: 'Cash On Delivery',
      paymentStatus: 'Pending',
      orderStatus: 'Shipped',
      itemsPrice: 259.9,
      taxPrice: 20.79,
      shippingPrice: 9.99,
      discountPrice: 0.0,
      totalPrice: 290.68,
      trackingNumber: 'TRK-102948',
    });

    console.log('Created sample orders.');
    console.log('\n======================================================');
    console.log('DATABASE SEEDING COMPLETE SUCCESS!');
    console.log('Admin Account:    admin@shopsphere.com / Admin@123456');
    console.log('Customer Account: customer@shopsphere.com / Customer@123456');
    console.log('======================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
