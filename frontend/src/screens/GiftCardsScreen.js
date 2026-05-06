import React, { useState } from 'react';

export default function GiftCardsScreen() {
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [isDigital, setIsDigital] = useState(true);

  const amounts = [100, 250, 500, 1000, 2000, 5000];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem', color: '#0f1111' }}>
        BlinkBasket Gift Cards
      </h1>
      <p style={{ fontSize: '1.6rem', color: '#565959', marginBottom: '3rem' }}>
        The perfect gift for any occasion
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        {/* Gift Card Preview */}
        <div>
          <div style={{
            background: 'linear-gradient(135deg, #232f3e 0%, #131921 100%)',
            borderRadius: '16px',
            padding: '3rem',
            color: 'white',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            maxWidth: '450px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
              <i className="fa fa-amazon" style={{ fontSize: '3rem', color: '#febd69', marginRight: '1rem' }}></i>
              <span style={{ fontSize: '2.4rem', fontWeight: 700 }}>BlinkBasket</span>
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '8px', 
              padding: '2rem',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <p style={{ fontSize: '1.4rem', marginBottom: '0.5rem', opacity: 0.8 }}>Gift Card Value</p>
              <p style={{ fontSize: '4rem', fontWeight: 700, color: '#febd69' }}>
                ₹{selectedAmount.toLocaleString('en-IN')}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.8 }}>
              <i className={isDigital ? "fa fa-envelope" : "fa fa-gift"}></i>
              <span>{isDigital ? "Digital eGift Card" : "Physical Gift Card"}</span>
            </div>
          </div>

          <div style={{ marginTop: '2rem', padding: '2rem', background: '#f3f3f3', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '1rem', color: '#0f1111' }}>Gift Card Benefits</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '0.5rem 0' }}><i className="fa fa-check" style={{ color: '#067d62', marginRight: '0.5rem' }}></i> Never expires</li>
              <li style={{ padding: '0.5rem 0' }}><i className="fa fa-check" style={{ color: '#067d62', marginRight: '0.5rem' }}></i> Redeemable on millions of items</li>
              <li style={{ padding: '0.5rem 0' }}><i className="fa fa-check" style={{ color: '#067d62', marginRight: '0.5rem' }}></i> FREE One-Day delivery eligible</li>
              <li style={{ padding: '0.5rem 0' }}><i className="fa fa-check" style={{ color: '#067d62', marginRight: '0.5rem' }}></i> Can be combined with other payment methods</li>
            </ul>
          </div>
        </div>

        {/* Purchase Form */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '2rem', color: '#0f1111' }}>Purchase Gift Card</h2>

          {/* Card Type */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600 }}>Card Type</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setIsDigital(true)}
                style={{
                  flex: 1,
                  padding: '1.5rem',
                  border: isDigital ? '2px solid #febd69' : '2px solid #ddd',
                  borderRadius: '8px',
                  background: isDigital ? '#fff8e1' : 'white',
                  cursor: 'pointer'
                }}
              >
                <i className="fa fa-envelope" style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block' }}></i>
                <strong>Digital</strong>
                <p style={{ fontSize: '1.2rem', color: '#565959', margin: 0 }}>Email delivery</p>
              </button>
              <button
                onClick={() => setIsDigital(false)}
                style={{
                  flex: 1,
                  padding: '1.5rem',
                  border: !isDigital ? '2px solid #febd69' : '2px solid #ddd',
                  borderRadius: '8px',
                  background: !isDigital ? '#fff8e1' : 'white',
                  cursor: 'pointer'
                }}
              >
                <i className="fa fa-gift" style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block' }}></i>
                <strong>Physical</strong>
                <p style={{ fontSize: '1.2rem', color: '#565959', margin: 0 }}>Mail delivery</p>
              </button>
            </div>
          </div>

          {/* Amount Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600 }}>Select Amount</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {amounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  style={{
                    padding: '1rem',
                    border: selectedAmount === amount ? '2px solid #febd69' : '2px solid #ddd',
                    borderRadius: '8px',
                    background: selectedAmount === amount ? '#fff8e1' : 'white',
                    cursor: 'pointer',
                    fontWeight: selectedAmount === amount ? 700 : 400
                  }}
                >
                  ₹{amount}
                </button>
              ))}
            </div>
          </div>

          {/* Recipient Info */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600 }}>Recipient Details</label>
            <input
              type="email"
              placeholder="Recipient email address"
              style={{
                width: '100%',
                padding: '1rem',
                border: '1px solid #a6a6a6',
                borderRadius: '4px',
                marginBottom: '1rem',
                fontSize: '1.6rem'
              }}
            />
            <input
              type="text"
              placeholder="Recipient name (optional)"
              style={{
                width: '100%',
                padding: '1rem',
                border: '1px solid #a6a6a6',
                borderRadius: '4px',
                marginBottom: '1rem',
                fontSize: '1.6rem'
              }}
            />
            <textarea
              placeholder="Add a personal message (optional)"
              rows="3"
              style={{
                width: '100%',
                padding: '1rem',
                border: '1px solid #a6a6a6',
                borderRadius: '4px',
                fontSize: '1.6rem',
                resize: 'vertical'
              }}
            ></textarea>
          </div>

          {/* Your Info */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600 }}>Your Details</label>
            <input
              type="text"
              placeholder="Your name"
              style={{
                width: '100%',
                padding: '1rem',
                border: '1px solid #a6a6a6',
                borderRadius: '4px',
                fontSize: '1.6rem'
              }}
            />
          </div>

          {/* Total & Buy Button */}
          <div style={{ borderTop: '2px solid #eee', paddingTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.8rem' }}>Total:</span>
              <span style={{ fontSize: '2.4rem', fontWeight: 700, color: '#0f1111' }}>
                ₹{selectedAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <button style={{
              width: '100%',
              padding: '1.5rem',
              background: '#febd69',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              color: '#111'
            }}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Check Balance Section */}
      <div style={{ marginTop: '4rem', background: '#f3f3f3', padding: '3rem', borderRadius: '8px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem', color: '#0f1111' }}>Check Gift Card Balance</h2>
        <p style={{ color: '#565959', marginBottom: '2rem' }}>
          Enter your gift card code to check your balance
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Enter claim code"
            style={{
              flex: 1,
              padding: '1rem',
              border: '1px solid #a6a6a6',
              borderRadius: '4px',
              fontSize: '1.6rem'
            }}
          />
          <button style={{
            padding: '1rem 2rem',
            background: '#232f3e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1.6rem',
            cursor: 'pointer'
          }}>
            Check Balance
          </button>
        </div>
      </div>
    </div>
  );
}

