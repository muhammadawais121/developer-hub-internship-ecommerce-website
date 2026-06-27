const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const DB_PATH = path.join(__dirname, 'data.json');

// ============ REAL IMAGE LIBRARY ============
const productImages = {
  automobiles: [
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop'
  ],
  clothing: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1434389677669-e08b4cead0e2?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=400&fit=crop'
  ],
  home: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=400&fit=crop'
  ],
  electronics: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
  ],
  tools: [
    'https://images.unsplash.com/photo-1504148455328-c378907d89eb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1581147036324-c153c5d2a52c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1426927308491-6380b6a9936f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1530124566582-a45a7e3d0943?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1572981779307-38b8cabb2477?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1553531815-91c3e95db713?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1609205807107-454f1c4b2d95?w=400&h=400&fit=crop'
  ],
  sports: [
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517836357463-d25dfeaa3738?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556906781-9a412968c30c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1526232761682-d36a2e17c005?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1540474527619-f88bcc14d86c?w=400&h=400&fit=crop'
  ],
  pets: [
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1583337130417-13104dec14a3?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1585802074266-c1fa5b559476?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1587162146766-e06b1189b907?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1615492985779-9ff16a967352?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1583337130417-13104dec14a3?w=400&h=400&fit=crop'
  ],
  machinery: [
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1537462715879-360ee2585867?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1585395037798-0ead5153422c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&h=400&fit=crop'
  ]
};

const categoryIcons = {
  automobiles: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=60&h=60&fit=crop',
  clothing: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=60&h=60&fit=crop',
  home: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=60&h=60&fit=crop',
  electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop',
  tools: 'https://images.unsplash.com/photo-1504148455328-c378907d89eb?w=60&h=60&fit=crop',
  sports: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=60&h=60&fit=crop',
  pets: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=60&h=60&fit=crop',
  machinery: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=60&h=60&fit=crop'
};

// Hero banner images
const heroImages = {
  headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  laptop: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
  phone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
  watch: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
};

function loadDB() {
  try {
    if (fs.existsSync(DB_PATH)) {
      return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    }
  } catch (e) { console.error('DB load error:', e); }
  return initializeDB();
}

function saveDB(db) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  } catch (e) { console.error('DB save error:', e); }
}

