import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  CardContent,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,

  FormControlLabel,
  IconButton,

  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import {
  Button,

} from "react-bootstrap";

import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import EuroIcon from "@mui/icons-material/Euro"; // EUR
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // General Money icon (can be used for multiple)
import {
  ArrowForward,
  Pending,

} from "@mui/icons-material";
import { useBooking } from "../Home/BookingContext";
import "./BookingCart.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// import { getUserToken } from "../../components/Storage/localStorageService";
import { FaReceipt } from "react-icons/fa";
import config from "../../config";
import Noresult from "../../assets/Noresult.png";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { getUserToken } from "../../components/Storage/localStorageService";
import { GoogleMap } from "@react-google-maps/api";

import TermsOfService from '../Home/TermsOfService'
const LOCAL_STORAGE_KEY = "userData"; // Adjust this based on your actual key

const API_BASE_URL = `${config.BASE_URL}`;

const API_URL = API_BASE_URL + "/listing/property/availability";

const getDefaultDates = () => {
  const today = new Date();
  const checkIn = today.toISOString().split("T")[0];
  const checkOut = new Date(today.setDate(today.getDate() + 2))
    .toISOString()
    .split("T")[0];
  return { checkIn, checkOut };
};




const BookingCart = () => {
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false);
  const token = getUserToken()
  const { setSubmittedBooking, setShowFormInHeader, setLanguageLabels, languageLabels } = useBooking();

  const handleCheckboxChange = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  const handleTermsClick = () => {
    setIsTermsDialogOpen(true);
    setIsDialogOpen(true)
  };

  const handleCloseDialog = () => {
    setIsTermsDialogOpen(false);
  };
  const { IsLoggedIn, setIsLoggedIn } = useBooking();
  const { showLoginForm, setShowLoginForm } = useBooking();
  const { property_id } = useParams();
  const location = useLocation();
  const { city, guests, fromDate, toDate } = location.state || {};
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [sections, setSections] = useState([]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };
  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };


  const [propertydetails, setpropertydetails] = useState([]);
  const [allAmenities, setAllAmenities] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [baccommodations, setBaccommodations] = useState([]);
  const [selectedAccommodations, setSelectedAccommodations] = useState({});
  const [selectedAccommodationIds, setSelectedAccommodationIds] = useState([]); // NEW ARRAY FOR IDs
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const [guestDetails, setGuestDetails] = useState({
    place: "Ooty",
    guests: 1,
    ...getDefaultDates(),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [reviews, setReviews] = useState([]);
  const [openMapDialog, setOpenMapDialog] = useState(false);
  const [mapLocation, setMapLocation] = useState("");
  const LOCAL_STORAGE_KEY = "user";
  const [nearestplaces, setnearestplaces] = useState([]);
  const couponOptions = ["SAVE10", "WELCOME20", "FESTIVE30"]; // Example coupons
  const [coupons, setCoupons] = useState([]);

  const vefitymobile = sessionStorage.getItem(
    "verifiedMobileNumber",
    mobileNumber
  );
  const [Open, setOpen] = useState();




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
    otp: "",
  });

  const doLogin = () => {
    setShowLoginForm(true);
  };
  const otpRefs = useRef([]);
  const [user, setUser] = useState(null);
  const { currencyType } = useBooking();
  const { currencySize } = useState("10px")
  const renderCurrencyIcon = () => {
    switch (currencyType) {
      case "INR":
        return '₹'
      case "USD":
        return '$';
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

  // const fetchCustomerDetails = async () => {
  //   const verifiedMobileNumber = sessionStorage.getItem("verifiedMobileNumber");

  //   if (!verifiedMobileNumber && formData.mobile) {
  //     sessionStorage.setItem("verifiedMobileNumber", formData.mobile);
  //   }

  //   const mobileToUse =
  //     sessionStorage.getItem("verifiedMobileNumber") || formData.mobile;

  //   if (!mobileToUse) {
  //     toast.error("No Valid Details to fetch user details.", {
  //       position: "top-right",
  //       hideProgressBar: true,
  //     });
  //     return;
  //   }

  //   if (loading)
  //     return
  //   setLoading(true);
  //   try {
  //     const PHOTOS = API_BASE_URL + `/BookingUsers/get/${mobileToUse}`;
  //     console.log(PHOTOS);

  //     const response = await fetch(PHOTOS, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       toast.error(
  //         `Failed to fetch customer details: ${response.statusText}`,
  //         {
  //           position: "top-right",
  //           hideProgressBar: true,
  //         }
  //       );
  //       return;
  //     }

  //     const data = await response.json();
  //     setUser(data);
  //     // setIsLoggedIn(true);
  //   } catch (error) {
  //     console.error("Error fetching customer details:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (mobileNumber) {
      setFormData((prevData) => ({
        ...prevData,
        mobile: mobileNumber,
      }));
    }
  }, [mobileNumber]);

  // const username = user ? `${user.first_name} ${user.last_name}` : "Guest";
  // const phoneNumber = user?.mobile || "Not Provided";
  // const firstChar = username.charAt(0).toUpperCase();

  const fetchData = async (property_id) => {

    try {
      const response = await fetch(API_BASE_URL + `/listing/property/details?property_id=${property_id}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setpropertydetails(data);
      if (data?.nearest_places && Array.isArray(data.nearest_places)) {
        setnearestplaces(data.nearest_places);  // Safely set nearest_places
      } else {
        console.error('nearest_places is missing or not an array');
      }
      console.log(data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };

  useEffect(() => {
    if (property_id) {
      fetchData(property_id);
    }
  }, [property_id]);


  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await fetch(
          API_BASE_URL + `/property/getAllPropertyAmenities/${property_id}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAllAmenities(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };

    fetchAmenities();
  }, []);

  const [isExpandedfullroom, setIsExpandedfullroom] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // const [isexpand, setisexpang] = useState(false);






  const maxLength = 100;
  const shortDescription = (propertydetails?.description || "").substring(0, maxLength); // Safely handle undefined
  const fullDescription = propertydetails?.description || "";

  // const toggleText = () => {
  //   setIsExpandedfullroom(!isExpandedfullroom);
  // };

  const maxLengthFullscreen = 200;

  const shortDescriptionFullscreen = (propertydetails?.description || "").substring(0, maxLengthFullscreen);
  const fullDescriptionFullscreen = propertydetails?.description || "";

  const toggleTextFullscreen = () => {
    setIsExpanded(!isExpanded);
  };

  const [isExpandedFullroom, setIsExpandedFullroom] = useState(
    new Array(nearestplaces.length).fill(false) // Initialize with false for each place
  );
  const maxLengthFullplaces = 300;
  const toggleReadMoreplaces = (index) => {
    const newExpandedState = [...isExpandedFullroom];
    newExpandedState[index] = !newExpandedState[index]; // Toggle the specific index
    setIsExpandedFullroom(newExpandedState);
  };

  const toggleReadMore = () => {
    setIsExpandedfullroom(!isExpandedfullroom);
  };





  const fetchRoomDetails = async (property_id) => {

    try {
      const PHOTOS =
        API_BASE_URL + `/property/getpropertyimage?property_id=${property_id}`;
      const response = await fetch(PHOTOS, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch room details: ${response.statusText}`);
        return;
      }

      const data = await response.json();

      setSections(data);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }

  };

  const onConfirmBooking = () => {
    if (!isTermsChecked || reservedFor >= guests) {
      toast.error("Please agree to the terms and conditions and check the number of guests.");
      return; // Prevent the booking action if conditions are not met
    }

    console.log('Booking confirmed!');
  };

  useEffect(() => {
    if (property_id) {
      fetchRoomDetails(property_id);
    }
  }, [property_id]);

  const userlogin = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (userlogin) {
    const parsedUser = JSON.parse(userlogin); // Convert the string to an object
    const bookUserId = parsedUser.book_user_id; // Access the book_user_id
  } else {
    console.log("User login data not found");
  }

  const fetchAccommodations = async () => {
    // const { checkIn, checkOut } = guestDetails;
    try {
      // if(loading) 
      // return 
      setLoading(true);
      const response = await axios.get(
        `${API_URL}?property_id=${property_id}&from_date=${fromDate}&to_date=${toDate}&guest_count=${guests}`
      );
      setAccommodations(response.data);
      setReservedFor(0)
      setSelectedAccommodations({});
      setSelectedAccommodationIds([]);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch accommodations");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const calculateNights = () => {
    const { checkIn, checkOut } = guestDetails;
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      return Math.max(Math.ceil((end - start) / (1000 * 60 * 60 * 24)), 1);
    }
    return 1;
  };

  // const nights = calculateNights();
  // const serviceCost = 300;

  const handleGuestChange = (e) => {
    const { name, value } = e.target;
    if (name === "checkIn" || name === "checkOut") {
      const today = new Date().toISOString().split("T")[0];
      if (new Date(value) < new Date(today)) return;
      toast("Cannot select past dates.");
    }
    setGuestDetails({ ...guestDetails, [name]: value });
    if (name === "checkIn" || name === "checkOut") {
      setTimeout(fetchAccommodations, 300);
    }
  };

  const [reservedFor, setReservedFor] = useState(0);


  const handleAdd = (acc) => {
    setSelectedAccommodations({
      ...selectedAccommodations,
      [acc.accommodation_id]: { ...acc, count: 1 },
    });
    setSelectedAccommodationIds([
      ...selectedAccommodationIds,
      acc.accommodation_id,
    ]);
    updateGuestReservationCount(acc.occupancy_limit)
  };

  const handleIncrement = (id) => {
    setSelectedAccommodations((prev) => {
      const item = prev[id];

      if (item && item.count < item.available_limit) {
        updateGuestReservationCount(item.occupancy_limit)
        return {
          ...prev,
          [id]: { ...item, count: item.count + 1 },
        };
      }
      return prev;
    });

    setSelectedAccommodationIds((prevIds) => {
      const currentCount = prevIds.filter((accId) => accId === id).length;

      if (currentCount < selectedAccommodations[id].available_limit) {
        return [...prevIds, id];
      }
      return prevIds;
    });
  };

  const handleDecrement = (id) => {
    setSelectedAccommodations((prev) => {
      const item = prev[id];

      if (item.count > 1) {
        setReservedFor(reservedFor - item.occupancy_limit)

        return {
          ...prev,
          [id]: { ...item, count: item.count - 1 },
        };
      } else {
        updateGuestReservationCount(-item.occupancy_limit)
        const { [id]: _, ...newAccommodations } = prev;
        return newAccommodations;
      }
    });

    setSelectedAccommodationIds((prevIds) => {
      const indexToRemove = prevIds.indexOf(id);

      if (indexToRemove !== -1) {
        const updatedIds = [...prevIds];
        updatedIds.splice(indexToRemove, 1); // Remove only one occurrence
        return updatedIds;
      }

      return prevIds; // If ID not found, return unchanged
    });
  };

  const updateGuestReservationCount = async (val) => {
    setReservedFor(reservedFor + val)
  };

  const [showBreakup, setShowBreakup] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const fetchCalculatedCost = async () => {
    if (
      !fromDate ||
      !toDate ||
      Object.values(selectedAccommodationIds).length === 0
    )
      return;

    const accommodationIds = Object.values(selectedAccommodationIds);

    try {
      const fetchBookingData = async () => {
        try {
          const response = await axios.post(
            API_BASE_URL + "/listing/calculate_cost",
            { accommodation_ids: accommodationIds },
            {
              params: {
                from_date: fromDate,
                to_date: toDate,
                count: guests,
              },
              headers: { accept: "application/json" },
            }
          );

          setBookingData(response.data);
          setBaccommodations(response.data.Accommodations || []);
          // setCalculatedCost(response.data);
        } catch (error) {
          console.error("Error fetching booking data:", error);
        }
      };
      fetchBookingData();
    } catch (error) {
      toast.error("Error fetching calculated cost:", error, {
        position: "top-right",
        hideProgressBar: true,
      });
    }
  };


  const fetchCalculatedCostCouponData = async () => {
    if (!fromDate || !toDate || Object.values(selectedAccommodationIds).length === 0)
      return;

    const accommodationIds = Object.values(selectedAccommodationIds);

    try {
      const fetchBookingData = async () => {
        try {
          const response = await axios.post(
            API_BASE_URL + "/listing/calculate_cost",
            { accommodation_ids: accommodationIds },
            {
              params: {
                from_date: fromDate,
                to_date: toDate,
                count: guests,
                coupon_code: couponCode,
              },
              headers: { accept: "application/json" },
            }
          );

          setBookingData(response.data);
          setBaccommodations(response.data.Accommodations || []);
          // setCalculatedCost(response.data);
        } catch (error) {
          if (error.response) {
            // If the error is from the response (i.e., server returned an error)
            const errorMessage = error.response.data?.detail || "Error Coupon Not Exist Or Expired";
            toast.error(errorMessage, {
              position: "bottom-left",
              hideProgressBar: true,
            });
          } else if (error.request) {
            // If no response was received (network error)
            toast.error("Network error, please try again later.", {
              position: "bottom-left",
              hideProgressBar: true,
            });
          } else {
            // For any other error
            toast.error(error.detail || "An unexpected error occurred", {
              position: "bottom-left",
              hideProgressBar: true,
            });
          }
          setCouponCode("");
        }
      };

      fetchBookingData();
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data?.detail || "Error Coupon Not Exist Or Expired";
        toast.error(errorMessage, {
          position: "bottom-left",
          hideProgressBar: true,
        });
      } else if (error.request) {
        toast.error("Network error, please try again later.", {
          position: "bottom-left",
          hideProgressBar: true,
        });
      } else {
        toast.error(error.detail || "An unexpected error occurred", {
          position: "bottom-left",
          hideProgressBar: true,
        });
      }
      setCouponCode("");
    }
  };


  useEffect(() => {
    fetchCalculatedCost();
  }, [fromDate, toDate, guests, selectedAccommodationIds]);


  const handleProceedToPay = async () => {
    const accommodationIds = Object.values(selectedAccommodationIds);
    const bookingData1 = {
      property_id: property_id,
      checkin_date: fromDate,
      checkout_date: toDate,
      // checkin_time: checkinTime,
      total_guests: guests,
      no_of_kids: 0,
      booking_source: "Nivasa",
      booking_commission: bookingData.Payable_Amount,
      count_of_accommodation: 1,
      accommodation_ids: accommodationIds,

      paid_amount: bookingData.Payable_Amount,
    };

    const userlogin = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!userlogin) {
      toast.info("User is not logged in!", {
        position: "top-right",
        hideProgressBar: true,
      });
      return;
    }

    const parsedUser = JSON.parse(userlogin);
    const bookUserId = parsedUser.book_user_id;

    try {
      const BOOK = API_BASE_URL + `/BookingUsers/createBooking/${bookUserId}`;
      console.log("Booking API URL:", BOOK);

      const token = getUserToken(); // ✅ Retrieve token

      if (!token) {
        console.error("No Token Found!");
        toast.error("Session expired. Please log in again.", {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 3000,
        });
        return;
      }
      setLoading(true)

      try {
        const response = await axios.post(BOOK, bookingData1, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });


        if (response.data.detail) {
          setLoading(false)

          toast.error(`${response.data.detail}`, {
            position: "top-right",
            hideProgressBar: true,
            autoClose: 3000,
          });
        } else if (response.status === 200 || response.status === 201) {
          setLoading(false)

          localStorage.setItem("BookingId", response.data["Booking Id"]);
          localStorage.setItem("TransactionId", response.data["TransactionId"]);


          handlePayment(response.data["TransactionId"]);
        } else {
          toast.error("Unexpected error occurred, please try again.", {
            position: "bottom-left",
            hideProgressBar: true,
            autoClose: 3000,
          });
        }
      } catch (error) {
        setLoading(false)

        if (error.response) {
          console.error(
            "API Error:",
            error.response.status,
            error.response.data
          );
          toast.error(
            `Booking failed: ${error.response.data.detail || "Unknown error"}`,
            {
              position: "bottom-left",
              hideProgressBar: true,
              autoClose: 3000,
            }
          );
        } else {
          console.error("Error making booking:", error);
          toast.error("Network error. Please try again.", {
            position: "bottom-left",
            hideProgressBar: true,
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error(`An error occurred: ${error.detail || "Unknown error"}`, {
        position: "bottom-left",
        hideProgressBar: true,
        autoClose: 3000,
      });
    }
  };

  const doPaymentSuccessFailure = async (orderId) => {

    const status = "Success";

    const token = getUserToken(); // ✅ Retrieve token
    console.log(token);

    if (!token) {
      console.error("No Token Found!");
      toast.error("Session expired. Please log in again.", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 3000,
      });
      return;
    }
    // Construct API URL
    setLoading(true)

    const apiUrl =
      API_BASE_URL +
      `/BookingUsers/ConfirmBookingPayment/${orderId}?status=${status}`;

    try {
      const res = await axios.post(
        apiUrl,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Correctly placed
          },
        }
      );

      if (res.status === 200 && status === "Success") {
        setLoading(false)

        navigate("/"); // Navigate on success
        //  toast.success("Booking Success");
        toast.success("Booking Success", {
          position: "bottom-left",
          hideProgressBar: true,
          autoClose: false,
        });
      } else if (res.status === 200 && status === "Failed") {
        setLoading(false)

        toast.error("Booking Failed", {
          position: "bottom-left",
          hideProgressBar: true,
          autoClose: false,
        });
      }
    } catch (err) {
      setLoading(false)

      toast.error("Booking Failed", {
        position: "bottom-left",
        hideProgressBar: true,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShowOnMapClick = (location) => {
    if (location) {
      const [latitude, longitude] = location.split(",");
      setMapLocation(
        `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`
      );
      setOpenMapDialog(true);
    } else {
      toast("Location not available");
    }
  };

  const [openReviews, setOpenReviews] = useState(false);
  const handleDialogOpen = (property_id) => {
    fetchReviews(property_id);
    setOpenReviews(true);
  };
  const handleDialogClose = () => setOpenReviews(false);

  const fetchReviews = async (property_id) => {
    try {
      const response = await fetch(
        API_BASE_URL +
        `/customerreview/getAllReviews/${propertydetails.property_id}`,
        { method: "GET", headers: { accept: "application/json" } }
      );
      if (response.ok) {
        const data = await response.json();

        setReviews(data.reviews || []);
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const {
    Total_Rooms_Cost = 0,
    Total_GST_Cost = 0,
    Total_Booking_Cost = 0,
    Payable_Amount = 0,
    Pending_Amount = 0,
  } = bookingData || {};

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);



  const fetchCoupons = async () => {
    let userlogin;

    try {
      userlogin = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!userlogin) {
        console.error("User data not found in localStorage");
        return;
      }
    } catch (e) {
      console.error("Error reading from localStorage:", e);
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
      console.error("User token is invalid or expired.");
      return;
    }

    const token = getUserToken();

    setLoading(true);
    try {
      const response = await axios.get(
        `${config.BASE_URL}/Coupons/getAllUser_Coupons?book_user_id=${bookUserId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      setCoupons(response.data || []);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCouponApply = () => {
    fetchCalculatedCostCouponData();
    // setIsCouponApplied(true);
    setLoading(false);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // const [paymentData, setPaymentData] = useState(null);

  const handlePayment = async (orderId) => {

    const parsedUser = JSON.parse(userlogin);
    const bookUserId = parsedUser.book_user_id;
    try {
      const options = {
        key: config.RAZOR_PAY_KEY,
        // amount: bookingData?.Payable_Amount,
        currency: "INR",
        order_id: orderId,
        handler: function (response) {
          console.log("Payment Successful!", response);
          setLoading(false)
          doPaymentSuccessFailure(orderId);
        },
        prefill: {
          name: parsedUser.first_name + " " + parsedUser.last_name,
          email: parsedUser.email,
          contact: parsedUser.mobile,
        },
        theme: {
          color: "#F37254",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      toast.error("Error : " + err);
    }
  };

  const MaxOccupancyText = ({ acc }) => (
    <Typography
      style={{
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontSize: "14px",
        color: "#717171",
        paddingLeft: isMobile ? '12px' : '0px',
        fontWeight: 600,
        textOverflow: "ellipsis", // Add text ellipsis if text overflows
        whiteSpace: "nowrap", // Prevent text from wrapping
        overflow: "hidden",


      }}
    >
      {languageLabels?.bookingcart?.Max || "Max"}

      {acc.occupancy_limit === 1
        ? (languageLabels?.bookingcart?.Person || "Person")
        : (languageLabels?.bookingcart?.Persons || "Persons")}
      / {acc.stay_type}: {acc.occupancy_limit}
    </Typography>
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialogterm = () => setIsDialogOpen(true);
  const handleCloseDialogterm = () => setIsDialogOpen(false);

  const renderTermsAndBookingUI = (onConfirmBooking) => {
    return (
      <div>
        <div style={{ marginBottom: "0px", padding: '14px 0px 0px 0px' }}>
          <input
            type="checkbox"
            id="agreeCheckbox"
            checked={isTermsChecked}
            onChange={handleCheckboxChange}
            style={{
              transform: "scale(1.5)", // Increases the size by 1.5 times
              marginTop: "15px",
              marginRight: "10px",
              marginLeft: isMobile ? '20px' : '0px'
            }}
          />

          <label
            htmlFor="agreeCheckbox"
            style={{ marginLeft: "5px", cursor: "pointer", fontSize: '14px' }}
            onClick={handleTermsClick}
          >
            {languageLabels?.bookingcart?.Agree || " Agree for Terms & Conditions / Policies"}
          </label>
        </div>

        {isTermsDialogOpen && (

          <Dialog open={isTermsDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogContent style={{ padding: "10px" }} >
              <TermsOfService />
            </DialogContent>

            <DialogActions style={{ display: "flex", justifyContent: "flex-end", gap: "30px" }}>
              <button
                onClick={handleCloseDialog}
                style={{
                  backgroundColor: "#4361ee",
                  color: "#fff",
                  borderRadius: "6px",
                  padding: "5px 20px",
                  fontWeight: "700",
                  height: "35px",
                }}
              >
                {languageLabels?.bookingcart?.close || "Close"}
              </button>
              <div style={{ marginRight: "40px" }} >


                <input
                  type="checkbox"
                  id="agreeCheckbox"
                  checked={isTermsChecked}
                  onChange={handleCheckboxChange}
                  style={{
                    transform: "scale(1.5)",
                    marginTop: "15px",
                  }}
                />
                <label
                  htmlFor="agreeCheckbox"
                  style={{ marginLeft: "5px", cursor: "pointer", fontSize: '14px' }}
                  onClick={handleTermsClick}
                >
                  Agree
                </label>
              </div>

            </DialogActions>
          </Dialog>
        )}



        <div style={{ alignItems: 'center', textAlign: 'center' }}>
          <button
            style={{
              width: "350PX",
              backgroundColor: !isTermsChecked ? '#d3d3d3' : '#4361ee',
              cursor: !isTermsChecked ? 'not-allowed' : 'pointer',
              color: "#fff",
              height: "50px",
              borderRadius: "10px",
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: '0px 8px 16px   #b9b9b9',
              marginTop: "55px"

            }}
            onClick={onConfirmBooking}
            disabled={!isTermsChecked && reservedFor >= guests}
          >
            {languageLabels?.bookingcart?.confirmBooking || "Confirm Booking"}
            {loading && <CircularProgress style={{ color: "whitesmoke", width: "25px", height: "25px", fontSize: "12px", zIndex: 9999 }} />}

          </button>

        </div>

      </div>
    );
  };


  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          alignItems: "center",
          minHeight: "100%",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: isMobile ? "10px 15px 0px 0px" : "10px",
        justifyContent: "space-between",
        position: "sticky",
      }}
    >

      {
        !isMobile ?
          <div
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "500",
              color: "#9C9C9C",
              position: "sticky",
              top: "79px",
              backgroundColor: "white",
              backgroundSize: "cover",
              padding: "4px 23px 20px 20px",



              zIndex: 1000,
            }}
          >
            {languageLabels?.bookingcart?.Home || "Home"}{" "}
            <span>
              <ArrowForward style={{ fontSize: "20px" }} />
            </span>{" "}
            <IconButton
              onClick={() => navigate(-1)}
              style={{ fontSize: "16px", fontWeight: "500", color: "#9C9C9C" }}
            >
              {" "}
              {propertydetails.city}
            </IconButton>{" "}
            <span>
              <ArrowForward style={{ fontSize: "20px" }} />
            </span>{" "}
            <span
              style={{
                color: "#424242",
                fontFamily: "Poppins, sans-serif",
                fontSipxze: "16px",
                fontWeight: "400",
              }}
            >
              {" "}
              {propertydetails.name}{" "}
            </span>
          </div>
          :
          <>
          </>

      }


      <div
        style={{
          display: isMobile ? 'inline-block' : "flex",
          padding: isMobile ? "0px" : "10px",
          marginLeft: "15px",
          justifyContent: "space-between",
          gap: "30px",
          // marginTop: "-15px",
        }}
      >
        <div style={{ flex: 1, display: isMobile ? 'inline-block' : "flex", justifyContent: "space-between" }} >

          {
            !isMobile ?
              <div style={{ width: "250px", position: "sticky", top: "150px" }}>


                <div>
                  <Typography
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                      fontWeight: "bold",
                      margin: "4px 0px 10px 0px",
                    }}
                  >
                    {languageLabels?.bookingcart?.propertyGallery || "Property Gallery"}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      position: "relative",
                    }}
                  >
                    {sections.length > 0 ? (
                      sections.slice(0, 3).map((imagePath, index) => (
                        <div
                          key={index}
                          style={{
                            position: "relative",
                            cursor: index === 2 ? "pointer" : "default",
                          }}
                          onClick={index === 2 ? openModal : null}
                        >
                          <img
                            src={imagePath?.image_path}
                            alt={`Gallery Image ${index}`}
                            style={{
                              height: "152px",
                              borderRadius: "10px",
                              width: "100%",
                              opacity: index === 2 ? 0.8 : 1,
                            }}
                          />
                          {index === 2 && (
                            <div
                              style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(0, 0, 0, 0.4)",
                                borderRadius: "10px",
                              }}
                            >
                              <Typography
                                style={{
                                  fontWeight: "600",
                                  fontSize: "16px",
                                  color: "white",
                                  backgroundColor: "rgba(0,0,0,0.6)",
                                  padding: "8px 12px",
                                  borderRadius: "5px",
                                }}
                              >
                                {languageLabels?.bookingcart?.viewAll || "View All"}
                              </Typography>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <Typography
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#07799f",
                        }}
                      >
                        {languageLabels?.bookingcart?.noDataFound || " No Data Found"}
                      </Typography>
                    )}
                  </div>
                </div>


                <div>
                  <Typography
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      fontFamily: "Poppins, sans-serif",
                      margin: "12px 0px 10px 0px",
                    }}
                  >
                    {languageLabels?.bookingcart?.amenities || "Amenities"}
                  </Typography>
                  {allAmenities.length > 0 ? (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {allAmenities.slice(0, 5).map((amenity, index) => (
                        <li
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "8px",
                          }}
                        >
                          {/* <CheckIcon
                            style={{ color: "#07799F", marginRight: "10px" }}
                          /> */}
                          <Avatar
                            style={{ height: "24px", width: "24px" }}
                            src={amenity.amenity_path || <CheckIcon />}
                          />

                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              marginLeft: "8px",
                              fontFamily: "Plus Jakarta Sans, sans-serif",
                            }}
                          >
                            {amenity.amenity_name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#07799f",
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                      }}
                    >
                      {languageLabels?.bookingcart?.noDataFound || " No Data Found"}
                    </Typography>
                  )}
                </div>

              </div>
              :
              <div style={{ padding: "0px 0px 0px 0px" }}>
                <div style={{ marginTop: "20px" }}>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "space-between",

                    }}
                  >
                    <Typography
                      style={{
                        color: "#4361EE",
                        fontSize: "20px",
                        fontWeight: "700",
                        textTransform: "capitalize",
                        // fontFamily: "Plus Jakarta Sans",
                      }}
                    >
                      {propertydetails.name},{propertydetails.city}
                    </Typography>
                  </div>

                  <p
                    style={{
                      color: "#717171",
                      marginTop: "-4px",
                      fontSize: '16px',
                      marginBottom: "0px",
                      display: 'flex',
                      alignItems: 'center'

                    }}
                  >

                    <ul style={{ marginBottom: "10px", marginLeft: "-30px", }}>
                      {nearestplaces.map((place, index) => {
                        const shortDescription = (place[1] || "").substring(0, maxLengthFullplaces);
                        const isExpanded = isExpandedFullroom[index];
                        const shouldShowReadMore = (place[1] || "").length > maxLengthFullplaces; // Check if description exceeds maxLengthFullplaces

                        return (
                          <li key={index} style={{ display: 'flex', flexDirection: 'row', marginBottom: '0px' }}>
                            <span>
                              {languageLabels?.bookingcart?.Nearby || "Nearby"}
                            </span>

                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: "0px" }}>
                              <span
                                style={{
                                  color: "#2e2e2e",
                                  display: "inline-block",
                                  overflow: "hidden",
                                  whiteSpace: isExpanded ? 'normal' : 'nowrap', // Allow wrapping when expanded
                                  textOverflow: 'ellipsis',
                                  maxWidth: isExpanded ? 'none' : '150px', // Limit width when collapsed
                                  cursor: 'pointer',
                                }}
                                className="place-text"
                                title={place[1]} // Show full text in tooltip on hover
                                onMouseEnter={(e) => e.target.style.whiteSpace = 'normal'} // Allow wrapping on hover
                                onMouseLeave={(e) => e.target.style.whiteSpace = isExpanded ? 'normal' : 'nowrap'} // Return to original state when mouse leaves
                              >
                                {isExpanded ? place[1] : shortDescription} {place[1].length > 25 && !isExpanded && '...'}
                              </span>

                              {shouldShowReadMore && (
                                <button
                                  onClick={() => toggleReadMoreplaces(index)}
                                  style={{
                                    marginTop: '-10px', // Spacing between description and button
                                    cursor: 'pointer',
                                    background: 'none',
                                    border: 'none',
                                    color: '#007BFF',
                                    textDecoration: 'none',
                                  }}
                                >
                                  {isExpanded ? 'Read less' : '...Read more'}
                                </button>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>


                    <li style={{ color: "#898989", marginLeft: "10px" }}></li>
                    <button
                      href="#map"
                      style={{
                        color: "#4361ee",
                        border: "none",
                        background: "none",
                        marginTop: "-3px",
                        marginLeft: "-12px",
                        textDecoration: "underline",
                        fontSize: '14px'
                      }}
                      onClick={() => handleShowOnMapClick(propertydetails.location)}
                    >

                      {languageLabels?.bookingcart?.showonmap || "Show On Map"}
                    </button>
                  </p>


                </div>


                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    overflowX: "auto",
                    paddingBottom: "10px",
                    scrollBehavior: "smooth",
                    flexWrap: "nowrap",
                    width: "330px",
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: '8px'
                  }}
                >
                  {sections.length > 0 ? (
                    sections.slice(0, 3).map((imagePath, index) => (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          cursor: index === 2 ? "pointer" : "default",
                          flexShrink: 0, // Prevent image from shrinking
                          width: "236px", // Fixed width for each image
                          height: "152px"
                        }}
                        onClick={index === 2 ? openModal : null}
                      >
                        <img
                          src={imagePath?.image_path}
                          alt={`Gallery Image ${index}`}
                          style={{
                            height: "152px",
                            width: "100%",
                            // borderRadius: "10px",
                            opacity: index === 2 ? 0.8 : 1,
                          }}
                        />
                        {index === 2 && (
                          <div
                            style={{
                              position: "absolute",
                              top: "0",
                              left: "0",
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "rgba(0, 0, 0, 0.4)",
                              borderRadius: "10px",
                            }}
                          >

                          </div>
                        )}
                      </div>
                    ))



                  )




                    : (
                      <Typography
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#07799f",
                        }}
                      >
                        {languageLabels?.bookingcart?.noDataFound || " No Data Found"}
                      </Typography>
                    )}
                </div>



                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#2E2E2E",
                      margin: "12px 0px 0px 0px",
                    }}
                  >
                    {isExpandedfullroom ? fullDescription : shortDescription}
                    {fullDescription.length > maxLength && (
                      <span
                        onClick={toggleReadMore}
                        style={{
                          color: "#4361ee",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        {isExpandedfullroom ? 'Read Less' : '...Read More'}
                      </span>
                    )}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "3px", justifyContent: 'space-between', marginBottom: "10px" }}>
                  <div style={{ display: "flex", gap: '10px' }}>

                    <Typography>
                      <span style={{ color: "#717171", fontSize: "14px" }}>
                        {languageLabels?.bookingcart?.checkinTime || "Checkin Time"}:
                      </span>
                      <span style={{ color: "#3a3a3a", fontSize: "14px", fontWeight: "600" }}>
                        {propertydetails.checkin_time?.split(":").slice(0, 2).join(":")}
                      </span>
                    </Typography>

                    <Typography>
                      <span style={{ color: "#717171", fontSize: "14px" }}>
                        {languageLabels?.bookingcart?.checkoutTime || "Checkout Time"}:
                      </span>
                      <span style={{ color: "#3a3a3a", fontSize: "14px", fontWeight: "600" }}>
                        {propertydetails.checkout_time?.split(":").slice(0, 2).join(":")}
                      </span>
                    </Typography>

                  </div>

                </div>






                <Typography style={{ fontSize: "16px", fontWeight: '700', padding: '0px 0px 0px 0px' }}>{languageLabels?.bookingcart?.rooms || "Rooms"}</Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  {loading ? (
                    <p>Loading accommodations...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : (
                    accommodations.map((acc) => (
                      <div
                        key={acc.accommodation_id}
                        style={{
                          width: "100%",
                          color: "#5E6282",
                          border: "1px solid #CACACA",
                          borderRadius: "11px",

                          backgroundColor: "#F9F9F9",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      >


                        <div style={{ marginBottom: "10px", width: "100%" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",

                            }}
                          >
                            <Typography
                              style={{
                                fontSize: "14px",
                                color: "#fff",
                                backgroundColor: "green",
                                height: "20px",
                                borderBottomLeftRadius: "20px",
                                padding: "0px 10px 10px 16px",
                                borderTopRightRadius: "10px",
                              }}
                            >
                              Only {acc.available_limit}  {acc.available_limit <= 1 ? acc.stay_type : acc.stay_type + 's'} Left
                            </Typography>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "8px 12px",
                            }}
                          >

                            {acc.room_image ? (
                              <img
                                src={acc.room_image}
                                alt="Room"
                                style={{
                                  width: "80px", // Adjust width as needed
                                  height: "80px", // Adjust height as needed
                                  borderRadius: "8px", // Rounded corners
                                  objectFit: "cover",
                                  marginRight: "12px", // Space between image and text
                                }}
                              />
                            ) : (
                              <span
                                style={{
                                  width: "80px", // Adjust width as needed
                                  height: "80px", // Adjust height as needed
                                  borderRadius: "8px", // Rounded corners
                                  objectFit: "cover",
                                  marginRight: "12px", // Space between image and text
                                }}
                              >
                                <ImageNotSupportedOutlinedIcon
                                  style={{ color: "#8a8a8a", margin: "15px" }}
                                />
                              </span>
                            )}

                            <div>
                              <Typography
                                style={{
                                  fontFamily: "Poppins, sans-serif",
                                  color: "#424242",
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  textTransform: "capitalize",
                                }}
                              >
                                {acc.custom_name}
                              </Typography>

                              <p
                                style={{
                                  fontFamily: "Poppins, sans-serif",
                                  color: "#898989",
                                  fontSize: "14px",
                                  fontWeight: 400,
                                  overflow: "hidden",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2, // Show only 2 lines initially
                                  WebkitBoxOrient: "vertical",
                                  cursor: "pointer",
                                  transition: "max-height 0.3s ease-in-out",
                                  // maxWidth: "500px",
                                  maxHeight: "40px", // Adjust to fit 2 lines
                                }}
                                onMouseEnter={(e) => (e.target.style.maxHeight = "none")} // Expand on hover
                                onMouseLeave={(e) => (e.target.style.maxHeight = "40px")} // Collapse on mouse leave
                              >
                                {acc.room_description}
                              </p>
                            </div>
                          </div>


                          <MaxOccupancyText acc={acc} />


                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingRight: "16px",
                              // paddingBottom: "5px",
                              alignContent: 'center',
                              paddingTop: "10px"

                            }}
                          >
                            <div style={{ display: 'inline-block', padding: "0px 5px 5px 12px" }}>


                              <div style={{ display: "flex", }}>

                                {renderCurrencyIcon() && (
                                  <span style={{
                                    color: "#4361ee",
                                    fontWeight: "600",
                                    fontSize: { currencySize },
                                    marginTop: "5px",
                                  }}>
                                    {renderCurrencyIcon()}
                                  </span>
                                )}
                                <Typography
                                  style={{
                                    color: "#4361ee",
                                    fontWeight: "700",
                                    fontSize: "22px",
                                  }}
                                >
                                  {acc.total_price}
                                </Typography>
                                <Typography
                                  style={{
                                    fontFamily: "Plus Jakarta Sans, sans-serif",
                                    fontSize: "14px",
                                    color: "#717171",
                                    marginTop: "6px",
                                    gap: 3,
                                    fontWeight: 500,
                                  }}
                                >
                                  /night{" "}
                                  <Tooltip title="Excluding Tax & Service Cost">
                                    <InfoRoundedIcon />
                                  </Tooltip>{" "}
                                </Typography>
                              </div>


                            </div>

                            {selectedAccommodations[acc.accommodation_id] ? (
                              <div
                                className="counter"
                                style={{
                                  display: "flex",
                                  flexDirection: "column", // Stack the label and buttons vertically
                                  // alignItems: "center",
                                  justifyContent: "center",
                                  // textAlign: "center",
                                  backgroundColor: "#fff",
                                  color: "#000",
                                  height: "auto", // Adjust height to fit content
                                  width: "100px", // Ensure enough width to prevent overlap
                                  borderRadius: "10px",
                                }}
                              >

                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100px",
                                    flexWrap: "wrap", // Allow elements to wrap to the next line if needed
                                  }}
                                >
                                  <button
                                    style={{
                                      width: "36px",
                                      height: "36px",
                                      backgroundColor: "#E0E0F0",
                                      fontSize: "24px",
                                      fontWeight: "500",
                                      border: "none",
                                      cursor: "pointer",
                                      display: "flex",
                                      color: "#000",
                                      fontFamily: "Poppins, sans-serif",
                                      borderTopLeftRadius: "6px",
                                      borderBottomLeftRadius: "6px",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                    onClick={() => handleDecrement(acc.accommodation_id)}
                                  >
                                    -
                                  </button>

                                  <span
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "bold",
                                      color: "#2d3436",
                                      fontSize: "20px",
                                      fontWeight: "500",
                                      fontFamily: "Roboto, sans-serif",
                                      height: "100%",
                                      width: "15px",
                                      alignContent: 'center',

                                      textAlign: "center", // Center the text horizontally
                                    }}
                                  >
                                    {selectedAccommodations[acc.accommodation_id].count}
                                  </span>

                                  <button
                                    style={{
                                      width: "36px",
                                      height: "36px",
                                      backgroundColor: "#E0E0F0",
                                      borderTopRightRadius: "6px",
                                      borderBottomRightRadius: "6px",
                                      border: "none",
                                      fontSize: "24px",
                                      fontWeight: "500",
                                      cursor: "pointer",
                                      color: "#000",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                    onClick={() => handleIncrement(acc.accommodation_id)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            ) : (

                              <button
                                style={{
                                  padding: "5px",
                                  backgroundColor: "#4361ee",
                                  color: "#ffffff",
                                  height: "36px",
                                  width: "92px",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                  borderColor: "#07799F",
                                  fontFamily: "Poppins, sans-serif",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                  // marginTop: "10px",
                                  border: "none",
                                }}
                                onClick={() => handleAdd(acc)}
                              >
                                Add
                              </button>
                            )}

                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>




              </div>


          }




          {isModalOpen && isMobile && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
                position: "sticky",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  width: "50%",
                  height: "10%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  overflow: "hidden",
                }}
              >
                <CloseIcon
                  onClick={closeModal}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    cursor: "pointer",
                    fontSize: "24px",
                    color: "#333",
                  }}
                />

                <Typography
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    marginBottom: "10px",
                  }}
                >
                  {languageLabels?.bookingcart?.propertyGallery || "Property Gallery"}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    overflowX: "scroll",
                    width: "100%",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  {sections.map((imagePath, index) => (
                    <img
                      key={index}
                      src={imagePath.image_path}
                      alt={`Modal Image ${index}`}
                      style={{
                        width: "220px",
                        height: "152px",
                        borderRadius: "10px",
                      }}
                    />
                  ))}
                </div>

                <Typography
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    margin: "12px 0px 10px 0px",
                  }}
                >
                  Amenities
                </Typography>
                <div
                  style={{
                    overflowY: "scroll",
                    maxHeight: "150px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <ul>
                    {allAmenities.slice(0, 5).map((amenity, index) => (
                      <li
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <CheckIcon
                          style={{ color: "#07799F", marginRight: "10px" }}
                        />
                        <span>{amenity.amenity_name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {isModalOpen && (
            <div
              style={{
                position: "fixed",
                top: 100,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  width: isMobile ? "100%" : "60%",
                  height: isMobile ? '50%' : "85%",
                  overflowY: "scroll",
                  position: "relative",
                  scrollbarWidth: "none",
                }}
              >
                <CloseIcon
                  onClick={closeModal}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    cursor: "pointer",
                    fontSize: "24px",
                    color: "#333",
                  }}
                />
                <Typography
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    marginBottom: "10px",
                  }}
                >                  {languageLabels?.bookingcart?.propertyGallery || "Property Gallery"}

                </Typography>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    padding: "10px",
                  }}
                >
                  {sections.map((imagePath, index) => (
                    <img
                      key={index}
                      src={imagePath.image_path}
                      alt={`Modal Image ${index}`}
                      style={{
                        width: "100%",
                        maxWidth: "220px",
                        height: "152px",
                        borderRadius: "10px",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>





        {
          !isMobile && (
            <div style={{ width: "800px" }}>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  style={{
                    color: "#1C1C1C",
                    fontSize: "24px",
                    fontWeight: "700",
                    textTransform: "capitalize",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {propertydetails.name}
                </Typography>



              </div>



              <p
                style={{
                  color: "#717171",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  // marginTop: "-8px",
                  display: 'flex',
                  gap: '5px',
                  alignContent: 'center', marginBottom: "0px"

                }}
              >
                {propertydetails.city}&nbsp;
                <button
                  href="#map"
                  style={{
                    color: "#3974FF",
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    color: "#4361ee",
                    border: "none",
                    background: "none",
                    marginLeft: "-10px",
                    textDecoration: "underline",
                    marginTop: "-10px",
                    fontSize: "14px",
                    display: "flex"

                  }}
                  onClick={() => handleShowOnMapClick(propertydetails.location)}
                >
                  <li style={{ color: "gray" }}></li>
                  {languageLabels?.bookingcart?.showonmap || "Show On Map"}


                </button>
                <li ></li>

                <div style={{ display: "flex", alignItems: "center", gap: "3px", marginTop: "-8px" }}>
                  <span
                    style={{
                      fontSize: "16px",
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontWeight: "700",
                      color: "#FAC322",
                      textTransform: "capitalize",
                    }}
                  >
                    {propertydetails.average_rating
                      ? propertydetails.average_rating.toFixed(1)
                      : "0.0"}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontWeight: "600",
                      color: "#FAC322",
                    }}
                    onClick={handleDialogOpen}
                  >
                    ⭐
                  </span>

                  <span
                    style={{
                      fontSize: "14px",
                      color: "#3974FF",
                      cursor: "pointer",
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontWeight: "400",
                      textDecoration: "underline",
                    }}
                    onClick={handleDialogOpen}
                  >
                    {languageLabels?.bookingcart?.viewreviews || "View Reviews"}

                  </span>
                </div>
              </p>


              <ul style={{ marginBottom: "10px", marginLeft: "-30px", }}>
                {nearestplaces.map((place, index) => {
                  const shortDescription = (place[1] || "").substring(0, maxLengthFullplaces);
                  const isExpanded = isExpandedFullroom[index];
                  const shouldShowReadMore = (place[1] || "").length > maxLengthFullplaces; // Check if description exceeds maxLengthFullplaces

                  return (
                    <li key={index} style={{ display: 'flex', flexDirection: 'row', marginBottom: '0px' }}>
                      <span>
                        {languageLabels?.bookingcart?.Nearby || "Nearby"}
                      </span>

                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: "0px" }}>
                        <span
                          style={{
                            color: "#2e2e2e",
                            display: "inline-block",
                            overflow: "hidden",
                            marginLeft: "5px",
                            whiteSpace: isExpanded ? 'normal' : 'nowrap', // Allow wrapping when expanded
                            textOverflow: 'clip',
                            maxWidth: isExpanded ? 'none' : '220px', // Limit width when collapsed
                          }}
                          className="place-text"
                          title={place[1]}
                        >
                          {isExpanded ? place[1] : shortDescription}
                        </span>

                        {/* Show "Read more" button only if the text is longer than maxLengthFullplaces */}
                        {shouldShowReadMore && (
                          <button
                            onClick={() => toggleReadMoreplaces(index)}
                            style={{
                              marginTop: '-10px', // Spacing between description and button
                              cursor: 'pointer',
                              background: 'none',
                              border: 'none',
                              color: '#007BFF',
                              textDecoration: 'none',
                            }}
                          >
                            {isExpanded ? 'Read less' : '...Read more'}
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>





              <p
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "#2E2E2E",
                  margin: "5px 0px 18px 0px",
                }}
              >
                {isExpanded ? fullDescriptionFullscreen : shortDescriptionFullscreen}
                {fullDescriptionFullscreen.length > maxLengthFullscreen && (
                  <span
                    onClick={toggleTextFullscreen}
                    style={{
                      cursor: "pointer",
                      fontWeight: 500,
                      color: "#4361ee"
                    }}
                  >
                    {isExpanded ? 'Read Less' : '...Read More'}
                  </span>
                )}
              </p>

              <div style={{ display: "flex", gap: '20px', marginBottom: "10px" }}>

                <Typography>
                  <span style={{ color: "#4361ee" }}>
                    {languageLabels?.bookingcart?.checkinTime || "Checkin Time"}:
                  </span>
                  <span style={{ color: "#717171" }}>
                    {propertydetails.checkin_time?.split(":").slice(0, 2).join(":")}
                  </span>
                </Typography>

                <Typography>
                  <span style={{ color: "#4361ee" }}>
                    {languageLabels?.bookingcart?.checkoutTime || "Checkout Time"}:
                  </span>
                  <span style={{ color: "#717171" }}>
                    {propertydetails.checkout_time?.split(":").slice(0, 2).join(":")}
                  </span>
                </Typography>

              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  <p>{languageLabels?.bookingcart?.loadingaccommodations || "Loading accommodations..."}</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  accommodations.map((acc) => (
                    <div
                      key={acc.accommodation_id}
                      style={{
                        width: "100%",
                        color: "#5E6282",
                        border: "1px solid #CACACA",
                        borderRadius: "11px",
                        minHeight: "175px",
                        // padding: "20px",
                        backgroundColor: "#F9F9F9",
                        display: "flex",
                        justifyContent: "space-between",
                        // alignItems: "center",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {acc.room_image ? (
                        <img
                          src={acc.room_image}
                          alt="Room"
                          style={{
                            width: "20%",
                            height: "185px",
                            objectFit: "cover",
                            marginRight: "21px",
                            borderTopLeftRadius: "10px",
                            borderBottomLeftRadius: "10px",
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            width: "20%",
                            height: "185px",
                            objectFit: "cover",
                            backgroundColor: "#ececec",
                            marginRight: "21px",
                            borderTopLeftRadius: "10px",
                            borderBottomLeftRadius: "10px",
                            alignContent: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ImageNotSupportedOutlinedIcon
                            style={{ color: "#8a8a8a", margin: "50px" }}
                          />
                        </span>
                      )}

                      <div style={{ marginBottom: "10px", width: "80%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",

                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "#fff",
                              backgroundColor: "green",
                              height: "20px",
                              borderBottomLeftRadius: "20px",
                              padding: "0px 10px 10px 10px",
                              borderTopRightRadius: "10px",
                            }}
                          >
                            {languageLabels?.bookingcart?.Only || "Only"}    {acc.available_limit}  {acc.available_limit <= 1 ? acc.stay_type : acc.stay_type + 's'}  {languageLabels?.bookingcart?.Left || "Left"}
                          </Typography>
                        </div>
                        <div style={{ minHeight: "80px" }}>
                          <Typography
                            style={{
                              fontFamily: "Poppins, sans-serif",
                              color: "#3e3e3e",
                              fontSize: "18px",
                              fontWeight: 600,
                              textTransform: "capitalize",
                            }}
                          >
                            {acc.custom_name}
                          </Typography>


                          <p
                            style={{
                              fontFamily: "Poppins, sans-serif",
                              color: "#898989",
                              fontSize: "14px",
                              fontWeight: 400,
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 2.5, // Show only 2 lines initially
                              WebkitBoxOrient: "vertical",
                              cursor: "pointer",
                              transition: "max-height 0.3s ease-in-out",
                              // maxWidth: "600px",
                              maxHeight: "40px", // Adjust based on line height to fit 2 lines
                            }}
                          >
                            {acc.room_description}
                          </p>

                        </div>
                        <MaxOccupancyText acc={acc} />

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingRight: "16px",
                            marginTop: "10px"
                          }}
                        >
                          <div style={{ display: "flex", }}>

                            {renderCurrencyIcon() && (
                              <span style={{
                                color: "#4361ee",
                                fontWeight: "600",
                                fontSize: { currencySize },
                                marginTop: "5px",
                              }}>
                                {renderCurrencyIcon()}
                              </span>
                            )}
                            <Typography
                              style={{
                                color: "#4361ee",
                                fontWeight: "700",
                                fontSize: "22px",
                              }}
                            >
                              {acc.total_price}
                            </Typography>
                            <Typography
                              style={{
                                fontFamily: "Plus Jakarta Sans, sans-serif",
                                fontSize: "14px",
                                color: "#717171",
                                marginTop: "6px",
                                gap: 3,
                                fontWeight: 500,
                              }}
                            >
                              /{languageLabels?.bookingcart?.night || "night"}{" "}
                              <Tooltip title="Excluding Tax & Service Cost">
                                <InfoRoundedIcon />
                              </Tooltip>{" "}
                            </Typography>
                          </div>

                          <div>



                            {selectedAccommodations[acc.accommodation_id] ? (
                              <div
                                className="counter"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  textAlign: "center",
                                  backgroundColor: "#fff",
                                  color: "#000",
                                  height: "38px",
                                  width: "122px",
                                  borderRadius: "10px",
                                }}
                              >

                                <button
                                  style={{
                                    width: "36px",
                                    height: "36px",
                                    backgroundColor: "#E0E0F0",
                                    fontSize: "24px",
                                    fontWeight: "500",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    color: "#000",
                                    fontFamily: "Poppins, sans-serif",
                                    borderTopLeftRadius: "6px",
                                    borderBottomLeftRadius: "6px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  onClick={() => handleDecrement(acc.accommodation_id)}
                                >
                                  -
                                </button>

                                <span
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "#2d3436",
                                    fontSize: "20px",
                                    fontWeight: "500",
                                    fontFamily: "Roboto, sans-serif",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: 'center',
                                    height: "100%",
                                    width: "35px",
                                    marginTop: "5px"
                                  }}
                                >
                                  {selectedAccommodations[acc.accommodation_id].count}
                                </span>

                                <button
                                  style={{
                                    width: "36px",
                                    height: "36px",
                                    backgroundColor: "#E0E0F0",
                                    borderTopRightRadius: "6px",
                                    borderBottomRightRadius: "6px",
                                    border: "none",
                                    fontSize: "24px",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                    color: "#000",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  onClick={() => handleIncrement(acc.accommodation_id)}
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <div>

                                <button
                                  style={{
                                    padding: "5px",
                                    backgroundColor: "#4361ee",
                                    color: "#ffffff",
                                    height: "36px",
                                    width: "122px",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    borderColor: "#07799F",
                                    fontFamily: "Poppins, sans-serif",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    // marginTop: "10px",
                                    border: "none",
                                  }}
                                  onClick={() => handleAdd(acc)}
                                >
                                  {/* Add{} */}
                                  {languageLabels?.bookingcart?.Add || "Add"}

                                </button>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          )
        }

        {!isMobile ? (
          <div
            style={{
              width: "450px",
              height: "100%",
              border: "1px solid #dcdde1",
              borderRadius: "10px",
              minHeight: "400px",
              padding: "16px",
              position: "sticky",
              top: "150px",
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",

            }}
          >
            <Typography
              style={{
                fontSize: "16px",
                fontWeight: "600",
                textAlign: "start",
                marginBottom: "16PX",
                marginLeft: "5px",

              }}
            >
              {languageLabels?.bookingcart?.bookingSummary || "Booking Summary"}
            </Typography>

            {selectedAccommodationIds.length > 0 ? (
              <div className="booking-summary">
                <table>
                  <tbody>
                    <tr>
                      <td style={{ color: "#3e3e3e", width: "200px" }}>
                        {languageLabels?.bookingcart?.checkin || "Check-in"}
                      </td>
                      <td className="table-coloum">{fromDate}</td>
                    </tr>
                    <tr>
                      <td style={{ color: "#3e3e3e", width: "200px" }}>
                        {languageLabels?.bookingcart?.checkout || "Check-out"}                        </td>
                      <td className="table-coloum">{toDate}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #D7D7D7" }}>
                      <td style={{ color: "#3e3e3e", width: "200px" }}>
                        {languageLabels?.bookingcart?.totalGuests || "Total Guests"}
                      </td>
                      <td className="table-coloum">{guests}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #D7D7D7" }}>
                      <td style={{ color: "#3a3a3a", width: "200px" }}>
                        <b>{languageLabels?.bookingcart?.reservedGuests || "Reserved Guests"}</b>
                      </td>
                      <td className="table-coloum"><b>{reservedFor}/{guests}</b></td>
                    </tr>
                    <>

                      {reservedFor < guests && (
                        <tr>
                          <td colSpan={2}>
                            <span style={{ color: 'red', fontSize: '14px' }}>
                              {languageLabels?.bookingcart?.reservedguestsarefewerthantotalguests || " Reserved guests are fewer than total guests!"}
                            </span>
                          </td>
                        </tr>
                      )}
                    </>


                    <tr style={{ borderTop: "10px solid #fff" }}>
                      <td style={{ color: "#3e3e3e", width: "200px" }}>
                        {languageLabels?.bookingcart?.totalRoomCost || "Total Room Cost"}
                      </td>
                      <td className="table-coloum">
                        <span style={{ fontSize: { currencySize } }}>{renderCurrencyIcon()}</span>{" "}
                        {(bookingData?.Total_Rooms_Cost ?? 0).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "#3e3e3e", width: "200px" }}>
                        {languageLabels?.bookingcart?.gstCost || "GST Cost"}
                      </td>
                      <td className="table-coloum">
                        <span style={{ fontSize: currencySize }}>{renderCurrencyIcon()}</span>{" "}
                        {(bookingData?.Total_GST_Cost ?? 0).toFixed(2)}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #d7d7d7', paddingBottom: "8px" }}>
                      <td style={{ color: "#3e3e3e", width: "200px" }}>
                        {languageLabels?.bookingcart?.totalbookingcost || "Total Booking Cost"}
                      </td>
                      <td className="table-coloum">
                        <span style={{ fontSize: currencySize }}>{renderCurrencyIcon()}</span>{" "}
                        {(bookingData?.Total_Booking_Cost ?? 0).toFixed(2)}
                      </td>
                    </tr>
                    <tr style={{ color: 'green' }}>
                      <td style={{ color: "green", width: "200px" }}>
                        {languageLabels?.bookingcart?.payableAmount || "Payable Amount"}
                      </td>
                      <td className="table-coloum">
                        <span style={{ fontSize: currencySize }}>{renderCurrencyIcon()}</span>{" "}
                        {(bookingData?.Payable_Amount ?? 0).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "#3e3e3e", width: "200px" }}>
                        {languageLabels?.bookingcart?.pendingAmount || "Pending Amount"}
                      </td>
                      <td className="table-coloum">
                        <span style={{ fontSize: currencySize }}>{renderCurrencyIcon()}</span>{" "}
                        {(bookingData?.Pending_Amount ?? 0).toFixed(2)}
                      </td>

                    </tr>

                    {(bookingData?.Discount ?? 0) > 0 && (
                      <tr>
                        <td style={{ color: "#3e3e3e", width: "200px" }}>
                          {languageLabels?.bookingcart?.discountAmount || "Discount Amount"}
                        </td>
                        <td className="table-coloum">
                          <span style={{ fontSize: currencySize }}>{renderCurrencyIcon()}</span>{" "}
                          {bookingData?.Discount.toFixed(2)}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>


                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "20px" }}>
                  <TextField
                    label={languageLabels?.bookingcart?.applycoupon || "Apply Coupon"}
                    variant="outlined"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    fullWidth
                    size="small"
                    style={{ width: "200px", }}
                    InputProps={{
                      endAdornment: loading ? <CircularProgress color="inherit" size={20} /> : null,
                    }}
                    disabled={isCouponApplied} // Disable input field when coupon is applied
                  />
                  <Button
                    variant="contained"
                    onClick={handleCouponApply}
                    disabled={loading || couponCode.trim() === "" || isCouponApplied} // Disable button if applied
                    style={{
                      backgroundColor: "#4361ee", color: "#fff",
                      "&:hover": { backgroundColor: "#364fc7" },
                    }}
                  >
                    {languageLabels?.bookingcart?.apply || "Apply"}
                  </Button>
                </div>
                <button
                  onClick={() => setShowBreakup(!showBreakup)}
                  style={{
                    color: "#4361ee",
                    background: "none",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  {showBreakup ? "Hide Breakup" : "Show Breakup"}
                </button>

                {showBreakup && baccommodations.length > 0 && (
                  <div className="cost-breakup">
                    <Typography
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        marginBottom: "10px",
                        marginLeft: "6px",
                      }}
                    >
                      {languageLabels?.bookingcart?.costbreakdown || "Cost Breakdown/Per Day"}
                    </Typography>
                    <table>

                      <tbody style={{ fontSize: "15px" }}>
                        {baccommodations.map((acc, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td>
                                <span style={{ display: "inline-block" }}>
                                  {acc.Accomodation_Name}
                                </span>
                                <span
                                  style={{
                                    color: "#696969",
                                    fontSize: "12px",
                                    display: "inline-block",
                                  }}
                                >
                                  ({acc.Room_Cost_Per_Day} ×{" "}
                                  {acc.No_of_Rooms_Reserved} + Service +
                                  Additional)
                                </span>
                              </td>
                              <td className="breack-cost">
                                <span style={{ fontSize: currencySize }}>{renderCurrencyIcon()}</span>{" "}
                                {(
                                  acc.Room_Cost_Per_Day *
                                  acc.No_of_Rooms_Reserved +
                                  acc.Service_Cost_Per_Day *
                                  acc.No_of_Rooms_Reserved +
                                  acc.Additional_Cost_Per_Day *
                                  acc.No_of_Rooms_Reserved
                                ).toFixed(2)}
                              </td>
                            </tr>
                            {acc.Service_Cost_Per_Day > 0 && (
                              <tr>
                                <td>
                                  <span
                                    style={{
                                      display: "inline-block",
                                      marginRight: "5px",
                                    }}
                                  >     {languageLabels?.bookingcart?.serviceCost || "Service Cost"}
                                  </span>

                                  <span
                                    style={{
                                      color: "#696969",
                                      fontSize: "12px",
                                      display: "inline-block",
                                    }}
                                  >
                                    ({acc.Accomodation_Name}{" "}
                                    {acc.Service_Cost_Per_Day} ×{" "}
                                    {acc.No_of_Rooms_Reserved})
                                  </span>
                                </td>

                                <td className="breack-cost">
                                  {" "}
                                  {renderCurrencyIcon()}
                                  {(
                                    acc.Service_Cost_Per_Day *
                                    acc.No_of_Rooms_Reserved
                                  ).toFixed(2)}
                                </td>
                              </tr>
                            )}

                            {acc.Additional_Cost_Per_Day > 0 && (
                              <tr>
                                <td>
                                  {" "}
                                  <span style={{ display: "inline-block" }}>
                                    {languageLabels?.bookingcart?.additionalCost || "Additional Cost"}
                                  </span>{" "}
                                  <span
                                    style={{
                                      color: "#696969",
                                      fontSize: "12px",
                                      display: "inline-block",
                                    }}
                                  >
                                    {" "}
                                    ({acc.Accomodation_Name}{" "}
                                    {acc.Additional_Cost_Per_Day} ×{" "}
                                    {acc.No_of_Rooms_Reserved}){" "}
                                  </span>
                                </td>
                                <td className="breack-cost">
                                  <span style={{ fontSize: currencySize }}>{renderCurrencyIcon()}</span>{" "}
                                  {(
                                    acc.Additional_Cost_Per_Day *
                                    acc.No_of_Rooms_Reserved
                                  ).toFixed(2)}
                                </td>
                              </tr>
                            )}
                            <tr>
                              <td>
                                {" "}
                                <span style={{ display: "inline-block" }}>
                                  GST{" "}
                                </span>
                                <span
                                  style={{
                                    color: "#696969",
                                    fontSize: "12px",
                                    display: "inline-block",
                                  }}
                                >
                                  {" "}
                                  ({acc.Accomodation_Name} {acc.Tax_Percentage}%
                                  of Room Cost){" "}
                                </span>
                              </td>
                              <td className="breack-cost">
                                <span style={{ fontSize: currencySize }}>{renderCurrencyIcon()}</span>{" "}
                                {(
                                  ((acc.Room_Cost_Per_Day *
                                    acc.No_of_Rooms_Reserved +
                                    acc.Service_Cost_Per_Day *
                                    acc.No_of_Rooms_Reserved +
                                    acc.Additional_Cost_Per_Day *
                                    acc.No_of_Rooms_Reserved) *
                                    acc.Tax_Percentage) /
                                  100
                                ).toFixed(2)}
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ width: "100%", textAlign: "center" }}>
                <img
                  src={Noresult}
                  alt="No Rooms  Selected"
                  style={{
                    height: "100px",
                    width: "50%",
                    textAlign: "center",
                    marginTop: "60px",
                  }}
                />
                <Typography
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#898989",
                  }}
                >

                  {languageLabels?.bookingcart?.noRoomsSelected || "No Rooms Selected"}



                </Typography>
              </div>
            )}


            {selectedAccommodationIds.length > 0 && reservedFor >= guests &&
              (!IsLoggedIn ? (
                <button
                  style={{
                    width: "100%",
                    backgroundColor: "#4361ee",
                    color: "#fff",
                    height: "40px",
                    borderRadius: "10px",
                    fontWeight: "700",
                    fontSize: "16px",
                    cursor: "pointer",
                    boxShadow: '0px 8px 16px   #b9b9b9',


                  }}
                  onClick={doLogin}
                >
                  Book Now
                </button>
              ) : (
                <div>
                  {renderTermsAndBookingUI(handleProceedToPay)}
                </div>

              ))}
          </div>
        ) : (
          <>
            {/* <div
              style={{
                position: "fixed",
                bottom: "80px",
                right: "20px",
                backgroundColor: "#4361ee",
                color: "white",
                padding: "12px",
                borderRadius: "50%",
                cursor: "pointer",
                height: "50px",
                width: "50px",
                textAlign: 'center',
                boxShadow: "0px 0px 40px rgba(20, 12, 12, 0.3)",
              }}



              onClick={openBookingModal}
            >
              <FaReceipt size={20} />
              <div
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "#fff", // Red color for the badge
                  color: "black",
                  borderRadius: "50%",
                  width: "24px", // Adjusted badge size for better fit
                  height: "24px", // Adjusted badge size for better fit
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "0px 0px 20px rgba(20, 12, 12, 0.3)",

                  justifyContent: "center",
                  fontSize: "15px", // Adjusted badge text size
                  fontWeight: "bold",
                }}
              >
                {selectedAccommodationIds?.length}{" "}
              </div>
            </div> */}

            <div
              style={{
                position: 'sticky',
                bottom: 0,
                backgroundColor: '#ffffff',
                padding: '16px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #e0e0e0',
                zIndex: 10,
              }}
            >
              {/* Payable Amount Section */}
              {/* <div style={{ color: '#00ac2e', fontSize: '16px', fontWeight: 'bold' }}>
                {languageLabels?.bookingcart?.payableAmount || 'Payable Amount'}:{' '}
                {renderCurrencyIcon()} {(bookingData?.Payable_Amount ?? 0).toFixed(2)}
              </div> */}

              {/* Book Now Button */}

              {
                selectedAccommodationIds.length>0 &&(
                  <div
                  onClick={openBookingModal}
                  style={{
                    backgroundColor: '#4361ee',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    height: '50px',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0px 0px 20px rgba(20, 12, 12, 0.3)',
                    position: 'relative',
                  }}
                >
                  Book Now <ArrowForward/>
                  <div
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-5px',
                      backgroundColor: '#fff',
                      color: 'black',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      boxShadow: '0px 0px 20px rgba(20, 12, 12, 0.3)',
                    }}
                  >
                    {selectedAccommodationIds?.length || 0}
                  </div>
                </div>

                )
              }
            
            </div>


          </>
        )}

        {isBookingModalOpen && isMobile && (
          <div
            style={{
              position: "fixed",
              top: 68,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "100%",
                overflowY: "scroll",
                position: "relative",
              }}
            >
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  textAlign: "start",
                  padding: "16px"
                }}
              >
                {languageLabels?.bookingcart?.bookingSummary || "Booking Summary"}
              </Typography>
              <CloseIcon
                onClick={closeBookingModal}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  cursor: "pointer",
                  fontSize: "24px",
                  color: "#333",
                }}
              />



              {selectedAccommodationIds.length > 0 ? (
                <>
                  <table
                    style={{
                      fontSize: "15px",
                      width: "100%",
                      fontFamily: "Poppins, sans-serif",
                      marginTop: "-10px",
                      // paddingLeft: "16px"

                    }}
                  >

                    <tbody>


                      <tr>
                        <td> {languageLabels?.bookingcart?.checkin || "Check-in"}</td>
                        <td>{fromDate}</td>
                      </tr>
                      <tr>
                        <td>                      {languageLabels?.bookingcart?.checkout || "Check-out"}                        </td>

                        <td>{toDate}</td>
                      </tr>
                      <tr>
                        <td>                      {languageLabels?.bookingcart?.noofguest || "No of Guests"}
                        </td>
                        <td>{guests}</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #D7D7D7", }}>
                        <td style={{ marginTop: "10px" }}>{languageLabels?.bookingcart?.reservedGuests || "Reserved Guests"}</td>
                        <td>
                          <b>
                            {reservedFor}/{guests}
                          </b>

                        </td>
                      </tr>
                      <tr>
                        <td>
                          {reservedFor < guests && (
                            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                              {languageLabels?.bookingcart?.reservedguestsarefewerthantotalguests || " Reserved guests are fewer than total guests!"}
                            </div>
                          )}
                        </td>
                      </tr>

                      <tr style={{ fontWeight: 'bold' }}>
                        <td><b>                       {languageLabels?.bookingcart?.totalRoomCost || "Total Room Cost"}
                        </b></td>
                        <td>
                          <b> {renderCurrencyIcon()} {(bookingData?.Total_Rooms_Cost ?? 0).toFixed(2)} </b>
                        </td>
                      </tr>
                      <tr>
                        <td> {languageLabels?.bookingcart?.gstCost || "GST Cost"}</td>
                        <td>
                          {renderCurrencyIcon()} {(bookingData?.Total_GST_Cost ?? 0).toFixed(2)}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #D7D7D7" }}>
                        <td><b> {languageLabels?.bookingcart?.totalbookingcost || "Total Booking Cost"} </b></td>
                        <td>
                          <b> {renderCurrencyIcon()} {(bookingData?.Total_Booking_Cost ?? 0).toFixed(2)}</b>
                        </td>
                      </tr>
                      <tr style={{ color: "#00ac2e" }}>
                        <td > <b>{languageLabels?.bookingcart?.payableAmount || "Payable Amount"} </b>  </td>
                        <td>
                          <b> {renderCurrencyIcon()} {(bookingData?.Payable_Amount ?? 0).toFixed(2)}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>{languageLabels?.bookingcart?.pendingAmount || "Pending Amount"}</td>
                        <td>
                          {renderCurrencyIcon()} {(bookingData?.Pending_Amount ?? 0).toFixed(2)}
                        </td>
                      </tr>
                      {(bookingData?.Discount ?? 0) > 0 && (
                        <tr>
                          <td style={{ color: "#3e3e3e", width: "200px" }}>
                            {languageLabels?.bookingcart?.discountAmount || "Discount Amount"}
                          </td>
                          <td >
                            <span style={{ fontSize: currencySize }}>{renderCurrencyIcon()}</span>{" "}
                            {bookingData?.Discount.toFixed(2)}
                          </td>
                        </tr>
                      )}
                    </tbody>

                  </table>

                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginLeft: "10px", marginTop: "10px" }}>
                    <TextField
                      label={languageLabels?.bookingcart?.applycoupon || "Apply Coupon"}
                      variant="outlined"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      fullWidth
                      size="small"
                      style={{ width: "200px" }}
                      InputProps={{
                        endAdornment: loading ? <CircularProgress color="inherit" size={20} /> : null,
                      }}
                      disabled={isCouponApplied}
                    />
                    <Button
                      variant="contained"
                      onClick={handleCouponApply}
                      disabled={loading || couponCode.trim() === "" || isCouponApplied} // Disable button if applied
                      style={{
                        backgroundColor: "#4361ee",
                        color: "#fff",
                        "&:hover": { backgroundColor: "#364fc7", },
                      }}
                    >
                      {languageLabels?.bookingcart?.apply || "Apply"}
                    </Button>
                  </div>

                  <button
                    onClick={() => setShowBreakup(!showBreakup)}
                    style={{
                      color: "#4361ee",
                      background: "none",
                      fontWeight: "bold",
                    }}
                  >
                    {showBreakup ? "Hide Breakup" : "Show Breakup"}
                  </button>
                  {showBreakup && baccommodations.length > 0 && (
                    <div className="cost-breakup">
                      <Typography
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          marginBottom: "10px",
                          marginLeft: "6px",
                        }}
                      >
                        {languageLabels?.bookingcart?.costbreakdown || "Cost Breakdown/Per Day"}
                      </Typography>
                      <table>

                        <tbody style={{ fontSize: "15px" }}>
                          {baccommodations.map((acc, index) => (
                            <React.Fragment key={index}>
                              <tr>
                                <td style={{ display: 'inline-block' }}>
                                  <span style={{ display: "inline-block", width: "50%" }}>
                                    {acc.Accomodation_Name}
                                  </span>
                                  <span
                                    style={{
                                      color: "#696969",
                                      fontSize: "12px",
                                      display: "inline-block",
                                    }}
                                  >
                                    ({acc.Room_Cost_Per_Day} ×{" "}
                                    {acc.No_of_Rooms_Reserved} + Service +
                                    Additional)
                                  </span>
                                </td>
                                <td className="breack-cost">
                                  <span style={{ fontSize: currencySize }}>{renderCurrencyIcon()}</span>{" "}
                                  {(
                                    acc.Room_Cost_Per_Day *
                                    acc.No_of_Rooms_Reserved +
                                    acc.Service_Cost_Per_Day *
                                    acc.No_of_Rooms_Reserved +
                                    acc.Additional_Cost_Per_Day *
                                    acc.No_of_Rooms_Reserved
                                  ).toFixed(2)}
                                </td>
                              </tr>
                              {acc.Service_Cost_Per_Day > 0 && (
                                <tr>
                                  <td>
                                    <span
                                      style={{
                                        display: "inline-block",
                                        marginRight: "5px",
                                        width: "50%"
                                      }}
                                    >
                                      {languageLabels?.bookingcart?.serviceCost || "Service Cost"}
                                    </span>

                                    <span
                                      style={{
                                        color: "#696969",
                                        fontSize: "12px",
                                        display: "inline-block",
                                      }}
                                    >
                                      ({acc.Accomodation_Name}{" "}
                                      {acc.Service_Cost_Per_Day} ×{" "}
                                      {acc.No_of_Rooms_Reserved})
                                    </span>
                                  </td>

                                  <td className="breack-cost">
                                    {" "}
                                    {renderCurrencyIcon()}
                                    {(
                                      acc.Service_Cost_Per_Day *
                                      acc.No_of_Rooms_Reserved
                                    ).toFixed(2)}
                                  </td>
                                </tr>
                              )}

                              {acc.Additional_Cost_Per_Day > 0 && (
                                <tr>
                                  <td>
                                    {" "}

                                    <span style={{ display: "inline-block", width: "50%" }}>
                                      Additional Cost
                                    </span>{" "}
                                    <span
                                      style={{
                                        color: "#696969",
                                        fontSize: "12px",
                                        display: "inline-block",
                                      }}
                                    >
                                      {" "}
                                      ({acc.Accomodation_Name}{" "}
                                      {acc.Additional_Cost_Per_Day} ×{" "}
                                      {acc.No_of_Rooms_Reserved}){" "}
                                    </span>
                                  </td>
                                  <td className="breack-cost">
                                    <span style={{ fontSize: currencySize }}>{renderCurrencyIcon()}</span>{" "}
                                    {(
                                      acc.Additional_Cost_Per_Day *
                                      acc.No_of_Rooms_Reserved
                                    ).toFixed(2)}
                                  </td>
                                </tr>
                              )}
                              <tr>
                                <td>
                                  {" "}
                                  <span style={{ display: "inline-block", width: "50%" }}>
                                    GST{" "}
                                  </span>
                                  <span
                                    style={{
                                      color: "#696969",
                                      fontSize: "12px",
                                      display: "inline-block",
                                    }}
                                  >
                                    {" "}
                                    ({acc.Accomodation_Name} {acc.Tax_Percentage}%
                                    of Room Cost){" "}
                                  </span>
                                </td>
                                <td className="breack-cost">
                                  <span style={{ fontSize: currencySize }}>{renderCurrencyIcon()}</span>{" "}
                                  {(
                                    ((acc.Room_Cost_Per_Day *
                                      acc.No_of_Rooms_Reserved +
                                      acc.Service_Cost_Per_Day *
                                      acc.No_of_Rooms_Reserved +
                                      acc.Additional_Cost_Per_Day *
                                      acc.No_of_Rooms_Reserved) *
                                      acc.Tax_Percentage) /
                                    100
                                  ).toFixed(2)}
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}


                </>
              ) : (
                <div style={{ width: "100%", textAlign: "center" }}>

                  <img
                    src={Noresult}
                    alt="No Rooms  Selected"
                    style={{
                      height: "100px",
                      width: "50%",
                      textAlign: "center",
                      marginTop: "60px",
                    }}
                  />
                  <Typography
                    style={{
                      marginTop: "50px",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "#ff0000",
                    }}
                  >
                    {languageLabels?.bookingcart?.noRoomsSelected || "No Rooms Selected"}
                  </Typography>
                </div>
              )}

              <div>
                {selectedAccommodationIds.length > 0 && (
                  !IsLoggedIn ? (
                    <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>

                      <button

                        style={{ width: "100%", backgroundColor: "#4361ee", borderRadius: "10px", boxShadow: '0px 8px 16px   #b9b9b9', }}
                        onClick={doLogin}

                      >
                        Book Now
                      </button>
                    </div>
                  ) : (
                    <div>
                      {renderTermsAndBookingUI(handleProceedToPay)}
                    </div>
                  )
                )}
              </div>

            </div>
          </div>
        )}
      </div>



      <Dialog
        open={openReviews}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: "8px",
            minHeight: "400px",
            width: "650px",
            scrollbarWidth: "none",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Box>
          <DialogTitle
            style={{
              borderBottom: "1px solid #e3e3e3",
              padding: "16px",
              fontSize: "16px",
              fontWeight: 600,
              color: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              // backgroundColor: "#f5f5f5",
            }}
          >
            Ratings and Reviews
            <IconButton
              aria-label="close"
              onClick={handleDialogClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "#777",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        </Box>

        <DialogContent
          style={{
            padding: "10px",
            minHeight: "100%",
            overflowY: "auto",
          }}
        >
          {reviews.length === 0 ? (
            <Typography
              color="textSecondary"
              style={{ textAlign: "center", fontSize: "16px" }}
            >
              No reviews available.
            </Typography>
          ) : (
            reviews.map((review, index) => {
              const fullStars = Math.floor(review.rating);
              const hasHalfStar = review.rating % 1 !== 0;
              const totalStars = 5;
              return (
                <div
                  key={index}
                  style={{
                    marginBottom: "24px",
                    padding: "16px",
                    borderBottom: "1px solid #f0f0f0",
                    borderRadius: "8px", // Added rounded corners for each card
                    // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)", // Subtle shadow for each card
                    backgroundColor: "#f9f9f9", // Light background for each review
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%", // Ensures full width for proper spacing
                        marginBottom: "12px",
                      }}
                    >
                      {/* Left side: Avatar and Name */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          alt={review.customer_mail}
                          style={{ marginRight: "10px", width: 40, height: 40 }}
                        />
                        <div>
                          <Typography style={{ fontWeight: 600, fontSize: "14px", color: "#3e3e3e" }}>
                            {review.customer_name}
                          </Typography>
                          <Typography style={{ fontWeight: 400, color: "#3e3e3e", fontSize: "14px" }}>
                            {review.customer_mail}
                          </Typography>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "auto", // Pushes stars and rating to the right
                        }}
                      >
                        {[...Array(fullStars)].map((_, i) => (
                          <StarIcon key={i} style={{ color: "gold", fontSize: "18px" }} />
                        ))}
                        {hasHalfStar && <StarHalfIcon style={{ color: "gold", fontSize: "18px" }} />}
                        {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                          <StarIcon key={`empty-${i}`} style={{ color: "gray", fontSize: "18px" }} />
                        ))}
                      </div>

                      <Typography
                        variant="h6"
                        style={{
                          fontWeight: "600",
                          color: "#333",
                          marginLeft: "12px", // Ensures spacing from stars
                        }}
                      >
                        {review.rating}
                      </Typography>
                    </div>
                  </div>


                  <Typography
                    style={{
                      fontWeight: 600, fontSize: "14px", color: "#3e3e3e"
                    }}
                  >
                    Comments:
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      // marginBottom: "16px",
                      fontSize: "14px",
                      color: "#555",
                      lineHeight: "1.5", // Added line height for better readability
                    }}
                  >
                    {review.comment_feedback}
                  </Typography>
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
        <DialogContent>
          {mapLocation ? (
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
          <Button onClick={() => setOpenMapDialog(false)} style={{ backgroundColor: "#07799f" }} >Close</Button>
        </DialogActions>
      </Dialog>
    </div>

  );
};
export default BookingCart;
