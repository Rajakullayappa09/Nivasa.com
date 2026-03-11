import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import BookingForm from "../../Pages/Booking/BookingForm";

import backgroundimg from "../../assets/backgroundimg.png";
import Bannerbgi from "../../assets/Bannerbgi.png"
import { useBooking } from "../../Pages/Home/BookingContext";
import Landingimgmain from "../../assets/Landingimgmain.png"
import Rectangle from '../../assets/Rectangle.png'

import localization_en from "../../assets/Localization/localization-en.json";
import localization_es from "../../assets/Localization/localization-es.json";
import localization_tm from "../../assets/Localization/localization-tm.json";
import localization_hi from "../../assets/Localization/localization-hi.json";
import localization_tl from "../../assets/Localization/localization-tl.json";
import localization_fr from "../../assets/Localization/localization-fr.json";
import localization_pr from "../../assets/Localization/localization-pr.json";
import localization_kn from "../../assets/Localization/localization-kn.json";
import localization_ml from "../../assets/Localization/localization-ml.json";
import NewBanner from '../../assets/NewBanner.svg'
import BannerNew from '../../assets/BannerNew.svg'
import MobileBanner from '../../assets/MobileBanner.svg'
import './HomeContent.css';

function HomeContent() {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [isLoaded, setIsLoaded] = useState(false);

  const { showFormInHeader, setShowFormInHeader, setLanguageLabels, languageLabels } = useBooking();

  useEffect(() => {
    setIsLoaded(true);
    const storedLanguage = localStorage.getItem('language') || 'en';

    if (storedLanguage === 'en') {
      setLanguageLabels(localization_en);
    } else if (storedLanguage === 'es') {
      setLanguageLabels(localization_es);
    } else if (storedLanguage === 'tm') {
      setLanguageLabels(localization_tm);
    } else if (storedLanguage === 'hi') {
      setLanguageLabels(localization_hi);
    } else if (storedLanguage === 'tl') {
      setLanguageLabels(localization_tl);
    } else if (storedLanguage === 'fr') {
      setLanguageLabels(localization_fr);
    } else if (storedLanguage === 'pr') {
      setLanguageLabels(localization_pr);
    } else if (storedLanguage === 'kn') {
      setLanguageLabels(localization_kn);
    } else if (storedLanguage === 'ml') {
      setLanguageLabels(localization_ml);
    }
  }, []);

  useEffect(() => {
    setShowFormInHeader(false);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth <= 768;
  const isTablet = screenWidth > 768 && screenWidth <= 1024;
  const isDesktop = screenWidth > 1024;

  const containerHeight = screenWidth > 786 ? "600px" : "auto";
  const paddingDesktop = screenWidth > 1440 
    ? "140px 0px 0px 100px" 
    : screenWidth > 1000 
      ? "110px 0px 0px 80px" 
      : "80px 20px 0px 20px";

  const backgroundImage = screenWidth > 786 ? `url(${NewBanner})` : `url(${MobileBanner})`;

  return (
    <div 
      className={`hero-container ${isLoaded ? 'loaded' : ''}`}
      style={{
        height: containerHeight,
        backgroundImage: backgroundImage,
      }}
    >
      <div className="overlay-gradient"></div>

      <div className="bg-element element-1"></div>
      <div className="bg-element element-2"></div>
      <div className="bg-element element-3"></div>

      <div className="hero-content" style={{ padding: paddingDesktop }}>
        
        <div className="heading-wrapper">
          <h1 className="main-heading">
            {languageLabels?.home?.heading?.line1 || 'Embark on a journey'}
          </h1>
          <div className="heading-underline"></div>
        </div>

        {!isMobile && (
          <p className="main-subtitle">
            {languageLabels?.home?.subtitle || 'Every stay is tailored for comfort, convenience, and memorable experiences—ideal for solo travelers, couples, families, or friends.'}
          </p>
        )}

        <div className="feature-pills">
          <div className="pill-item">
            <span className="pill-icon">✓</span>
            <span className="pill-text">Premium Stays</span>
          </div>
          <div className="pill-item">
            <span className="pill-icon">✓</span>
            <span className="pill-text">Best Prices</span>
          </div>
          <div className="pill-item">
            <span className="pill-icon">✓</span>
            <span className="pill-text">Verified Reviews</span>
          </div>
        </div>

        {/* Booking Form Container */}
        <div className="booking-container">
          {!showFormInHeader && <BookingForm />}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="decoration-circle circle-1"></div>
      <div className="decoration-circle circle-2"></div>
      <div className="decoration-line line-1"></div>
    </div>
  );
}

export default HomeContent;

