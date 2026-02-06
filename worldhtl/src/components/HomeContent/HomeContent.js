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
function HomeContent() {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const { showFormInHeader, setShowFormInHeader, setLanguageLabels, languageLabels } = useBooking();

  useEffect(() => {

    const storedLanguage = localStorage.getItem('language') || 'en'; // Get the language from localStorage

    if (storedLanguage === 'en') {

      setLanguageLabels(localization_en); // Set English labels

    } else if (storedLanguage === 'es') {

      setLanguageLabels(localization_es); // Set Spanish labels

    } else if (storedLanguage === 'tm') {

      setLanguageLabels(localization_tm); // Set Spanish labels

    } else if (storedLanguage === 'hi') {

      setLanguageLabels(localization_hi); // Set Spanish labels

    } else if (storedLanguage === 'tl') {

      setLanguageLabels(localization_tl); // Set Spanish labels

    }else if (storedLanguage === 'fr') {

      setLanguageLabels(localization_fr); // Set Spanish labels

    }else if (storedLanguage === 'pr') {

      setLanguageLabels(localization_pr); // Set Spanish labels

    } else if (storedLanguage === 'kn') {

      setLanguageLabels(localization_kn); // Set Spanish labels

    } else if (storedLanguage === 'ml') {

      setLanguageLabels(localization_ml); // Set Spanish labels
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

  const dynamicMarginTop = screenWidth > 800 ? "180px" : "105px";

  const fontSizeForDesktop = screenWidth > 1360 ? "70px" : "38px";

  const fontSizeForMobile = screenWidth <= 786 ? "48px" : "55px";

  const boxwidth = screenWidth <= 786 ? '100%' : '100%';

  const boxwidthsearchcomponent = screenWidth <= 786 ? '5px' : '0px';


  const subtitleFontSize = screenWidth > 768 ? "20px" : "16px";

  const paragraphFontSize = screenWidth > 768 ? "18px" : "14px";

  return (

    <div


      style={{
        height: screenWidth >786?"550px":'100%',
        padding:
          screenWidth > 1440
            ? "120px 0px 0px 90px" // Large screens
            : screenWidth > 1000
              ? "105px 0px 0px 90px" // Keep consistent top padding
              : "100px 0px 0px 0px", // Mobile screens
        position: "relative",
        overflow: "hidden",
        width: "100%",
        marginRight:screenWidth >786? "30px":'0px',
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        textAlign: "left",
        backgroundImage:screenWidth>786? `url(${NewBanner})`:`url(${MobileBanner})`,
        backgroundSize: "cover", // Ensures the image always covers the entire container
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Centers the background image
      }}

    >
      <h1

        style={{
          fontSize: fontSizeForMobile,
          fontWeight: "bold",
          width: boxwidth,
          color:screenWidth >786? "#fff":'#fff',
          marginBottom: screenWidth < 786 ? '-50px' : '0px', 
          lineHeight: "1.2",
          fontFamily: "Volkhov",

          marginTop: screenWidth > 1440 ? "35px" : "0px",
          textShadow:"0px 0px 40px rgba(0, 0, 0, 0.1)",
          marginLeft:screenWidth >786? "0px":'0px',
          textAlign:screenWidth<=786?'center':'start',
          
        }}

      >

        {languageLabels?.home?.heading?.line1 || 'Embark on a journey'}

      </h1>

      {screenWidth > 768 && (
        <p
          style={{
            fontSize: paragraphFontSize,
            fontFamily: "'Poppins', sans-serif",
          textShadow:"0px 0px 20px rgba(0, 0, 0, 0.1)",
            fontWeight: "500",
            // color: "#5E6282",
            color: '#fff',
            marginBottom: "0px",
            maxWidth:"800px"
            
          }}
        >

          {languageLabels?.home?.subtitle || 'Every stay is tailored for comfort, convenience, and memorable experiences—ideal for solo travelers, couples, families, or friends.'}
        </p>

      )}

      <div style={{ marginRight: screenWidth > 768 ? "20%" : "0%",  marginTop: dynamicMarginTop ,position:screenWidth >800?"absolute":'relative'}}>

        {!showFormInHeader && <BookingForm />}
      </div>
    </div>


  );

}

export default HomeContent;