function initializeDB() {
  const categories = [
    { id: 'automobiles', name: 'Automobiles', icon: '🚗' },
    { id: 'clothing', name: 'Clothes and Wear', icon: '👕' },
    { id: 'home', name: 'Home Interiors', icon: '🏠' },
    { id: 'electronics', name: 'Computer and Tech', icon: '💻' },
    { id: 'tools', name: 'Tools & Equipment', icon: '🔧' },
    { id: 'sports', name: 'Sports and Outdoor', icon: '⚽' },
    { id: 'pets', name: 'Animal and Pets', icon: '🐾' },
    { id: 'machinery', name: 'Machinery Tools', icon: '⚙️' }
  ];

  const countries = [
    { code: 'AE', name: 'Arabic Emirates', domain: 'shopname.ae', flag: 'ae' },
    { code: 'AU', name: 'Australia', domain: 'shopname.au', flag: 'au' },
    { code: 'US', name: 'United States', domain: 'shopname.us', flag: 'us' },
    { code: 'RU', name: 'Russia', domain: 'shopname.ru', flag: 'ru' },
    { code: 'IT', name: 'Italy', domain: 'shopname.it', flag: 'it' },
    { code: 'DK', name: 'Denmark', domain: 'denmark.com.dk', flag: 'dk' },
    { code: 'FR', name: 'France', domain: 'shopname.fr', flag: 'fr' },
    { code: 'CN', name: 'China', domain: 'shopname.cn', flag: 'cn' },
    { code: 'GB', name: 'Great Britain', domain: 'shopname.co.uk', flag: 'gb' },
    { code: 'JP', name: 'Japan', domain: 'shopname.jp', flag: 'jp' }
  ];

  const productNames = {
    automobiles: ['Car Floor Mats','LED Headlight Kit','Leather Steering Cover','Car Phone Mount','Tire Pressure Monitor','Dash Cam 1080p','Car Vacuum Cleaner','Seat Cushion Set','Car Air Freshener','Trunk Organizer','Windshield Sun Shade','Car Jump Starter','OBD2 Scanner','Car Wax Polish','Wheel Rim Cleaner','Brake Pad Set','Car Cover Waterproof','Battery Charger','Exhaust Tip Chrome','Racing Gloves'],
    clothing: ['Cotton Polo Shirt','Slim Fit Jeans','Winter Puffer Jacket','Casual Hoodie','Formal Blazer','Denim Shorts','Wool Sweater','Running Sneakers','Leather Belt','Silk Tie Collection','Cargo Pants','Linen Summer Dress','Graphic T-Shirt','Swim Trunks','Ankle Boots','Rain Jacket','Compression Socks','Baseball Cap','Crossbody Bag','Cashmere Scarf'],
    home: ['Velvet Sofa Set','Wooden Coffee Table','LED Floor Lamp','Memory Foam Pillow','Ceramic Vase Set','Wall Art Canvas','Kitchen Knife Set','Bamboo Cutting Board','Throw Blanket Knitted','Shoe Rack Organizer','Bathroom Mirror LED','Plant Pot Ceramic','Dining Table Set','Curtain Blackout','Area Rug Persian','Bookshelf Modern','Candle Holder Set','Storage Baskets','Door Mat Welcome','Wall Clock Minimal'],
    electronics: ['Wireless Earbuds Pro','Mechanical Keyboard','Gaming Mouse RGB','USB-C Hub 7-in-1','Portable SSD 1TB','Webcam 4K HD','Bluetooth Speaker','Smart Watch Fitness','Laptop Stand Aluminum','Wireless Charger Pad','Noise Cancel Headphones','Tablet Stylus Pen','HDMI Cable 6ft','Power Bank 20000mAh','Monitor Light Bar','WiFi Router AX','Drone Mini Camera','VR Headset Standalone','Smart Home Hub','Action Camera 4K'],
    tools: ['Cordless Drill Set','Digital Multimeter','Laser Level Meter','Tool Box 150pcs','Soldering Iron Kit','Wire Stripper Tool','Electric Screwdriver','Tape Measure 25ft','Safety Goggles','Work Light LED','Pliers Set 3pc','Hex Key Set','Cable Ties 500pcs','Stud Finder Digital','Heat Gun 2000W','Pipe Wrench 14in','Utility Knife Set','Clamp Set 4pc','Nail Gun Electric','Air Compressor Mini'],
    sports: ['Yoga Mat Premium','Resistance Bands Set','Running Shoes Men','Dumbbell Set 20kg','Jump Rope Speed','Tennis Racket Pro','Cycling Helmet','Swimming Goggles','Camping Tent 4P','Hiking Backpack 50L','Fitness Tracker Band','Basketball Official','Foam Roller 18in','Boxing Gloves','Skateboard Complete','Fishing Rod Combo','Soccer Ball Size 5','Golf Club Set','Kayak Paddle','Climbing Harness'],
    pets: ['Dog Bed Orthopedic','Cat Tree Tower','Pet Food Bowl SS','Dog Leash Retractable','Cat Litter Box','Pet Carrier Bag','Dog Chew Toys Set','Aquarium Filter','Bird Cage Large','Pet Camera WiFi','Dog Raincoat','Cat Scratching Post','Pet Grooming Kit','Fish Tank LED Light','Hamster Wheel Silent','Dog Training Collar','Pet Water Fountain','Cat Toy Interactive','Dog Pool Summer','Pet First Aid Kit'],
    machinery: ['Angle Grinder 4.5in','Table Saw 10inch','Welding Machine MIG','Lathe Machine Mini','CNC Router 3018','Hydraulic Jack 3Ton','Bench Grinder 6in','Power Drill Press','Band Saw Portable','Air Impact Wrench','Metal Cut Off Saw','Planer Thicknesser','Scroll Saw Variable','Chainsaw Electric','Concrete Mixer','Pressure Washer 3000PSI','Generator 3500W','Compressor 60Gal','Floor Sander','Tile Saw Wet']
  };

  const descriptions = [
    'High-quality product built with premium materials for lasting durability. Perfect for everyday use.',
    'Professional grade item designed for maximum performance. Features advanced technology and superior craftsmanship.',
    'Best-selling product with thousands of satisfied customers. Backed by our quality guarantee.',
    'Innovative design meets practical functionality. Ideal for both beginners and professionals.',
    'Eco-friendly materials with modern aesthetics. Lightweight yet incredibly strong construction.',
    'Industry-leading specifications at an unbeatable price. Free shipping included worldwide.',
    'Award-winning product recognized for excellence. Meets all international quality standards.',
    'Versatile and adaptable to any situation. Easy to use with intuitive controls.'
  ];

  const products = [];
  let productId = 1;

  categories.forEach(cat => {
    const names = productNames[cat.id];
    const imgs = productImages[cat.id];
    names.forEach((name, idx) => {
      const basePrice = Math.floor(Math.random() * 450) + 15;
      const discount = [10, 15, 20, 25, 30, 40][Math.floor(Math.random() * 6)];
      const price = Math.round(basePrice * (1 - discount / 100) * 100) / 100;
      const mainImg = imgs[idx % imgs.length];
      const galleryImgs = [mainImg, imgs[(idx+1)%imgs.length], imgs[(idx+2)%imgs.length], imgs[(idx+3)%imgs.length]];

      products.push({
        id: productId++,
        name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g,'-'),
        category: cat.id, price, oldPrice: basePrice, discount,
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviewCount: Math.floor(Math.random() * 500) + 10,
        soldCount: Math.floor(Math.random() * 1000) + 50,
        description: descriptions[idx % descriptions.length],
        image: mainImg, galleryImages: galleryImgs,
        stock: Math.floor(Math.random() * 100) + 5,
        verified: Math.random() > 0.3,
        freeShipping: Math.random() > 0.4,
        brand: ['Premium','ProLine','Elite','Value','Ultra','Eco'][Math.floor(Math.random() * 6)],
        condition: Math.random() > 0.2 ? 'new' : 'refurbished',
        colors: ['Black','White','Blue','Red','Gray','Green'].slice(0, Math.floor(Math.random()*4)+2),
        sizes: ['S','M','L','XL','XXL'].slice(0, Math.floor(Math.random()*3)+2),
        country: countries[Math.floor(Math.random() * countries.length)].code,
        supplier: `${['Guangzhou','Berlin','Tokyo','New York','London','Sydney'][Math.floor(Math.random()*6)]} Trading LLC`,
        features: ['Metallic','Plastic Cover','8GB RAM','Super Power','Large Memory','Waterproof','Eco-Friendly','Premium Quality'].slice(0, Math.floor(Math.random()*3)+2)
      });
    });
  });

  // 40 products per country
  const allNames = Object.values(productNames).flat();
  const allImgs = Object.values(productImages).flat();
  countries.forEach(country => {
    for (let i = 0; i < 40; i++) {
      const name = allNames[i % allNames.length] + ' - ' + country.name;
      const catIdx = i % categories.length;
      const cat = categories[catIdx];
      const basePrice = Math.floor(Math.random() * 500) + 10;
      const discount = [5, 10, 15, 20, 25, 30][Math.floor(Math.random() * 6)];
      const mainImg = allImgs[i % allImgs.length];
      const galleryImgs = [mainImg, allImgs[(i+5)%allImgs.length], allImgs[(i+10)%allImgs.length], allImgs[(i+15)%allImgs.length]];

      products.push({
        id: productId++,
        name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g,'-'),
        category: cat.id,
        price: Math.round(basePrice * (1 - discount / 100) * 100) / 100,
        oldPrice: basePrice, discount,
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviewCount: Math.floor(Math.random() * 300) + 5,
        soldCount: Math.floor(Math.random() * 800) + 20,
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        image: mainImg, galleryImages: galleryImgs,
        stock: Math.floor(Math.random() * 80) + 10,
        verified: Math.random() > 0.3,
        freeShipping: Math.random() > 0.5,
        brand: ['Premium','ProLine','Elite','Value','Ultra'][Math.floor(Math.random() * 5)],
        condition: Math.random() > 0.2 ? 'new' : 'refurbished',
        colors: ['Black','White','Blue','Red','Gray'].slice(0, Math.floor(Math.random()*3)+2),
        sizes: ['S','M','L','XL'].slice(0, Math.floor(Math.random()*3)+2),
        country: country.code,
        supplier: `${country.name} Suppliers Co.`,
        features: ['Fast Delivery','Quality Assured','Bulk Discount'].slice(0, Math.floor(Math.random()*2)+1)
      });
    }
  });

  const db = {
    users: [
      { id: 1, email: 'admin@shop.com', password: 'admin123', name: 'Admin User', role: 'admin', createdAt: '2024-01-01' },
      { id: 2, email: 'user@shop.com', password: 'user123', name: 'John Doe', role: 'user', createdAt: '2024-06-01' }
    ],
    categories, countries, products,
    orders: [
      { id: 'ORD-001', userId: 2, userName: 'John Doe', items: [{ productId: 1, name: 'Car Floor Mats', quantity: 2, price: 45.50, image: productImages.automobiles[0] }], total: 91.00, status: 'delivered', date: '2024-12-01', address: '123 Main St, Berlin, Germany', paymentMethod: 'Credit Card' },
      { id: 'ORD-002', userId: 2, userName: 'John Doe', items: [{ productId: 21, name: 'Cotton Polo Shirt', quantity: 1, price: 120.00, image: productImages.clothing[0] }], total: 120.00, status: 'shipped', date: '2024-12-15', address: '456 Oak Ave, Munich, Germany', paymentMethod: 'PayPal' },
      { id: 'ORD-003', userId: 2, userName: 'John Doe', items: [{ productId: 41, name: 'Velvet Sofa Set', quantity: 3, price: 35.00, image: productImages.home[0] }], total: 105.00, status: 'processing', date: '2025-01-05', address: '789 Pine Rd, Hamburg, Germany', paymentMethod: 'Cash on Delivery' },
      { id: 'ORD-004', userId: 2, userName: 'John Doe', items: [{ productId: 61, name: 'Wireless Earbuds Pro', quantity: 1, price: 89.99, image: productImages.electronics[0] }], total: 89.99, status: 'delivered', date: '2025-01-10', address: '321 Elm St, Frankfurt, Germany', paymentMethod: 'Credit Card' },
      { id: 'ORD-005', userId: 2, userName: 'John Doe', items: [{ productId: 81, name: 'Cordless Drill Set', quantity: 2, price: 75.00, image: productImages.tools[0] }], total: 150.00, status: 'shipped', date: '2025-01-18', address: '654 Birch Ln, Cologne, Germany', paymentMethod: 'PayPal' },
      { id: 'ORD-006', userId: 2, userName: 'John Doe', items: [{ productId: 101, name: 'Yoga Mat Premium', quantity: 1, price: 45.00, image: productImages.sports[0] }], total: 45.00, status: 'processing', date: '2025-01-22', address: '987 Cedar Dr, Stuttgart, Germany', paymentMethod: 'Credit Card' },
      { id: 'ORD-007', userId: 2, userName: 'John Doe', items: [{ productId: 121, name: 'Dog Bed Orthopedic', quantity: 1, price: 65.00, image: productImages.pets[0] }], total: 65.00, status: 'delivered', date: '2025-02-01', address: '147 Maple Way, Berlin, Germany', paymentMethod: 'Credit Card' },
      { id: 'ORD-008', userId: 2, userName: 'John Doe', items: [{ productId: 141, name: 'Angle Grinder 4.5in', quantity: 1, price: 199.99, image: productImages.machinery[0] }], total: 199.99, status: 'processing', date: '2025-02-10', address: '258 Walnut Ct, Munich, Germany', paymentMethod: 'PayPal' }
    ],
    nextUserId: 3,
    nextOrderId: 9
  };

  saveDB(db);
  return db;
}

