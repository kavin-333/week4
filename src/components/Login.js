import React, { useState, useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

function Login({ onLogin, onSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
  if (!vantaEffect && vantaRef.current) {
    setVantaEffect(
      NET({
        el: vantaRef.current,
        THREE: THREE,
        backgroundColor: 0x000000,
        color: 0xff0000,
        points: 12,
        maxDistance: 20.0,
        showDots: true,
        spacing: 15.0,
      })
    );
  }
  return () => {
    if (vantaEffect) vantaEffect.destroy();
  };
}, [vantaEffect, vantaRef]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin({ username });
    } else {
      setError('Please enter both fields');
    }
  };

  const containerStyle = {
    height: '100vh',
    width: '100vw',
  };

  const cardStyle = {
    padding: '2rem',
    backgroundColor: 'rgba(26, 26, 26, 0.85)',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '400px',
    margin: 'auto',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'white',
  };

  return (
    <div ref={vantaRef} style={containerStyle}>
      <div style={cardStyle}>
        <h2 className="text-center mb-3">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          <button
            className="btn w-100 mb-2"
            style={{ backgroundColor: 'red', color: 'white' }}
            type="submit"
          >
            Login
          </button>
          <button
            className="btn btn-link w-100"
            style={{ color: 'white' }}
            type="button"
            onClick={onSignup}
          >
            Don't have an account? Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
