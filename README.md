# ChippsStore

Interactive eccoomerce platform to help small artist to sell their products

## 🎯 Project Overview

NeonRetro Store is a modern e-commerce website designed with an authentic 1980s aesthetic. It features:

- **Retro Design**: Neon colors, synthwave gradients, and pixel-perfect 80s styling
- **Interactive Shopping**: Full shopping cart functionality with localStorage persistence
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: CSS3 and JavaScript animations for an engaging experience
- **Product Management**: Dynamic product loading and filtering system

## 🛠️ Technologies Used

### **Frontend Technologies**

#### **HTML5**
- **Purpose**: Provides the structural foundation of the website
- **Features**: Semantic markup, accessibility-friendly structure, SEO optimization
- **Files**: `index.html` - Main page with all sections

#### **CSS3**
- **Purpose**: Creates the stunning 80s visual aesthetic
- **Features**: 
  - CSS Custom Properties (variables) for consistent theming
  - Flexbox and Grid layouts for responsive design
  - Advanced animations and transitions
  - Neon glow effects and gradients
- **Files**: 
  - `styles/main.css` - Core styles and variables
  - `styles/components.css` - Component-specific styling
  - `styles/animations.css` - Animation keyframes and effects

#### **JavaScript (ES6+)**
- **Purpose**: Handles all interactive functionality and dynamic content
- **Features**:
  - Modern ES6+ syntax with async/await
  - Modular code organization
  - Event-driven architecture
  - Local storage integration
- **Files**:
  - `js/script.js` - Core application logic and initialization
  - `js/cart.js` - Shopping cart functionality
  - `js/animations.js` - Animation controllers and effects

### **Backend Technologies (For Full E-commerce)**

#### **Node.js + Express.js**
- **Purpose**: Server-side runtime and web framework
- **Features**: 
  - RESTful API endpoints for products, users, orders
  - Middleware for authentication and validation
  - Session management and security
- **Files**: `server/app.js`, `server/routes/`, `server/middleware/`

#### **Database System**
**Option 1: MongoDB + Mongoose**
- **Purpose**: NoSQL database for flexible data storage
- **Features**: Schema-less documents, easy scaling, cloud deployment
- **Use Cases**: Product catalog, user profiles, order history

**Option 2: PostgreSQL + Prisma**
- **Purpose**: Relational database with strong consistency
- **Features**: ACID transactions, complex queries, data integrity
- **Use Cases**: Financial transactions, inventory management

#### **Authentication & Security**
- **JWT (JSON Web Tokens)**: Secure user authentication
- **bcrypt**: Password hashing and security
- **Express-rate-limit**: API rate limiting
- **Helmet.js**: Security headers and protection
- **CORS**: Cross-origin resource sharing configuration

#### **Payment Processing**
**Stripe Integration**
- **Purpose**: Secure payment processing
- **Features**: 
  - Credit card processing
  - Subscription management
  - Webhooks for payment events
  - PCI compliance
- **Files**: `server/payments/stripe.js`

**PayPal Integration** (Alternative)
- **Purpose**: Alternative payment gateway
- **Features**: PayPal checkout, Express checkout, Recurring payments

#### **File Storage & CDN**
- **AWS S3 / Cloudinary**: Product image storage and optimization
- **Purpose**: Scalable media asset management
- **Features**: Image resizing, format optimization, global CDN

#### **Email Services**
- **SendGrid / Nodemailer**: Email notifications
- **Purpose**: Order confirmations, password resets, marketing
- **Features**: Template management, delivery tracking

### **Development & Deployment**

#### **Package.json**
- **Purpose**: Project configuration and dependency management
- **Features**: Scripts for development, project metadata, dependency tracking

#### **Environment Configuration**
- **dotenv**: Environment variable management
- **Purpose**: Secure configuration for API keys, database URLs
- **Files**: `.env`, `.env.example`

#### **API Documentation**
- **Swagger/OpenAPI**: API documentation and testing
- **Purpose**: Document all endpoints for frontend integration

