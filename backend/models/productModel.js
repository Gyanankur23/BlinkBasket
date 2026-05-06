import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: false },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: false },
    discountPercent: { type: Number, required: false },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;
