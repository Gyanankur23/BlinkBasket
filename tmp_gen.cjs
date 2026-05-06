const fs = require('fs');

const BRANDS = {
  electronics: ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Lenovo'],
  fashion: ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M', 'Levis', 'Calvin Klein'],
  home: ['IKEA', 'Home Centre', 'Philips', 'Bajaj', 'Prestige'],
  beauty: ['Lakme', 'Maybelline', 'Loreal', 'MAC', 'The Body Shop'],
  sports: ['Decathlon', 'Nike', 'Adidas', 'Puma', 'Reebok'],
  books: ['Penguin', 'Harper Collins', 'Random House'],
  toys: ['Lego', 'Mattel', 'Hasbro', 'Fisher Price'],
  grocery: ['Nestle', 'Unilever', 'ITC', 'Britannia'],
  health: ['Himalaya', 'Dabur', 'Patanjali'],
  automotive: ['3M', 'Meguiars', 'Shell', 'Bosch'],
  pet: ['Pedigree', 'Whiskas', 'Royal Canin'],
  office: ['Classmate', 'Navneet', 'Camlin'],
};

const CATEGORIES = {
  'Electronics': { subcategories: ['Smartphones', 'Laptops', 'Headphones', 'Cameras', 'Tablets'], brands: BRANDS.electronics },
  'Men\'s Fashion': { subcategories: ['Shirts', 'T-Shirts', 'Jeans', 'Shoes', 'Watches'], brands: BRANDS.fashion },
  'Women\'s Fashion': { subcategories: ['Dresses', 'Tops', 'Jeans', 'Shoes', 'Handbags'], brands: BRANDS.fashion },
  'Home & Kitchen': { subcategories: ['Furniture', 'Bedding', 'Kitchen Appliances', 'Home Decor', 'Lighting'], brands: BRANDS.home },
  'Beauty & Personal Care': { subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrances', 'Personal Care'], brands: BRANDS.beauty },
  'Sports & Fitness': { subcategories: ['Fitness Equipment', 'Sportswear', 'Outdoor Gear', 'Cycling', 'Running'], brands: BRANDS.sports },
  'Books & Media': { subcategories: ['Fiction', 'Non-Fiction', 'Comics', 'Music', 'Movies'], brands: BRANDS.books },
  'Toys & Games': { subcategories: ['Action Figures', 'Board Games', 'Puzzles', 'Soft Toys', 'Arts & Crafts'], brands: BRANDS.toys },
  'Food & Grocery': { subcategories: ['Staples', 'Beverages', 'Snacks', 'Packaged Food', 'Dairy'], brands: BRANDS.grocery },
  'Health & Wellness': { subcategories: ['Supplements', 'Medical Devices', 'Yoga & Meditation', 'First Aid', 'Baby Care'], brands: BRANDS.health },
  'Automotive': { subcategories: ['Car Accessories', 'Car Care', 'Tools', 'Safety', 'Cleaning'], brands: BRANDS.automotive },
  'Pet Supplies': { subcategories: ['Dog Food', 'Cat Food', 'Toys', 'Accessories', 'Beds'], brands: BRANDS.pet },
  'Office & Stationery': { subcategories: ['Notebooks', 'Pens & Pencils', 'Art Supplies', 'Files & Folders', 'Paper'], brands: BRANDS.office },
  'Baby & Kids': { subcategories: ['Clothing', 'Footwear', 'Toys', 'Feeding', 'Diapers'], brands: ['Pampers', 'Huggies', 'Disney'] },
};

const ADJECTIVES = ['Premium', 'Ultra', 'Pro', 'Elite', 'Classic', 'Modern', 'Stylish', 'Durable'];

const generateProducts = () => {
  const products = [];
  let id = 1;
  const categories = Object.keys(CATEGORIES);
  
  categories.forEach(categoryName => {
    const categoryData = CATEGORIES[categoryName];
    
    categoryData.subcategories.forEach(subcategory => {
        // Generating 50 per subcategory to mimic seed DB
        for(let i=0; i<50; i++) {
          const brand = categoryData.brands[Math.floor(Math.random() * categoryData.brands.length)];
          const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
          const name = `${brand} ${adj} ${subcategory}`;
          const price = Math.floor(Math.random() * 500) + 20;
          const countInStock = Math.floor(Math.random() * 50);
          const rating = (Math.random() * 2 + 3).toFixed(1);
          const numReviews = Math.floor(Math.random() * 200);
          
          const keyword = encodeURIComponent(subcategory.replace(/[^a-zA-Z]/g, '').toLowerCase());
          const image = `https://cdn.dummyjson.com/product-images/${((id % 100) + 1)}/thumbnail.jpg`;
          
          products.push({
            _id: id.toString(),
            name,
            category: categoryName,
            subcategory,
            image,
            price,
            countInStock,
            brand,
            rating: Number(rating),
            numReviews,
            description: `High quality ${subcategory.toLowerCase()} from ${brand}. Perfect for everyday use with exceptional quality.`
          });
          id++;
        }
    });
  });
  return products;
};

const products = generateProducts();

const backendContent = 
`import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Basir',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: 'TechWorld',
        logo: '/images/logo1.png',
        description: 'Best Seller',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
  products: ${JSON.stringify(products, null, 2).replace(/"_id": "\d+",\n\s*/g, '')}
};
export default data;`;

const frontendContent = `const data = {
  products: ${JSON.stringify(products, null, 2)}
};
export default data;`;

fs.writeFileSync('backend/data.js', backendContent);
fs.writeFileSync('frontend/src/data.js', frontendContent);
console.log('Generated vast static data.js for both frontend and backend.');