#### **Deployment & DevOps**
- **Docker**: Containerization for consistent deployments
- **Heroku/Vercel/AWS**: Cloud hosting platforms
- **GitHub Actions**: CI/CD pipeline automation
- **MongoDB Atlas / AWS RDS**: Managed database hosting

## 📁 Full E-commerce Project Structure

```
ALEX/
├── Frontend/
│   ├── index.html              # Main HTML file
│   ├── login.html              # User login page
│   ├── register.html           # User registration page
│   ├── profile.html            # User profile management
│   ├── checkout.html           # Payment checkout page
│   ├── order-confirmation.html # Order success page
│   ├── package.json            # Frontend dependencies
│   ├── data/
│   │   └── products.json       # Static product data (dev only)
│   ├── styles/
│   │   ├── main.css           # Core styles and variables
│   │   ├── components.css     # Component styling
│   │   ├── animations.css     # Animation effects
│   │   └── responsive.css     # Mobile optimization
│   └── js/
│       ├── config.js          # Frontend configuration
│       ├── script.js            # Main application logic
│       ├── cart.js            # Shopping cart functionality
│       ├── animations.js      # Animation controllers
│       ├── auth.js            # Authentication handling
│       ├── checkout.js        # Payment processing
│       └── api.js             # API communication layer
├── Backend/
│   ├── server.js              # Express.js main server file
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment variables template
│   ├── config/
│   │   ├── database.js        # Database connection config
│   │   ├── stripe.js          # Stripe payment configuration
│   │   └── jwt.js             # JWT authentication config
│   ├── models/
│   │   ├── User.js            # User data model
│   │   ├── Product.js         # Product data model
│   │   ├── Order.js           # Order data model
│   │   └── Payment.js         # Payment transaction model
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── products.js        # Product CRUD operations
│   │   ├── cart.js            # Shopping cart operations
│   │   ├── orders.js          # Order management
│   │   ├── payments.js        # Payment processing
│   │   └── users.js           # User profile management
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication middleware
│   │   ├── validation.js      # Input validation middleware
│   │   ├── rateLimit.js       # API rate limiting
│   │   └── errorHandler.js    # Global error handling
│   ├── services/
│   │   ├── emailService.js    # Email notifications
│   │   ├── paymentService.js  # Payment processing logic
│   │   ├── imageService.js    # Image upload/processing
│   │   └── inventoryService.js # Stock management
│   └── utils/
│       ├── validators.js      # Input validation helpers
│       ├── encryption.js      # Password hashing utilities
│       └── logger.js          # Logging utilities
├── Database/
│   ├── migrations/            # Database schema migrations
│   ├── seeds/                 # Sample data for development
│   └── backups/               # Database backup files
├── Documentation/
│   ├── API.md                 # API endpoint documentation
│   ├── DEPLOYMENT.md          # Deployment instructions
│   └── SECURITY.md            # Security best practices
├── docker-compose.yml         # Docker development environment
├── Dockerfile                 # Docker container configuration
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for development server)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <your-repo-url>
   cd ALEX
   ```

