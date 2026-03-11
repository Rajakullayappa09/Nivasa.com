// import React, { useState, useEffect } from "react";

// import dooricon from '../../assets/dooricon.gif'
// import dining from '../../assets/dining.gif'
// import reviewslogo from '../../assets/reviewslogo.gif'
// import { useBooking } from "../../Pages/Home/BookingContext";
// import localization_en from "../../assets/Localization/localization-en.json";
// import localization_es from "../../assets/Localization/localization-es.json";

// const ExploreRoom = () => {
//       const { bookingData, setBookingData, setSubmittedBooking, setShowFormInHeader,setLanguageLabels, languageLabels } = useBooking();


//     useEffect(() => {
//           const storedLanguage = localStorage.getItem('language') || 'en'; // Get the language from localStorage
//           if (storedLanguage === 'en') {
//             setLanguageLabels(localization_en); // Set English labels
//           } else if (storedLanguage === 'es') {
//             setLanguageLabels(localization_es); // Set Spanish labels
//           }
//         }, []);


//   const services = [
//     {
//       img: dooricon,
//       title: "Extensive Accommodations",
//       description:
//         "From flights, stays, to sights, just count on our complete products.",
//     },
//     {
//       img: dining,
//       title: "In-Room Dining Services",
//       description:
//         "From flights, stays, to sights, just count on our complete products.",
//     },
//     {
//       img: reviewslogo,
//       title: "Verified Guest Reviews",
//       description:
//         "From flights, stays, to sights, just count on our complete products.",
//     },
//   ];
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => setScreenWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handlePrevious = () => {
//     setActiveIndex((prevIndex) =>
//       prevIndex === 0 ? services.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNext = () => {
//     setActiveIndex((prevIndex) =>
//       prevIndex === services.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   return (
//     <section
//       style={{
//         padding: screenWidth > 1024 ? "50px 0px 50px 0px" : "60px 15px",
//         backgroundColor: "#fff",
//         textAlign: "center",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         width:"100%",
//         // justifyContent:"center"
//       }}
//     >
//       <div style={{ maxWidth: "650px" }}>
//         <h2
//           style={{
//             fontFamily: "Plus Jakarta Sans, sans-serif",
//             fontWeight: "700",
//             color: "#4361ee",
//             fontSize: screenWidth > 768 ? "24px" : "18px",
//             textTransform: "uppercase",
//             letterSpacing: "5px",
//           }}
//         >
//         {languageLabels?.exploreRoom?.servicesTitle||'Services'}  
//         </h2>
//         <h3
//           style={{
//             fontSize: screenWidth > 768 ? "44px" : "28px",
//             fontWeight: "700",
//             color: "Black",
//             margin: "20px 0",
//           }}
//         >
//           Why Choose Nivasa
//         </h3>
//         {screenWidth > 768 && (
//           <p
//             style={{
//               fontSize: "16px",
//               color: "#5E6282",
//               fontFamily: "Poppins, sans-serif",
//               fontWeight: "500",
//               margin: "10px 0 40px",
//             }}
//           >
//             At Nivasa, we prioritize your comfort and satisfaction. Here's
//             why we are the top choice for travelers worldwide:
//           </p>
//         )}
//       </div>

//       <div
//         style={{
//           display: "flex",
//           flexDirection: screenWidth > 768 ? "row" : "column",
//           alignItems: "start",
//           justifyContent: "space-evenly",
//           gap: "32px",
//           textAlign: "start",
//           maxWidth: "1000px",
//         }}
//       >
//         {services.map((service, index) => (
//           <div
//             key={index}
//             style={{
//               width: screenWidth > 768 ? "420px" : "100%",
//               padding: "20px",
//               borderRadius: "10px",
//               backgroundColor: "#FFFFFF",
//               boxShadow: "0 2px 70px 0px rgba(65, 63, 63, 0.1)",
//               textAlign: "center",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               alignItems: "center",
//               padding: "40px",
//             }}
//           >
//             <div

//             >

//               <img
//               style={{height:'60px',width:"60px"}}
//                 src={service.img || 'default-image.png'} // Default image if img is missing
//                 alt={service.title}
//               />


//             </div>
//             <h4
//               style={{
//                 fontFamily: "Plus Jakarta Sans, sans-serif",
//                 fontWeight: "700",
//                 fontSize: "24px",
//                 margin: "10px 0",
//               }}
//             >
//               {service.title ||''}
//             </h4>
//             <p
//               style={{
//                 color: "#717171",
//                 fontFamily: "Plus Jakarta Sans, sans-serif",
//                 fontWeight: "500",
//                 fontSize: "16px",
//               }}
//             >
//               {service.description||''}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ExploreRoom;


import React, { useState, useEffect } from "react";

import dooricon from '../../assets/dooricon.gif'

import dining from '../../assets/dining.gif'

import reviewslogo from '../../assets/reviewslogo.gif'

import { useBooking } from "../../Pages/Home/BookingContext";

import localization_en from "../../assets/Localization/localization-en.json";

import localization_es from "../../assets/Localization/localization-es.json";

const ExploreRoom = () => {

  const { bookingData, setBookingData, setSubmittedBooking, setShowFormInHeader, setLanguageLabels, languageLabels } = useBooking();


  useEffect(() => {

    const storedLanguage = localStorage.getItem('language') || 'en'; // Get the language from localStorage

    if (storedLanguage === 'en') {

      setLanguageLabels(localization_en); // Set English labels

    } else if (storedLanguage === 'es') {

      setLanguageLabels(localization_es); // Set Spanish labels

    }

  }, []);


  const services = [

    {

      img: dooricon,

      title: "Extensive Accommodations",

      description:

        "From flights, stays, to sights, just count on our complete products.",

    },

    {

      img: dining,

      title: "In-Room Dining Services",

      description:

        "From flights, stays, to sights, just count on our complete products.",

    },

    {

      img: reviewslogo,

      title: "Verified Guest Reviews",

      description:

        "From flights, stays, to sights, just count on our complete products.",

    },

  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {

    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  const handlePrevious = () => {

    setActiveIndex((prevIndex) =>

      prevIndex === 0 ? services.length - 1 : prevIndex - 1

    );

  };

  const handleNext = () => {

    setActiveIndex((prevIndex) =>

      prevIndex === services.length - 1 ? 0 : prevIndex + 1

    );

  };

  return (
    <section

      style={{

        padding: screenWidth > 1024 ? "50px 0px 50px 0px" : "60px 15px",

        // backgroundColor: "#fff",

        textAlign: "center",

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        width: "100%",

        // justifyContent:"center"

      }}
    >
      <div style={{ maxWidth: "650px" }}>
        <h2

          style={{

            fontFamily: "Plus Jakarta Sans, sans-serif",

            fontWeight: "700",

            color: "#4361ee",

            fontSize: screenWidth > 768 ? "24px" : "18px",

            textTransform: "uppercase",

            letterSpacing: "5px",

          }}
        >

          {languageLabels?.exploreRoom?.servicesTitle || 'Services'}
        </h2>
        <h3

          style={{

            fontSize: screenWidth > 768 ? "44px" : "28px",

            fontWeight: "700",

            color: "Black",

            margin: "20px 0",

          }}
        >

          {languageLabels?.exploreRoom?.whyChooseTitle || "Why Choose Nivasa"}
        </h3>

        {screenWidth > 768 && (
          <p

            style={{

              fontSize: "16px",

              color: "#5E6282",

              fontFamily: "Poppins, sans-serif",

              fontWeight: "500",

              margin: "10px 0 40px",

            }}
          >

            {languageLabels?.exploreRoom?.whyChooseDescription || "At Nivasa, we prioritize your comfort and satisfaction. Here's why we are the top choice for travelers worldwide:"}
          </p>

        )}
      </div>

      <div

        style={{

          display: "flex",

          flexDirection: screenWidth > 768 ? "row" : "column",

          alignItems: "start",

          justifyContent: "space-evenly",

          gap: "32px",

          textAlign: "start",

          maxWidth: "1000px",

        }}
      >

        {services.map((service, index) => (
          <div

            key={index}

            style={{

              width: screenWidth > 768 ? "420px" : "100%",

              padding: "20px",

              borderRadius: "10px",

              // backgroundColor: "#FFFFFF",

              boxShadow: "0 2px 70px 0px rgba(65, 63, 63, 0.1)",

              textAlign: "center",

              display: "flex",

              flexDirection: "column",

              justifyContent: "space-between",

              alignItems: "center",

              padding: "40px",

            }}
          >
            <div

            >

              <img

                style={{ height: '60px', width: "60px" }}

                src={service.img || 'default-image.png'} // Default image if img is missing

                alt={service.title}

              />


            </div>
            <h4

              style={{

                fontFamily: "Plus Jakarta Sans, sans-serif",

                fontWeight: "700",

                fontSize: "24px",

                margin: "10px 0",

              }}
            >

              {index === 0
                ? languageLabels?.exploreRoom?.serviceTitles.accommodation
                : index === 1
                  ? languageLabels?.exploreRoom?.serviceTitles.dining
                  : index === 2
                    ? languageLabels?.exploreRoom?.serviceTitles.reviews
                    : service.title}
            </h4>
            <p

              style={{

                color: "#717171",

                fontFamily: "Plus Jakarta Sans, sans-serif",

                fontWeight: "500",

                fontSize: "16px",

              }}
            >

              {languageLabels?.exploreRoom?.serviceDescription || service.description || ''}
            </p>
          </div>

        ))}
      </div>
    </section>

  );

};

export default ExploreRoom;