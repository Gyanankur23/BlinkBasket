const fs = require('fs');
let code = fs.readFileSync('backend/seed.js', 'utf8');

code = code.replace(
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  '/images/air_jordan_1_retro.png'
);
code = code.replace(
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
  '/images/evening_gown.png'
);
code = code.replace(
  'https://images.unsplash.com/photo-1551028919-ac76c9028d3b?w=400',
  '/images/bomber_jacket.png'
);
code = code.replace(
  'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=400',
  '/images/digital_watch.png'
);
code = code.replace(
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
  '/images/crossbody_bag.png'
);
code = code.replace(
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
  '/images/leather_jacket.png'
);

const badUrls = [
  'https://images.unsplash.com/photo-1598327105666-5b89351aff23?w=400',
  'https://images.unsplash.com/photo-1604467707321-70c1b85d5c9c?w=400',
  'https://images.unsplash.com/photo-1560769629-975e13f0c470?w=400',
  'https://images.unsplash.com/photo-1606144042614-b83bb6b2b0a?w=400',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=400',
  'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=400',
  'https://images.unsplash.com/photo-1560869713-bf19b8e6f3c8?w=400',
  'https://images.unsplash.com/photo-1603351154351-5cfb3d04ef30?w=400',
  'https://images.unsplash.com/photo-1578303512598-5c8f2f25599b?w=400',
  'https://images.unsplash.com/photo-1610890716171-6b1c9e2d1f1c?w=400',
  'https://images.unsplash.com/photo-1581655353564-d851c5c3a990?w=400',
  'https://images.unsplash.com/photo-1541643600914-78a42667173f?w=400',
  'https://images.unsplash.com/photo-1596423473397-6a53ccbbc5b0?w=400',
  'https://images.unsplash.com/photo-1584269600519-112b071b35e6?w=400',
  'https://images.unsplash.com/photo-1524678606372-56527bb42c43?w=400',
  'https://images.unsplash.com/photo-1556912173-3db996ea8f18?w=400',
  'https://images.unsplash.com/photo-1616627547584-2925869b3d5e?w=400',
  'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
  'https://images.unsplash.com/photo-1621252179027-94459d27d3ee?w=400',
  'https://images.unsplash.com/photo-1621072156002-e2fccdc0b357?w=400',
  'https://images.unsplash.com/photo-1602293589930-5dd28404ccb9?w=400',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
  'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
  'https://images.unsplash.com/photo-1631214524115-f2f1345b5d9c?w=400',
  'https://images.unsplash.com/photo-1585366119957-f973043d4561?w=400',
  'https://images.unsplash.com/photo-1602751584552-507ec2618e1a?w=400',
  'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
  'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400',
  'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400'
];

// For the rest, we use picsum photos instead of the broken unsplash URLs
// We can extract the name of the product matching this image to generate a placeholder or seed
const regex = /{ name: '([^']+)', brand: '([^']+)', price: \d+, image: '([^']+)' }/g;
const products = [];
let match;
while ((match = regex.exec(code)) !== null) {
  products.push({ name: match[1], brand: match[2], url: match[3] });
}

badUrls.forEach((url, i) => {
  const prod = products.find(p => p.url === url);
  if (prod) {
    const safeName = encodeURIComponent(prod.name);
    code = code.replace(new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), `https://placehold.co/400x400/eeeeee/333333?text=${safeName}`);
  }
});

fs.writeFileSync('backend/seed.js', code);
console.log('seed.js updated');
