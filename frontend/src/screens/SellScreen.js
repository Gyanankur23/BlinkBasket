import React from 'react';
import { Link } from 'react-router-dom';

export default function SellScreen() {
  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #232f3e 0%, #131921 100%)',
        color: 'white',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
          Sell on BlinkBasket
        </h1>
        <p style={{ fontSize: '2rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
          Reach millions of customers and grow your business with India's most trusted e-commerce platform
        </p>
        <Link to="/signin" style={{
          display: 'inline-block',
          background: '#febd69',
          color: '#111',
          padding: '1.5rem 3rem',
          borderRadius: '4px',
          textDecoration: 'none',
          fontSize: '1.8rem',
          fontWeight: 700,
          marginRight: '1rem'
        }}>
          Start Selling
        </Link>
        <Link to="#pricing" style={{
          display: 'inline-block',
          background: 'transparent',
          color: 'white',
          padding: '1.5rem 3rem',
          borderRadius: '4px',
          textDecoration: 'none',
          fontSize: '1.8rem',
          fontWeight: 700,
          border: '2px solid white'
        }}>
          View Pricing
        </Link>
      </div>

      {/* Stats Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        padding: '3rem 2rem',
        background: '#f3f3f3'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '3.6rem', fontWeight: 700, color: '#232f3e' }}>50M+</p>
          <p style={{ color: '#565959', fontSize: '1.6rem' }}>Active Customers</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '3.6rem', fontWeight: 700, color: '#232f3e' }}>10K+</p>
          <p style={{ color: '#565959', fontSize: '1.6rem' }}>Cities Covered</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '3.6rem', fontWeight: 700, color: '#232f3e' }}>99%</p>
          <p style={{ color: '#565959', fontSize: '1.6rem' }}>Satisfaction Rate</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '3.6rem', fontWeight: 700, color: '#232f3e' }}>24/7</p>
          <p style={{ color: '#565959', fontSize: '1.6rem' }}>Seller Support</p>
        </div>
      </div>

      {/* Why Sell Section */}
      <div style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '2.8rem', textAlign: 'center', marginBottom: '3rem', color: '#0f1111' }}>
          Why Sell on BlinkBasket?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <i className="fa fa-users" style={{ fontSize: '4rem', color: '#febd69', marginBottom: '1.5rem' }}></i>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Reach Millions</h3>
            <p style={{ color: '#565959', fontSize: '1.6rem' }}>
              Access BlinkBasket's massive customer base and sell to shoppers across India
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <i className="fa fa-truck" style={{ fontSize: '4rem', color: '#febd69', marginBottom: '1.5rem' }}></i>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Easy Shipping</h3>
            <p style={{ color: '#565959', fontSize: '1.6rem' }}>
              Use BlinkBasket's fulfillment network or ship yourself - we make it simple
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <i className="fa fa-money" style={{ fontSize: '4rem', color: '#febd69', marginBottom: '1.5rem' }}></i>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Fast Payments</h3>
            <p style={{ color: '#565959', fontSize: '1.6rem' }}>
              Get paid directly to your bank account with our secure payment system
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <i className="fa fa-shield" style={{ fontSize: '4rem', color: '#febd69', marginBottom: '1.5rem' }}></i>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Secure & Protected</h3>
            <p style={{ color: '#565959', fontSize: '1.6rem' }}>
              Our A-to-Z Guarantee protects both sellers and customers
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <i className="fa fa-line-chart" style={{ fontSize: '4rem', color: '#febd69', marginBottom: '1.5rem' }}></i>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Grow Your Business</h3>
            <p style={{ color: '#565959', fontSize: '1.6rem' }}>
              Use our tools and reports to scale your business efficiently
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <i className="fa fa-headphones" style={{ fontSize: '4rem', color: '#febd69', marginBottom: '1.5rem' }}></i>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>24/7 Support</h3>
            <p style={{ color: '#565959', fontSize: '1.6rem' }}>
              Get help whenever you need with our dedicated seller support team
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div style={{ background: '#f3f3f3', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.8rem', textAlign: 'center', marginBottom: '3rem', color: '#0f1111' }}>
            How It Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#232f3e',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.4rem',
                fontWeight: 700,
                margin: '0 auto 1rem'
              }}>1</div>
              <h3 style={{ marginBottom: '1rem' }}>Register</h3>
              <p style={{ color: '#565959' }}>Create your seller account and complete verification</p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#232f3e',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.4rem',
                fontWeight: 700,
                margin: '0 auto 1rem'
              }}>2</div>
              <h3 style={{ marginBottom: '1rem' }}>List Products</h3>
              <p style={{ color: '#565959' }}>Add your products with images, descriptions, and pricing</p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#232f3e',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.4rem',
                fontWeight: 700,
                margin: '0 auto 1rem'
              }}>3</div>
              <h3 style={{ marginBottom: '1rem' }}>Get Orders</h3>
              <p style={{ color: '#565959' }}>Receive orders from customers across India</p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#232f3e',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.4rem',
                fontWeight: 700,
                margin: '0 auto 1rem'
              }}>4</div>
              <h3 style={{ marginBottom: '1rem' }}>Ship & Get Paid</h3>
              <p style={{ color: '#565959' }}>Deliver products and receive payment in your account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.8rem', marginBottom: '2rem', color: '#0f1111' }}>
          Simple, Transparent Pricing
        </h2>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ padding: '2rem', borderRight: '2px solid #eee' }}>
              <h3 style={{ color: '#565959', marginBottom: '1rem' }}>Referral Fee</h3>
              <p style={{ fontSize: '3.6rem', fontWeight: 700, color: '#232f3e' }}>8-15%</p>
              <p style={{ color: '#565959' }}>Per item sold (varies by category)</p>
            </div>
            <div style={{ padding: '2rem' }}>
              <h3 style={{ color: '#565959', marginBottom: '1rem' }}>Closing Fee</h3>
              <p style={{ fontSize: '3.6rem', fontWeight: 700, color: '#232f3e' }}>₹5-50</p>
              <p style={{ color: '#565959' }}>Per item (based on price)</p>
            </div>
          </div>
          <p style={{ color: '#565959', fontSize: '1.4rem', marginBottom: '2rem' }}>
            No monthly subscription fees. Pay only when you sell.
          </p>
          <Link to="/signin" style={{
            display: 'inline-block',
            background: '#febd69',
            color: '#111',
            padding: '1.5rem 3rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '1.8rem',
            fontWeight: 700
          }}>
            Start Selling Today
          </Link>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ background: '#232f3e', color: 'white', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.8rem', marginBottom: '3rem' }}>
            Seller Success Stories
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '8px' }}>
              <p style={{ fontSize: '1.6rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "We've grown our business 300% since joining BlinkBasket. The customer reach is incredible!"
              </p>
              <p style={{ fontWeight: 700 }}>— Rahul Sharma, TechWorld Store</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '8px' }}>
              <p style={{ fontSize: '1.6rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "The seller tools make managing inventory and orders so easy. Highly recommend!"
              </p>
              <p style={{ fontWeight: 700 }}>— Priya Patel, Fashion Hub</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '8px' }}>
              <p style={{ fontSize: '1.6rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "Best decision for our business. Payments are fast and customer support is excellent."
              </p>
              <p style={{ fontWeight: 700 }}>— Amit Kumar, Home Essentials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

