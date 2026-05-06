import React from 'react';

export default function CustomerServiceScreen() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.8rem', marginBottom: '2rem', color: '#0f1111' }}>
        Customer Service
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Help Topics */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#232f3e', marginBottom: '1.5rem' }}>
            <i className="fa fa-truck" style={{ marginRight: '1rem' }}></i>
            Your Orders
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px solid #eee' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>Track your package</a>
            </li>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px solid #eee' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>Return or replace items</a>
            </li>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px solid #eee' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>View order details</a>
            </li>
            <li style={{ padding: '0.8rem 0' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>Cancel an order</a>
            </li>
          </ul>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#232f3e', marginBottom: '1.5rem' }}>
            <i className="fa fa-user" style={{ marginRight: '1rem' }}></i>
            Account Settings
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px solid #eee' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>Change your password</a>
            </li>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px solid #eee' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>Update payment methods</a>
            </li>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px solid #eee' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>Manage addresses</a>
            </li>
            <li style={{ padding: '0.8rem 0' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>Account security</a>
            </li>
          </ul>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#232f3e', marginBottom: '1.5rem' }}>
            <i className="fa fa-credit-card" style={{ marginRight: '1rem' }}></i>
            Payments & Pricing
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px solid #eee' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>Payment methods</a>
            </li>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px solid #eee' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>Gift card balance</a>
            </li>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px solid #eee' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>Promotions & coupons</a>
            </li>
            <li style={{ padding: '0.8rem 0' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>Pricing inquiries</a>
            </li>
          </ul>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#232f3e', marginBottom: '1.5rem' }}>
            <i className="fa fa-question-circle" style={{ marginRight: '1rem' }}></i>
            Help & Support
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px solid #eee' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>Contact us</a>
            </li>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px solid #eee' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>Chat with us</a>
            </li>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px solid #eee' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>Help Center</a>
            </li>
            <li style={{ padding: '0.8rem 0' }}>
              <a href="#" style={{ color: '#007185', textDecoration: 'none' }}>Report an issue</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Contact Section */}
      <div style={{ marginTop: '3rem', background: '#232f3e', color: 'white', padding: '3rem', borderRadius: '8px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Need more help?</h2>
        <p style={{ fontSize: '1.6rem', marginBottom: '2rem' }}>
          Our customer service team is available 24/7
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <i className="fa fa-phone" style={{ fontSize: '2.4rem', color: '#febd69', marginBottom: '0.5rem' }}></i>
            <p>1-800-BLINK-01</p>
          </div>
          <div>
            <i className="fa fa-envelope" style={{ fontSize: '2.4rem', color: '#febd69', marginBottom: '0.5rem' }}></i>
            <p>support@blinkbasket.com</p>
          </div>
          <div>
            <i className="fa fa-comments" style={{ fontSize: '2.4rem', color: '#febd69', marginBottom: '0.5rem' }}></i>
            <p>Live Chat</p>
          </div>
        </div>
      </div>
    </div>
  );
}

