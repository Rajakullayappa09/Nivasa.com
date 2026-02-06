import React, { useEffect, useState } from "react";
import shareddorm1 from "../../assets/Ootyassets/shareddorm1.png";
import shareddorm2 from "../../assets/Ootyassets/shareddorm2.png";
import Doublebeds from "../../assets/doublebeds.jpg";
import privateroom1 from "../../assets/Ootyassets/privateroom1.png";
import privateroom2 from "../../assets/Ootyassets/privateroom2.png";
import Ellipse from "../Accommodations/Ellipse.png";
import Apartments2 from "../../assets/Ootyassets/Apartments2.png";
import Apartments1 from "../../assets/Ootyassets/Apartments1.png";
import Unique1 from "../../assets/Ootyassets/Unique1.png";
import Unique2 from "../../assets/Ootyassets/unique2.png";
import { Typography } from "@mui/material";
import localization_en from "../../assets/Localization/localization-en.json";
import localization_es from "../../assets/Localization/localization-es.json";
import { useBooking } from "../../Pages/Home/BookingContext";

const Accommodations = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { showFormInHeader, setShowFormInHeader,setLanguageLabels,languageLabels } = useBooking();

  useEffect(() => {
            const storedLanguage = localStorage.getItem('language') || 'en'; // Get the language from localStorage
            if (storedLanguage === 'en') {
              setLanguageLabels(localization_en); // Set English labels
            } else if (storedLanguage === 'es') {
              setLanguageLabels(localization_es); // Set Spanish labels
            }
          }, []);


  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [activeRoom, setActiveRoom] = useState("privateRoom"); // Default active room

  const roomImages = {
    privateRoom: { main: privateroom1, secondary: privateroom2 },
    sharedDormitory: { main: shareddorm1, secondary: shareddorm2 },
    independentHouse: { main: Apartments1, secondary: Apartments2 },
    uniqueStays: { main: Unique1, secondary: Unique2 },
  };

  const handleRoomClick = (roomType) => {
    setActiveRoom(roomType);
  };

  const roomData = [
    {
      key: "privateRoom",
      label: "Private Rooms",
      description: "Experience the privacy and tranquility of our fully equipped private rooms, perfect for those seeking a peaceful retreat."
    },
    {
      key: "sharedDormitory",
      label: "Shared Dormitories",
      description: "Enjoy the camaraderie of shared dormitories, where you can connect with fellow travelers and create lasting friendships."
    },
    {
      key: "independentHouse",
      label: "Independent Houses and Apartments",
      description: "Opt for spacious houses and apartments, ideal for families or groups needing more space and amenities."
    },
    {
      key: "uniqueStays",
      label: "Unique Stays",
      description: "Discover our unique accommodations, including charming cabins and luxurious tents, offering a distinct and memorable experience."
    }
  ];


  return (
    <section
      style={{
        padding: screenWidth > 768 ? "50px 0px 50px 0px" : "10px 0px 30px 30px",
        backgroundColor: "#fff",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        marginBottom: "60px",
      }}
    >
      <div>
        <h2
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: "700",
            color: "#4361ee",
            fontSize: screenWidth > 768 ? "24px" : "18px",
            textTransform: "uppercase",
            letterSpacing: screenWidth > 768 ? "5px" : "3px",
            textAlign: screenWidth <= 768 ? "center" : "center",
          }}
        >
          {languageLabels?.accommodations?.keyFeatures || ' Key Features'}
        </h2>
        <h3
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: "600",
            color: "Black",
            fontSize: screenWidth > 768 ? "40px" : "28px",
            textAlign: screenWidth <= 768 ? "center" : "center",
            marginRight: screenWidth <= 768 ? "25px" : "0",
          }}
        >
          {languageLabels?.accommodations?.ourAccommodations || 'Our Accommodations'}

        </h3>

        <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: screenWidth > 768 ? "flex-start" : "center",
    alignItems: "center",
    marginTop: "40px",
    gap: "60px",
    flexDirection: screenWidth <= 768 ? "column" : "row",
  }}
