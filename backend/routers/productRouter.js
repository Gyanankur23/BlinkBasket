import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { seedDatabase } from '../seed.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import {
  paginate,
  sortProducts,
  filterProducts,
  distinctCategories,
  findProductById,
  populateProduct,
  insertProduct,
  deleteProductById,
} from '../store.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 50;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const seller = req.query.seller || '';
    const order = req.query.order || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    let list = filterProducts({
      name: name || undefined,
      category: category || undefined,
      seller: seller || undefined,
      min: min && max ? min : undefined,
      max: min && max ? max : undefined,
      rating: rating || undefined,
    });
    list = sortProducts(list, order);
    const count = list.length;
    const pageItems = paginate(list, page, pageSize).map((p) => populateProduct(p));
    res.send({ products: pageItems, page, pages: Math.ceil(count / pageSize) });
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    res.send(distinctCategories());
  })
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    try {
      const result = seedDatabase();
      res.send({
        message: 'Database seeded successfully',
        stats: result.stats,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = findProductById(req.params.id);
    if (product) {
      res.send(populateProduct(product));
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.post(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const createdProduct = insertProduct({
      name: 'sample name ' + Date.now(),
      seller: req.user._id,
      image: '/images/p1.jpg',
      price: 0,
      category: 'sample category',
      brand: 'sample brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });
    res.send({ message: 'Product Created', product: populateProduct(createdProduct) });
  })
);

productRouter.put(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = findProductById(req.params.id);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      product.updatedAt = new Date().toISOString();
      res.send({ message: 'Product Updated', product: populateProduct(product) });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const deleteProduct = deleteProductById(req.params.id);
    if (deleteProduct) {
      res.send({ message: 'Product Deleted', product: populateProduct(deleteProduct) });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = findProductById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      product.updatedAt = new Date().toISOString();
      res.status(201).send({
        message: 'Review Created',
        review: product.reviews[product.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default productRouter;
