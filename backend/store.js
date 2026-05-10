import { randomUUID } from 'crypto';

export const newObjectId = () => randomUUID();

export const db = {
  users: [],
  products: [],
  orders: [],
};

export const resetDb = () => {
  db.users = [];
  db.products = [];
  db.orders = [];
};

const nowIso = () => new Date().toISOString();

const userSellerShape = () => ({
  name: '',
  logo: '',
  description: '',
  rating: 0,
  numReviews: 0,
});

export function insertUser(payload) {
  const doc = {
    _id: newObjectId(),
    name: payload.name,
    email: payload.email,
    password: payload.password,
    isAdmin: Boolean(payload.isAdmin),
    isSeller: Boolean(payload.isSeller),
    seller: payload.seller
      ? { ...userSellerShape(), ...payload.seller }
      : userSellerShape(),
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  db.users.push(doc);
  return doc;
}

export function findUserById(id) {
  return db.users.find((u) => u._id === id);
}

export function findUserByEmail(email) {
  return db.users.find((u) => u.email === email);
}

export function listUsers() {
  return [...db.users];
}

export function deleteUserById(id) {
  const i = db.users.findIndex((u) => u._id === id);
  if (i === -1) return null;
  const [removed] = db.users.splice(i, 1);
  return removed;
}

export function updateUserById(id, updater) {
  const u = findUserById(id);
  if (!u) return null;
  updater(u);
  u.updatedAt = nowIso();
  return u;
}

export function populateSeller(user) {
  if (!user) return null;
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isSeller: user.isSeller,
    seller: user.seller,
  };
}

export function populateProduct(product) {
  if (!product) return null;
  const sellerUser = findUserById(product.seller);
  return {
    ...product,
    seller: sellerUser ? populateSeller(sellerUser) : null,
  };
}

export function insertProduct(payload) {
  const doc = {
    _id: newObjectId(),
    name: payload.name,
    seller: payload.seller,
    image: payload.image,
    brand: payload.brand,
    category: payload.category,
    subcategory: payload.subcategory,
    description: payload.description,
    price: payload.price,
    discountPrice: payload.discountPrice ?? null,
    discountPercent: payload.discountPercent ?? null,
    countInStock: payload.countInStock,
    rating: payload.rating,
    numReviews: payload.numReviews,
    reviews: payload.reviews ? [...payload.reviews] : [],
    isFeatured: Boolean(payload.isFeatured),
    tags: payload.tags ? [...payload.tags] : [],
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  db.products.push(doc);
  return doc;
}

export function insertManyProducts(items) {
  return items.map((p) => insertProduct(p));
}

export function findProductById(id) {
  return db.products.find((p) => p._id === id);
}

export function deleteProductById(id) {
  const i = db.products.findIndex((p) => p._id === id);
  if (i === -1) return null;
  const [removed] = db.products.splice(i, 1);
  return removed;
}

export function filterProducts({
  name,
  category,
  seller,
  min,
  max,
  rating,
}) {
  return db.products.filter((p) => {
    if (name && !p.name.toLowerCase().includes(String(name).toLowerCase()))
      return false;
    if (category && p.category !== category) return false;
    if (seller && p.seller !== seller) return false;
    if (min && max && (p.price < min || p.price > max)) return false;
    if (rating && p.rating < rating) return false;
    return true;
  });
}

export function distinctCategories() {
  return [...new Set(db.products.map((p) => p.category))];
}

export function sortProducts(list, order) {
  const copy = [...list];
  if (order === 'lowest') copy.sort((a, b) => a.price - b.price);
  else if (order === 'highest') copy.sort((a, b) => b.price - a.price);
  else if (order === 'toprated') copy.sort((a, b) => b.rating - a.rating);
  else copy.sort((a, b) => (a._id < b._id ? 1 : a._id > b._id ? -1 : 0));
  return copy;
}

export function paginate(list, page, pageSize) {
  const start = pageSize * (page - 1);
  return list.slice(start, start + pageSize);
}

export function insertOrder(payload) {
  const doc = {
    _id: newObjectId(),
    orderItems: payload.orderItems,
    shippingAddress: payload.shippingAddress,
    paymentMethod: payload.paymentMethod,
    paymentResult: payload.paymentResult,
    itemsPrice: payload.itemsPrice,
    shippingPrice: payload.shippingPrice,
    taxPrice: payload.taxPrice,
    totalPrice: payload.totalPrice,
    user: payload.user,
    seller: payload.seller,
    isPaid: Boolean(payload.isPaid),
    paidAt: payload.paidAt,
    isDelivered: Boolean(payload.isDelivered),
    deliveredAt: payload.deliveredAt,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  db.orders.push(doc);
  return doc;
}

export function findOrderById(id) {
  return db.orders.find((o) => o._id === id);
}

export function deleteOrderById(id) {
  const i = db.orders.findIndex((o) => o._id === id);
  if (i === -1) return null;
  const [removed] = db.orders.splice(i, 1);
  return removed;
}

export function findOrdersForUser(userId) {
  return db.orders.filter((o) => o.user === userId);
}

export function listOrdersSellerFilter(sellerId) {
  if (!sellerId) return [...db.orders];
  return db.orders.filter((o) => o.seller === sellerId);
}

export function updateOrderById(id, updater) {
  const o = findOrderById(id);
  if (!o) return null;
  updater(o);
  o.updatedAt = nowIso();
  return o;
}

export function aggregateOrderSummary() {
  const orders = db.orders;
  const numOrders = orders.length;
  const totalSales = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);

  const numUsers = db.users.length;

  const dailyMap = {};
  for (const o of orders) {
    const day = String(o.createdAt).slice(0, 10);
    if (!dailyMap[day]) dailyMap[day] = { orders: 0, sales: 0 };
    dailyMap[day].orders += 1;
    dailyMap[day].sales += o.totalPrice || 0;
  }
  const dailyOrders = Object.entries(dailyMap)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([k, v]) => ({ _id: k, orders: v.orders, sales: v.sales }));

  const catMap = {};
  for (const p of db.products) {
    catMap[p.category] = (catMap[p.category] || 0) + 1;
  }
  const productCategories = Object.entries(catMap).map(([k, count]) => ({
    _id: k,
    count,
  }));

  return {
    users: [{ _id: null, numUsers }],
    orders: [{ _id: null, numOrders, totalSales }],
    dailyOrders,
    productCategories,
  };
}
