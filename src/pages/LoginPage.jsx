import { useState, memo } from 'react';

const LoginPage = memo(function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Invalid email address');
      return;
    }

    // Simulate successful login
    onLoginSuccess({
      email: email,
      name: email.split('@')[0],
      loginTime: new Date().toLocaleTimeString()
    });
  };

  return (
    <main className="main-container">
      <div className="login-wrapper">
        <div className="login-card">
          <h2>Welcome to TechShop 🎧</h2>
          <p className="login-subtitle">Sign in to your account</p>

          <form onSubmit={handleLogin} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>

            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>

          <div className="login-footer">
            <p>Demo credentials:</p>
            <code>user@example.com / password123</code>
          </div>
        </div>
      </div>
    </main>
  );
});

export { LoginPage };
export default LoginPage;
