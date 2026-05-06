import React from 'react';
import { Link } from 'react-router-dom';

export default function RegistryScreen() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem', color: '#0f1111' }}>
        BlinkBasket Registry
      </h1>
      <p style={{ fontSize: '1.6rem', color: '#565959', marginBottom: '3rem' }}>
        Create and share wishlists for any occasion
      </p>

      {/* Registry Types */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <i className="fa fa-heart" style={{ fontSize: '4rem', color: '#cc0c39', marginBottom: '1rem' }}></i>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Wedding Registry</h3>
          <p style={{ color: '#565959', marginBottom: '1.5rem' }}>
            Create your perfect wedding wishlist and share with guests
          </p>
          <Link to="/signin" style={{
            display: 'inline-block',
            background: '#febd69',
            color: '#111',
            padding: '1rem 2rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 700
          }}>
            Create Registry
          </Link>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <i className="fa fa-baby" style={{ fontSize: '4rem', color: '#00a8e1', marginBottom: '1rem' }}></i>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Baby Registry</h3>
          <p style={{ color: '#565959', marginBottom: '1.5rem' }}>
            Everything you need for your new arrival
          </p>
          <Link to="/signin" style={{
            display: 'inline-block',
            background: '#febd69',
            color: '#111',
            padding: '1rem 2rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 700
          }}>
            Create Registry
          </Link>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <i className="fa fa-birthday-cake" style={{ fontSize: '4rem', color: '#ff9900', marginBottom: '1rem' }}></i>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Birthday Wishlist</h3>
          <p style={{ color: '#565959', marginBottom: '1.5rem' }}>
            Share what you want for your special day
          </p>
          <Link to="/signin" style={{
            display: 'inline-block',
            background: '#febd69',
            color: '#111',
            padding: '1rem 2rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 700
          }}>
            Create Wishlist
          </Link>
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <i className="fa fa-home" style={{ fontSize: '4rem', color: '#232f3e', marginBottom: '1rem' }}></i>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Housewarming</h3>
          <p style={{ color: '#565959', marginBottom: '1.5rem' }}>
            New home essentials for your fresh start
          </p>
          <Link to="/signin" style={{
            display: 'inline-block',
            background: '#febd69',
            color: '#111',
            padding: '1rem 2rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 700
          }}>
            Create Registry
          </Link>
        </div>
      </div>

      {/* Find a Registry */}
      <div style={{ background: '#f3f3f3', padding: '3rem', borderRadius: '8px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.4rem', marginBottom: '1.5rem', color: '#0f1111' }}>
          Find a Registry or Wishlist
        </h2>
        <p style={{ fontSize: '1.6rem', color: '#565959', marginBottom: '2rem' }}>
          Looking for someone's registry? Search by name or registry ID.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Enter registrant name"
            style={{
              flex: 1,
              padding: '1rem',
              border: '1px solid #a6a6a6',
              borderRadius: '4px',
              fontSize: '1.6rem'
            }}
          />
          <button style={{
            background: '#febd69',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '4px',
            fontSize: '1.6rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}>
            Search
          </button>
        </div>
      </div>

      {/* Benefits */}
      <div style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '2.4rem', marginBottom: '2rem', textAlign: 'center', color: '#0f1111' }}>
          Why Choose BlinkBasket Registry?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <i className="fa fa-check-circle" style={{ fontSize: '3rem', color: '#067d62', marginBottom: '1rem' }}></i>
            <h4>Easy Returns</h4>
            <p style={{ color: '#565959' }}>365-day return policy on registry gifts</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <i className="fa fa-gift" style={{ fontSize: '3rem', color: '#067d62', marginBottom: '1rem' }}></i>
            <h4>Group Gifting</h4>
            <p style={{ color: '#565959' }}>Multiple people can contribute to big items</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <i className="fa fa-truck" style={{ fontSize: '3rem', color: '#067d62', marginBottom: '1rem' }}></i>
            <h4>Fast Shipping</h4>
            <p style={{ color: '#565959' }}>FREE Prime delivery on eligible items</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <i className="fa fa-mobile" style={{ fontSize: '3rem', color: '#067d62', marginBottom: '1rem' }}></i>
            <h4>Universal Registry</h4>
            <p style={{ color: '#565959' }}>Add items from any website</p>
          </div>
        </div>
      </div>
    </div>
  );
}

