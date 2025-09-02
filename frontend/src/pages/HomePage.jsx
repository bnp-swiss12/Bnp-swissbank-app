import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import BusinessModelSection from "../components/BusinessModelSection";
import ServicesSection from "../components/ServicesSection";
import FocusSection from "../components/FocusSection";
import AwardsSection from "../components/AwardsSection";
import NewsSection from "../components/NewsSection";
import Footer from "../components/Footer";

const HomePage = ({ onLoginSuccess }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header onLoginSuccess={onLoginSuccess} />
      <HeroSection />
      <BusinessModelSection />
      <ServicesSection />
      <FocusSection />
      <AwardsSection />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default HomePage;