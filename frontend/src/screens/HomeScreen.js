import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  return (
    <div>
      {/* Amazon-style Hero Banner */}
      <div className="hero-banner" style={{
        background: 'linear-gradient(135deg, #232f3e 0%, #131921 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ fontSize: '3.6rem', marginBottom: '1rem', color: 'white' }}>
          Welcome to BlinkBasket
        </h1>
        <p style={{ fontSize: '1.8rem', marginBottom: '2rem', color: '#febd69' }}>
          The everything store. Shop millions of products with fast delivery.
        </p>
        <Link to="/search" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #febd69 0%, #f3a847 100%)',
          color: '#111',
          padding: '1.2rem 3rem',
          borderRadius: '3px',
          fontSize: '1.6rem',
          fontWeight: 700,
          textDecoration: 'none'
        }}>
          Start Shopping
        </Link>
      </div>

      <h2 style={{
        padding: '0 2rem',
        fontSize: '2.1rem',
        fontWeight: 700,
        color: '#0f1111',
        marginBottom: '1rem'
      }}>Featured Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="product-grid">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
