require('dotenv').config()
const {connectToDB} = require('./database/db')
const Review = require('./models/Review')
const Product = require('./models/Product')
const User = require('./models/User')
const bcrypt = require('bcryptjs')

// Sample review comments
const reviewComments = [
  "Excellent product! Exceeded my expectations.",
  "Great quality and fast delivery. Highly recommend!",
  "Good value for money. Very satisfied with my purchase.",
  "Amazing! Works perfectly as described.",
  "Love it! Will definitely buy again.",
  "Decent product but could be better.",
  "Not bad, but I expected more for the price.",
  "Pretty good overall. Minor issues but nothing major.",
  "Fantastic! Best purchase I've made this year.",
  "Outstanding quality and great customer service.",
  "Very happy with this product. Worth every penny.",
  "Impressed with the quality. Arrived quickly too.",
  "Solid product. Does exactly what it's supposed to.",
  "Exceeded expectations! Highly recommended.",
  "Good product but shipping took a while.",
  "Perfect! Exactly what I was looking for.",
  "Really pleased with this purchase.",
  "Top-notch quality. Would buy again.",
  "Great product at a reasonable price.",
  "Absolutely love it! Can't recommend enough."
]

const addReviews = async () => {
  try {
    await connectToDB()
    console.log('Connected to database\n')

    // Check if we have users, if not create some demo users
    let users = await User.find({isAdmin: false}).limit(5)
    
    if (users.length === 0) {
      console.log('No users found. Creating demo users...')
      const hashedPassword = await bcrypt.hash('password123', 10)
      
      const demoUsers = [
        { name: 'John Doe', email: 'john@example.com', password: hashedPassword, isVerified: true },
        { name: 'Jane Smith', email: 'jane@example.com', password: hashedPassword, isVerified: true },
        { name: 'Mike Johnson', email: 'mike@example.com', password: hashedPassword, isVerified: true },
        { name: 'Sarah Williams', email: 'sarah@example.com', password: hashedPassword, isVerified: true },
        { name: 'David Brown', email: 'david@example.com', password: hashedPassword, isVerified: true }
      ]
      
      users = await User.insertMany(demoUsers)
      console.log(`✓ Created ${users.length} demo users\n`)
    }

    // Get all products
    const products = await Product.find({})
    
    if (products.length === 0) {
      console.log('No products found. Please add products first.')
      process.exit(1)
    }

    console.log(`Found ${products.length} products and ${users.length} users\n`)
    console.log('Adding reviews...\n')

    let totalReviews = 0

    // Add 2-4 reviews for each product
    for (const product of products) {
      const numReviews = Math.floor(Math.random() * 3) + 2 // 2 to 4 reviews
      
      console.log(`Adding ${numReviews} reviews for: ${product.title}`)

      for (let i = 0; i < numReviews; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)]
        const randomRating = Math.floor(Math.random() * 2) + 4 // 4 or 5 stars (mostly positive)
        const randomComment = reviewComments[Math.floor(Math.random() * reviewComments.length)]

        // Check if this user already reviewed this product
        const existingReview = await Review.findOne({
          user: randomUser._id,
          product: product._id
        })

        if (!existingReview) {
          await Review.create({
            user: randomUser._id,
            product: product._id,
            rating: randomRating,
            comment: randomComment
          })
          totalReviews++
          console.log(`  ✓ Review ${i + 1}: ${randomRating}★ by ${randomUser.name}`)
        }
      }
      console.log('')
    }

    console.log('='.repeat(50))
    console.log('SUMMARY')
    console.log('='.repeat(50))
    console.log(`Total reviews added: ${totalReviews}`)
    
    // Show some sample reviews
    console.log('\nSample reviews:')
    const sampleReviews = await Review.find({})
      .populate('user', 'name')
      .populate('product', 'title')
      .limit(5)

    sampleReviews.forEach((review, index) => {
      console.log(`\n${index + 1}. ${review.product.title}`)
      console.log(`   Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}`)
      console.log(`   By: ${review.user.name}`)
      console.log(`   Comment: ${review.comment}`)
    })

    console.log('\n✓ Reviews added successfully!')
    process.exit(0)

  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

addReviews()