let db = loadDB();

// ============ AUTH ============
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  if (db.users.find(u => u.email === email)) return res.status(400).json({ error: 'Email already registered' });
  const user = { id: db.nextUserId++, email, password, name, role: 'user', createdAt: new Date().toISOString().split('T')[0] };
  db.users.push(user);
  saveDB(db);
  res.json({ user: { ...user, password: undefined }, token: `token_${user.id}` });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ user: { ...user, password: undefined }, token: `token_${user.id}` });
});

// ============ PRODUCTS ============
app.get('/api/products', (req, res) => {
  let result = [...db.products];
  const { category, country, search, brand, condition, rating, minPrice, maxPrice, verified, sort, page = 1, limit = 20 } = req.query;
  if (category) result = result.filter(p => p.category === category);
  if (country) result = result.filter(p => p.country === country);
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  if (brand) result = result.filter(p => p.brand === brand);
  if (condition) result = result.filter(p => p.condition === condition);
  if (rating) result = result.filter(p => parseFloat(p.rating) >= parseFloat(rating));
  if (minPrice) result = result.filter(p => p.price >= parseFloat(minPrice));
  if (maxPrice) result = result.filter(p => p.price <= parseFloat(maxPrice));
  if (verified === 'true') result = result.filter(p => p.verified);
  switch (sort) {
    case 'price_asc': result.sort((a, b) => a.price - b.price); break;
    case 'price_desc': result.sort((a, b) => b.price - a.price); break;
    case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    case 'popular': result.sort((a, b) => b.soldCount - a.soldCount); break;
    case 'newest': result.sort((a, b) => b.id - a.id); break;
  }
  const total = result.length;
  const start = (page - 1) * limit;
  result = result.slice(start, start + parseInt(limit));
  res.json({ products: result, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
});

app.get('/api/products/:id', (req, res) => {
  const product = db.products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const related = db.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6);
  res.json({ product, related });
});

app.get('/api/categories', (req, res) => res.json(db.categories));
app.get('/api/countries', (req, res) => res.json(db.countries));
app.get('/api/hero-images', (req, res) => res.json(heroImages));
app.get('/api/category-icons', (req, res) => res.json(categoryIcons));

// ============ ORDERS ============
app.post('/api/orders', (req, res) => {
  const { userId, items, total, address, paymentMethod } = req.body;
  const user = db.users.find(u => u.id === userId);
  const order = {
    id: `ORD-${String(db.nextOrderId++).padStart(3, '0')}`,
    userId, userName: user?.name || 'Guest',
    items, total, status: 'processing',
    date: new Date().toISOString().split('T')[0],
    address, paymentMethod: paymentMethod || 'Credit Card'
  };
  db.orders.push(order);
  saveDB(db);
  res.json(order);
});

// ============ ADMIN ============
app.get('/api/admin/stats', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const thisMonth = today.substring(0, 7);
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];

  const todayRevenue = db.orders.filter(o => o.date === today).reduce((s, o) => s + o.total, 0);
  const monthRevenue = db.orders.filter(o => o.date.startsWith(thisMonth)).reduce((s, o) => s + o.total, 0);
  const weekRevenue = db.orders.filter(o => o.date >= weekAgo).reduce((s, o) => s + o.total, 0);
  const totalRevenue = db.orders.reduce((s, o) => s + o.total, 0);

  const pending = db.orders.filter(o => o.status === 'processing').length;
  const shipped = db.orders.filter(o => o.status === 'shipped').length;
  const delivered = db.orders.filter(o => o.status === 'delivered').length;
  const cancelled = db.orders.filter(o => o.status === 'cancelled').length;
  const totalItems = db.orders.reduce((s, o) => s + o.items.reduce((si, i) => si + i.quantity, 0), 0);

  const catCounts = {};
  db.categories.forEach(c => { catCounts[c.name] = db.products.filter(p => p.category === c.id).length; });

  res.json({
    todayRevenue, monthRevenue, weekRevenue, totalRevenue,
    totalOrders: db.orders.length, pending, shipped, delivered, cancelled,
    totalItems, avgOrderValue: db.orders.length ? Math.round(totalRevenue / db.orders.length * 100) / 100 : 0,
    totalProducts: db.products.length, totalUsers: db.users.length, catCounts
  });
});

