export const mockProducts = [
  {
    _id: '1',
    name: 'iPhone 15 Pro',
    description: 'The latest iPhone with advanced camera system and A17 Pro chip. Features titanium design, Action Button, and USB-C connectivity.',
    price: 999.99,
    salePrice: 899.99,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    brand: 'Apple',
    stock: 50,
    rating: 4.8,
    numReviews: 124,
    isFeatured: true,
    tags: ['smartphone', 'apple', 'premium']
  },
  {
    _id: '2',
    name: 'MacBook Air M2',
    description: 'Supercharged by M2 chip. The redesigned MacBook Air is more portable than ever and delivers exceptional performance.',
    price: 1199.99,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    brand: 'Apple',
    stock: 30,
    rating: 4.9,
    numReviews: 89,
    isFeatured: true,
    tags: ['laptop', 'apple', 'ultrabook']
  },
  {
    _id: '3',
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise canceling headphones with exceptional sound quality and all-day comfort.',
    price: 399.99,
    salePrice: 349.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    brand: 'Sony',
    stock: 75,
    rating: 4.7,
    numReviews: 203,
    tags: ['headphones', 'wireless', 'noise-canceling']
  },
  {
    _id: '4',
    name: 'Nike Air Max 270',
    description: 'Lifestyle shoe with the largest Max Air unit yet for all-day comfort and modern style.',
    price: 150.00,
    salePrice: 120.00,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop'
    ],
    category: 'Clothing',
    brand: 'Nike',
    stock: 100,
    rating: 4.5,
    numReviews: 156,
    tags: ['shoes', 'sneakers', 'lifestyle']
  },
  {
    _id: '5',
    name: 'Samsung 55" 4K Smart TV',
    description: 'Crystal UHD 4K Smart TV with HDR and built-in streaming apps for the ultimate viewing experience.',
    price: 799.99,
    salePrice: 699.99,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    brand: 'Samsung',
    stock: 25,
    rating: 4.6,
    numReviews: 78,
    isFeatured: true,
    tags: ['tv', 'smart-tv', '4k']
  },
  {
    _id: '6',
    name: 'Instant Pot Duo 7-in-1',
    description: 'Multi-functional pressure cooker that replaces 7 kitchen appliances. Perfect for quick and healthy meals.',
    price: 99.99,
    salePrice: 79.99,
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=500&h=500&fit=crop'
    ],
    category: 'Home & Garden',
    brand: 'Instant Pot',
    stock: 60,
    rating: 4.4,
    numReviews: 312,
    tags: ['kitchen', 'appliance', 'pressure-cooker']
  },
  {
    _id: '7',
    name: 'Adidas Ultraboost 22',
    description: 'Premium running shoe with responsive Boost midsole and Primeknit upper for ultimate comfort.',
    price: 190.00,
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop'
    ],
    category: 'Sports',
    brand: 'Adidas',
    stock: 80,
    rating: 4.7,
    numReviews: 94,
    tags: ['running', 'shoes', 'performance']
  },
  {
    _id: '8',
    name: 'The Psychology of Money',
    description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel. A bestselling book on personal finance.',
    price: 16.99,
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop'
    ],
    category: 'Books',
    brand: 'Harriman House',
    stock: 200,
    rating: 4.8,
    numReviews: 567,
    tags: ['finance', 'self-help', 'bestseller']
  },
  {
    _id: '9',
    name: 'Canon EOS R5 Camera',
    description: 'Professional mirrorless camera with 45MP sensor, 8K video recording, and advanced autofocus system.',
    price: 3899.99,
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop'
    ],
    category: 'Electronics',
    brand: 'Canon',
    stock: 15,
    rating: 4.9,
    numReviews: 42,
    isFeatured: true,
    tags: ['camera', 'professional', 'photography']
  },
  {
    _id: '10',
    name: 'Dyson V15 Detect Vacuum',
    description: 'Cordless vacuum with laser dust detection and powerful suction for deep cleaning on all floor types.',
    price: 749.99,
    salePrice: 649.99,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&h=500&fit=crop'
    ],
    category: 'Home & Garden',
    brand: 'Dyson',
    stock: 35,
    rating: 4.6,
    numReviews: 128,
    tags: ['vacuum', 'cordless', 'cleaning']
  },
  {
    _id: '11',
    name: 'Tesla Model Y Accessories Kit',
    description: 'Premium accessories kit for Tesla Model Y including floor mats, phone holder, and storage organizers.',
    price: 299.99,
    salePrice: 249.99,
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop'
    ],
    category: 'Automotive',
    brand: 'Tesla',
    stock: 45,
    rating: 4.3,
    numReviews: 67,
    tags: ['tesla', 'accessories', 'automotive']
  },
  {
    _id: '12',
    name: 'LEGO Architecture Statue of Liberty',
    description: 'Detailed LEGO model of the iconic Statue of Liberty. Perfect for display and educational building experience.',
    price: 119.99,
    images: [
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop'
    ],
    category: 'Toys',
    brand: 'LEGO',
    stock: 85,
    rating: 4.8,
    numReviews: 234,
    tags: ['lego', 'building', 'architecture']
  }
]

export const categories = [
  'Electronics',
  'Clothing', 
  'Books',
  'Home & Garden',
  'Sports',
  'Beauty',
  'Toys',
  'Automotive'
]

export const brands = [
  'Apple',
  'Samsung',
  'Sony',
  'Nike',
  'Adidas',
  'Canon',
  'Dyson',
  'Tesla',
  'LEGO',
  'Instant Pot',
  'Harriman House'
]