2. **Install dependencies (optional)**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm start
   # or
   npm run dev
   ```

4. **Or simply open index.html**
   - Double-click `index.html` to open in your browser
   - Or use a local server like Live Server in VS Code

## ✨ Full E-commerce Features

### 🎨 **Visual Design**
- **Neon Color Palette**: Hot pink, electric blue, laser purple, neon green
- **Retro Typography**: Orbitron and Courier Prime fonts
- **Gradient Backgrounds**: Synthwave-inspired color transitions
- **Grid Overlay**: Classic 80s tron-style background grid

### � **User Authentication & Management**
- User registration and login system
- JWT-based secure authentication
- Password reset via email
- User profile management
- Order history and tracking
- Wishlist functionality
- Address book management

### �🛒 **Shopping Cart & Checkout**
- Add/remove products with real-time updates
- Quantity adjustment and stock validation
- Persistent cart across sessions
- Guest checkout option
- Multiple shipping addresses
- Tax calculation by location
- Coupon and discount code system

### 💳 **Payment Processing**
- **Stripe Integration**: Credit/debit cards, Apple Pay, Google Pay
- **PayPal Integration**: PayPal checkout and express payments
- **Security**: PCI DSS compliant payment processing
- **Features**: 
  - Save payment methods for future use
  - Subscription billing for memberships
  - Refund and partial refund processing
  - Payment webhooks for order updates

### 📦 **Order Management**
- Real-time order tracking
- Email notifications for order status
- Invoice generation and download
- Return and refund requests
- Shipping integration with carriers
- Inventory management and low-stock alerts

### 📱 **Responsive Design**
- Mobile-first approach with touch-optimized interface
- Progressive Web App (PWA) capabilities
- Tablet optimization for catalog browsing
- Desktop enhancements with hover effects
- Cross-browser compatibility

### 🎬 **Animations & UX**
- Scroll-triggered animations
- Hover effects with magnetic buttons
- Loading states and progress indicators
- Smooth page transitions
- Real-time form validation
- Interactive product image galleries

### 🔍 **Product Management**
- Advanced search with filters and sorting
- Category and tag-based navigation
- Product reviews and ratings
- Related product recommendations
- Stock availability indicators
- Product variation support (size, color, etc.)

### 🔐 **Security & Performance**
- HTTPS encryption for all communications
- Input sanitization and SQL injection prevention
- Rate limiting for API endpoints
- CSRF protection
- XSS prevention
- Image optimization and lazy loading
- CDN integration for fast global delivery

### 📊 **Analytics & Admin**
- Sales analytics and reporting
- Customer behavior tracking
- Inventory management dashboard
- Order processing interface
- Product catalog management
- User account administration

## 🎮 How Each Technology Works

### **HTML Structure**
```html
<!-- Semantic sections for better SEO and accessibility -->
<header class="main-header">
<section id="hero" class="hero">
<section id="products" class="products-section">
<!-- Modern HTML5 elements with proper ARIA labels -->
```

### **CSS Architecture**
```css
/* CSS Custom Properties for consistent theming */
:root {
  --neon-pink: #ff0080;
  --neon-blue: #00ffff;
  /* Scalable design system */
}

/* Mobile-first responsive design */
@media (max-width: 768px) {
  /* Mobile styles */
}
```

### **JavaScript Modules**
```javascript
// Modern ES6+ syntax
const products = await fetch('./data/products.json');

// Event-driven architecture
document.addEventListener('DOMContentLoaded', initializeApp);

// Modular functions
function addToCart(productId) {
  // Cart logic
}
```

## 🎯 Development Phases

### **Phase 1: Frontend Foundation (Current)**
- ✅ Static website with retro 80s design
- ✅ Product display and filtering
- ✅ Shopping cart with localStorage
- ✅ Responsive design and animations

### **Phase 2: Backend API Development**
- 🔄 **Next Steps:**
  1. Set up Node.js/Express server
  2. Configure MongoDB/PostgreSQL database
  3. Implement user authentication (JWT)
  4. Create RESTful API endpoints
  5. Add input validation and security middleware

### **Phase 3: User Authentication**
- 📝 **Implementation:**
  1. User registration and login forms
  2. Password hashing with bcrypt
  3. JWT token management
  4. Protected routes and middleware
  5. Password reset functionality

### **Phase 4: Payment Integration**
- 💳 **Payment Systems:**
  1. Stripe payment processing setup
  2. PayPal integration as alternative
  3. Secure checkout flow
  4. Order confirmation and receipts
  5. Webhook handling for payment events

### **Phase 5: Advanced Features**
- 🚀 **Enhancements:**
  1. Product reviews and ratings
  2. Wishlist functionality
  3. Advanced search and filters
  4. Email notifications
  5. Admin dashboard for management

### **Phase 6: Production Deployment**
- 🌐 **Going Live:**
  1. Environment configuration
  2. Database optimization
  3. Security hardening
  4. Performance monitoring
  5. CI/CD pipeline setup

## 🔧 Technology Stack Decisions

### **Backend Framework Options**

#### **Option 1: Node.js + Express.js (Recommended)**
```javascript
// Advantages:
- Same language as frontend (JavaScript)
- Large ecosystem with npm packages
- Excellent performance for I/O operations
- Great for real-time features
- Easy JSON handling

