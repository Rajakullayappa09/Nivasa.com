import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ArrowForward, CurrencyRupeeOutlined } from "@mui/icons-material";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined"; // INR
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"; // USD
import EuroIcon from "@mui/icons-material/Euro"; // EUR
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // General Money icon (can be used for multiple)
import { Button, Card } from "react-bootstrap";
import './PropertiesList.css'
import { Avatar, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Link, Rating, Skeleton, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useBooking } from "../Home/BookingContext";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import CloseIcon from "@mui/icons-material/Close"
import { toast, ToastContainer } from "react-toastify";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Fab } from "@mui/material";
import { LinearProgress } from "@mui/material";
import config from "../../config";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import noimage from '../../assets/noimage.jpg'
import { ArrowDown, ArrowDownIcon, ArrowDownNarrowWide } from "lucide-react";
import localization_en from "../../assets/Localization/localization-en.json";
import localization_es from "../../assets/Localization/localization-es.json";
import localization_tm from "../../assets/Localization/localization-tm.json";
import localization_hi from "../../assets/Localization/localization-hi.json";
import localization_tl from "../../assets/Localization/localization-tl.json";
import localization_fr from "../../assets/Localization/localization-fr.json";
import localization_pr from "../../assets/Localization/localization-pr.json";
import localization_kn from "../../assets/Localization/localization-kn.json";
import localization_ml from "../../assets/Localization/localization-ml.json";

import NoResultsProperty from '../../assets/NoResultsProperty.gif'


import noresult from '../../assets/noresult.jpg'

