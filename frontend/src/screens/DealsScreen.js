import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productActions';

export default function DealsScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products = [] } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  // Filter products with discounts - safely handle undefined
  const deals = Array.isArray(products) 
    ? products.filter((p) => p && p.discountPrice && p.discountPercent > 0)
    : [];

  return (
    <div>
      <div className="hero-banner" style={{
        background: 'linear-gradient(135deg, #cc0c39 0%, #ff9900 100%)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ fontSize: '3.6rem', marginBottom: '1rem', color: 'white' }}>
          Today's Deals
        </h1>
        <p style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
          Up to 50% off on selected items. Limited time offers!
        </p>
        <p style={{ fontSize: '1.4rem', color: '#ffe' }}>
          {deals.length} deals available now
        </p>
      </div>

      <h2 style={{
        padding: '0 2rem',
        fontSize: '2.1rem',
        fontWeight: 700,
        color: '#0f1111',
        marginBottom: '1rem'
      }}>
        Hot Deals 🔥
      </h2>
      
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {deals.length === 0 && (
            <MessageBox>No deals available at the moment. Check back later!</MessageBox>
          )}
          <div className="product-grid">
            {deals.map((product) => (
              product && product._id ? (
                <Product key={product._id} product={product}></Product>
              ) : null
            ))}
          </div>
        </>
      )}
    </div>
  );
}