// Example API endpoint:
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  // Authentication logic
});
```

#### **Option 2: Python + Django/FastAPI**
```python
# Advantages:
- Robust framework with built-in features
- Excellent for data processing
- Strong security features
- Great documentation

# Example with FastAPI:
@app.post("/api/auth/login")
async def login(user: UserLogin):
    # Authentication logic
    return {"token": jwt_token}
```

#### **Option 3: PHP + Laravel**
```php
// Advantages:
- Mature e-commerce ecosystem
- Built-in features for web development
- Easy hosting and deployment
- Strong community support

// Example route:
Route::post('/api/auth/login', [AuthController::class, 'login']);
```

### **Database Selection**

#### **MongoDB (NoSQL) - Recommended for Flexibility**
```javascript
// Product Schema Example:
{
  "_id": ObjectId("..."),
  "name": "Synthwave Hoodie",
  "category": "clothing",
  "price": 79.99,
  "variants": [
    {
      "size": "M",
      "color": "Neon Pink",
      "stock": 15,
      "sku": "SWH-M-NP"
    }
  ],
  "reviews": [
    {
      "userId": ObjectId("..."),
      "rating": 5,
      "comment": "Totally radical!",
      "date": ISODate("...")
    }
  ]
}
```

#### **PostgreSQL (SQL) - Recommended for Complex Transactions**
```sql
-- User Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table with proper relationships
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    stripe_payment_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Payment Gateway Comparison**

#### **Stripe (Recommended)**
```javascript
// Advantages:
- Developer-friendly API
- Extensive documentation
- Built-in fraud protection
- Supports multiple payment methods
- Excellent webhooks system

// Integration Example:
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentIntent = await stripe.paymentIntents.create({
  amount: 7999, // $79.99 in cents
  currency: 'usd',
  customer: customerId,
  metadata: { orderId: '12345' }
});
```

#### **PayPal Alternative**
```javascript
// Advantages:
- Wide user adoption
- Built-in buyer protection
- International support
- No credit card required for users

// Integration Example:
const paypal = require('@paypal/checkout-server-sdk');
const request = new paypal.orders.OrdersCreateRequest();
request.requestBody({
  intent: 'CAPTURE',
  purchase_units: [{
    amount: {
      currency_code: 'USD',
      value: '79.99'
    }
  }]
});
```

### **Authentication Strategy**

#### **JWT (JSON Web Tokens) - Recommended**
```javascript
// Advantages:
- Stateless authentication
- Perfect for APIs
- Mobile app friendly
- Scalable across servers

// Implementation:
const jwt = require('jsonwebtoken');

// Generate token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Verify middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

### **File Storage Solutions**

#### **AWS S3 + CloudFront (Production)**
```javascript
// Advantages:
- Unlimited scalability
- Global CDN distribution
- Automatic backups
- Image processing capabilities

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const uploadParams = {
  Bucket: 'neon-retro-images',
  Key: `products/${productId}/${filename}`,
  Body: fileBuffer,
  ContentType: 'image/jpeg',
  ACL: 'public-read'
};
```

#### **Cloudinary (Easier Setup)**
```javascript
// Advantages:
- Built-in image optimization
- Automatic format conversion
- Real-time image transformations
- Easy integration

const cloudinary = require('cloudinary').v2;

const result = await cloudinary.uploader.upload(imagePath, {
  folder: 'neon-retro/products',
  transformation: [
    { width: 800, height: 600, crop: 'fill' },
    { quality: 'auto', fetch_format: 'auto' }
  ]
});
```

## 💻 Required Dependencies for Full E-commerce

### **Backend Package.json**
```json
{
  "name": "neon-retro-backend",
  "version": "1.0.0",
  "description": "Backend API for Neon Retro Store",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "migrate": "npx prisma migrate dev",
    "seed": "node scripts/seedDatabase.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "stripe": "^13.6.0",
    "nodemailer": "^6.9.4",
    "multer": "^1.4.5",
    "cloudinary": "^1.40.0",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.10.0",
    "express-validator": "^7.0.1",
    "dotenv": "^16.3.1",
    "compression": "^1.7.4",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}
