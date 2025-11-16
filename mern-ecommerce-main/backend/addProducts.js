require('dotenv').config()
const {connectToDB} = require('./database/db')
const Product = require('./models/Product')

// 20 Products with complete details
const newProducts = [
  {
    title: "MacBook Pro 16",
    description: "Powerful laptop with M2 Pro chip, 16GB RAM, 512GB SSD. Perfect for professionals and creators.",
    price: 2499,
    discountPercentage: 10,
    stockQuantity: 25,
    brand: "65a7e20102e12c44f59943da", // Apple
    category: "65a7e24602e12c44f599442d", // laptops
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800"
    ]
  },
  {
    title: "Samsung Galaxy S23 Ultra",
    description: "Flagship smartphone with 200MP camera, S Pen, and stunning 6.8 inch display.",
    price: 1199,
    discountPercentage: 15,
    stockQuantity: 50,
    brand: "65a7e20102e12c44f59943db", // Samsung
    category: "65a7e24602e12c44f599442c", // smartphones
    thumbnail: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800"
    ]
  },
  {
    title: "HP Pavilion Gaming Laptop",
    description: "15.6 inch gaming laptop with RTX 3050, Intel i5, 16GB RAM, perfect for gaming and work.",
    price: 899,
    discountPercentage: 12,
    stockQuantity: 30,
    brand: "65a7e20102e12c44f59943e0", // HP Pavilion
    category: "65a7e24602e12c44f599442d", // laptops
    thumbnail: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800",
      "https://images.unsplash.com/photo-1616763355603-9755a640a287?w=800"
    ]
  },
  {
    title: "Chanel No. 5 Perfume",
    description: "Iconic luxury fragrance with timeless elegance. 100ml bottle of pure sophistication.",
    price: 150,
    discountPercentage: 5,
    stockQuantity: 45,
    brand: "65a7e20102e12c44f59943e1", // Impression of Acqua Di Gio
    category: "65a7e24602e12c44f599442e", // fragrances
    thumbnail: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800",
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=800"
    ]
  },
  {
    title: "L'Oreal Revitalift Cream",
    description: "Anti-aging face cream with hyaluronic acid. Reduces wrinkles and firms skin.",
    price: 35,
    discountPercentage: 20,
    stockQuantity: 100,
    brand: "65a7e20102e12c44f59943e6", // L'Oreal Paris
    category: "65a7e24602e12c44f599442f", // skincare
    thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
      "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=800",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800",
      "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800"
    ]
  },
  {
    title: "Organic Green Tea Pack",
    description: "Premium organic green tea leaves. 100 tea bags for healthy living.",
    price: 25,
    discountPercentage: 10,
    stockQuantity: 200,
    brand: "65a7e20102e12c44f59943e7", // Hemani Tea
    category: "65a7e24602e12c44f5994430", // groceries
    thumbnail: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500",
    images: [
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800",
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800",
      "https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=800",
      "https://images.unsplash.com/photo-1597318167271-8957f5fd1c06?w=800"
    ]
  },
  {
    title: "Modern Wall Clock",
    description: "Minimalist wooden wall clock. Silent mechanism, perfect for home decoration.",
    price: 45,
    discountPercentage: 15,
    stockQuantity: 60,
    brand: "65a7e20102e12c44f59943f0", // Boho Decor
    category: "65a7e24602e12c44f5994431", // home-decoration
    thumbnail: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500",
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800",
      "https://images.unsplash.com/photo-1509743485025-8c7d82e8b7f0?w=800",
      "https://images.unsplash.com/photo-1577811398226-8f7b8d9c7c5e?w=800",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800"
    ]
  },
  {
    title: "Luxury Leather Sofa",
    description: "3-seater genuine leather sofa in brown. Comfortable and elegant for living room.",
    price: 1299,
    discountPercentage: 18,
    stockQuantity: 15,
    brand: "65a7e20102e12c44f59943f5", // Furniture Bed Set
    category: "65a7e24602e12c44f5994432", // furniture
    thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800",
      "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
    ]
  },
  {
    title: "Women's Silk Blouse",
    description: "Elegant silk blouse in white. Perfect for office wear and formal occasions.",
    price: 65,
    discountPercentage: 25,
    stockQuantity: 80,
    brand: "65a7e20102e12c44f59943fa", // Professional Wear
    category: "65a7e24602e12c44f5994433", // tops
    thumbnail: "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=500",
    images: [
      "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800",
      "https://images.unsplash.com/photo-1624206112431-193f5b6f49f1?w=800"
    ]
  },
  {
    title: "Floral Summer Dress",
    description: "Beautiful floral print maxi dress. Lightweight and perfect for summer.",
    price: 85,
    discountPercentage: 30,
    stockQuantity: 70,
    brand: "65a7e20102e12c44f59943fe", // Digital Printed
    category: "65a7e24602e12c44f5994434", // womens-dresses
    thumbnail: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800"
    ]
  },
  {
    title: "Designer Heels",
    description: "Elegant high heels in red. 4-inch heel height, perfect for parties.",
    price: 120,
    discountPercentage: 20,
    stockQuantity: 40,
    brand: "65a7e20102e12c44f5994403", // Sandals Flip Flops
    category: "65a7e24602e12c44f5994435", // womens-shoes
    thumbnail: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800",
      "https://images.unsplash.com/photo-1596702062351-8c2e0c5c8b27?w=800",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800"
    ]
  },
  {
    title: "Men's Casual Shirt",
    description: "100% cotton casual shirt in blue. Comfortable fit for everyday wear.",
    price: 45,
    discountPercentage: 15,
    stockQuantity: 90,
    brand: "65a7e20102e12c44f59943ff", // Ghazi Fabric
    category: "65a7e24602e12c44f5994436", // mens-shirts
    thumbnail: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800"
    ]
  },
  {
    title: "Leather Dress Shoes",
    description: "Classic leather dress shoes in black. Perfect for formal occasions.",
    price: 95,
    discountPercentage: 10,
    stockQuantity: 55,
    brand: "65a7e20102e12c44f5994409", // Sneakers
    category: "65a7e24602e12c44f5994437", // mens-shoes
    thumbnail: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500",
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800",
      "https://images.unsplash.com/photo-1582897085656-c3b38b76d8d3?w=800",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800",
      "https://images.unsplash.com/photo-1478827536114-da961b7f86c0?w=800"
    ]
  },
  {
    title: "Luxury Chronograph Watch",
    description: "Stainless steel men's watch with chronograph. Water resistant up to 100m.",
    price: 299,
    discountPercentage: 22,
    stockQuantity: 35,
    brand: "65a7e20102e12c44f599440b", // Naviforce
    category: "65a7e24602e12c44f5994438", // mens-watches
    thumbnail: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800"
    ]
  },
  {
    title: "Rose Gold Ladies Watch",
    description: "Elegant rose gold watch with diamond accents. Japanese quartz movement.",
    price: 189,
    discountPercentage: 18,
    stockQuantity: 45,
    brand: "65a7e20102e12c44f5994411", // Watch Pearls
    category: "65a7e24602e12c44f5994439", // womens-watches
    thumbnail: "https://images.unsplash.com/photo-1509941943102-10c232535736?w=500",
    images: [
      "https://images.unsplash.com/photo-1509941943102-10c232535736?w=800",
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800",
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800"
    ]
  },
  {
    title: "Designer Leather Handbag",
    description: "Premium leather tote bag in brown. Multiple compartments and elegant design.",
    price: 250,
    discountPercentage: 25,
    stockQuantity: 30,
    brand: "65a7e20102e12c44f5994414", // Copenhagen Luxe
    category: "65a7e24602e12c44f599443a", // womens-bags
    thumbnail: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800"
    ]
  },
  {
    title: "Pearl Necklace Set",
    description: "Elegant pearl necklace with matching earrings. Perfect for weddings.",
    price: 180,
    discountPercentage: 15,
    stockQuantity: 25,
    brand: "65a7e20102e12c44f5994417", // Fashion Jewellery
    category: "65a7e24602e12c44f599443b", // womens-jewellery
    thumbnail: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800"
    ]
  },
  {
    title: "Aviator Sunglasses",
    description: "Classic aviator sunglasses with UV protection. Metal frame and polarized lenses.",
    price: 85,
    discountPercentage: 20,
    stockQuantity: 75,
    brand: "65a7e20102e12c44f5994419", // Designer Sun Glasses
    category: "65a7e24602e12c44f599443c", // sunglasses
    thumbnail: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800"
    ]
  },
  {
    title: "Car Bluetooth Adapter",
    description: "Wireless Bluetooth 5.0 adapter for car audio. USB charging and hands-free calling.",
    price: 25,
    discountPercentage: 10,
    stockQuantity: 150,
    brand: "65a7e20102e12c44f599441b", // Car Aux
    category: "65a7e24602e12c44f599443d", // automotive
    thumbnail: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800",
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800"
    ]
  },
  {
    title: "LED Strip Lights",
    description: "5M RGB LED strip lights with remote control. Perfect for room decoration.",
    price: 35,
    discountPercentage: 15,
    stockQuantity: 120,
    brand: "65a7e20102e12c44f5994424", // lightingbrilliance
    category: "65a7e24602e12c44f599443f", // lighting
    thumbnail: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=500",
    images: [
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800",
      "https://images.unsplash.com/photo-1591978092861-da4eb70495c1?w=800",
      "https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=800",
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800"
    ]
  }
]

