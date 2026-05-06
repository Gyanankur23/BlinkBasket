import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';
import AIFAQ from './components/AIFAQ';
import DealsScreen from './screens/DealsScreen';
import CustomerServiceScreen from './screens/CustomerServiceScreen';
import RegistryScreen from './screens/RegistryScreen';
import GiftCardsScreen from './screens/GiftCardsScreen';
import SellScreen from './screens/SellScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <svg width="32" height="32" viewBox="0 0 40 40" style={{ marginRight: '0.8rem', flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#febd69" />
                    <stop offset="100%" stopColor="#f3a847" />
                  </linearGradient>
                </defs>
                <rect width="40" height="40" rx="8" fill="url(#logo-grad)" />
                <path d="M12 10H22C25.3137 10 28 12.6863 28 16C28 18.2359 26.7758 20.1873 24.9666 21.2185C27.3248 22.3789 29 24.7865 29 27.5C29 31.0899 26.0899 34 22.5 34H12V10ZM17 19H21C22.6569 19 24 17.6569 24 16C24 14.3431 22.6569 13 21 13H17V19ZM17 31H22C23.6569 31 25 29.6569 25 28C25 26.3431 23.6569 25 22 25H17V31Z" fill="#131921"/>
                <circle cx="21" cy="16" r="1.5" fill="#febd69" />
              </svg>
              BlinkBasket
            </Link>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <SearchBox />
          </div>
          <div className="nav-links">
            <Link to="/cart">
              <i className="fa fa-shopping-cart" style={{ fontSize: '2rem' }}></i>
              <span style={{ position: 'relative' }}>
                {cartItems.length > 0 && (
                  <span className="badge" style={{ position: 'absolute', top: '-1.5rem', right: '-0.5rem' }}>
                    {cartItems.length}
                  </span>
                )}
              </span>
              <small>Cart</small>
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  <small>Hello, {userInfo.name.split(' ')[0]}</small>
                  <strong>Account <i className="fa fa-caret-down"></i></strong>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">Your Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Your Orders</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">
                <small>Hello, Sign in</small>
                <strong>Account</strong>
              </Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  <small>Seller</small>
                  <strong>Panel <i className="fa fa-caret-down"></i></strong>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  <small>Admin</small>
                  <strong>Panel <i className="fa fa-caret-down"></i></strong>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <div className="sub-header">
          <Link to="/" onClick={() => setSidebarIsOpen(true)}>
            <i className="fa fa-bars"></i> All
          </Link>
          <Link to="/deals">Today's Deals</Link>
          <Link to="/customer-service">Customer Service</Link>
          <Link to="/registry">Registry</Link>
          <Link to="/gift-cards">Gift Cards</Link>
          <Link to="/sell">Sell</Link>
        </div>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Routes>
            <Route path="/seller/:id" element={<SellerScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/cart/:id" element={<CartScreen />}></Route>
            <Route
              path="/product/:id"
              element={<ProductScreen />}
              exact
            ></Route>
            <Route
              path="/product/:id/edit"
              element={ProductEditScreen}
              exact
            ></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route
              path="/orderhistory"
              element={<OrderHistoryScreen />}
            ></Route>
            <Route path="/search/name" element={<SearchScreen />} exact></Route>
            <Route
              path="/search/name/:name"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
              element={<SearchScreen />}
              exact
            ></Route>

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/map"
              element={
                <PrivateRoute>
                  <MapScreen />
                </PrivateRoute>
              }
            />

            <Route
              path="/productlist"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />

            <Route
              path="/productlist/pageNumber/:pageNumber"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/orderlist"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/userlist"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/user/:id/edit"
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/support"
              element={
                <AdminRoute>
                  <SupportScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/productlist/seller"
              element={
                <SellerRoute>
                  <ProductListScreen />
                </SellerRoute>
              }
            />
            <Route
              path="/orderlist/seller"
              element={
                <SellerRoute>
                  <OrderListScreen />
                </SellerRoute>
              }
            />

            <Route path="/deals" element={<DealsScreen />} />
            <Route path="/customer-service" element={<CustomerServiceScreen />} />
            <Route path="/registry" element={<RegistryScreen />} />
            <Route path="/gift-cards" element={<GiftCardsScreen />} />
            <Route path="/sell" element={<SellScreen />} />
            <Route path="/" element={<HomeScreen />} exact></Route>
          </Routes>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '2.4rem', fontWeight: 700 }}>
              <svg width="40" height="40" viewBox="0 0 40 40" style={{ marginRight: '1rem' }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footer-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#febd69" />
                    <stop offset="100%" stopColor="#f3a847" />
                  </linearGradient>
                </defs>
                <rect width="40" height="40" rx="8" fill="url(#footer-logo-grad)" />
                <path d="M12 10H22C25.3137 10 28 12.6863 28 16C28 18.2359 26.7758 20.1873 24.9666 21.2185C27.3248 22.3789 29 24.7865 29 27.5C29 31.0899 26.0899 34 22.5 34H12V10ZM17 19H21C22.6569 19 24 17.6569 24 16C24 14.3431 22.6569 13 21 13H17V19ZM17 31H22C23.6569 31 25 29.6569 25 28C25 26.3431 23.6569 25 22 25H17V31Z" fill="#131921"/>
                <circle cx="21" cy="16" r="1.5" fill="#febd69" />
              </svg>
              BlinkBasket
            </div>
            <div style={{ fontSize: '1.2rem', color: '#ccc' }}>
              © 1996-2024, BlinkBasket.com, Inc. or its affiliates
            </div>
            <div style={{ fontSize: '1.2rem', color: '#ccc', display: 'flex', gap: '2rem' }}>
              <Link to="/" style={{ color: '#ccc' }}>Conditions of Use</Link>
              <Link to="/" style={{ color: '#ccc' }}>Privacy Notice</Link>
              <Link to="/" style={{ color: '#ccc' }}>Consumer Health Data Privacy Disclosure</Link>
            </div>
          </div>
        </footer>
        <AIFAQ />
      </div>
    </BrowserRouter>
  );
}

export default App;
