# 🛍️ Full Stack E-commerce Website

A modern, premium e-commerce platform built with React, Node.js, and MongoDB. Features a beautiful UI with glassmorphism effects, dynamic category sections, and comprehensive shopping functionality.

![E-commerce Website](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop)

## ✨ Features

### 🎨 **Premium UI/UX Design**
- **Glassmorphism Effects**: Modern frosted glass design elements
- **Gradient Backgrounds**: Beautiful color transitions throughout
- **Smooth Animations**: Framer Motion powered interactions
- **Responsive Design**: Perfect on all devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Premium Shadows**: Layered shadow effects for depth

### 🛒 **E-commerce Functionality**
- **Product Catalog**: Browse products with advanced filtering
- **Dynamic Categories**: Electronics, Beauty, Groceries, Fashion, etc.
- **Shopping Cart**: Add, remove, and manage cart items
- **Wishlist**: Save favorite products
- **User Authentication**: Register, login, and profile management
- **Admin Dashboard**: Product and order management
- **Checkout Process**: Complete order placement system

### 🏷️ **Product Categories**
- **Electronics & Tech** - Latest gadgets and innovations
- **Beauty & Skincare** - Premium beauty essentials
- **Fresh Groceries** - Organic & fresh produce
- **Fashion & Style** - Trendy fashion & accessories
- **Home & Garden** - Home improvement items
- **Books** - Educational and entertainment reading
- **Gaming** - Gaming accessories and equipment
- **Photography** - Camera equipment and accessories

### 🔧 **Technical Features**
- **React 18** with modern hooks and context
- **Node.js & Express** backend API
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** for secure user sessions
- **Zustand** for state management
- **React Query** for data fetching and caching
- **Tailwind CSS** for styling
- **Framer Motion** for animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/full-stack-ecommerce-website.git
   cd full-stack-ecommerce-website
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   **Backend (.env)**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key_here
   ```
   
   **Frontend (.env)**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the application**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually:
   # Backend only
   npm run server
   
   # Frontend only
   npm run client
   ```

5. **Seed the database (optional)**
   ```bash
   cd backend
   npm run seed
   ```

## 📁 Project Structure

```
full-stack-ecommerce-website/
├── backend/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── scripts/           # Utility scripts
│   └── server.js          # Express server
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── stores/        # Zustand stores
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utility functions
│   │   └── data/          # Mock data
│   └── public/            # Static assets
└── README.md
```

## 🎯 Key Components

### **CategoryCard Component**
- Dynamic color theming for each category
- Interactive hover effects with scale animations
- Action buttons overlay (Add to Cart, Wishlist, Quick View)
- Smart badge system with different colors
- Rating system with star displays

### **Premium Navigation**
- Glassmorphism effect with backdrop blur
- Animated logo with gradient effects
- Enhanced search bar with focus states
- User menu with smooth transitions

### **Dynamic Product Sections**
- Category-specific product displays
- Clickable category filters
- Smooth transitions between categories
- Real-time product count updates

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order

## 🎨 Design System

### **Color Palette**
- **Primary**: Blue to Purple gradients
- **Electronics**: Blue to Cyan
- **Beauty**: Pink to Rose
- **Groceries**: Green to Emerald
- **Fashion**: Purple to Indigo

### **Typography**
- **Font**: Inter (Google Fonts)
- **Headings**: Font-black with tight tracking
- **Body**: Font-medium with relaxed leading

### **Animations**
- **Hover Effects**: Scale and translate transforms
- **Loading States**: Pulse and shimmer effects
- **Page Transitions**: Smooth opacity and slide animations

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced layouts for tablets
- **Desktop**: Full-featured desktop experience
- **Grid System**: Responsive grid layouts (1-2-3-4 columns)

## 🚀 Deployment

### **Frontend (Vercel/Netlify)**
```bash
cd frontend
npm run build
# Deploy dist folder
```

### **Backend (Heroku/Railway)**
```bash
cd backend
# Set environment variables
# Deploy to your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern e-commerce platforms
- **Icons**: Lucide React
- **Images**: Unsplash
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS

## 📞 Support

For support, email developer@ecommerce.com or create an issue on GitHub.

---

**Made with ❤️ by the E-commerce Team**

⭐ Star this repository if you found it helpful!