const API_BASE_URL = `${config.BASE_URL}`;
const PropertiesList = ({ data }) => {
  const { submittedBooking } = useBooking();
  const { setCurrencyType } = useBooking();
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];
  const [isDormsChecked, setIsDormsChecked] = useState(false);
  const [isPrivateRoomsChecked, setIsPrivateRoomsChecked] = useState(false);
  const [isApartmentsChecked, setIsApartmentsChecked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const [mapLocation, setMapLocation] = useState("");
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dynamicFontSize = (screenWidth) => {
    const maxFontSize = 16;
    const minFontSize = 12;
    const fontSize = Math.max(minFontSize, Math.min(maxFontSize, screenWidth / 25));
    return fontSize;
  };

  const renderCurrencyIcon = (currency) => {
    switch (currency) {
      case "INR":
        return <CurrencyRupeeOutlinedIcon />;
      case "USD":
        return '$'
      case "EUR":
        return <EuroIcon />;
      case "GBP":
        return <AttachMoneyIcon />; // You can replace this with a custom icon if you have one for GBP
      case "JPY":
        return <span>¥</span>; // Use the Japanese Yen symbol as fallback (you can also add an icon here)
      case "AUD":
        return <span>A$</span>; // Australian Dollar symbol
      case "CAD":
        return <span>C$</span>; // Canadian Dollar symbol
      default:
        return <span>Currency not supported</span>;
    }
  };
  const handleNavigation = (property_id, name, currency) => {
    setCurrencyType(currency)
    navigate(`/BookingCart/${encodeURIComponent(property_id)}`, {
      state: {
        city: submittedBooking.destination,
        guests: submittedBooking.guests,
        fromDate: submittedBooking.checkIn,
        toDate: submittedBooking.checkOut,
      },
    });
  };
  const [openReviews, setOpenReviews] = useState(false);
  const handleDialogOpen = (property_id) => {
    fetchReviews(property_id);
    setOpenReviews(true);
  };

  // const navigate = useNavigate();


  const handleDialogClose = () => setOpenReviews(false);
  const [propertieslist, setpropertieslist] = useState([]);
  const [accommodationTypes, setAccommodationTypes] = useState({});
  const [accommodationcount, setaccommodationcount] = useState({})
  const [rangeValue, setRangeValue] = useState(5000);
  const [rangeValues, setRangeValues] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cities, setCities] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);
  const [loadingMap, setLoadingMap] = useState(false); // State for loading

  const { bookingData, setBookingData, setSubmittedBooking, setShowFormInHeader, setLanguageLabels, languageLabels } = useBooking();



  const handleOpen = () => setShowFilter(true);
  const handleClose = () => setShowFilter(false);

  const handleRangeChange = (e) => {
    setLoading(true);
    setRangeValue(e.target.value);


    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleRatingChange = (e) => {
    setLoading(true);
    setRangeValues(e.target.value);
    console.log(e.target.value);



    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleRemoveFilter = () => {
    setLoading(true);
    setRangeValues(0);
    setRangeValue(5000)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  console.log(submittedBooking);


  // const fetchallpropertieslist = async () => {
  //   setLoading(true)
  //   setpropertieslist([])
  //   try {
  //     const PROPERTIES = API_BASE_URL + `/listing/properties?location=${submittedBooking.destination}&guest=${submittedBooking.guests}&from_date=${submittedBooking.checkIn}&to_date=${submittedBooking.checkOut}&start_price=0&end_price=${rangeValue}&rating=${rangeValues}`

  //     const response = await fetch(PROPERTIES,
  //       {
  //         method: "GET",
  //         headers: { accept: "application/json" },
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setpropertieslist(data);
  //       const accommodationTypes = {};

  //       data.forEach((property) => {
  //         if (property.accommodation_price) {
  //           Object.entries(property.accommodation_price).forEach(([type, price]) => {
  //             if (!accommodationTypes[property.property_id]) {
  //               accommodationTypes[property.property_id] = [];
  //             }
  //             accommodationTypes[property.property_id].push({ type, price });
  //           });
  //         }
  //       });
  //       setAccommodationTypes(accommodationTypes);
  //       const accommodationcount = {};
  //       data.forEach((property) => {
  //         if (property.accommodation_count) {
  //           Object.entries(property.accommodation_count).forEach(([type, price]) => {
  //             if (!accommodationcount[property.property_id]) {
  //               accommodationcount[property.property_id] = [];
  //             }

  //             accommodationcount[property.property_id].push({ type, price });
  //           });
  //         }
  //       });

  //       setaccommodationcount(accommodationcount);
  //     } else {
  //       navigate('/')
  //       toast.error("Failed to fetch data",
  //         {
  //           position: "top-right",
  //           hideProgressBar: true,
  //         });
  //     }
  //   } catch (error) {
  //   }
  //   finally {
  //     setLoading(false)
  //   }
  // };




  const fetchallpropertieslist = async () => {
    setLoading(true);
    setpropertieslist([]);
    try {

      localStorage.setItem('submittedBooking', JSON.stringify(submittedBooking));

      const PROPERTIES = API_BASE_URL + `/listing/properties?location=${submittedBooking.destination}&guest=${submittedBooking.guests}&from_date=${submittedBooking.checkIn}&to_date=${submittedBooking.checkOut}&start_price=0&end_price=${rangeValue}&rating=${rangeValues}`;

      const response = await fetch(PROPERTIES, {
        method: "GET",
        headers: { accept: "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setpropertieslist(data);
        const accommodationTypes = {};

        data.forEach((property) => {
          if (property.accommodation_price) {
            Object.entries(property.accommodation_price).forEach(([type, price]) => {
              if (!accommodationTypes[property.property_id]) {
                accommodationTypes[property.property_id] = [];
              }
              accommodationTypes[property.property_id].push({ type, price });
            });
          }
        });
        setAccommodationTypes(accommodationTypes);

        const accommodationcount = {};
        data.forEach((property) => {
          if (property.accommodation_count) {
            Object.entries(property.accommodation_count).forEach(([type, price]) => {
              if (!accommodationcount[property.property_id]) {
                accommodationcount[property.property_id] = [];
              }

              accommodationcount[property.property_id].push({ type, price });
            });
          }
        });

        setaccommodationcount(accommodationcount);
      } else {
        navigate('/');
        toast.error("Failed to fetch data", {
          position: "top-right",
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
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
    fetchallpropertieslist();
  }, [
    rangeValue,
    rangeValues,
    submittedBooking?.destination,
    submittedBooking?.checkIn,
    submittedBooking?.checkOut,
    submittedBooking?.guests
  ]);

  const storedSubmittedBooking = JSON.parse(localStorage.getItem('submittedBooking'));



  const handleCheckboxChange = (setter) => {
    setter((prev) => !prev);
  };

  const dormsCount = 12;
  const privateRoomsCount = 8;
  const apartmentsCount = 20;
  const [reviews, setReviews] = useState([]);
  const [ratingValue, setRatingValue] = React.useState(0);
  const fetchReviews = async (property_id) => {
    setLoading(true)
    try {
      const response = await fetch(
        API_BASE_URL + `/customerreview/getAllReviews/${encodeURIComponent(property_id)}`,
        { method: "GET", headers: { accept: "application/json" } }
      );
      if (response.ok) {
        const data = await response.json();

        setReviews(data.reviews || []);
        console.log(data);
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
    finally {
      setLoading(false)
    }
  };

  const handleShowOnMapClick = (property_location) => {
    if (property_location) {
      setLoadingMap(true); // Start loading

      const [latitude, longitude] = property_location.split(",");
      setMapLocation(`https://www.google.com/maps?q=${latitude},${longitude}&output=embed`);
      setTimeout(() => {
        setOpenMapDialog(true);
        setLoadingMap(false);
      }, 1000);
    } else {
      alert("Location not available");
    }
  };
  const [showFilter, setShowFilter] = useState(true);
  const [mobilefilters, setmobilefilters] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      setShowFilter(!mobileView);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // const totalSearchResults=0;
  // properties.forEach(property => {
  //   if (property.search_results) {
  //     totalSearchResults += property.search_results;
  //   }
  // });
  const propertiesObject = propertieslist.reduce((acc, property) => {
    acc[property.property_id] = property;
    return acc;
  }, {});

  propertieslist.forEach(property => {
  });

  return (
    <>
      <div style={{padding:"10px"}} >
        {!isMobile ? (

          <div
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "400",
              color: "#9C9C9C",
              position: "sticky",
              top: "79px",
              backgroundColor: "white",
              backgroundSize: "cover",
              padding: "10px",
              marginLeft: "24px",
              zIndex: 1000, // Increased z-index
              cursor: "pointer",
            }}
          >
            <span onClick={() => navigate("/")} style={{ color: "#9C9C9C" }}>
              {languageLabels?.propertiesList?.home || "Home"}
            </span>
            <span>
              <ArrowForward style={{ fontSize: "20px" }} />
            </span>
            {propertieslist?.destination}
          </div>

        ) : (
          <div style={{ width: "100%", justifyContent: 'space-between', display: 'flex', marginBottom: "15px", alignItems: 'center' }}>
            <div>
              <Typography style={{ color: '#3E3E3E', fontWeight: "600", fontSize: "16px", marginBottom: "-6px" }}>
                Properties

              </Typography>
              <span style={{ color: '#9A9A9A', fontSize: "12px", }}>Showing

                {''} results</span>
            </div>

            {isMobile && (
              <IconButton
                onClick={() => setmobilefilters(true)}

                style={{
                  background: "#E0E0F0",
                  color: "#717171",
                  fontSize: '16px',
                  borderRadius: '5px',
                  width: '85px',
                  height: '30px',
                }}
              >
                Filters <ArrowDownIcon />
              </IconButton>
            )}
          </div>
        )}
        <div style={{ padding: isMobile ? '0px 0px' : "35px 35px", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? '0px' : "20px", position: "relative", }}>

          {!isMobile && showFilter && (
            <div
              style={{
                flex: "1",
                maxWidth: isMobile ? "90%" : "300px",
                padding: "10x",
                borderRadius: "10px",
                border: "1px solid  ",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                position: "sticky",
                // marginTop: "20px",
                top: "150px",
                borderColor: '#cacaca',
                marginRight: "10px",
                height: "350px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: '16px' }}>
                <h3
                  style={{
                    color: "#424242",
                    fontSize: isMobile ? "16px" : "18px",
                    fontWeight: "700",
                    marginBottom: "20px",
                    textAlign: "center",
                    marginLeft: '20px',
                    width: "100%",

                    textAlign: isMobile ? "center" : "left",

                  }}
                >
                  {languageLabels?.propertiesList?.applyFilters || "Apply Filters"}
                </h3>
                {isMobile && (
                  <IconButton onClick={() => setShowFilter(false)} style={{ color: "black" }}>
                    <CloseIcon />
                  </IconButton>
                )}
              </div>
              <div style={{ padding: "20px", width: "100%" }}>

              <label style={{ color: "#424242" }}>
                  {languageLabels?.propertiesList?.priceRange || "By price range"}
                </label>

                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={rangeValue}
                  onChange={handleRangeChange}
                  style={{
                    width: "200px",
                    accentColor: "#4361ee",
                    marginTop: "10px",
                    boxSizing: "border-box",
                  }}
                />
                {loading && <LinearProgress style={{ marginBottom: "10px" }} />}



                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    gap: "10px",
                    flexDirection: isMobile ? "row" : "row",
                  }}
                >
                  <div style={{ width: "48%" }}>
                    <label style={{ color: "#666666", fontWeight: 500 }}>
                      {languageLabels?.propertiesList?.minPrice || 'Min Price'}
                    </label>
                    <input
                      type="text"
                      value="0"
                      readOnly
                      style={{
                        width: "100%",
                        height: "44px",
                        padding: "10px",
                        color: "#424242",
                        border: "1px solid #dcdde1",
                        borderRadius: "8px",
                        boxSizing: "border-box",
                        marginBottom: "10px",
                      }}
                    />
                  </div>

                  <div style={{ width: "48%" }}>
                    <label style={{ color: "#666666", fontWeight: 500 }}>
                      {languageLabels?.propertiesList?.maxPrice || "Max Price"}
                    </label>
                    <input
                      type="text"
                      value={rangeValue}
                      readOnly
                      style={{
                        width: "100%",
                        height: "44px",
                        color: "#424242",
                        padding: "10px",
                        border: "1px solid #dcdde1",
                        borderRadius: "8px",
                        boxSizing: "border-box",
                        marginBottom: "10px",
                      }}
                    />
                  </div>
                </div>

                
                {/* Ratings Filter */}
                <Typography>{languageLabels?.propertiesList?.ratings || "By Ratings "}</Typography>
                <Rating
                  name="rating-filter"
                  value={rangeValues}
                  // onChange={(event, newValue) => setRatingValue(newValue)}
                  onChange={handleRatingChange}
                  // onDoubleClick={handleDoubleClick}
                  size="large"
                />
                {rangeValues !== 0 && (
                  <Button variant="text" color="primary" onClick={handleRemoveFilter}>
                    Remove Filter
                  </Button>
                )}
              </div>
            </div>
          )}
          <div style={{ width: "100%" }}>



            <div
              style={{
                display: isMobile ? 'inline-block' : "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                padding: "0px",
                overflowY: "auto",
                width: "100%",
                scrollbarWidth: "none",
                "@media (max-width: 900px)": {
                  gridTemplateColumns: "repeat(2, 1fr)",
                },
                "@media (max-width: 600px)": {
                  gridTemplateColumns: "repeat(1, 1fr)",
                  gap: "10px",

                },
              }}
            >


              {propertieslist.length === 0 && !loading ? (
                <div
                style={{
                  display: 'inline-block',
                
                  justifyContent: 'center',
                  alignItems: 'center',
                  width:"100%",
                  top:"100px",
                  height: '14vh', // Full viewport height
                  textAlign: 'center',
                  paddingLeft: isMobile ? '0px' : '150px',
                  marginTop:"100px",
                  marginLeft: isMobile ? "0px":  "150px"
                }}
              >
                <img
                  style={{ height: '80px', width: '80px' }}
                  src={NoResultsProperty}
                  alt="No results"
                />
                <Typography style={{fontSize:"16px",fontWeight:"700",color:"#d3d3d3 "}}>No Properties Found!</Typography>
              </div>
              
              ) : (
                propertieslist.map((room, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #dcdde1",
                      borderRadius: "10px",
                      backgroundColor: "#ffffff",
                      boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)",
                      position: "relative",
                      overflow: "hidden",
                      marginBottom: isMobile ? "15px" : '0px',
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src={room.image_path || noimage}
                        alt="Room"
                        style={{
                          width: "100%",
                          height: isMobile ? '160px' : "200px",
                          objectFit: "cover",
                          borderTopLeftRadius: "10px",
                          borderTopRightRadius: "10px",
                        }}
                        onClick={() => handleNavigation(room.property_id, room.name, room.currency)}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "3px",
                          background: "#00000080",
                          color: "white",
                          padding: "1px 8px",
                          borderRadius: "5px",
                          fontWeight: "700",
                          display: isMobile ? 'none' : "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <p style={{ fontSize: "14px", marginBottom: "0px" }}>
                          {room.nearest_places?.[0]}
                          <LocationOnIcon />
                          <span
                            style={{
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                            onClick={() => handleShowOnMapClick(room.property_location)}
                          >
                            Show on Map
                          </span>
                        </p>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          background: "#00000080",
                          color: "#FAC322",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          fontWeight: "700",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <StarIcon fontSize="small" />
                        {room.average_rating ? room.average_rating.toFixed(1) : "0.0"}
                      </div>
                    </div>

                    <div style={{ padding: "15px" }}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(room.property_id, room.name, room.currency);
                        }}
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "#4361EE",
                          textDecoration: "none",
                          textTransform: "capitalize",
                          cursor: "pointer",
                          display: "block",
                        }}
                      >
                        {room.name}
                      </a>

                      <p
                        style={{
                          fontSize: "16px",
                          color: "#525252",
                          fontFamily: "Roboto",
                          fontWeight: 400,
                          maxWidth: "100%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={`${room.nearest_places[1]}`}
                      >
                        {`${room.nearest_places[1]}`.length > 36
                          ? `${(`${room.nearest_places[1]}`).substring(0, 36)}...`
                          : `${room.nearest_places[1]}`}
                      </p>

                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "flex-start",
                          gap: "20px",
                          overflowX: "auto",
                        }}
                      >
                        {accommodationTypes[room.property_id] &&
                          accommodationTypes[room.property_id].map((accommodation, idx) => (
                            <div
                              key={idx}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  color: "#424242",
                                  fontWeight: "400",
                                  fontSize: "20px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {renderCurrencyIcon(room.currency)}
                                {accommodation.price}
                              </span>
                              <span
                                style={{
                                  color: "#717171",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  marginTop: "-5px",
                                }}
                              >
                                {accommodation.type}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Skeleton loader display when loading */}
              {loading && (
                <>
                  {[1, 2, 3, 4].map((_, index) => (
                    <div
                      key={index}
                      style={{
                        border: "1px solid #dcdde1",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        position: "relative",
                        overflow: "hidden",
                        marginBottom: isMobile ? "15px" : '0px',
                      }}
                    >
                      <div style={{ position: "relative" }}>
                        <Skeleton height={isMobile ? "160px" : "200px"} width="100%" style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
                        <div
                          style={{
                            position: "absolute",
                            bottom: "3px",
                            background: "#00000080",
                            color: "white",
                            padding: "1px 8px",
                            borderRadius: "5px",
                            fontWeight: "700",
                            display: isMobile ? 'none' : "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <Skeleton width="80px" height="14px" />
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "#00000080",
                            color: "#FAC322",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            fontWeight: "700",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <Skeleton width="30px" height="15px" />
                        </div>
                      </div>

                      <div style={{ padding: "15px" }}>
                        <Skeleton width="60%" height="20px" />
                        <Skeleton width="40%" height="16px" style={{ marginTop: "10px" }} />
                        <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-start", gap: "20px", overflowX: "auto" }}>
                          {[1, 2, 3].map((_, idx) => (
                            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                              <Skeleton width="50px" height="20px" />
                              <Skeleton width="40px" height="14px" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div style={{ display: "flex", height: "35vh", justifyContent: "space-between", marginTop: '16px' }}>
            </div>
          </div>

        </div>

        <Dialog open={mobilefilters} onClose={() => setmobilefilters(false)}  >
          <DialogContent>
            <div
              style={{
                flex: "1",
                width: "100%",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                maxHeight: "300px",
                position: "sticky",
                marginTop: "10px",
                borderColor: '#cacaca',
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', height: "20px" }}>
                <h3
                  style={{
                    color: "#424242",
                    fontSize: isMobile ? "16px" : "18px",
                    fontWeight: "700",
                    marginBottom: "20px",
                    width: "100%",


                    textAlign: isMobile ? "left" : "left",

                  }}
                >
                  Apply Filters
                </h3>
              </div>
              <label style={{ color: "#424242" }}>
                  {languageLabels?.propertiesList?.priceRange || "By price range"}
                </label>

              <input
                type="range"
                min="0"
                max="10000"
                value={rangeValue}
                onChange={handleRangeChange}
                style={{
                  width: "200px",
                  accentColor: "#4361ee",

                  marginTop: "10px",
                  boxSizing: "border-box",
                }}
              />

              <div style={{ width: "100%" ,marginTop:"5px"}}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    gap: "10px",
                    flexDirection: isMobile ? "row" : "row",
                  }}
                >
                  <div style={{ width: isMobile ? "48%" : "48%" }}>

                    <label style={{ color: "#666666", fontWeight: 500 }}>Min Price</label>
                    <input
                      type="text"
                      value="0"
                      readOnly
                      style={{
                        width: "100%",
                        height: "44px",
                        padding: "10px",
                        color: "#424242",
                        border: "1px solid #dcdde1",
                        borderRadius: "8px",
                        boxSizing: "border-box",
                        marginBottom: "10px",
                      }}
                    />
                  </div>

                  <div style={{ width: isMobile ? "48%" : "48%" }}>

                    <label style={{ color: "#666666", fontWeight: 500 }}>Max Price</label>
                    <input
                      type="text"
                      value={rangeValue}
                      readOnly
                      style={{
                        width: "100%",
                        height: "44px",
                        color: "#424242",
                        padding: "10px",
                        border: "1px solid #dcdde1",
                        borderRadius: "8px",
                        boxSizing: "border-box",
                        marginBottom: "10px",
                      }}
                    />
                  </div>
                </div>


                {loading && <LinearProgress style={{ marginBottom: "10px" }} />}
                <Typography style={{marginBottom:"5px"}}>{languageLabels?.propertiesList?.ratings || "By Ratings "}</Typography>
                <Rating
                  name="rating-filter"
                  value={rangeValues}
                  // onChange={(event, newValue) => setRatingValue(newValue)}
                  onChange={handleRatingChange}
                  // onDoubleClick={handleDoubleClick}
                  size="large"
                />
                {rangeValues !== 0 && (
                  <div style={{width:"100%",justifyContent:"flex-end",display:'flex'}}>

                  <Button variant="contained" color="primary" style={{backgroundColor:"#4361ee",color:"#fff",marginTop:"8px",}}  onClick={handleRemoveFilter}>
                    Remove Filter
                  </Button>
                  </div>
                )}

              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={openReviews} onClose={handleDialogClose}
          maxWidth='md'
          fullWidth
          PaperProps={{
            style: {
              borderRadius: '8px',
              minHeight: '400px',
              width: '650px',
              scrollbarWidth: 'none'
            },
          }}
        >
          <Box>

            <DialogTitle style={{ borderBottom: '1px solid #e3e3e3' }}>
              Ratings and Reviews
              <IconButton
                aria-label="close"
                onClick={handleDialogClose}
                sx={{ position: "absolute", right: 8, top: 8, }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
          </Box>
          <DialogContent
            style={{ scrollbarWidth: 'none', minHeight: "350px" }}
          >
            {reviews.length === 0 ? (
              <Typography color="textSecondary">
                No reviews available.
              </Typography>
            ) : (
              reviews.map((review, index) => {
                const fullStars = Math.floor(review.rating);
                const hasHalfStar = review.rating % 1 !== 0;
                const totalStars = 5;
                return (
                  <div key={index} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: "column", marginBottom: '8px' }}>
                      <div style={{ display: "flex" }}>
                        <Avatar alt={review.customer_mail} style={{ marginRight: '10px' }} />
                        <Typography variant="h6">{review.customer_mail}</Typography>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <Typography variant="h6">You rated:</Typography>
                          {[...Array(fullStars)].map((_, i) => (
                            <StarIcon key={i} style={{ color: "gold" }} />
                          ))}
                          {hasHalfStar && <StarHalfIcon style={{ color: "gold" }} />}
                          {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                            <StarIcon key={`empty-${i}`} style={{ color: "gray" }} />
                          ))}
                          <Typography variant="h6">{review.rating}</Typography>
                        </div>
                      </div>
                    </div>
                    <Typography style={{ fontSize: "14px", fontWeight: "600" }} sx={{ marginTop: 1 }}>
                      Comments:
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 3 }}>{review.comment_feedback}</Typography>
                  </div>
                );
              })
            )}
          </DialogContent>
        </Dialog>
        <Dialog open={openMapDialog} onClose={() => setOpenMapDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            Location on Map
            <IconButton
              aria-label="close"
              onClick={() => setOpenMapDialog(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
            {loadingMap ? (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50px" }}>
                <CircularProgress size={40} thickness={4} />
              </div>
            ) : mapLocation ? (
              <iframe
                title="Property Location"
                width="100%"
                height="400px"
                style={{ border: 0 }}
                src={mapLocation}
                allowFullScreen
              />
            ) : (
              <Typography>No map available</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenMapDialog(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </div>

    </>
  );
};

export default PropertiesList;
