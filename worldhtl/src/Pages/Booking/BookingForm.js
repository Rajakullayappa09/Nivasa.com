import { useBooking } from "../Home/BookingContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Search, Edit2 } from "lucide-react";
import { Avatar, IconButton, Typography } from "@mui/material";
import config from "../../config";
import { useLocation } from 'react-router-dom';
import './BookingForm.css';
// import Search from '../../assets/Search.svg'

import SearchLogo from '../../assets/SearchLogo.svg'
import localization_en from "../../assets/Localization/localization-en.json";
import localization_es from "../../assets/Localization/localization-es.json";

const getDefaultDates = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(tomorrow.getDate() + 1);

    return {
        checkIn: tomorrow.toISOString().split("T")[0],
        checkOut: dayAfter.toISOString().split("T")[0],
    };
};


const API_BASE_URL = `${config.BASE_URL}`;
const BookingForm = () => {
    const { bookingData, setBookingData, setSubmittedBooking, setShowFormInHeader, setLanguageLabels, languageLabels } = useBooking();
    const navigate = useNavigate();
    const defaultDates = getDefaultDates();

    const [formData, setFormData] = useState({
        destination: bookingData?.destination || "",
        checkIn: bookingData?.checkIn || defaultDates.checkIn,
        checkOut: bookingData?.checkOut || defaultDates.checkOut,
        guests: bookingData?.guests || 1,
    });

    const [destination, setDestination] = useState(bookingData?.destination || "");

    const [showDropdown, setShowDropdown] = useState(false);
    const [cities, setCities] = useState([]);
    const [apiCalled, setApiCalled] = useState(false);
    const [userSelected, setUserSelected] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const [isHomePage, setIsHomePagen] = useState(false);

    const [errors, setErrors] = useState({});

    const submittedCityRef = useRef(bookingData?.destination || "");
    const modalWidth = isMobile ? "80%" : "40%";
    const checkOutRef = useRef(null);
    const location = useLocation();
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const isPropertiesListPage = window.location.pathname === '/propertiesList';
    const isBookingCartPage = /^\/BookingCart\/[A-Za-z0-9_-]+$/.test(window.location.pathname);


    useEffect(() => {
        const storedLanguage = localStorage.getItem('language') || 'en'; // Get the language from localStorage
        if (storedLanguage === 'en') {
            setLanguageLabels(localization_en); // Set English labels
        } else if (storedLanguage === 'es') {
            setLanguageLabels(localization_es); // Set Spanish labels
        }
    }, []); // Trigger only once after component mount


    useEffect(() => {
        const updated = {
            destination: formData.destination,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
            guests: formData.guests,
        };
        setBookingData(updated);
    }, []);

    useEffect(() => {
        setBookingData(formData);
    }, []);




    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 968);
            const currentPage = location.pathname;
            if (currentPage !== '/') {
                setIsHomePagen(true);
            } else {
                setIsHomePagen(false);
            }
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [location]);

   

    useEffect(() => {
        if (destination.length >= 2 && !apiCalled && submittedCityRef.current !== destination && !userSelected) {
            axios
                .get(`https://api.nivasa.com/listing/getAllCities?city_name=${destination}`)
                .then((response) => {
                    setCities(response.data.city || []);
                    setShowDropdown(true);
                    setApiCalled(true);
                })
                .catch((error) => console.error("Error fetching cities:", error));
        } else if (destination.length < 2) {
            setCities([]);
            setShowDropdown(false);
            setApiCalled(false);
        }
    }, [destination]);


    const today = new Date().toISOString().split("T")[0];

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedFormData = { ...formData, [name]: value };

        if (name === "checkIn") {
            if (!value) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                updatedFormData.checkIn = tomorrow.toISOString().split("T")[0];
                updatedFormData.checkOut = new Date(tomorrow).toISOString().split("T")[0];
            } else {
                let nextDay = new Date(value);
                nextDay.setDate(nextDay.getDate() + 1);
                updatedFormData.checkOut = nextDay.toISOString().split("T")[0];
            }
        }

        setFormData(updatedFormData);
        setBookingData(updatedFormData);
        validateForm(updatedFormData);
    };


    const handleDestinationChange = (value) => {
        setDestination(value);
        const updatedFormData = { ...formData, destination: value };
        setFormData(updatedFormData);
        setBookingData(updatedFormData);
        validateForm(updatedFormData);
        setIsUserInteracting(true);
    };


    const handleCitySelect = (city) => {
        setDestination(city);
        setUserSelected(true);
        setShowDropdown(false);
        setIsUserInteracting(false);
        const updatedFormData = { ...formData, destination: city };
        setFormData(updatedFormData);
        setBookingData(updatedFormData);
        validateForm(updatedFormData);
    };
    useEffect(() => {
        validateForm(formData);
    }, []);




    const validateForm = (data) => {
        let newErrors = {};

        if (!data.destination) newErrors.destination = "Destination is required.";
        if (!data.checkIn) newErrors.checkIn = "Check-in date is required.";
        else if (data.checkIn < today) newErrors.checkIn = "Check-in date cannot be in the past.";

        if (!data.checkOut) newErrors.checkOut = "Check-out date is required.";
        else if (data.checkIn && data.checkOut <= data.checkIn) newErrors.checkOut = "Check-out date must be after check-in date.";

        if (!data.guests || data.guests < 1) newErrors.guests = "Number of guests should be at least 1.";

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };












    useEffect(() => {
        if (formData?.checkIn && formData?.checkOut) {
            const today = new Date().toISOString().split("T")[0];
            const checkInDate = new Date(formData.checkIn);
            const checkOutDate = new Date(formData.checkOut);
            const now = new Date();

            if (checkInDate < now || checkOutDate <= checkInDate) {
                const tomorrow = new Date();
                tomorrow.setDate(now.getDate() + 1);
                const nextDay = new Date(tomorrow);
                nextDay.setDate(tomorrow.getDate() + 1);

                const formattedCheckIn = tomorrow.toISOString().split("T")[0];
                const formattedCheckOut = nextDay.toISOString().split("T")[0];

                const correctedFormData = {
                    ...formData,
                    checkIn: formattedCheckIn,
                    checkOut: formattedCheckOut,
                };

                setFormData(correctedFormData);
                setBookingData(correctedFormData);
            }
        }
    }, []);



    const handleSubmit = () => {
        if (isFormValid) {
            submittedCityRef.current = destination;
            setSubmittedBooking(formData);
            setShowPopup(false);
            navigate("/propertiesList");
        }
    };

    const dynamicFontSize = (screenWidth) => {
        const maxSize = 16;
        const minSize = 12;
        const baseSize = Math.max(minSize, Math.min(maxSize, screenWidth / 100));
        return screenWidth <= 768 ? baseSize * 1.3 : maxSize;
    };

    const renderBookingForm = () => (
        <form
            style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                maxWidth: "1000px",
                gap: "12px",
                backgroundColor: (isPropertiesListPage || isBookingCartPage) ? 'transparent' : "#ffffff",
                borderRadius: isMobile ? "12px" : "16px",
                border: (isPropertiesListPage || isBookingCartPage) ? 'none' : "1px solid rgba(46, 125, 50, 0.15)",
                backdropFilter: "blur(10px)",
                padding: isMobile ? '16px 14px' : '18px 20px',
                background: (isPropertiesListPage || isBookingCartPage) ? 'transparent' : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: (isPropertiesListPage || isBookingCartPage) ? 'none' : "0px 8px 32px rgba(46, 125, 50, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.05)",
                marginBottom: (isPropertiesListPage || isBookingCartPage) ? 'none' : "24px",
                marginTop: (isPropertiesListPage || isBookingCartPage) ? 'none' : "16px",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* DESTINATION FIELD */}
            <div style={{
                flex: isMobile ? "1 1 100%" : "1 1 auto",
                minWidth: isMobile ? "100%" : "180px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
            }}>
                <label htmlFor="city" style={{ 
                    color: "#6c7a89", 
                    fontFamily: 'Poppins', 
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}>
                 Destination
                </label>
                <select
                    className="form-select"
                    id="city"
                    value={destination}
                    onChange={(e) => handleDestinationChange(e.target.value)}
                    style={{
                        color: '#2d3436',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: "600",
                        fontSize: dynamicFontSize(window.innerWidth),
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid rgba(46, 125, 50, 0.2)',
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        backgroundImage: 'url(data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22%232E7D32%22%3E%3Cpath%20d=%22M7%2010l5%205%205-5%22/%3E%3C/svg%3E)',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 10px center',
                        backgroundSize: '16px',
                        paddingRight: '38px',
                        outline: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        height: '44px',
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#2E7D32';
                        e.target.style.boxShadow = '0px 0px 0px 3px rgba(46, 125, 50, 0.1)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(46, 125, 50, 0.2)';
                        e.target.style.boxShadow = '0px 1px 3px rgba(0, 0, 0, 0.05)';
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.borderColor = 'rgba(46, 125, 50, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.borderColor = 'rgba(46, 125, 50, 0.2)';
                    }}
                >
                    <option value=""> Select Destination</option>
                    <option value="Ooty"> Ooty</option>
                    <option value="Bengaluru"> Bengaluru</option>
                    <option value="Haridwar"> Haridwar</option>
                    <option value="Wakka"> Wakka</option>
                    <option value="Meghalaya"> Meghalaya</option>
                    <option value="Chennai"> Chennai</option>
                </select>
            </div>

            {/* CHECK-IN FIELD */}
            <div style={{
                flex: isMobile ? "1 1 calc(50% - 6px)" : "1 1 auto",
                minWidth: isMobile ? "calc(50% - 6px)" : "130px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
            }}>
                <label htmlFor="checkIn" style={{ 
                    color: "#6c7a89", 
                    fontFamily: 'Poppins', 
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}>
                     Check In
                </label>
                <input
                    type="date"
                    name="checkIn"
                    className="form-control"
                    id="checkIn"
                    value={formData.checkIn}
                    min={today}
                    onChange={handleChange}
                    style={{
                        color: '#2d3436',
                        textTransform: "uppercase",
                        fontSize: dynamicFontSize(window.innerWidth) * 0.9,
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: '600',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid rgba(46, 125, 50, 0.2)',
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        outline: 'none',
                        height: '44px',
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#2E7D32';
                        e.target.style.boxShadow = '0px 0px 0px 3px rgba(46, 125, 50, 0.1)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(46, 125, 50, 0.2)';
                        e.target.style.boxShadow = '0px 1px 3px rgba(0, 0, 0, 0.05)';
                    }}
                />
            </div>

            {/* CHECK-OUT FIELD */}
            <div style={{
                flex: isMobile ? "1 1 calc(50% - 6px)" : "1 1 auto",
                minWidth: isMobile ? "calc(50% - 6px)" : "130px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
            }}>
                <label htmlFor="checkOut" style={{ 
                    color: "#6c7a89", 
                    fontFamily: 'Poppins', 
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}>
                     Check Out
                </label>

                <input
                    ref={checkOutRef}
                    type="date"
                    name="checkOut"
                    className="form-control"
                    id="checkOut"
                    value={formData.checkOut}
                    min={formData.checkIn ? new Date(new Date(formData.checkIn).setDate(new Date(formData.checkIn).getDate() + 1)).toISOString().split("T")[0] : today}
                    onChange={handleChange}
                    style={{
                        color: '#2d3436',
                        textTransform: 'uppercase',
                        fontSize: dynamicFontSize(window.innerWidth) * 0.9,
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: '600',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid rgba(46, 125, 50, 0.2)',
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        outline: 'none',
                        height: '44px',
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#2E7D32';
                        e.target.style.boxShadow = '0px 0px 0px 3px rgba(46, 125, 50, 0.1)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(46, 125, 50, 0.2)';
                        e.target.style.boxShadow = '0px 1px 3px rgba(0, 0, 0, 0.05)';
                    }}
                />
            </div>

            {/* GUESTS FIELD */}
            <div style={{
                flex: isMobile ? "1 1 calc(50% - 6px)" : "1 1 auto",
                minWidth: isMobile ? "calc(40% - 6px)" : "50px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
            }}>
                <label htmlFor="guests" style={{ 
                    color: "#6c7a89", 
                    fontFamily: 'Poppins', 
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}>
                    Guests
                </label>
                <input
                    type="number"
                    name="guests"
                    min="1"
                    className="form-control"
                    id="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    style={{
                        color: '#2d3436',
                        fontSize: dynamicFontSize(window.innerWidth) * 0.9,
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: '600',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid rgba(46, 125, 50, 0.2)',
                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        outline: 'none',
                        height: '44px',
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#2E7D32';
                        e.target.style.boxShadow = '0px 0px 0px 3px rgba(46, 125, 50, 0.1)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(46, 125, 50, 0.2)';
                        e.target.style.boxShadow = '0px 1px 3px rgba(0, 0, 0, 0.05)';
                    }}
                />
            </div>

            {/* SEARCH BUTTON */}
            <button
                type="button"
                className="btn text-white"
                style={{
                    flex: isMobile ? "1 1 calc(50% - 6px)" : "0 1 auto",
                    minWidth: isMobile ? "calc(50% - 6px)" : "120px",
                    background: "linear-gradient(135deg, #2E7D32 0%, #bad55f 100%)",
                    borderRadius: "8px",
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '600',
                    height: "44px",
                    fontSize: dynamicFontSize(window.innerWidth) * 0.9,
                    border: 'none',
                    boxShadow: "0px 4px 12px rgba(46, 125, 50, 0.3)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: !isFormValid ? "not-allowed" : "pointer",
                    opacity: !isFormValid ? 0.6 : 1,
                    transform: "translateY(0px)",
                    position: "relative",
                    overflow: "hidden",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginTop: "22px",
                    letterSpacing: '0.3px',
                }}
                onClick={handleSubmit}
                disabled={!isFormValid}
                onMouseEnter={(e) => {
                    if (isFormValid) {
                        e.target.style.boxShadow = "0px 6px 20px rgba(141, 220, 145, 0.4)";
                        e.target.style.transform = "translateY(-2px)";
                    }
                }}
                onMouseLeave={(e) => {
                    if (isFormValid) {
                        e.target.style.boxShadow = "0px 4px 12px rgba(46, 125, 50, 0.3)";
                        e.target.style.transform = "translateY(0px)";
                    }
                }}
            >
                <span style={{fontSize: '16px'}}></span> {languageLabels?.bookingForm?.searchButtonLabel || "Search"}
            </button>
        </form>

    );

    return (
        <div className="container d-flex justify-content-center align-items-center mt-0">
            {/* {isMobile && setShowFormInHeader && isHomePage ? (
             <div className="d-flex justify-content-between align-items-center p-3 bg-light shadow-lg rounded w-100" style={{ gap: '10px' }}> 
                     <h5 className="m-0" style={{ fontSize: dynamicFontSize(window.innerWidth), fontWeight: "500", color: "#333" }}>
                        {destination || "Select Destination"}
                    </h5> 
                 
                     <button className="btn btn-outline-primary p-1 d-flex align-items-center" onClick={() => setShowPopup(true)}>
                         <Edit2 size={14} />
                 </button>  */}

            {isMobile && setShowFormInHeader && window.location.pathname !== '/' ? (


                <div>

                    <img src={SearchLogo}
                        style={{ cursor: 'pointer', marginLeft: 171, borderRadius: '5px', height: '30px', width: '30px' }}


                        onClick={() => setShowPopup(true)} size={14} />
                </div>
            ) : (
                renderBookingForm()
            )}

            {/* <Modal
                show={showPopup}
                onHide={() => setShowPopup(false)}
                centered
                backdrop="static"
                size="lg"
                style={{
                    width: modalWidth,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: '20px',
                    position: 'fixed',
                    bottom: '0'

                }}
            >
                <Modal.Body
                    className="bg-light shadow-lg rounded"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width:"100%"
                    }}
                >
                    <button
                        className="btn-close position-absolute"
                        style={{ top: "20px", right: "10px" }}
                        onClick={() => setShowPopup(false)}
                    />
                    <h5 className="text-center mb-3">Search Booking</h5>
                    {renderBookingForm()}
                </Modal.Body>
            </Modal> */}
            <Modal
                show={showPopup}
                onHide={() => setShowPopup(false)}
                style={{
                    marginTop: "455px",
                    bottom: '10px',
                    width: "100%",
                    backgroundColor: '#f6f6f6', borderTopLeftRadius: '12px', borderTopRightRadius: '12px',

                    padding: '3px'
                }} >


                {renderBookingForm({ className: 'no-border' })}





            </Modal>


        </div>
    );
};

export default BookingForm;
