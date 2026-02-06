import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import nivasaLogo from "../../assets/nivasa-logo.svg";
import nivasaTraditionsLogo from "../../assets/nivasa-traditions-logo.svg";
import { ArrowBack, Cancel, Close } from '@mui/icons-material';
import { Avatar, Grid, Box, Button, Dialog, Autocomplete, DialogActions, DialogContent, DialogTitle, Divider, Drawer, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useBooking } from "../../Pages/Home/BookingContext";
import axios from "axios";
import BookingForm from "../../Pages/Booking/BookingForm";
import {
  saveUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  getUserToken,
  saveUserToken,
} from "../Storage/localStorageService";
import profileimg from "../../assets/profileimg.png"
import Logo from '../../../src/assets/nivasa-logo.svg'
import { toast, ToastContainer } from "react-toastify";
import countryCodeList from "../../data/CountryCodes.json"
import Menu_1 from '../../assets/nivasa-logo.svg'
import config from "../../config";
import LanguageSelectionDialog from "./LanguageSelectionDialog";
import { FaGlobe } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';
import Flag from "react-world-flags";
import localization_en from "../../assets/Localization/localization-en.json";
import localization_es from "../../assets/Localization/localization-es.json";
import localization_tm from "../../assets/Localization/localization-tm.json";
import localization_hi from "../../assets/Localization/localization-hi.json";
import localization_tl from "../../assets/Localization/localization-tl.json";
import localization_fr from "../../assets/Localization/localization-fr.json";
import localization_pr from "../../assets/Localization/localization-pr.json";
import localization_kn from "../../assets/Localization/localization-kn.json";
import localization_ml from "../../assets/Localization/localization-ml.json";

import WHicon from '../../assets/nivasa-traditions-logo.svg'