```

### **Frontend Package.json Updates**
```json
{
  "name": "neon-retro-frontend",
  "version": "1.0.0",
  "description": "Frontend for Neon Retro Store",
  "main": "index.html",
  "scripts": {
    "start": "live-server --port=3000 --open=/index.html",
    "dev": "live-server --port=3000 --watch=./ --open=/index.html",
    "build": "webpack --mode=production",
    "test": "jest"
  },
  "dependencies": {
    "axios": "^1.5.0",
    "js-cookie": "^3.0.5"
  },
  "devDependencies": {
    "live-server": "^1.2.2",
    "webpack": "^5.88.2",
    "webpack-cli": "^5.1.4",
    "babel-loader": "^9.1.3",
    "@babel/core": "^7.22.17",
    "@babel/preset-env": "^7.22.17"
  }
}
```

### **Environment Variables (.env)**
```bash
# Database Configuration
DATABASE_URL="mongodb://localhost:27017/neonretro"
# or for PostgreSQL:
# DATABASE_URL="postgresql://username:password@localhost:5432/neonretro"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="24h"

# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# PayPal Configuration (Optional)
PAYPAL_CLIENT_ID="your_paypal_client_id"
PAYPAL_CLIENT_SECRET="your_paypal_client_secret"
PAYPAL_MODE="sandbox" # or "live" for production

# Email Configuration
EMAIL_SERVICE="gmail"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# Cloud Storage
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Server Configuration
PORT=5000
NODE_ENV="development"
CLIENT_URL="http://localhost:3000"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000 # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100

# Session Configuration
SESSION_SECRET="your-session-secret"
COOKIE_SECURE=false # true in production
```

## 🔐 Security Implementation

### **Password Security**
```javascript
const bcrypt = require('bcryptjs');

// Hash password before saving
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Verify password during login
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
```

### **Input Validation**
```javascript
const { body, validationResult } = require('express-validator');

// Registration validation
const validateRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email required'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number and special character'),
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .escape()
    .withMessage('First name must be 2-50 characters')
];

// Check validation results
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
```

### **API Security Middleware**
```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later'
});
app.use('/api/', limiter);

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // limit each IP to 5 auth requests per windowMs
  skipSuccessfulRequests: true
});
app.use('/api/auth/', authLimiter);
```

## 🎨 Customization

### **Colors**
Edit the CSS custom properties in `styles/main.css`:
```css
:root {
  --neon-pink: #ff0080;    /* Change primary neon color */
  --neon-blue: #00ffff;    /* Change secondary neon color */
  --bg-primary: #0a0a0f;   /* Change background color */
}
```

### **Products**
Modify `data/products.json` to add, remove, or update products:
```json
{
  "id": 11,
  "name": "Your Product Name",
  "category": "clothing",
  "price": 49.99,
  "description": "Your product description",
  "featured": true
}
```

### **Layout**
Adjust the grid system in `styles/components.css`:
```css
.products-grid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* Change minmax value to adjust card sizes */
}
```

## 🐛 Troubleshooting

### **Products not loading?**
- Check that `data/products.json` exists and is valid JSON
- Open browser developer tools to see any console errors
- Ensure you're running from a server (not file:// protocol)

### **Animations not working?**
- Check if you have `prefers-reduced-motion` enabled in your system
- Ensure JavaScript is enabled in your browser
- Clear browser cache if styles seem outdated

### **Cart not saving?**
- Check if localStorage is enabled in your browser
- Clear localStorage if data seems corrupted: `localStorage.clear()`

## 🏆 Performance

- **Optimized Images**: Uses emoji fallbacks for fast loading
- **Minimal Dependencies**: Pure vanilla JavaScript, no heavy frameworks
- **Lazy Loading**: Animations trigger only when elements are visible
- **Responsive Assets**: CSS-only animations for better performance

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

Having issues? Check out these resources:

- 📖 **Documentation**: This README file
- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Open an issue with the enhancement label
- 📧 **Contact**: info@neonretro.com (demo email)

---

**Made with ❤️ and lots of neon in the spirit of the awesome 80s!** 🌈✨

*"Welcome to the future... of the past!"* 🚗💨
