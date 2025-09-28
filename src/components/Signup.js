import React, { useState, useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

function Signup({ onSignup, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !confirm) {
      setError('Please fill out all fields');
    } else if (password !== confirm) {
      setError('Passwords do not match');
    } else {
      onSignup({ username });
    }
  };

  return (
    <div ref={vantaRef} style={containerStyle}>
      <div style={cardStyle}>
        <h2 className="text-center mb-3">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button
            className="btn w-100 mb-2"
            style={{ backgroundColor: 'red', color: 'white' }}
            type="submit"
          >
            Sign Up
          </button>
          <button
            className="btn btn-link w-100"
            style={{ color: 'white' }}
            type="button"
            onClick={onLogin}
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