app.get('/api/admin/orders', (req, res) => res.json(db.orders));

app.put('/api/admin/orders/:id/status', (req, res) => {
  const order = db.orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = req.body.status;
  saveDB(db);
  res.json(order);
});

app.get('/api/admin/users', (req, res) => res.json(db.users.map(u => ({ ...u, password: undefined }))));
app.get('/api/admin/products', (req, res) => res.json(db.products));

// Admin: Add new product
app.post('/api/admin/products', (req, res) => {
  const { name, category, price, description, image } = req.body;
  if (!name || !category || !price) {
    return res.status(400).json({ error: 'Name, category, and price are required' });
  }
  const newProduct = {
    id: db.products.length + 1,
    name,
    category,
    price: parseFloat(price),
    oldPrice: parseFloat(price) * 1.2,
    discount: 20,
    description: description || 'High-quality product',
    image: image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    galleryImages: [image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'],
    stock: 100,
    rating: (4 + Math.random()).toFixed(1),
    reviewCount: Math.floor(Math.random() * 100) + 10,
    soldCount: Math.floor(Math.random() * 500) + 50,
    verified: true,
    freeShipping: true,
    brand: 'Premium',
    condition: 'new',
    colors: ['Black', 'White', 'Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    country: 'US',
    supplier: 'Global Suppliers Co.',
    features: ['Premium Quality', 'Fast Shipping']
  };
  db.products.push(newProduct);
  saveDB(db);
  res.json(newProduct);
});

// Admin: Delete product
app.delete('/api/admin/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  db.products.splice(index, 1);
  saveDB(db);
  res.json({ success: true, message: 'Product deleted' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
