import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>GiftFinder</h1>
      <p className="tagline">Find the perfect gift for every occasion, effortlessly.</p>
      <p className="description">
        GiftFinder helps you discover thoughtful gifts by category, occasion,
        or a quick search — from birthdays to holidays, we've got you covered.
      </p>
      <button onClick={() => navigate('/gifts')}>Get Started</button>
    </div>
  );
}

export default LandingPage;