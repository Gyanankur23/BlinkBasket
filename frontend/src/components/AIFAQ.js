import React, { useState, useRef, useEffect } from 'react';

// AI FAQ Chatbot with rule-based responses
const FAQ_RESPONSES = {
  // Greetings
  'hi': 'Hello! Welcome to BlinkBasket! How can I help you today?',
  'hello': 'Hi there! Welcome to BlinkBasket! What can I assist you with?',
  'hey': 'Hey! Welcome to BlinkBasket! How may I help you?',
  
  // Shipping & Delivery
  'shipping': 'We offer free shipping on orders over $50. Standard delivery takes 3-5 business days. Express shipping (1-2 days) is available for an additional $10.',
  'delivery': 'We deliver nationwide! Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available for $10 extra.',
  'track order': 'You can track your order in your profile under "Order History". Click on any order to see its current status and tracking information.',
  'how long delivery': 'Standard delivery takes 3-5 business days. Express shipping delivers in 1-2 business days.',
  
  // Returns & Refunds
  'return': 'We accept returns within 30 days of delivery. Items must be unused and in original packaging. Visit your order history to initiate a return.',
  'refund': 'Refunds are processed within 5-7 business days after we receive your returned item. The amount will be credited to your original payment method.',
  'exchange': 'We offer exchanges within 30 days. Please initiate an exchange from your order history page.',
  
  // Payment
  'payment': 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and digital wallets.',
  'paypal': 'Yes, we accept PayPal! You can select PayPal at checkout.',
  'cash': 'Currently, we only accept online payments. Cash on delivery is not available at this time.',
  'secure': 'Yes, all payments are processed through secure, encrypted channels. Your payment information is never stored on our servers.',
  
  // Products
  'product': 'Browse our categories using the menu or search for specific items. Each product page has detailed descriptions, reviews, and sizing information.',
  'stock': 'Product availability is shown on each product page. If an item is out of stock, you can sign up for notifications when it\'s back.',
  'size': 'Size guides are available on each product page. Check the "Size Guide" link next to the size selector.',
  'warranty': 'Electronics come with a 1-year manufacturer warranty. Other products have a 30-day satisfaction guarantee.',
  
  // Account
  'account': 'You can manage your account by clicking your name in the header. From there, you can update your profile, view order history, and manage addresses.',
  'password': 'To reset your password, go to the Sign In page and click "Forgot Password". We\'ll send you a reset link via email.',
  'delete account': 'To delete your account, please contact our support team through the Support chat.',
  
  // Discounts & Offers
  'discount': 'Check our homepage for current promotions! You can also subscribe to our newsletter for exclusive offers.',
  'coupon': 'Enter your coupon code at checkout in the "Promo Code" field. The discount will be applied automatically.',
  'sale': 'Visit our Search page and filter by price to find the best deals! We also run seasonal sales - check the homepage banners.',
  
  // Seller related
  'sell': 'Want to sell on BlinkBasket? Register an account and apply to become a seller from your profile page.',
  'seller': 'Our marketplace features verified sellers. Each seller has a rating and reviews from customers.',
  'become seller': 'To become a seller, register an account, then apply from your profile. Our team will review your application within 2-3 business days.',
  
  // Support
  'help': 'I\'m here to help! Ask me about shipping, returns, payments, products, or your account.',
  'contact': 'For additional support, you can use the live chat feature (if available) or email us at support@blinkbasket.com.',
  'support': 'I\'m BlinkBasket\'s AI assistant! I can answer questions about orders, shipping, returns, payments, and more.',
  'problem': 'I\'m sorry to hear you\'re having an issue. Please describe the problem, and I\'ll do my best to help or direct you to the right support channel.',
  
  // Company info
  'about': 'BlinkBasket is your one-stop online marketplace for quality products at great prices. We connect buyers with verified sellers nationwide.',
  'blinkbasket': 'BlinkBasket is an e-commerce platform offering a wide range of products from verified sellers. We prioritize customer satisfaction and fast delivery!',
  
  // Order related
  'order': 'You can place orders by adding items to your cart and proceeding to checkout. View your order history in your profile.',
  'cancel': 'Orders can be cancelled within 1 hour of placement or before they are shipped. Check your order history for cancellation options.',
  'modify': 'Once an order is placed, it cannot be modified. Please cancel and place a new order if needed (within 1 hour).',
  'status': 'Check your order status in your profile under "Order History". Statuses include: Pending, Processing, Shipped, Delivered.',
  
  // Default response
  'default': 'I\'m not sure I understand. Try asking about shipping, returns, payments, products, or type "help" for topics I can assist with!'
};

