import React from 'react';
import heroImage from '../../../assets/imgs/images.jpg';
import './Home.css';

const Home = () => {
  return (
    <div className="hero-container">
      <div className="hero-text">
        <h1>Sua conexão entre <br /> hospitais e voluntários</h1>
        <p>Transformando empatia em ação com a CompCare</p>
        <a href="/vagas" className="hero-button">
          Ver vagas disponíveis
        </a>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="CompCare apresentação" />
      </div>
    </div>
  );
};

export default Home;
