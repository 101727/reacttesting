import { Suspense, lazy, useState, useMemo, useCallback } from 'react';
import './styles/App.css';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ShoppingCart } from './components/ShoppingCart';
import { products } from './data/products';

// Lazy load heavy pages
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const ConfirmationPage = lazy(() => import('./pages/ConfirmationPage').then(m => ({ default: m.ConfirmationPage })));

// Loading fallback component
function LoadingFallback() {
  return (
    <main className="main-container">
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p className="loading-spinner">⏳ Loading...</p>
      </div>
    </main>
  );
}

function App() {
  // Page navigation state
  const [currentPage, setCurrentPage] = useState('home');
  
  // User authentication state
  const [user, setUser] = useState(null);
  
  // Shopping cart state
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Order confirmation state
  const [lastOrder, setLastOrder] = useState(null);

  // Get unique categories from products (memoized)
  const categories = useMemo(() => {
    const uniqueCategories = ['All', ...new Set(products.map(p => p.category))];
    return uniqueCategories;
  }, []);

  // Calculate total items in cart (memoized)
  const cartItemCount = useMemo(() => 
    cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  // Memoized callbacks
  const handleAddToCart = useCallback((product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const handleRemoveFromCart = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const handleQuantityChange = useCallback((productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }, [handleRemoveFromCart]);

  const handleLogin = useCallback((userData) => {
    setUser(userData);
    setCurrentPage('home');
  }, []);

  const handleCheckout = useCallback(() => {
    if (!user) {
      setCurrentPage('login');
    } else {
      setCurrentPage('checkout');
    }
  }, [user]);

  const handleCheckoutComplete = useCallback((orderData) => {
    setLastOrder(orderData);
    setCartItems([]);
    setCurrentPage('confirmation');
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setCurrentPage('home');
  }, []);

  const handleContinueShopping = useCallback(() => {
    setCurrentPage('home');
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  const toggleCart = useCallback(() => {
    setShowCart(prev => !prev);
  }, []);

  const closeCart = useCallback(() => {
    setShowCart(false);
  }, []);

  return (
    <div className="app">
      <Header 
        cartItemCount={cartItemCount}
        onCartClick={toggleCart}
        user={user}
        onLogout={handleLogout}
        onLogoClick={() => handlePageChange('home')}
      />

      {/* Page Routing */}
      {currentPage === 'home' && (
        <HomePage
          products={products}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          onAddToCart={handleAddToCart}
        />
      )}

      {currentPage === 'login' && (
        <Suspense fallback={<LoadingFallback />}>
          <LoginPage onLoginSuccess={handleLogin} />
        </Suspense>
      )}

      {currentPage === 'checkout' && user && (
        <Suspense fallback={<LoadingFallback />}>
          <CheckoutPage
            cartItems={cartItems}
            user={user}
            onCheckoutComplete={handleCheckoutComplete}
          />
        </Suspense>
      )}

      {currentPage === 'confirmation' && lastOrder && (
        <Suspense fallback={<LoadingFallback />}>
          <ConfirmationPage
            order={lastOrder}
            onBackToHome={handleContinueShopping}
          />
        </Suspense>
      )}

      {/* Shopping Cart Modal */}
      {showCart && (
        <ShoppingCart
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onQuantityChange={handleQuantityChange}
          onClose={closeCart}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
}

export default App;
