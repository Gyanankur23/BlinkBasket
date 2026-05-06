import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img 
          className="medium" 
          src={product.image} 
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/400x400/eeeeee/333333?text=${encodeURIComponent(product.name)}`;
          }}
        />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 400, color: '#0f1111', lineHeight: 1.4 }}>
            {product.name}
          </h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="price-section" style={{ marginTop: '0.5rem' }}>
          {product.discountPrice ? (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem' }}>
                <span className="discount-price">₹{product.discountPrice.toLocaleString('en-IN')}</span>
                <span className="original-price">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
              <span className="discount-badge" style={{ marginTop: '0.3rem' }}>{product.discountPercent}% off</span>
            </>
          ) : (
            <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
          )}
        </div>
        <div className="prime-badge" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <span style={{ color: '#00a8e1', fontWeight: 700, fontSize: '1.2rem' }}>blink</span>
          <span style={{ color: '#ff9900', fontWeight: 700, fontSize: '1.2rem' }}>Prime</span>
          <span style={{ color: '#565959', fontSize: '1.2rem' }}>FREE Delivery</span>
        </div>
        <div className="seller-info" style={{ marginTop: '0.5rem' }}>
          {product.seller && product.seller.seller && product.seller.seller.name ? (
            <Link to={`/seller/${product.seller._id}`} style={{ fontSize: '1.2rem', color: '#565959' }}>
              {product.seller.seller.name}
            </Link>
          ) : product.seller && typeof product.seller === 'object' && product.seller.name ? (
            <Link to={`/seller/${product.seller._id}`} style={{ fontSize: '1.2rem', color: '#565959' }}>
              {product.seller.name}
            </Link>
          ) : (
            <span style={{ fontSize: '1.2rem', color: '#565959' }}>BlinkBasket</span>
          )}
        </div>
      </div>
    </div>
  );
}
