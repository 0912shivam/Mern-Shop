require("dotenv").config()
const express=require('express')
const cors=require('cors')
const morgan=require("morgan")
const cookieParser=require("cookie-parser")
const authRoutes=require("./routes/Auth")
const productRoutes=require("./routes/Product")
const orderRoutes=require("./routes/Order")
const cartRoutes=require("./routes/Cart")
const brandRoutes=require("./routes/Brand")
const categoryRoutes=require("./routes/Category")
const userRoutes=require("./routes/User")
const addressRoutes=require('./routes/Address')
const reviewRoutes=require("./routes/Review")
const wishlistRoutes=require("./routes/Wishlist")
const { connectToDB } = require("./database/db")

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'SECRET_KEY', 'ORIGIN'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
    console.error('❌ ERROR: Missing required environment variables:', missingEnvVars.join(', '));
    console.error('Please set these environment variables in your deployment platform.');
    process.exit(1);
}

console.log('✅ Environment variables loaded:');
console.log('- MONGO_URI:', process.env.MONGO_URI ? '✓' : '✗');
console.log('- SECRET_KEY:', process.env.SECRET_KEY ? '✓' : '✗');
console.log('- ORIGIN:', process.env.ORIGIN);
console.log('- PRODUCTION:', process.env.PRODUCTION);

// server init
const server=express()

// database connection
connectToDB()

// CORS configuration for production (Render/Vercel)
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true,
    exposedHeaders: ['X-Total-Count'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};

// middlewares
server.use(cors(corsOptions))
server.use(express.json())
server.use(cookieParser())
server.use(morgan("tiny"))

// routeMiddleware
server.use("/auth",authRoutes)
server.use("/users",userRoutes)
server.use("/products",productRoutes)
server.use("/orders",orderRoutes)
server.use("/cart",cartRoutes)
server.use("/brands",brandRoutes)
server.use("/categories",categoryRoutes)
server.use("/address",addressRoutes)
server.use("/reviews",reviewRoutes)
server.use("/wishlist",wishlistRoutes)



server.get("/",(req,res)=>{
    res.status(200).json({message:'running'})
})

server.get("/health",(req,res)=>{
    res.status(200).json({
        message:'Server is running',
        env: {
            hasMongoUri: !!process.env.MONGO_URI,
            hasSecretKey: !!process.env.SECRET_KEY,
            hasOrigin: !!process.env.ORIGIN,
            production: process.env.PRODUCTION,
            mongoUriLength: process.env.MONGO_URI?.length
        }
    })
})

// Start server for Render or local development
const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'production' || process.env.PORT) {
    server.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    })
}

// Export for Vercel serverless
module.exports = server;