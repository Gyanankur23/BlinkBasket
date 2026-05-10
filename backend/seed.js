import bcrypt from 'bcryptjs';
import {
  resetDb,
  insertUser,
  insertManyProducts,
  distinctCategories,
  db,
} from './store.js';

// REALISTIC PRODUCT DATABASE
const REALISTIC_PRODUCTS = {
  Electronics: {
    Smartphones: [
      { name: 'iPhone 15 Pro Max', brand: 'Apple', price: 159900, image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400' },
      { name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', price: 129999, image: 'https://placehold.co/400x400/eeeeee/333333?text=Samsung%20Galaxy%20S24%20Ultra' },
      { name: 'Google Pixel 8 Pro', brand: 'Google', price: 106999, image: 'https://placehold.co/400x400/eeeeee/333333?text=Google%20Pixel%208%20Pro' },
      { name: 'OnePlus 12', brand: 'OnePlus', price: 64999, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
      { name: 'Xiaomi 14 Pro', brand: 'Xiaomi', price: 49999, image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400' },
      { name: 'Nothing Phone 2', brand: 'Nothing', price: 44999, image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400' },
      { name: 'iPhone 14', brand: 'Apple', price: 79900, image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=400' },
      { name: 'Samsung Galaxy A54', brand: 'Samsung', price: 38999, image: 'https://placehold.co/400x400/eeeeee/333333?text=Samsung%20Galaxy%20S24%20Ultra' },
      { name: 'Realme GT 5 Pro', brand: 'Realme', price: 42999, image: 'https://placehold.co/400x400/eeeeee/333333?text=Google%20Pixel%208%20Pro' },
      { name: 'Vivo X100 Pro', brand: 'Vivo', price: 89999, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
    ],
    Laptops: [
      { name: 'MacBook Pro 16 M3 Max', brand: 'Apple', price: 349900, image: 'https://placehold.co/400x400/eeeeee/333333?text=MacBook%20Pro%2016%20M3%20Max' },
      { name: 'Dell XPS 15', brand: 'Dell', price: 189990, image: 'https://placehold.co/400x400/eeeeee/333333?text=Dell%20XPS%2015' },
      { name: 'HP Spectre x360', brand: 'HP', price: 145999, image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=400' },
      { name: 'Lenovo ThinkPad X1 Carbon', brand: 'Lenovo', price: 178999, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400' },
      { name: 'ASUS ROG Zephyrus G14', brand: 'Asus', price: 144990, image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400' },
      { name: 'Microsoft Surface Laptop 5', brand: 'Microsoft', price: 124999, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400' },
      { name: 'Acer Swift 5', brand: 'Acer', price: 82999, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400' },
      { name: 'MacBook Air M2', brand: 'Apple', price: 114900, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400' },
    ],
    Headphones: [
      { name: 'Sony WH-1000XM5', brand: 'Sony', price: 29990, image: 'https://placehold.co/400x400/eeeeee/333333?text=Sony%20WH-1000XM5' },
      { name: 'Apple AirPods Max', brand: 'Apple', price: 59900, image: 'https://placehold.co/400x400/eeeeee/333333?text=Apple%20AirPods%20Max' },
      { name: 'Bose QuietComfort 45', brand: 'Bose', price: 29900, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400' },
      { name: 'Sennheiser Momentum 4', brand: 'Sennheiser', price: 34990, image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400' },
      { name: 'JBL Tour One M2', brand: 'JBL', price: 24999, image: 'https://placehold.co/400x400/eeeeee/333333?text=JBL%20Tour%20One%20M2' },
      { name: 'Samsung Galaxy Buds2 Pro', brand: 'Samsung', price: 17999, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400' },
    ],
    'Smart Watches': [
      { name: 'Apple Watch Series 9', brand: 'Apple', price: 45900, image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400' },
      { name: 'Samsung Galaxy Watch 6', brand: 'Samsung', price: 29999, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400' },
      { name: 'Garmin Fenix 7', brand: 'Garmin', price: 69990, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400' },
      { name: 'Fitbit Sense 2', brand: 'Fitbit', price: 22999, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400' },
    ],
    Cameras: [
      { name: 'Sony A7 IV', brand: 'Sony', price: 239990, image: 'https://placehold.co/400x400/eeeeee/333333?text=Sony%20A7%20IV' },
      { name: 'Canon EOS R6 Mark II', brand: 'Canon', price: 215995, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400' },
      { name: 'Nikon Z6 II', brand: 'Nikon', price: 164999, image: 'https://images.unsplash.com/photo-1519183071298-a2962feb14f4?w=400' },
    ],
    TVs: [
      { name: 'Samsung 55 Neo QLED 4K', brand: 'Samsung', price: 124990, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
      { name: 'LG 65 OLED C3', brand: 'LG', price: 179999, image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400' },
      { name: 'Sony 55 Bravia XR A80L', brand: 'Sony', price: 144990, image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400' },
    ],
    'Gaming Consoles': [
      { name: 'PlayStation 5', brand: 'Sony', price: 49990, image: 'https://placehold.co/400x400/eeeeee/333333?text=PlayStation%205' },
      { name: 'Xbox Series X', brand: 'Microsoft', price: 49990, image: 'https://placehold.co/400x400/eeeeee/333333?text=Xbox%20Series%20X' },
      { name: 'Nintendo Switch OLED', brand: 'Nintendo', price: 34999, image: 'https://placehold.co/400x400/eeeeee/333333?text=Nintendo%20Switch%20OLED' },
    ],
  },
  "Men's Fashion": {
    Shirts: [
      { name: 'Classic Fit Oxford Shirt', brand: 'Levis', price: 2499, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400' },
      { name: 'Slim Fit Casual Shirt', brand: 'H&M', price: 1499, image: 'https://placehold.co/400x400/eeeeee/333333?text=Slim%20Fit%20Casual%20Shirt' },
      { name: 'Premium Cotton Shirt', brand: 'Zara', price: 2999, image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=400' },
      { name: 'Checked Flannel Shirt', brand: 'Levis', price: 1999, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400' },
    ],
    'T-Shirts': [
      { name: 'Crew Neck Cotton T-Shirt', brand: 'Nike', price: 1299, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
      { name: 'Graphic Print T-Shirt', brand: 'Adidas', price: 1499, image: 'https://placehold.co/400x400/eeeeee/333333?text=Graphic%20Print%20T-Shirt' },
      { name: 'Polo T-Shirt', brand: 'Tommy Hilfiger', price: 3499, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400' },
    ],
    Jeans: [
      { name: 'Slim Fit Jeans', brand: 'Levis', price: 3999, image: 'https://placehold.co/400x400/eeeeee/333333?text=Slim%20Fit%20Jeans' },
      { name: 'Regular Fit Denim', brand: 'Wrangler', price: 2499, image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=400' },
      { name: 'Skinny Jeans', brand: 'H&M', price: 1999, image: 'https://placehold.co/400x400/eeeeee/333333?text=Skinny%20Jeans' },
    ],
    Shoes: [
      { name: 'Air Jordan 1 Retro', brand: 'Nike', price: 14995, image: '/images/air_jordan_1_retro.png' },
      { name: 'Ultraboost 22', brand: 'Adidas', price: 16999, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
      { name: 'Classic Sneakers', brand: 'Puma', price: 5999, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
      { name: 'Formal Leather Shoes', brand: 'Red Tape', price: 2999, image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400' },
    ],
    Watches: [
      { name: 'Analog Watch', brand: 'Fossil', price: 8999, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400' },
      { name: 'Chronograph Watch', brand: 'Tommy Hilfiger', price: 12999, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400' },
      { name: 'Digital Watch', brand: 'Casio', price: 3499, image: '/images/digital_watch.png' },
    ],
    Jackets: [
      { name: 'Bomber Jacket', brand: 'Zara', price: 4999, image: '/images/bomber_jacket.png' },
      { name: 'Denim Jacket', brand: 'Levis', price: 5999, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' },
      { name: 'Leather Jacket', brand: 'H&M', price: 7999, image: '/images/leather_jacket.png' },
    ],
  },
  "Women's Fashion": {
    Dresses: [
      { name: 'Floral Maxi Dress', brand: 'Zara', price: 3999, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400' },
      { name: 'Evening Gown', brand: 'H&M', price: 5999, image: '/images/evening_gown.png' },
      { name: 'Casual Summer Dress', brand: 'Mango', price: 2499, image: 'https://placehold.co/400x400/eeeeee/333333?text=Casual%20Summer%20Dress' },
    ],
    Tops: [
      { name: 'Blouse Top', brand: 'Zara', price: 1999, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400' },
      { name: 'Crop Top', brand: 'H&M', price: 999, image: 'https://placehold.co/400x400/eeeeee/333333?text=Crop%20Top' },
      { name: 'Tank Top', brand: 'Forever 21', price: 799, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400' },
    ],
    Jeans: [
      { name: 'High Waist Jeans', brand: 'Levis', price: 3499, image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400' },
      { name: 'Boyfriend Jeans', brand: 'Zara', price: 2999, image: 'https://placehold.co/400x400/eeeeee/333333?text=Slim%20Fit%20Jeans' },
    ],
    Shoes: [
      { name: 'High Heels', brand: 'Charles & Keith', price: 4999, image: 'https://placehold.co/400x400/eeeeee/333333?text=High%20Heels' },
      { name: 'Running Shoes', brand: 'Nike', price: 8999, image: 'https://placehold.co/400x400/eeeeee/333333?text=Running%20Shoes' },
      { name: 'Ballet Flats', brand: 'H&M', price: 1999, image: 'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=400' },
    ],
    Handbags: [
      { name: 'Tote Bag', brand: 'Zara', price: 3999, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400' },
      { name: 'Crossbody Bag', brand: 'H&M', price: 2499, image: 'https://placehold.co/400x400/eeeeee/333333?text=Crossbody%20Bag' },
      { name: 'Clutch', brand: 'Aldo', price: 2999, image: '/images/crossbody_bag.png' },
    ],
    Jewelry: [
      { name: 'Gold Necklace', brand: 'Tanishq', price: 25999, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' },
      { name: 'Silver Earrings', brand: 'Pipa Bella', price: 1499, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400' },
      { name: 'Diamond Ring', brand: 'CaratLane', price: 49999, image: 'https://placehold.co/400x400/eeeeee/333333?text=Diamond%20Ring' },
    ],
  },
  'Home & Kitchen': {
    Furniture: [
      { name: '3-Seater Sofa', brand: 'Urban Ladder', price: 29999, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400' },
      { name: 'Dining Table Set', brand: 'IKEA', price: 24999, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400' },
      { name: 'King Size Bed', brand: 'Wakefit', price: 19999, image: 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=400' },
    ],
    'Kitchen Appliances': [
      { name: 'Microwave Oven', brand: 'LG', price: 11990, image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400' },
      { name: 'Air Fryer', brand: 'Philips', price: 8999, image: 'https://placehold.co/400x400/eeeeee/333333?text=Air%20Fryer' },
      { name: 'Mixer Grinder', brand: 'Prestige', price: 3499, image: 'https://placehold.co/400x400/eeeeee/333333?text=Mixer%20Grinder' },
    ],
    Bedding: [
      { name: 'Cotton Bedsheet Set', brand: 'Sleepwell', price: 2499, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400' },
      { name: 'Comforter', brand: 'IKEA', price: 3999, image: 'https://placehold.co/400x400/eeeeee/333333?text=Comforter' },
    ],
    'Home Decor': [
      { name: 'Wall Painting', brand: 'Home Centre', price: 1999, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400' },
      { name: 'Decorative Vase', brand: 'IKEA', price: 999, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400' },
    ],
  },
  'Beauty & Personal Care': {
    Skincare: [
      { name: 'Vitamin C Serum', brand: 'The Ordinary', price: 1299, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400' },
      { name: 'Moisturizing Cream', brand: 'Cetaphil', price: 899, image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400' },
      { name: 'Sunscreen SPF 50', brand: 'Neutrogena', price: 699, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400' },
    ],
    Makeup: [
      { name: 'Lipstick Set', brand: 'MAC', price: 2999, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400' },
      { name: 'Foundation', brand: 'Lakme', price: 899, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400' },
      { name: 'Mascara', brand: 'Maybelline', price: 499, image: 'https://placehold.co/400x400/eeeeee/333333?text=Mascara' },
    ],
    Haircare: [
      { name: 'Shampoo', brand: 'Dove', price: 399, image: 'https://placehold.co/400x400/eeeeee/333333?text=Shampoo' },
      { name: 'Hair Serum', brand: 'Loreal', price: 699, image: 'https://placehold.co/400x400/eeeeee/333333?text=Hair%20Serum' },
    ],
    Fragrances: [
      { name: 'Eau de Parfum', brand: 'Calvin Klein', price: 4999, image: 'https://placehold.co/400x400/eeeeee/333333?text=Eau%20de%20Parfum' },
      { name: 'Body Spray', brand: 'Axe', price: 299, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400' },
    ],
  },
  'Sports & Fitness': {
    'Fitness Equipment': [
      { name: 'Treadmill', brand: 'Powermax', price: 29999, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400' },
      { name: 'Dumbbell Set', brand: 'Decathlon', price: 3999, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400' },
      { name: 'Yoga Mat', brand: 'Reebok', price: 1499, image: 'https://placehold.co/400x400/eeeeee/333333?text=Yoga%20Mat' },
    ],
    Sportswear: [
      { name: 'Running Shorts', brand: 'Nike', price: 1999, image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=400' },
      { name: 'Sports Bra', brand: 'Adidas', price: 1799, image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400' },
    ],
    'Outdoor Gear': [
      { name: 'Camping Tent', brand: 'Decathlon', price: 7999, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400' },
      { name: 'Sleeping Bag', brand: 'Wildcraft', price: 3499, image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400' },
    ],
  },
  Books: {
    Fiction: [
      { name: 'The Midnight Library', brand: 'Penguin', price: 499, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400' },
      { name: 'Project Hail Mary', brand: 'Random House', price: 599, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400' },
      { name: 'Klara and the Sun', brand: 'Faber', price: 699, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400' },
    ],
    'Non-Fiction': [
      { name: 'Atomic Habits', brand: 'Penguin', price: 450, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400' },
      { name: 'Sapiens', brand: 'Harper Collins', price: 599, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400' },
    ],
  },
  'Toys & Games': {
    'Action Figures': [
      { name: 'Marvel Legends Spider-Man', brand: 'Hasbro', price: 2499, image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400' },
      { name: 'Hot Wheels Track Set', brand: 'Mattel', price: 1999, image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400' },
    ],
    'Board Games': [
      { name: 'Catan', brand: 'Asmodee', price: 3499, image: 'https://placehold.co/400x400/eeeeee/333333?text=Catan' },
      { name: 'Monopoly', brand: 'Hasbro', price: 1299, image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400' },
    ],
    Puzzles: [
      { name: '1000 Piece Jigsaw', brand: 'Ravensburger', price: 1499, image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400' },
    ],
    'Building Blocks': [
      { name: 'Classic Creative Brick Box', brand: 'Lego', price: 3999, image: 'https://placehold.co/400x400/eeeeee/333333?text=Classic%20Creative%20Brick%20Box' },
    ],
  },
  Grocery: {
    Staples: [
      { name: 'Basmati Rice 5kg', brand: 'India Gate', price: 499, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
      { name: 'Whole Wheat Flour 5kg', brand: 'Aashirvaad', price: 299, image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?w=400' },
      { name: 'Sunflower Oil 1L', brand: 'Fortune', price: 189, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400' },
    ],
    Snacks: [
      { name: 'Potato Chips', brand: 'Lays', price: 40, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400' },
      { name: 'Chocolate Cookies', brand: 'Oreo', price: 35, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400' },
      { name: 'Namkeen Mixture', brand: 'Haldirams', price: 99, image: 'https://placehold.co/400x400/eeeeee/333333?text=Namkeen%20Mixture' },
    ],
    Beverages: [
      { name: 'Ground Coffee 200g', brand: 'Nescafe', price: 299, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400' },
      { name: 'Green Tea Bags', brand: 'Lipton', price: 149, image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400' },
    ],
  },
};

const createProducts = (sellerId, categoryName) => {
  const category = REALISTIC_PRODUCTS[categoryName];
  if (!category) return [];

  const products = [];

  for (const [subcategory, items] of Object.entries(category)) {
    for (const item of items) {
      const discountPercent = Math.random() > 0.6 ? Math.floor(Math.random() * 25 + 5) : 0;
      const discountPrice = discountPercent > 0 ? Math.floor(item.price * (1 - discountPercent / 100)) : null;

      products.push({
        name: item.name,
        category: categoryName,
        subcategory,
        image: item.image,
        brand: item.brand,
        description: `${item.name} by ${item.brand}. Premium quality product available exclusively on BlinkBasket with fast delivery and best prices.`,
        price: item.price,
        discountPrice,
        discountPercent,
        countInStock: Math.floor(Math.random() * 100) + 10,
        rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
        numReviews: Math.floor(Math.random() * 500) + 50,
        seller: sellerId,
        isFeatured: Math.random() > 0.9,
        tags: [item.brand, subcategory, categoryName],
      });
    }
  }

  return products;
};

export const seedDatabase = () => {
  resetDb();

  const adminUser = insertUser({
    name: 'BlinkBasket Admin',
    email: 'admin@blinkbasket.com',
    password: bcrypt.hashSync('admin123', 8),
    isAdmin: true,
  });

  const sellers = [
    { name: 'TechWorld Store', email: 'tech@blinkbasket.com', isSeller: true },
    { name: 'Fashion Hub', email: 'fashion@blinkbasket.com', isSeller: true },
    { name: 'Home Essentials', email: 'home@blinkbasket.com', isSeller: true },
    { name: 'Beauty Palace', email: 'beauty@blinkbasket.com', isSeller: true },
    { name: 'Sports Zone', email: 'sports@blinkbasket.com', isSeller: true },
  ];

  const createdSellers = [];
  for (const seller of sellers) {
    createdSellers.push(
      insertUser({
        ...seller,
        password: bcrypt.hashSync('seller123', 8),
        seller: {
          name: seller.name,
          logo: '/images/logo1.png',
          description: 'Trusted seller on BlinkBasket',
          rating: Number((Math.random() * 1 + 4).toFixed(1)),
          numReviews: Math.floor(Math.random() * 200) + 20,
        },
      })
    );
  }

  const categoryAssignments = [
    ['Electronics'],
    ["Men's Fashion", "Women's Fashion"],
    ['Home & Kitchen'],
    ['Beauty & Personal Care'],
    ['Sports & Fitness', 'Toys & Games'],
  ];

  for (let i = 0; i < createdSellers.length; i++) {
    const seller = createdSellers[i];
    const assignedCategories = categoryAssignments[i];

    for (const catName of assignedCategories) {
      const products = createProducts(seller._id, catName);
      if (products.length > 0) {
        insertManyProducts(products);
      }
    }
  }

  const adminProducts = [
    ...createProducts(adminUser._id, 'Grocery'),
    ...createProducts(adminUser._id, 'Books'),
  ];
  insertManyProducts(adminProducts);

  insertUser({
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('customer123', 8),
  });

  insertUser({
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
  });

  insertUser({
    name: 'John',
    email: 'user@example.com',
    password: bcrypt.hashSync('1234', 8),
    isAdmin: false,
    isSeller: false,
  });

  const categoriesInDB = distinctCategories();

  return {
    success: true,
    stats: {
      products: db.products.length,
      categories: categoriesInDB,
    },
  };
};