// Function to find best matching response
const getAIResponse = (input) => {
  const lowerInput = input.toLowerCase().trim();
  
  // Check for exact matches first
  if (FAQ_RESPONSES[lowerInput]) {
    return FAQ_RESPONSES[lowerInput];
  }
  
  // Check for partial matches
  for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
    if (lowerInput.includes(key)) {
      return response;
    }
  }
  
  // Check for keyword matches
  const keywords = {
    'ship': 'shipping',
    'deliver': 'delivery',
    'pay': 'payment',
    'price': 'payment',
    'cost': 'payment',
    'buy': 'product',
    'shop': 'product',
    'item': 'product',
    'login': 'account',
    'signin': 'account',
    'register': 'account',
    'signup': 'account',
    'money back': 'refund',
    'broken': 'problem',
    'damaged': 'problem',
    'wrong': 'problem',
    'issue': 'problem',
    'error': 'problem',
    'promo': 'discount',
    'code': 'coupon',
    'voucher': 'coupon',
    'deal': 'sale',
    'offer': 'sale'
  };
  
  for (const [keyword, faqKey] of Object.entries(keywords)) {
    if (lowerInput.includes(keyword)) {
      return FAQ_RESPONSES[faqKey] || FAQ_RESPONSES['default'];
    }
  }
  
  return FAQ_RESPONSES['default'];
};

export default function AIFAQ() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m BlinkBot 🤖, your AI assistant. Ask me anything about BlinkBasket!' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = getAIResponse(userMessage);
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      setIsTyping(false);
    }, 800);
  };

  const quickReplies = [
    'Shipping info',
    'Track order',
    'Return policy',
    'Payment methods'
  ];

  return (
    <div className="ai-faq-container">
      {/* Floating Button */}
      {!isOpen && (
        <button 
          className="ai-faq-button"
          onClick={() => setIsOpen(true)}
          title="Ask BlinkBot AI"
        >
          <i className="fa fa-robot" />
          <span className="ai-badge">AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-faq-chatbox">
          {/* Header */}
          <div className="ai-faq-header">
            <div className="ai-faq-title">
              <i className="fa fa-robot" />
              <span>BlinkBot AI</span>
            </div>
            <button 
              className="ai-faq-close"
              onClick={() => setIsOpen(false)}
            >
              <i className="fa fa-times" />
            </button>
          </div>

          {/* Messages */}
          <div className="ai-faq-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`ai-message ${msg.type === 'user' ? 'user' : 'bot'}`}
              >
                <div className="ai-message-bubble">
                  {msg.type === 'bot' && (
                    <div className="ai-avatar">
                      <i className="fa fa-robot" />
                    </div>
                  )}
                  <div className="ai-message-text">{msg.text}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="ai-message bot">
                <div className="ai-message-bubble">
                  <div className="ai-avatar">
                    <i className="fa fa-robot" />
                  </div>
                  <div className="ai-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="ai-quick-replies">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                className="ai-quick-reply"
                onClick={() => {
                  setInputText(reply);
                  handleSend({ preventDefault: () => {} });
                }}
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <form className="ai-faq-input" onSubmit={handleSend}>
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button type="submit">
              <i className="fa fa-paper-plane" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