const API_BASE_URL = `${config.BASE_URL}`;
const NavbarHeader = () => {
  const { setShowFormInHeader, setLanguageLabels } = useBooking();

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(60); // Countdown timer
  const [resendEnabled, setResendEnabled] = useState(false);



  const { showFormInHeader } = useBooking();
  const { IsLoggedIn, setIsLoggedIn, languageLabels, language, setLanguage } = useBooking();
  const { showLoginForm, setShowLoginForm } = useBooking();
  const [mobileNumber, setMobileNumber] = useState("");
  const [touched, setTouched] = useState(false);

  const [languageDialog, setLanguageDialog] = useState(false)

  const { bookingData, setBookingData } = useBooking();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [openOtpDialog, setOpenOtpDialog] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [mobileNumber, setMobileNumber] = useState('');
  const [otpOpenlog, setOtpOpenlog] = useState(false);
  const [otp, setOtp] = useState(false);
  const [email, setemail] = useState('')

  const [otpVal, setOtpVal] = useState('');

  const [verifiedMobileNumber, setVerifiedMobileNumber] = useState(null);
  const [Open, setOpen] = useState();
  const openmenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const [cityserach, setCitysearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [fromDatesearch, setFromDatesearch] = useState(null);
  const [toDatesearch, setToDatesearch] = useState(null);
  const [cities, setCities] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);
  const [guestsearch, setGuestsearch] = useState(2);
  const [openLogout, setOpenLogout] = useState('');
  const [isHomePage, setIsHomePagen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const modalWidth = isMobile ? "80%" : "40%";

  const [profile, setprofile] = useState([]);


  // useEffect(() => {
  //   const storedLanguage = localStorage.getItem('language') || 'en'; // Get the language from localStorage
  //   if (storedLanguage === 'en') {
  //     setLanguageLabels(localization_en); // Set English labels
  //   } else if (storedLanguage === 'es') {
  //     setLanguageLabels(localization_es); // Set Spanish labels
  //   }
  // }, []);
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'en'; // Get the language from localStorage

    if (storedLanguage === 'en') {
      setLanguageLabels(localization_en); // Set English labels
    } else if (storedLanguage === 'es') {
      setLanguageLabels(localization_es); // Set Spanish labels
    } else if (storedLanguage === 'hi') {
      setLanguageLabels(localization_hi); // Set Hindi labels
    } else if (storedLanguage === 'ta') {
      setLanguageLabels(localization_tm); // Set Tamil labels
    } else if (storedLanguage === 'te') {
      setLanguageLabels(localization_tl); // Set Telugu labels
    } else if (storedLanguage === 'fr') {
      setLanguageLabels(localization_fr); // Set Telugu labels
    } else if (storedLanguage === 'pr') {
      setLanguageLabels(localization_pr); // Set Telugu labels
    } else if (storedLanguage === 'kn') {
      setLanguageLabels(localization_kn); // Set Telugu labels
    } else if (storedLanguage === 'ml') {
      setLanguageLabels(localization_ml); // Set Telugu labels
    }
  }, []);


  const [isDisabled, setIsDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60); // Timer starts from 10 seconds

  const startTimer = () => {
    setIsDisabled(true)
    setTimeLeft(60)
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(intervalId); // Clear the interval once time is 0
          setIsDisabled(false); // Enable the button
          return 0;
        }
        return prevTime - 1; // Decrement the timer every second
      });
    }, 1000);
  };


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
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



  const [selectedCountryCode, setSelectedCountryCode] = useState("+91"); // Default to India
  const [selectedregioncode, setSelectedregioncode] = useState("IN"); // Default to India


  const handleCountryCodeChange = (event) => {
    setSelectedCountryCode(event.target.value);
  };


  useEffect(() => {
    if (cityserach.length >= 2 && !apiCalled) {
      axios
        .get(API_BASE_URL + `/listing/getAllCities?city_name=${cityserach}`)
        .then((response) => {
          setCities(response.data.city || []); // Axios automatically parses JSON for you
          setShowDropdown(true);
          setApiCalled(true);
        })
        .catch((error) => console.error("Error fetching cities:", error));
    } else if (cityserach.length < 2) {
      setCities([]);
      setShowDropdown(false);
      setApiCalled(false);
    }
    getUserDetails();
  }, [cityserach]);

  const getUserDetails = () => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      console.log("Stored USer : " + JSON.stringify(storedUser))
      setIsLoggedIn(true)
      setUser(storedUser);
    }
  };


  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "-10px 0px 0px 0px",
    backgroundColor: "#FEFCFB",
    // padding: "20px 20px",
    minHeight: '70px',

    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    width: '100%',
    zIndex: 1000,
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    gap: "8px",
    textDecoration: 'none'
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    pin_code: "",
    city_name: "",
    state: "",
    country: "",
  });

  const [regFormData, setRegFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    pin_code: "",
    city_name: "",
    state: "",
    country: "",
    otp: ""
  });
  const toggleDrawer = (state) => () => {
    setOpen(state);
  };
  const handleProfile = () => {
    navigate('/userprofile');
    handleClose();
  };
  const handlemybookings = () => {
    navigate('/mybooking');
    handleClose();
  };

  const handleLogin = () => {
    navigate('/login');
    handleClose();
  };

  const otpRefs = useRef([]);

  // const handleOtpChange = (event) => {
  //   setOtpVal(event.target.value);
  // };

  const handleSendOtp = async () => {
    if (loading)
      return
    setLoading(true)
    const otpRequestData = {
      mobile: mobileNumber,
      // email: email,
      country_code: selectedCountryCode
    };
    console.log(otpRequestData);
    startTimer()
    try {
      const response = await fetch(API_BASE_URL + '/BookingUsers/login/request_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(otpRequestData),
      });

      const data = await response.json();
      setLoading(false)

      if (response.ok) {
        toast.success(data.Message || "OTP sent successfully!", {
          position: "bottom-left",
          hideProgressBar: true,
        });



        setOtpSent(true);
        setRegFormData((prevData) => ({
          ...prevData,
          mobile: mobileNumber, // Keep the mobile number intact
        }));

        if (data.is_new_user === true) {
          setOpenOtpDialog(false);
          setOtpOpenlog(false);
          setShowLoginForm(false);
          setOpen(true);
        } else {
          setOpenDialog(false);
          handleOpenOtpDialog();
          setOpenOtpDialog(true);
        }
        sessionStorage.setItem('otpMobileNumber', mobileNumber);
      } else {
        setLoading(false)

        toast.error(`Failed to send OTP: ${data.detail || "Unknown error"}`, {
          position: "bottom-left",
          hideProgressBar: true,
        });
      }
    } catch (error) {
      setLoading(false)

      toast.error(`Error sending OTP: ${error.detail || "Unknown error"}`, {
        position: "bottom-left",
        hideProgressBar: true,

      });
    }
  };

  const handleMobileChange = (e) => {
    const { value } = e.target;
    setRegFormData((prevData) => ({
      ...prevData,
      mobile: value,
    }));
  };




  const handleVerifyMobile = async () => {
    if (!mobileNumber || mobileNumber.length !== 10 || !otpVal) {
      toast.error('Please enter a valid mobile number and OTP.', {
        position: "bottom-left",
        hideProgressBar: true,
      });
      return;
    }

    if (loading) return; // Prevent re-submission while loading
    setLoading(true);

    try {
      const otpRequestData = {
        mobile: mobileNumber,
        otp: otpVal,
      };

      const response = await fetch(API_BASE_URL + '/BookingUsers/login/verify_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(otpRequestData),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpVal(''); // Clear OTP input
        setOpenDialog(true);
        handleCloseOtpDialog();
        setUser(data.Data);
        saveUserToLocalStorage(data.Data);
        saveUserToken(data.access_token);
        setIsLoggedIn(true);

        toast.success(data.Message || 'Mobile number verified successfully!', {
          position: "bottom-left",
          hideProgressBar: true,
        });
        setMobileNumber('');
      } else {
        toast.error(`Failed to verify mobile number: ${data.detail || 'Unknown error'}`, {
          position: "bottom-left",
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error(`Error verifying mobile number: ${error.message || 'Unknown error'}`, {
        position: "bottom-left",
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpenLogout(true);
    handleClose();
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenLogout(false);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    handleCloseDialog();
    localStorage.removeItem('user');
    localStorage.removeItem("formData")
    setBookingData(null);
    toast.success('Logout Successfully!', {
      position: "bottom-left",
      hideProgressBar: true,
    });

    navigate('/');
    handleClose();
  };
  const handleCloseLoginDialog = () => {

    setOtpOpenlog(false);
    setShowLoginForm(false);
  };

  const handleCloseOtpDialog = () => {
    setOtp(false);
    setOtpVal('')
  };

  const goBackToLogin = () => {
    setOtp(false);
    setOpen(false)
    setOtpVal('')
    setShowLoginForm(true);
  }

  const handleOpenOtpDialog = () => {
    setOtpOpenlog(false);
    setShowLoginForm(false);
    setOtp(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegFormData({ ...regFormData, [name]: value });
    if (/^\d{0,4}$/.test(value)) {
      setRegFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async () => {
    try {
      const response = await fetch(API_BASE_URL + "/BookingUsers/createCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(regFormData),
      });
      const data = await response.json();

      if (response.ok) {
        saveUserToLocalStorage(data.customer_details);
        setUser(data.customer_details)
        saveUserToken(data.access_token)

        toast.success("Account created successfully! Thanks for signing up!  Welcome aboard!" || data.Message, {
          position: "bottom-left",
          hideProgressBar: true,

        });

        setRegFormData({});
        getUserDetails();
        setOpen(false);
      } else {
        toast.error(data.detail || "Error submitting form!", {
          position: "top-right",
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.detail || "Something went wrong!", {
        position: "bottom-left",
        hideProgressBar: true,
      });
    }
  };

  const handlesubmitnewuser = () => {
    handleSubmit();
    // handleVerifyMobile();
  }

  const [user, setUser] = useState(null);
  const username = user ? `${user.first_name}` : 'Guest';
  const phoneNumber = user?.mobile || 'Not Provided';
  const firstChar = username.charAt(0).toUpperCase();

  const handleChangegender = (event) => {
    setRegFormData({
      ...regFormData,
      gender: event.target.value,
    });

  };

  const handlePincodeBlur = async () => {
    const { pin_code } = regFormData;
    if (pin_code.length > 4) {
      try {
        const apiKey = "AIzaSyBSvb6VR95UkLugUlJL8VRuyXdNbwxN5NI";
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${pin_code}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.status === "OK") {
          const addressComponents = data.results[0].address_components;
          let city = "", state = "", country = "";

          addressComponents.forEach((component) => {
            if (component.types.includes("locality")) {
              city = component.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
              state = component.long_name;
            }
            if (component.types.includes("country")) {
              country = component.long_name;
            }
          });

          setRegFormData((prevState) => ({ ...prevState, city_name: city, state, country }));
        } else {
          console.error("Error fetching location data");
        }
      } catch (error) {
        console.error("Failed to fetch location data:", error);
      }
    }
  };

  const handleMobileNumberChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setMobileNumber(value);
    }
  };


  const handleBlur = () => {
    setTouched(true);
  };

  const handleOtpChange = (e) => {
    const input = e.target.value;

    if (/^\d{0,4}$/.test(input)) {
      setOtpVal(input);
    }
  };
  const isPropertiesListPage = window.location.pathname === '/propertiesList';
  const isBookingCartPage = /^\/BookingCart\/[A-Za-z0-9_-]+$/.test(window.location.pathname);

  const homepage = window.location.pathname === '/';

  const userprofile = window.location.pathname === '/userprofile'
  const mybooking = window.location.pathname === '/mybooking'
  const contactus = window.location.pathname === '/contactus'


  // const [language, setLanguage] = useState(localStorage.getItem('language') || 'en'); // Default to 'en'

  const handleLanguageChange = (lang) => {

  };

  const handleLanguageDialogOpen = () => {
    setLanguageDialog(true);
  };

  const handleLanguageDialogClose = () => {
    setLanguageDialog(false);
  };

  const styles = {
    logoContainer: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      justifyContent: 'space-between',
      paddingLeft: isMobile ? "0px" : "32px",
      marginLeft: homepage || userprofile || mybooking ? '10px' : '0px',



    },
    logoImage: {
      width: "auto",
      height: "auto",
      maxHeight: "50px",
      paddingLeft: "0px",

      "@media (max-width: 1024px)": {
        width: "120px", // Slightly smaller for tablet
        maxHeight: "45px", // Limit the height for tablet
      },

      "@media (max-width: 768px)": {
        width: "40px", // Smaller width for mobile
        maxHeight: "40px", // Smaller height for mobile
      },

      "@media (max-width: 480px)": {
        width: "40px",
        maxHeight: "40px",
      },

      "@media (max-width: 360px)": {
        width: "30px",
        maxHeight: "30px",


      }
    }
  };

  const LOCAL_STORAGE_KEY = "user";

  const fetchImages = async () => {
    let userlogin;

    try {
      userlogin = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!userlogin) {
        return;
      }
    } catch (e) {
      return;
    }

    let parsedUser;
    try {
      parsedUser = JSON.parse(userlogin);
    } catch (e) {
      console.error("Error parsing user data:", e);
      return;
    }

    const bookUserId = parsedUser?.book_user_id;

    if (!bookUserId) {
      console.error("bookUserId is missing or invalid");
      return;
    }

    const token = getUserToken();

    try {
      const response = await axios.get(
        `${API_BASE_URL}/BookingUsers/get/image/${bookUserId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setprofile(response.data);

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();

  }, [])


  return (
    <>
      <nav style={{ position: "sticky", top: -1, zIndex: 1100 }}>
        <header style={headerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>

            {(isMobile && !homepage && !userprofile && !mybooking) &&
              <IconButton onClick={() => navigate(-1)} style={{ width: "50px" }}>
                <ArrowBack />
              </IconButton>
            }

            {
              !isMobile ?

                <Link to="/" style={styles.logoContainer}  >
                  <img style={styles.logoImage} src={Menu_1} alt="Nivasa Logo" />
                </Link>
                :
                <Link to="/" style={styles.logoContainer}>
                  <img
                    style={styles.logoImage}
                    src={isMobile && homepage ? Menu_1 : WHicon}
                    alt="Nivasa Logo"
                  />
                </Link>
            }

          </div>


          <LanguageSelectionDialog
            open={languageDialog}
            onClose={handleLanguageDialogClose}
            onLanguageSelect={handleLanguageChange}
          />
          <hr className="responsive-hr" />

          {location.pathname !== '/' && location.pathname !== '/userprofile' && location.pathname !== '/mybooking' &&
            location.pathname !== '/privacy&policys' && location.pathname !== '/terms&conditions'
            && location.pathname !== '/contactus' && <BookingForm />}

          {IsLoggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: "50px" }}>

              {
                homepage && (

                  <Button
                    style={{
                      height: isMobile ? "30px" : "40px",
                      width: isMobile ? "40px" : "60px",
                      marginLeft: "10px",
                      marginRight: "-40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 10px",
                      borderRadius: "5px",
                      textTransform: "uppercase",
                      backgroundColor: "#e0e0f0",
                      boxShadow: "none",
                    }}
                    variant="contained"
                    onClick={handleLanguageDialogOpen}
                  >
                    {Flag ? (
                      <Flag
                        code={
                          language === "en" ? "GB" :
                            language === "es" ? "ES" :
                              language === "hi" ? "IN" : // Use the Indian flag for Hindi
                                language === "ta" ? "IN" : // Use the Indian flag for Tamil
                                  language === "te" ? "IN" : // Use the Indian flag for Telugu
                                    language === "fr" ? "FR" :
                                      language === "pr" ? "PR" :
                                        language === "kn" ? "IN" : // Use the Indian flag for Kannada
                                          language === "ml" ? "IN" : // Use the Indian flag for Malayalam
                                            ""
                        }
                        style={{
                          width: isMobile ? "20px" : "25px",
                          marginRight: "5px",
                        }}
                      />
                    ) : (
                      <span
                        role="img"
                        aria-label={
                          language === "en" ? "English Flag" :
                            language === "es" ? "Spanish Flag" :
                              language === "hi" ? "Indian Flag (Hindi)" :
                                language === "ta" ? "Indian Flag (Tamil)" :
                                  language === "te" ? "Indian Flag (Telugu)" :
                                    language === "fr" ? "French Flag" :
                                      language === "pr" ? "Portuguese Flag" :
                                        language === "kn" ? "Indian Flag (Kannada)" :
                                          language === "ml" ? "Indian Flag (Malayalam)" :
                                            ""
                        }
                        style={{
                          fontSize: isMobile ? "20px" : "25px",
                          marginRight: "5px",
                          color: "black",
                        }}
                      >
                        {language === "en" ? "🇬🇧" :
                          language === "es" ? "🇪🇸" :
                            language === "hi" || language === "ta" || language === "te" ? "🇮🇳" : // Indian flag for Hindi, Tamil, Telugu
                              language === "fr" ? "🇫🇷" :
                                language === "pr" ? "🇵🇹" :
                                  language === "kn" || language === "ml" ? "🇮🇳" : // Indian flag for Kannada, Malayalam
                                    ""}
                      </span>
                    )}

                    <span style={{ fontSize: isMobile ? "14px" : "16px", color: "#666666" }}>
                      {language === "en" ? "EN" :
                        language === "es" ? "ES" :
                          language === "hi" ? "HI" :
                            language === "ta" ? "TA" :
                              language === "te" ? "TE" :
                                language === "fr" ? "FR" :
                                  language === "pr" ? "PR" :
                                    language === "kn" ? "KN" :
                                      language === "ml" ? "ML" : ""}
                    </span>
                  </Button>

                )
              }







              <Box sx={{ alignItems: 'center' }}>
                <Avatar
                  sx={{
                    cursor: 'pointer',
                    marginRight: 4,
                    borderRadius: '5px',
                    height: isMobile ? '30px' : '40px',
                    width: isMobile ? '30px' : '40px',
                  }}
                  onClick={handleClick}
                  src={profile?.profile_pic || profileimg} // Ensure src is a string
                  alt="User Profile"
                />


              </Box>


              <Menu
                anchorEl={anchorEl}
                open={openmenu}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: { width: 200, marginTop: '10px' },
                }}

              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    // marginRight: "15px",
                    padding: "8px 16px",
                    borderBottom: "0.5px solid #d2d2d2"
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#3A0CA3",
                      fontSize: "18px",
                      textTransform: "capitalize",
                    }}
                  >
                    {username}
                  </Typography>
                  <Typography sx={{ color: "#7B7B7B" }}>{phoneNumber}</Typography>
                </div>

                <Divider  sx={{marginBottom:"5px"}}/>

                <MenuItem style={{ color: '#3E3E3E' }} onClick={handleProfile}>My Profile</MenuItem>
                <MenuItem style={{ color: '#3E3E3E' }} onClick={handlemybookings}>My Bookings</MenuItem>

                <MenuItem style={{ color: '#3E3E3E' }} onClick={handleClickOpen}>Logout</MenuItem>
              </Menu>

            </Box>

          ) : (
            <>

              <div style={{ display: 'flex', gap: "55px", }}>



                {
                  homepage && (
                    // <Button
                    //   style={{
                    //     height: isMobile ? "30px" : "40px",
                    //     width: isMobile ? "40px" : "60px",
                    //     marginLeft: "10px",
                    //     marginRight: "-40px",
                    //     display: "flex",
                    //     alignItems: "center",
                    //     justifyContent: "center",
                    //     padding: "0 10px",
                    //     borderRadius: "5px",
                    //     textTransform: "uppercase",
                    //     backgroundColor: "#e0e0f0",
                    //     boxShadow: "none"

                    //   }}
                    //   variant="contained"
                    //   onClick={handleLanguageDialogOpen}
                    // >
                    //   {Flag ? (
                    //     <Flag
                    //       code={language === "en" ? "GB" : "ES"}
                    //       style={{
                    //         width: isMobile ? "20px" : "25px",
                    //         marginRight: "5px",
                    //       }}
                    //     />
                    //   ) : (
                    //     <span
                    //       role="img"
                    //       aria-label={language === "en" ? "English Flag" : "Spanish Flag"}
                    //       style={{
                    //         fontSize: isMobile ? "20px" : "25px",
                    //         marginRight: "5px",
                    //         color: "black"
                    //       }}
                    //     >
                    //       {language === "en" ? "🇬🇧" : "🇪🇸"}
                    //     </span>
                    //   )}


                    //   <span style={{ fontSize: isMobile ? "14px" : "16px", color: "#666666" }}>
                    //     {language === "en" ? "EN" : "ES"}
                    //   </span>
                    // </Button>
                    <Button
                      style={{
                        height: isMobile ? "30px" : "40px",
                        width: isMobile ? "40px" : "60px",
                        marginLeft: "10px",
                        marginRight: "-40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 10px",
                        borderRadius: "5px",
                        textTransform: "uppercase",
                        backgroundColor: "#e0e0f0",
                        boxShadow: "none",
                      }}
                      variant="contained"
                      onClick={handleLanguageDialogOpen}
                    >
                      {Flag ? (
                        <Flag
                          code={
                            language === "en" ? "GB" :
                              language === "es" ? "ES" :
                                language === "hi" ? "IN" :
                                  language === "ta" ? "IN" :
                                    language === "te" ? "IN" :
                                      language === "fr" ? "FR" :
                                        language === "pr" ? "BR" :
                                          language === "kn" ? "IN" :
                                            language === "ml" ? "IN" :
                                              ""
                          }
                          style={{
                            width: isMobile ? "20px" : "25px",
                            marginRight: "5px",
                          }}
                        />
                      ) : (
                        <span
                          role="img"
                          aria-label={
                            language === "en" ? "English Flag" :
                              language === "es" ? "Spanish Flag" :
                                language === "hi" ? "Hindi Flag" :
                                  language === "ta" ? "Tamil Flag" :
                                    language === "te" ? "Telugu Flag" :
                                      language === "fr" ? "French Flag" :
                                        language === "pr" ? "Portuguese Flag" :
                                          language === "kn" ? "Kannada Flag" :
                                            language === "ml" ? "Malayalam Flag" :
                                              ""
                          }
                          style={{
                            fontSize: isMobile ? "20px" : "25px",
                            marginRight: "5px",
                            color: "black",
                          }}
                        >
                          {language === "en" ? "🇬🇧" :
                            language === "es" ? "🇪🇸" :
                              language === "hi" ? "🇮🇳" : // Use the Indian flag for Hindi
                                language === "tm" ? "🇮🇳" : // Use the Indian flag for Tamil
                                  language === "tl" ? "🇮🇳" : // Use the Indian flag for Telugu
                                    language === "fr" ? "🇫🇷" :
                                      language === "pr" ? "🇧🇷" :
                                        language === "kn" ? "🇮🇳" : // Use the Indian flag for Kannada 
                                          language === "ml" ? "🇮🇳" : // Use the Indian flag for Malayalam
                                            ""}
                        </span>
                      )}

                      <span style={{ fontSize: isMobile ? "14px" : "16px", color: "#666666" }}>
                        {language === "en" ? "EN" :
                          language === "es" ? "ES" :
                            language === "hi" ? "HI" :
                              language === "tm" ? "TA" :
                                language === "tm" ? "TE" :
                                  language === "fr" ? "FR" :
                                    language === "pr" ? "PR" :
                                      language === "kn" ? "KN" :
                                        language === "ml" ? "ML" :
                                          ""}
                      </span>
                    </Button>

                  )
                }




                <Avatar
                  sx={{ cursor: 'pointer', marginRight: 4, borderRadius: '5px', height: isMobile ? '30px' : '40px', width: isMobile ? '30px' : '40px' }}
                  onClick={() => setOtpOpenlog(true)}
                  src={profile?.profile_pic || profileimg}
                  alt="User Profile"

                />
              </div>

            </>
          )}
        </header>
      </nav>
      <Dialog
        open={otpOpenlog || showLoginForm}
        onClose={handleCloseLoginDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '8px',
            height: '300px',
            width: '100%',
            maxWidth: '500px'
          },
        }}
      >
        <DialogTitle style={{ height: '50px', borderBottom: '1px solid #e3e3e3' }}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>Login</Typography>
          <IconButton onClick={handleCloseLoginDialog} style={{ color: "#555" }}>
            <Cancel />
          </IconButton>
        </DialogTitle>

        <Dialog
          open={otpOpenlog || showLoginForm}
          onClose={handleCloseLoginDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            style: {
              borderRadius: '8px',
              height: isMobile ? '350px' : '300px',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '400px'

            },
          }}
        >
          <DialogTitle
            sx={{
              height: '50px',
              borderBottom: '1px solid #e3e3e3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {languageLabels?.navbar?.login || "Login"}
            </Typography>

            <IconButton onClick={handleCloseLoginDialog} sx={{ color: "#555" }}>
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent style={{ padding: "10px 20px", height: "500px", }}>
            <Typography variant="body1" style={{ marginTop: "15px", textAlign: "start" }}>
              {languageLabels?.navbar?.otpDescription || "OTP will be sent to your mobile WhatsApp number"}
            </Typography>

            <Grid container spacing={2} justifyContent="start" marginTop='20px'>
              <Grid item xs={12} sm={5}>
                <Autocomplete
                  options={countryCodeList}
                  getOptionLabel={(option) => `${option.country_name} (${option.country_code})`}
                  value={countryCodeList.find((country) => country.country_code === selectedCountryCode && country.region_code === selectedregioncode) || null}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setSelectedCountryCode(newValue.country_code);
                      setSelectedregioncode(newValue.region_code)
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" fullWidth size="small" />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={7}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={languageLabels?.navbar?.enterMobileNumber || "Enter mobile number"}
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  onBlur={handleBlur}
                  size="small"
                  inputProps={{
                    maxLength: 15,
                    pattern: "[0-9]{10,15}",
                  }}
                  error={touched && (mobileNumber.length < 10 || mobileNumber.length > 10)}
                  helperText={
                    touched && (mobileNumber.length !== 10)
                      ? languageLabels?.navbar?.mobileNumberMustBeBetween || "Mobile number must be 10 digits"
                      : ""
                  }

                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions style={{ display: "flex", justifyContent: isMobile ? "flex-end" : "center", paddingBottom: "20px", marginRight: isMobile ? "10px" : '0px' }}>
            <Button
              onClick={handleSendOtp}
              style={{
                backgroundColor: "#4361ee",
                color: "white",
                textTransform: "capitalize",
                padding: "10px 20px",
                borderRadius: "10px",
                width: "150px",
                opacity: 1,
                visibility: "visible",
                display: "block",
                transition: "background-color 0.3s ease-in-out"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#3a0ca3'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4361ee'}
            >
              {!loading && <span>{languageLabels?.navbar?.requestOtp || "Request OTP"}</span>}
              {loading && <CircularProgress style={{ color: "whitesmoke", width: "25px", height: "25px", fontSize: "12px", zIndex: 9999 }} />}

            </Button>

          </DialogActions>
        </Dialog>


      </Dialog>

      <Dialog open={otp} onClose={handleCloseOtpDialog}
        PaperProps={{ style: { borderRadius: "22px", width: "500px" } }}
      >
        <DialogTitle sx={{
          height: '50px',
          borderBottom: '1px solid #e3e3e3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>{languageLabels?.navbar?.login || "Login"}</Typography>
          <IconButton onClick={handleCloseOtpDialog} style={{ color: "#555" }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ height: isMobile ? "120px" : '150px', marginTop: "15px" }}>
          <Typography variant="body1">{languageLabels?.navbar?.enterOtp || "Enter OTP sent to your WhatsApp"}</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={languageLabels?.navbar?.otpPlaceholder || "Enter OTP"}
            sx={{ mt: 2 }}
            value={otpVal}  // Bind the state to the input value
            name="otpVal"
            onChange={handleOtpChange}  // Handle OTP input change with validation
            inputProps={{
              maxLength: 4,  // Ensure the field doesn't accept more than 4 characters
            }}
          />
        </DialogContent>
        <DialogActions style={{ display: "flex", justifyContent: "space-between", padding: "16px 20px", }}>
          <Button
            onClick={goBackToLogin}
            style={{
              color: "#666666",
              backgroundColor: "#FFFFFF",
              border: "none", // Remove border
              textTransform: 'capitalize'
            }}
            onMouseDown={(e) => (e.target.style.backgroundColor = "#C0C0C0")}
            onMouseUp={(e) => (e.target.style.backgroundColor = "#FFFFFF")}           >
            {languageLabels?.navbar?.back || "Back"}
          </Button>

          <div>

            <Typography sx={{ fontSize: "14px", fontWeight: "500", color: "#606060", marginBottom: "10px" }}>
              {isDisabled ? `Left (${timeLeft}s)` : ""}
            </Typography>
            <Button
              variant="contained"
              sx={{
                textTransform: 'capitalize',
                backgroundColor: '#4361ee',
                padding: "10px 20px",
                fontSize: "14px",
                "&:hover": { backgroundColor: "#4361ee" },
              }}
              onClick={isDisabled ? handleVerifyMobile : handleSendOtp}
            //   disabled={isDisabled} // Disable button during timer countdown
            >
              {isDisabled ? `Verify OTP` : "Re-send OTP"}
            </Button>
          </div>




        </DialogActions>



      </Dialog>

      <Drawer
        anchor="right"
        open={Open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 670 }, // 100% width for small screens, 670px for larger screens
            height: { xs: '100%', sm: 550 }, // Full height for small screens, 550px for larger screens
            position: "fixed",
            top: { xs: "5%", sm: "10%" }, // Reduced top margin for small screens
            left: { xs: 0, sm: "30%" }, // Full width on small screens
            transform: { xs: "none", sm: "translate(-50%, -50%)" }, // No transform for small screens
            borderRadius: 5,
            boxShadow: 5,
            p: isMobile ? 0 : 3,
          },
        }}
      >
        <Box sx={{ p: isMobile ? 2 : 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: 'center', marginBottom: isMobile ? "16px" : '0px', }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "18px", sm: "24px" }, // Smaller font size on small screens


              }}
            >
              {languageLabels?.navbar?.personalDetails || "Personal Details"}
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder={languageLabels?.navbar?.firstNamePlaceholder || "Enter first name"}
                name="first_name"
                value={regFormData.first_name}
                onChange={handleChange}
                required
                sx={{ height: isMobile ? "40px" : "50px" }}
                inputProps={{ style: { height: isMobile ? '16px' : "20px", padding: "12px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder={languageLabels?.navbar?.lastNamePlaceholder || "Enter last name"}
                name="last_name"
                value={regFormData.last_name}
                onChange={handleChange}
                required
                sx={{ height: isMobile ? "40px" : "50px" }}
                inputProps={{ style: { height: isMobile ? '16px' : "20px", padding: "12px" } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder={languageLabels?.navbar?.emailPlaceholder || "Enter email"}
                name="email"
                value={regFormData.email}
                onChange={handleChange}
                required
                sx={{ height: isMobile ? "40px" : "50px" }}
                inputProps={{ style: { height: isMobile ? '16px' : "20px", padding: "12px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ height: isMobile ? "40px" : "50px" }}>
                <InputLabel style={{ marginTop: "-6px" }}>{languageLabels?.navbar?.genderLabel || "Enter Gender"}</InputLabel>
                <Select
                  name="gender"
                  value={regFormData.gender}
                  // placeholder="Enter Gender"
                  onChange={handleChange}
                  required
                  sx={{ height: isMobile ? "40px" : "45px", }}
                  inputProps={{ style: { height: isMobile ? '16px' : "20px", padding: "2px", } }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 150, // Controls dropdown height

                      },
                    },
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}
            >
              <TextField
                fullWidth
                placeholder={languageLabels?.navbar?.pinCodePlaceholder || "Enter pin code"}
                name="pin_code"
                value={regFormData.pin_code}
                onChange={handleChange}
                onBlur={handlePincodeBlur}
                required
                sx={{ height: isMobile ? "40px" : "50px", }}
                inputProps={{ style: { height: isMobile ? '16px' : "20px", padding: "12px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder={languageLabels?.navbar?.cityPlaceholder || "Enter city"}
                name="city_name"
                value={regFormData.city_name}
                onChange={handleChange}
                disabled
                sx={{ height: isMobile ? "40px" : "50px" }}
                inputProps={{ style: { height: isMobile ? '16px' : "20px", padding: "12px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder={languageLabels?.navbar?.statePlaceholder || "Enter state"}
                name="state"
                value={regFormData.state}
                onChange={handleChange}
                disabled
                sx={{ height: isMobile ? "40px" : "50px" }}
                inputProps={{ style: { height: isMobile ? '16px' : "20px", padding: "12px" } }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder={languageLabels?.navbar?.countryPlaceholder || "Enter Country"}
                name="country"
                value={regFormData.country}
                onChange={handleChange}
                disabled
                sx={{ height: isMobile ? "40px" : "50px" }}
                inputProps={{ style: { height: isMobile ? '16px' : "20px", padding: "12px" } }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                placeholder={languageLabels?.navbar?.addressPlaceholder || "Enter address"}
                name="address"
                value={regFormData.address}
                onChange={handleChange}
                required
                sx={{ height: isMobile ? "40px" : "50px" }}
                inputProps={{ style: { height: isMobile ? '16px' : "20px", padding: "12px" } }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder={languageLabels?.navbar?.otpPlaceholder || "Enter OTP (Sent to your WhatsApp.)"}
                name="otp"
                value={regFormData.otp}
                onChange={handleChange}
                required
                sx={{ height: isMobile ? "40px" : "50px" }}
                inputProps={{ style: { height: isMobile ? '16px' : "20px", padding: "12px" } }}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: isMobile ? 'center' : "flex-end", gap: 3, mt: isMobile ? 5 : 3, mb: isMobile ? '40px' : '0px' }}>
            <Button
              onClick={goBackToLogin}
              sx={{ color: "#606060", fontSize: { xs: "14px", sm: "16px" }, textTransform: "capitalize" }}
            >
              {languageLabels?.navbar?.back || "Back"}
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4361ee",
                px: 4,
                fontSize: { xs: "14px", sm: "16px" },
                textTransform: "capitalize",
              }}
              onClick={handlesubmitnewuser}
            >
              Submit
              {loading && (
                <CircularProgress
                  style={{
                    color: "whitesmoke",
                    width: "25px",
                    height: "25px",
                    fontSize: "12px",
                    zIndex: 9999,
                  }}
                />
              )}
            </Button>
          </Box>
        </Box>
      </Drawer>



      <Dialog open={openLogout} onClose={handleCloseDialog}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle>{languageLabels?.navbar?.logout || "Log Out"}</DialogTitle>
          <CloseIcon
            style={{ cursor: "pointer", marginRight: '20px' }}
            onClick={handleCloseDialog}  // Close the dialog when clicked
          />
        </Box>

        <DialogTitle style={{ color: "#3E3E3E", fontWeight: 400 }}>{languageLabels?.navbar?.logoutConfirmationTitle || "Are you sure you want to logout?"}</DialogTitle>

        <DialogActions style={{ padding: '10px 24px', justifyContent: "space-between" }}>
          <Button onClick={handleCloseDialog} style={{ textTransform: 'capitalize', color: '#666666' }}>
            {languageLabels?.navbar?.cancel || "Cancel"}
          </Button>
          <Button onClick={handleLogout} variant="contained" style={{ textTransform: 'capitalize', backgroundColor: "#4361ee" }}>
            {languageLabels?.navbar?.confirmLogout || "Confirm Logout"}
          </Button>
        </DialogActions>
      </Dialog>

    </>

  );
};




export default NavbarHeader;

