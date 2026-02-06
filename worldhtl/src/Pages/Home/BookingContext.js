

import React, { createContext, useContext, useState, useEffect } from "react";

const getDefaultDates = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(tomorrow.getDate() + 1);

    return {
        destination: "",
        checkIn: tomorrow.toISOString().split("T")[0],
        checkOut: dayAfter.toISOString().split("T")[0],
        guests: 1,
    };
};


const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    // const initialBookingData = JSON.parse(localStorage.getItem("formData")) || {
    //     destination: "",
    //     checkIn: "",
    //     checkOut: "",
    //     guests: 1,
    // };
    const initialBookingData = getDefaultDates();


    const [bookingData, setBookingData] = useState(initialBookingData);
    const [submittedBooking, setSubmittedBooking] = useState(null);
    const [showFormInHeader, setShowFormInHeader] = useState(false);
    const [IsLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [currencyType, setCurrencyType] = useState("INR");
    const [language, setLanguage] = useState("en");
    const [languageLabels, setLanguageLabels] = useState({});
    

    useEffect(() => {
        // localStorage.setItem("formData", JSON.stringify(bookingData));

        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = decodeToken(token);
            const currentTime = Date.now() / 1000; 
            if (decodedToken.exp < currentTime) {
                console.log("Token expired, logging out the user.");
                localStorage.removeItem("user");
                localStorage.removeItem("formData");
                setIsLoggedIn(false); 
            }
        }
    }, [bookingData]); 

    return (
        <BookingContext.Provider
            value={{
                bookingData,
                setBookingData,
                submittedBooking,
                setSubmittedBooking,
                showFormInHeader,
                setShowFormInHeader,
                IsLoggedIn,
                setIsLoggedIn,
                showLoginForm,
                setShowLoginForm,
                currencyType,
                setCurrencyType,
                language,
                setLanguage,
                languageLabels,
                setLanguageLabels,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => useContext(BookingContext);

// Helper function to decode JWT token (if using JWT tokens)
const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};