>

  {screenWidth > 768 ? (
    <div
      style={{
        flex: "1 1 300px",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "40px",
      }}
    >
      {[
        { key: "privateRoom", label: languageLabels?.accommodations?.roomTypes?.privateRoom?.label },
        { key: "sharedDormitory", label: languageLabels?.accommodations?.roomTypes?.sharedDormitory?.label },
        { key: "independentHouse", label: languageLabels?.accommodations?.roomTypes?.independentHouse?.label },
        { key: "uniqueStays", label: languageLabels?.accommodations?.roomTypes?.uniqueStays?.label },
      ].map(({ key, label }) => (
        <div
          key={key}
          style={{
            cursor: "pointer",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: "22px",
            fontWeight: activeRoom === key ? "700" : "500",
            color: activeRoom === key ? "#fff" : "#4361ee",
            backgroundColor: activeRoom === key ? "#3a0ca3" : "#fff",
            padding: activeRoom === key ? "20px" : "0",
            boxShadow: activeRoom === key ? "0px 0px 35px 1px rgb(154, 154, 154)" : "",
            borderRadius: "10px",
          }}
          onClick={() => handleRoomClick(key)}
        >
          <h4>{label}</h4>
          {activeRoom === key && (
            <Typography
              style={{
                color: "#d9d9d9",
                margin: "10px 0",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: "500",
                fontSize: "16px",
                maxWidth: screenWidth > 768 && screenWidth < 1300 ? "600px" : "700px",
              }}
            >
              {key === "privateRoom"
                ? languageLabels?.accommodations?.roomTypes?.privateRoom?.description
                : key === "sharedDormitory"
                  ? languageLabels?.accommodations?.roomTypes?.sharedDormitory?.description
                  : key === "independentHouse"
                    ? languageLabels?.accommodations?.roomTypes?.independentHouse?.description
                    : languageLabels?.accommodations?.roomTypes?.uniqueStays?.description}
            </Typography>
          )}
        </div>
      ))}
    </div>
  ) : (
    <div
      style={{
        flex: "1 1 300px",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "40px",
      }}
    >
      {[
        { key: "privateRoom", label: languageLabels?.accommodations?.roomTypes?.privateRoom?.label, description: languageLabels?.accommodations?.roomTypes?.privateRoom?.description },
        { key: "sharedDormitory", label: languageLabels?.accommodations?.roomTypes?.sharedDormitory?.label, description: languageLabels?.accommodations?.roomTypes?.sharedDormitory?.description },
        { key: "independentHouse", label: languageLabels?.accommodations?.roomTypes?.independentHouse?.label, description: languageLabels?.accommodations?.roomTypes?.independentHouse?.description },
        { key: "uniqueStays", label: languageLabels?.accommodations?.roomTypes?.uniqueStays?.label, description: languageLabels?.accommodations?.roomTypes?.uniqueStays?.description },
      ].map(({ key, label, description }) => (
        <div
          key={key}
          style={{
            cursor: "pointer",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontSize: screenWidth <= 768 ? "18px" : "22px", // Adjust font size for mobile
            fontWeight: "500", // Always regular weight
            color: "#fff", // Default text color
            backgroundColor: "#3a0ca3", // Default background
            padding: screenWidth <= 768 ? "10px" : "20px", // Adjust padding for mobile
            boxShadow: "", // No shadow on mobile
            borderRadius: "10px",
            boxShadow: "0px 0px 35px 1px rgb(154, 154, 154)",
            justifyContent: 'center',
            alignItems: 'center',

            width: "100%", // Full width on mobile
            maxWidth: "90%", // Max width control for mobile
            height: "auto", // Adjust height for mobile
          }}
        >
          <h4 style={{ padding: "10px 10px 10px 10px" }}>{label}</h4> {/* Label */}
          <Typography
            style={{
              color: "#d9d9d9",
              padding: '0px 10px 10px 10px',
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: "500",
              fontSize: screenWidth <= 768 ? "14px" : "16px", // Adjust font size for mobile
              maxWidth: screenWidth > 768 && screenWidth < 1300 ? "600px" : "700px",
            }}
          >
            {description}
          </Typography>
        </div>
      ))}
    </div>
  )}

  <div
    style={{
      position: "relative",
      flex: "0.5 1 300px",
      display: screenWidth <= 600 ? "none" : "grid",
      gap: "20px",
      top: "-50px",
    }}
  >
    <div
      style={{
        width: screenWidth <= 768 ? "250px" : "280px",
        height: screenWidth <= 768 ? "200px" : "300px",
        backgroundImage: `url(${roomImages[activeRoom].main})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        zIndex: 1,
        borderRadius: "30px",
      }}
    />

    <div
      style={{
        width: screenWidth <= 900 ? "200px" : "300px",
        height: screenWidth <= 900 ? "200px" : "300px",
        backgroundImage: `url(${roomImages[activeRoom].secondary})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        top: screenWidth <= 768 ? "100px" : "140px",
        left: screenWidth <= 768 ? "40px" : "120px",
        zIndex: 2,
        borderRadius: "30px",
      }}
    />

    <div
      style={{
        width: "80px",
        height: "80px",
        backgroundImage: `url(${Ellipse})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        top: screenWidth <= 900 ? "10px" : "40px",
        left: screenWidth <= 900 ? "20px" : "360px",
        zIndex: 2,
        borderRadius: "30px",
      }}
    />
  </div>

</div>

      </div>
    </section>
  );
};

export default Accommodations;