const addProductsInBatches = async () => {
  try {
    await connectToDB()
    console.log('Connected to database\n')

    // Clear existing products (optional - remove if you want to keep existing)
    // await Product.deleteMany({})
    // console.log('Cleared existing products\n')

    const batchSize = 10
    let totalAdded = 0

    for (let i = 0; i < newProducts.length; i += batchSize) {
      const batch = newProducts.slice(i, i + batchSize)
      const batchNumber = Math.floor(i / batchSize) + 1
      
      console.log(`\n${'='.repeat(50)}`)
      console.log(`Processing Batch ${batchNumber} (Products ${i + 1} to ${i + batch.length})`)
      console.log('='.repeat(50))

      // Insert batch
      const inserted = await Product.insertMany(batch)
      totalAdded += inserted.length
      
      console.log(`✓ Successfully added ${inserted.length} products`)
      
      // Display added products
      inserted.forEach((product, index) => {
        console.log(`  ${i + index + 1}. ${product.title} - $${product.price}`)
      })

      // Wait 1 second between batches
      if (i + batchSize < newProducts.length) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    console.log(`\n${'='.repeat(50)}`)
    console.log('VERIFICATION')
    console.log('='.repeat(50))

    // Verify all products were added
    const totalProductsInDB = await Product.countDocuments()
    console.log(`\nTotal products in database: ${totalProductsInDB}`)
    console.log(`Products added in this run: ${totalAdded}`)
    console.log(`Expected products added: ${newProducts.length}`)

    if (totalAdded === newProducts.length) {
      console.log('\n✓ SUCCESS: All products added successfully!')
    } else {
      console.log('\n⚠ WARNING: Some products may not have been added')
    }

    // Show sample products
    console.log('\nSample of added products:')
    const sampleProducts = await Product.find({}).limit(5)
    sampleProducts.forEach((product, index) => {
      console.log(`\n${index + 1}. ${product.title}`)
      console.log(`   Price: $${product.price}`)
      console.log(`   Discount: ${product.discountPercentage}%`)
      console.log(`   Stock: ${product.stockQuantity}`)
    })

    process.exit(0)
  } catch (error) {
    console.error('\n❌ Error:', error)
    process.exit(1)
  }
}

addProductsInBatches()
