import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import connectDB from '../config/database.js'

dotenv.config()

const users = [
  {
    name: 'Admin User',
    email: 'admin@modernshop.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user'
  }
]

const products = [
  {
    name: 'iPhone 15 Pro Max',
    description: 'The ultimate iPhone experience with the largest display, longest battery life, and most advanced camera system. Features titanium design, Action Button, and USB-C connectivity.',
    price: 1199.99,
    salePrice: 1099.99,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80'
    ],
    category: 'Electronics',
    brand: 'Apple',
    stock: 25,
    sku: 'IPHONE15PROMAX-001',
    features: [
      'A17 Pro chip with 6-core GPU',
      'Pro camera system with 5x Telephoto',
      'Titanium design with textured matte glass',
      'Action Button for quick shortcuts',
      'USB-C with USB 3 support',
      '6.7-inch Super Retina XDR display'
    ],
    specifications: {
      'Screen Size': '6.7 inches',
      'Storage': '256GB',
      'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      'Battery': 'Up to 29 hours video playback',
      'OS': 'iOS 17',
      'Weight': '221 grams'
    },
    isFeatured: true,
    tags: ['smartphone', 'apple', 'premium', 'flagship']
  },
  {
    name: 'MacBook Pro 16" M3 Max',
    description: 'The most powerful MacBook Pro ever. Built for professionals who push the limits of what\'s possible. Features the revolutionary M3 Max chip with incredible performance.',
    price: 3499.99,
    salePrice: 3199.99,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80'
    ],
    category: 'Electronics',
    brand: 'Apple',
    stock: 15,
    sku: 'MACBOOK-PRO-M3MAX-001',
    features: [
      'M3 Max chip with 16-core CPU',
      '40-core GPU for extreme performance',
      '16.2-inch Liquid Retina XDR display',
      'Up to 22 hours battery life',
      '1080p FaceTime HD camera',
      'Six-speaker sound system',
      'Three Thunderbolt 4 ports'
    ],
    specifications: {
      'Processor': 'Apple M3 Max chip',
      'Memory': '48GB unified memory',
      'Storage': '1TB SSD',
      'Display': '16.2-inch Liquid Retina XDR',
      'Weight': '4.8 pounds',
      'Graphics': '40-core GPU'
    },
    isFeatured: true,
    tags: ['laptop', 'apple', 'professional', 'high-performance']
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise canceling headphones with exceptional sound quality and all-day comfort.',
    price: 399.99,
    salePrice: 349.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
    ],
    category: 'Electronics',
    brand: 'Sony',
    stock: 75,
    sku: 'SONY-WH1000XM5-001',
    features: [
      'Industry-leading noise canceling',
      '30-hour battery life',
      'Quick charge',
      'Multipoint connection',
      'Speak-to-chat technology'
    ],
    specifications: {
      'Driver': '30mm',
      'Frequency Response': '4Hz-40kHz',
      'Battery Life': '30 hours',
      'Charging': 'USB-C',
      'Weight': '250g'
    },
    tags: ['headphones', 'wireless', 'noise-canceling']
  },
  {
    name: 'Nike Air Max 270',
    description: 'Lifestyle shoe with the largest Max Air unit yet for all-day comfort and modern style.',
    price: 150.00,
    salePrice: 120.00,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'
    ],
    category: 'Clothing',
    brand: 'Nike',
    stock: 100,
    sku: 'NIKE-AIRMAX270-001',
    features: [
      'Max Air unit',
      'Breathable mesh upper',
      'Rubber outsole',
      'Lifestyle design',
      'All-day comfort'
    ],
    specifications: {
      'Upper': 'Mesh and synthetic',
      'Midsole': 'Foam with Max Air unit',
      'Outsole': 'Rubber',
      'Closure': 'Lace-up',
      'Style': 'Lifestyle'
    },
    tags: ['shoes', 'sneakers', 'lifestyle']
  },
  {
    name: 'Samsung 55" 4K Smart TV',
    description: 'Crystal UHD 4K Smart TV with HDR and built-in streaming apps for the ultimate viewing experience.',
    price: 799.99,
    salePrice: 699.99,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500'
    ],
    category: 'Electronics',
    brand: 'Samsung',
    stock: 25,
    sku: 'SAMSUNG-55-4K-001',
    features: [
      '4K Crystal UHD resolution',
      'HDR support',
      'Smart TV platform',
      'Voice control',
      'Multiple HDMI ports'
    ],
    specifications: {
      'Screen Size': '55 inches',
      'Resolution': '3840 x 2160',
      'HDR': 'HDR10+',
      'Smart Platform': 'Tizen OS',
      'Connectivity': '3 HDMI, 2 USB'
    },
    isFeatured: true,
    tags: ['tv', 'smart-tv', '4k']
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    description: 'Multi-functional pressure cooker that replaces 7 kitchen appliances. Perfect for quick and healthy meals.',
    price: 99.99,
    salePrice: 79.99,
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
      'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=500'
    ],
    category: 'Home & Garden',
    brand: 'Instant Pot',
    stock: 60,
    sku: 'INSTANTPOT-DUO-001',
    features: [
      '7-in-1 functionality',
      'Pressure cook',
      'Slow cook',
      'Rice cooker',
      'Steamer'
    ],
    specifications: {
      'Capacity': '6 quarts',
      'Functions': '7-in-1',
      'Material': 'Stainless steel',
      'Safety': '10+ safety features',
      'Warranty': '1 year'
    },
    tags: ['kitchen', 'appliance', 'pressure-cooker']
  },
  {
    name: 'Adidas Ultraboost 22',
    description: 'Premium running shoe with responsive Boost midsole and Primeknit upper for ultimate comfort.',
    price: 190.00,
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500'
    ],
    category: 'Sports',
    brand: 'Adidas',
    stock: 80,
    sku: 'ADIDAS-UB22-001',
    features: [
      'Boost midsole',
      'Primeknit upper',
      'Continental rubber outsole',
      'Torsion system',
      'Responsive cushioning'
    ],
    specifications: {
      'Upper': 'Primeknit',
      'Midsole': 'Boost foam',
      'Outsole': 'Continental rubber',
      'Drop': '10mm',
      'Weight': '310g'
    },
    tags: ['running', 'shoes', 'performance']
  },
  {
    name: 'The Psychology of Money',
    description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel. A bestselling book on personal finance that will change how you think about money.',
    price: 16.99,
    salePrice: 12.99,
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80'
    ],
    category: 'Books',
    brand: 'Harriman House',
    stock: 200,
    sku: 'BOOK-PSYCHOLOGY-MONEY-001',
    features: [
      'Bestselling finance book',
      'Practical insights',
      'Easy to understand',
      'Real-world examples',
      'Timeless principles'
    ],
    specifications: {
      'Pages': '256',
      'Publisher': 'Harriman House',
      'Language': 'English',
      'Format': 'Paperback',
      'ISBN': '9780857197689'
    },
    tags: ['finance', 'self-help', 'bestseller']
  },
  {
    name: 'AirPods Pro (3rd Generation)',
    description: 'The ultimate wireless earbuds experience. Featuring adaptive transparency, personalized spatial audio, and up to 2x more active noise cancellation.',
    price: 249.99,
    salePrice: 199.99,
    images: [
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80'
    ],
    category: 'Electronics',
    brand: 'Apple',
    stock: 85,
    sku: 'AIRPODS-PRO-3GEN-001',
    features: [
      'Adaptive Transparency',
      'Personalized Spatial Audio',
      'Up to 2x more Active Noise Cancellation',
      'Touch control',
      'Sweat and water resistant (IPX4)',
      'Up to 6 hours listening time'
    ],
    specifications: {
      'Battery Life': 'Up to 6 hours (30 hours with case)',
      'Connectivity': 'Bluetooth 5.3',
      'Chip': 'H2 chip',
      'Water Resistance': 'IPX4',
      'Weight': '5.3g each'
    },
    isFeatured: true,
    tags: ['wireless', 'earbuds', 'noise-cancelling', 'premium']
  },
  {
    name: 'Tesla Model S Plaid Wheel',
    description: 'Official Tesla Model S Plaid 21" Arachnid Wheel. Lightweight forged aluminum construction with aerodynamic design.',
    price: 4500.00,
    images: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
    ],
    category: 'Automotive',
    brand: 'Tesla',
    stock: 8,
    sku: 'TESLA-WHEEL-PLAID-001',
    features: [
      'Forged aluminum construction',
      'Aerodynamic design',
      '21-inch diameter',
      'Lightweight',
      'Tesla OEM quality'
    ],
    specifications: {
      'Size': '21 x 9.5 inches',
      'Material': 'Forged Aluminum',
      'Weight': '32 lbs',
      'Finish': 'Gloss Black',
      'Bolt Pattern': '5x120mm'
    },
    tags: ['tesla', 'wheels', 'automotive', 'luxury']
  },
  {
    name: 'Dyson V15 Detect Absolute',
    description: 'The most powerful, intelligent cordless vacuum. Reveals invisible dust with laser technology and adapts suction power automatically.',
    price: 749.99,
    salePrice: 649.99,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80'
    ],
    category: 'Home & Garden',
    brand: 'Dyson',
    stock: 35,
    sku: 'DYSON-V15-DETECT-001',
    features: [
      'Laser dust detection',
      'Intelligent suction adjustment',
      'Up to 60 minutes run time',
      'Advanced whole-machine filtration',
      'Converts to handheld',
      'LCD screen shows real-time data'
    ],
    specifications: {
      'Battery Life': 'Up to 60 minutes',
      'Bin Capacity': '0.77 liters',
      'Weight': '3.1 kg',
      'Filtration': 'Advanced whole-machine',
      'Suction Power': '230 AW'
    },
    isFeatured: true,
    tags: ['vacuum', 'cordless', 'smart', 'home-appliance']
  },
  {
    name: 'Lululemon Align High-Rise Pant',
    description: 'The softest, most comfortable leggings ever. Made with buttery-soft Nulu fabric that feels weightless and moves with you.',
    price: 128.00,
    salePrice: 98.00,
    images: [
      'https://images.unsplash.com/photo-1506629905607-d9c297d3f5f5?w=800&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80'
    ],
    category: 'Clothing',
    brand: 'Lululemon',
    stock: 120,
    sku: 'LULU-ALIGN-PANT-001',
    features: [
      'Buttery-soft Nulu fabric',
      'High-rise design',
      '28" inseam',
      'Four-way stretch',
      'Sweat-wicking',
      'Non-see-through'
    ],
    specifications: {
      'Fabric': 'Nulu (81% Nylon, 19% Lycra)',
      'Inseam': '28 inches',
      'Rise': 'High-rise',
      'Fit': 'Tight fit',
      'Care': 'Machine wash cold'
    },
    tags: ['activewear', 'leggings', 'yoga', 'comfortable']
  },
  {
    name: 'YETI Rambler 30 oz Tumbler',
    description: 'Keep your drinks ice cold or piping hot with this durable, double-wall vacuum insulated tumbler. Perfect for any adventure.',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80'
    ],
    category: 'Sports',
    brand: 'YETI',
    stock: 200,
    sku: 'YETI-RAMBLER-30OZ-001',
    features: [
      'Double-wall vacuum insulation',
      'Dishwasher safe',
      'No Sweat Design',
      'MagSlider Lid',
      '18/8 stainless steel',
      'Keeps drinks cold for 24+ hours'
    ],
    specifications: {
      'Capacity': '30 oz',
      'Material': '18/8 Stainless Steel',
      'Dimensions': '3.5" W x 8.9" H',
      'Weight': '1.2 lbs',
      'Insulation': 'Double-wall vacuum'
    },
    tags: ['drinkware', 'insulated', 'outdoor', 'durable']
  },
  {
    name: 'Patagonia Better Sweater Fleece Jacket',
    description: 'A classic fleece jacket made from recycled polyester. Warm, comfortable, and environmentally conscious choice for outdoor adventures.',
    price: 139.00,
    salePrice: 109.00,
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80'
    ],
    category: 'Clothing',
    brand: 'Patagonia',
    stock: 75,
    sku: 'PATAGONIA-FLEECE-001',
    features: [
      'Made from recycled polyester',
      'Full-zip design',
      'Two zippered handwarmer pockets',
      'Raglan sleeves for mobility',
      'Fair Trade Certified sewn',
      'Bluesign approved fabric'
    ],
    specifications: {
      'Material': '100% recycled polyester fleece',
      'Weight': '11.6 oz',
      'Fit': 'Regular fit',
      'Care': 'Machine wash warm',
      'Origin': 'Fair Trade Certified'
    },
    tags: ['fleece', 'outdoor', 'sustainable', 'warm']
  },
  {
    name: 'Nintendo Switch OLED Model',
    description: 'Get the enhanced Nintendo Switch experience with a vibrant 7-inch OLED screen, enhanced audio, and 64GB of internal storage.',
    price: 349.99,
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80'
    ],
    category: 'Electronics',
    brand: 'Nintendo',
    stock: 45,
    sku: 'NINTENDO-SWITCH-OLED-001',
    features: [
      '7-inch OLED screen',
      'Enhanced audio',
      '64GB internal storage',
      'Wide adjustable stand',
      'Dock with wired LAN port',
      'Play at home or on the go'
    ],
    specifications: {
      'Screen': '7-inch OLED multi-touch',
      'Storage': '64GB internal',
      'Battery': '4.5-9 hours',
      'Connectivity': 'Wi-Fi, Bluetooth 4.1',
      'Weight': '0.93 lbs (console only)'
    },
    isFeatured: true,
    tags: ['gaming', 'console', 'portable', 'oled']
  }
]

const importData = async () => {
  try {
    await connectDB()

    // Clear existing data
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // Create users
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    // Add createdBy field to products
    const sampleProducts = products.map(product => {
      return { ...product, createdBy: adminUser }
    })

    // Create products
    await Product.insertMany(sampleProducts)

    console.log('✅ Data imported successfully!')
    process.exit()
  } catch (error) {
    console.error('❌ Error importing data:', error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await connectDB()

    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('✅ Data destroyed successfully!')
    process.exit()
  } catch (error) {
    console.error('❌ Error destroying data:', error)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}