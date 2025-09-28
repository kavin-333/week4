import React, { useEffect, useRef, useState } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import "bootstrap/dist/js/bootstrap.js";
import "bootswatch/dist/darkly/bootstrap.min.css";

import Header from "./components/Header";
import MoviesPortal from "./components/MoviesPortal";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [page, setPage] = useState(null);
  const [user, setUser] = useState(null);

  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          backgroundColor: 0x000000,
          color: 0xff0000,
          points: 15,
          maxDistance: 20,
          showDots: true,
          spacing: 15,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, vantaRef]);

  useEffect(() => {
    const hasSignedUp = localStorage.getItem("hasSignedUp");
    setPage(hasSignedUp === "true" ? "login" : "signup");
  }, []);

  const handleSignup = () => {
    localStorage.setItem("hasSignedUp", "true");
    setPage("login");
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setPage("main");
  };

  const vantaStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
  };

  const containerStyle = {
    backgroundColor: "transparent",
    position: "relative",
    zIndex: 0,
  };

  if (page === null) return null;

  return (
    <>
      <div ref={vantaRef} style={vantaStyle} />
      {page === "signup" && <Signup onSignup={handleSignup} onLogin={() => setPage("login")} />}
      {page === "login" && <Login onLogin={handleLogin} onSignup={() => setPage("signup")} />}
      {page === "main" && (
        <>
          <Header />
          <div className="container" style={containerStyle}>
            <MoviesPortal user={user} />
          </div>
        </>
      )}
    </>
  );
}

export default App;
