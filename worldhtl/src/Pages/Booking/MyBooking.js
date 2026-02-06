import React, { useState, useEffect, useRef } from "react";
import { Button, Typography, Box, Card, CircularProgress, IconButton, Drawer, InputAdornment, ListItem, List, Avatar, Tooltip } from "@mui/material";
import { ArrowBack, Download, CancelOutlined, Close, ChatBubbleOutline, ArrowBackIosNew, CloseOutlined, ArrowForwardIos, UploadFile, AttachFile, Send, Chat } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Container, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, Select, MenuItem, Checkbox, ListItemText, TextField } from "@mui/material";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";
import axios from "axios";
import { getUserToken } from "../../components/Storage/localStorageService";
import logo from "../../assets/nivasa-logo.svg";
import { ErrorOutline } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import config from "../../config";
import Menu_1 from '../../assets/nivasa-logo.svg'

import noresult from '../../assets/Noresult.png'
import { FileIcon, FilePieChart, SearchIcon } from "lucide-react";
import chaticon from '../../assets/chaticon.png'
import Profile from '../../assets/Profile.svg'

import NoResult from '../../assets/NoResult.gif'

const API_BASE_URL = `${config.BASE_URL}`;

const MyBooking = () => {
  const hasFetchedBookings = useRef(false);

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelReasons, setCancelReasons] = useState([]);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [customReason, setCustomReason] = useState("");
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)"); // For tablet
  const [showDetails, setShowDetails] = useState(false);

  const LOCAL_STORAGE_KEY = "user";
  const userlogin = localStorage.getItem(LOCAL_STORAGE_KEY);

  const [searchParams, setSearchParams] = useState({ bookingid: '', mobileNumber: '' });
  const [booking, setBooking] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const token = localStorage.getItem('access_token');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };




  const FetchAllBookingChat = async () => {
    setLoading(true);

    if (!userlogin) {
      toast.info("User is not logged in!", { position: "top-right", hideProgressBar: true });
      navigate('/');
      return;
    }

    const parsedUser = JSON.parse(userlogin);
    const bookUserId = parsedUser.book_user_id;

    if (!selectedBooking || !selectedBooking.booking_id) {
      console.error("Selected booking is null or booking_id is missing.");
      setError("No booking selected.");
      setLoading(false);
      return; // Early return if selectedBooking is invalid
    }

    const BOOKING_HISTORY_URL = `${API_BASE_URL}/BookingUsers/getchat/${selectedBooking.booking_id}`;

    const token = getUserToken();
    if (!token) {
      toast.error("Session expired. Please log in again.", { position: "top-right", hideProgressBar: true });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(BOOKING_HISTORY_URL, {
        headers: { "Authorization": `Bearer ${token}` },
      });


      setMessages(response.data)
    } catch (error) {
      setError("Error fetching booking history");
      console.error("Error fetching booking history:", error);
      // toast.error("Error fetching booking history");
    } finally {
      setLoading(false);
    }
  };






  useEffect(() => {
    if (selectedBooking && selectedBooking.booking_id) {
      FetchAllBookingChat();
    }
  }, [selectedBooking]);


  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        console.log("Sending message:", newMessage);

        if (!selectedBooking) {
          console.error('No selected booking');
          return;
        }
        const token = getUserToken();
        if (!token) {
          toast.error("Session expired. Please log in again.", { position: "top-right", hideProgressBar: true });
          return;
        }

        const response = await fetch(API_BASE_URL + `/BookingUsers/createchat/${selectedBooking.booking_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: newMessage,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Failed to send message:', errorData);
          throw new Error(errorData.message || 'Failed to send message');
        }

        const responseData = await response.json();
        console.log('Message sent successfully:', responseData);
        FetchAllBookingChat(selectedBooking);
        setNewMessage('');
      } catch (error) {
        console.error('Error posting message:', error);
      }
    } else {
      console.log('Message cannot be empty');
    }
  };




  const reasonOptions = [
    "Change in Travel Plans",
    "Medical or Family Emergency",
    "Transport & Visa Issues",
    "Safety or Weather Concerns",
    "Better Pricing or Alternative Found",
    "Property or Host Issues",
    "Policy Restrictions",
    "Event or Purpose Cancellation",
    "Other"
  ];

  const fetchBookings = async () => {
    setLoading(true);
    if (!userlogin) {
      toast.info("User is not logged in!", { position: "top-right", hideProgressBar: true });
      navigate('/');
      return;
    }

    const parsedUser = JSON.parse(userlogin);
    const bookUserId = parsedUser.book_user_id;
    const BOOKING_HISTORY_URL = API_BASE_URL + `/BookingUsers/getBookingDetails/${bookUserId}`;

    const token = getUserToken();
    if (!token) {
      toast.error("Session expired. Please log in again.", { position: "top-right", hideProgressBar: true });
      return;
    }

    try {
      const response = await axios.get(BOOKING_HISTORY_URL, {
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (response.data.length > 0) {
        setBookings(response.data);
        setSelectedBooking(response.data[0]);
        setShowDetails(true);

        toast.success(response.data.Message || "Fetched Booking History Successfully");
      } else {
        setError("No Booking History");
        toast.error(response.data.Message || "No Booking History");
      }
    } catch (error) {
      setError("Error fetching booking history");
      toast.error("No booking history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedBookings.current) {
      fetchBookings();  // Only fetch if we haven't fetched yet
      hasFetchedBookings.current = true;
    }
  }, []);

  const handleOpenCancelDialog = () => {
    setCancelReasons([]);
    setCustomReason("");
    setOpenCancelDialog(true);
  };
  const handleCloseCancelDialog = () => {
    setCancelReasons([]);
    setCustomReason("");
    setOpenCancelDialog(false);
  };

  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;
    const userConfirmed = window.confirm("Are you sure you want to cancel this booking?");
    if (!userConfirmed) return;

    const requestBody = {
      booking_id: selectedBooking.booking_id,
      status: "Cancelled",
      reason: [...cancelReasons, customReason].filter(Boolean).join(", "),
    };

    try {
      const token = getUserToken();
      const response = await axios.put(`${API_BASE_URL}/BookingUsers/updateBookingStatusByUser`, requestBody, {
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (response.status === 200 || response.status === 201) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.booking_id === selectedBooking.booking_id ? { ...booking, status: "Cancelled" } : booking
          )
        );
        toast.success("Booking cancelled successfully");
        setOpenCancelDialog(false);
        await fetchBookings();
      }
    } catch (error) {
      toast.error("Failed to cancel booking. Please try again.");
    }
  };

  const handleReasonChange = (event) => {
    const selectedValues = event.target.value;
    setCancelReasons(selectedValues);
  };

  const handleCustomReasonChange = (event) => {
    setCustomReason(event.target.value);
  };

  const handleDownloadReceipt = () => {
    const doc = new jsPDF();
    const logoUrl = Menu_1; // Assuming this is the SVG URL
  
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const base64Image = canvas.toDataURL('image/png'); // Convert to PNG base64
  
      doc.addImage(base64Image, 'PNG', 20, 10, 50, 20); // Use 'PNG' or 'JPEG'
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(`Receipt for Booking ID: ${selectedBooking.booking_id}`, 20, 40);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
  
      doc.text(`Customer: ${selectedBooking.first_name} ${selectedBooking.last_name}`, 20, 50);
      doc.text(`Property Name: ${selectedBooking.property_name} `, 20, 60);
      doc.text(`Room Type : ${selectedBooking.accommodation_types} `, 20, 70);
      doc.text(`Booking ID: ${selectedBooking.booking_id}`, 20, 80);
      doc.text(`Booking Source: ${selectedBooking.booking_source}`, 20, 90);
      doc.text(`Duration: ${new Date(selectedBooking.checkin_date).toLocaleDateString()} - ${new Date(selectedBooking.checkout_date).toLocaleDateString()}`, 20, 100);
      doc.text(`Booking Date: ${new Date(selectedBooking.created_on).toLocaleDateString()}`, 20, 110);
      doc.text(`Guests: ${selectedBooking.total_guests}`, 20, 120);
      doc.text(`Paid Amount: ₹${selectedBooking.paid_amount}`, 20, 130);
  
      doc.save(`Booking_Receipt_${selectedBooking.booking_id}.pdf`);
    };
    img.src = logoUrl; 
  };
  

  const getStatusColor = (status) => {
    switch (status) {
      case "Booked": return "#079f5b";
      case "Cancelled": return "#ef2f1c";
      default: return "#939393";
    }
  };

  const clickedBooking = (booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  const handleOpenDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };


  const [openChat, setOpenChat] = useState(false);

  const handleChatIconClick = () => {
    setOpenChat(true);
  };

  const handleCloseChat = () => {
    setOpenChat(false);
  };

  const [isFullSummaryVisible, setIsFullSummaryVisible] = useState(false);

  const handleToggleSummary = () => {
    setIsFullSummaryVisible(prevState => !prevState);
  };




  if (loading) {
    return <CircularProgress style={{ display: "block", margin: "50px auto", minHeight: "50vh", padding: "13%" }} />;
  }


if (error) {
  return (
    <div
      style={{
        color: "#898989",
        textAlign: "center",
        minHeight: "50vh",
        padding: "13%",
      }}
    >
      <img
        style={{ height: "100px", width: "100px", marginBottom: "20px" }}
        src={NoResult}
        alt="No Booking History"
      />
      <Typography variant="body1">
        {error.message || "No Bookings History."}
      </Typography>
    </div>
  );
}

 

  return (
    <div >
      <div style={{ height: '50px', width: '100%', backgroundColor: '#4361ee' }}></div>

      <Container maxWidth="md" style={{ marginTop: isMobile ? 15 : 32 }} >
        <Typography
          variant="h6"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack fontSize="small" />
          </IconButton>
          My Bookings
        </Typography>

        <div
          style={{
            display: "flex",
            gap: "20px",
            borderRadius: "8px",
            overflow: "hidden",
            width: isMobile ? '100%' : '1000px',
            height: isMobile ? '100%' : '100%',
            flexDirection: isMobile ? 'column' : 'row',
            margin: "auto",
          }}
        >
          <div
            style={{
              width: isMobile ? "100%" : "320px",
              padding: "20px",
              borderRadius: "10px",
              // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              border: '1px solid #f0f0f0',


              flexShrink: 0,
              height: isMobile ? "auto" : "calc(65vh)",
              overflowY: "auto",

            }}
          >

            {bookings.length === 0 ? (
              <div style={{ textAlign: "center", padding: "20px", color: "#000", fontWeight: "bold" }}>
                No bookings available
              </div>
            ) : (
              bookings.map((booking, index) => (
                <Button
                  key={index}
                  fullWidth
                  style={{
                    marginBottom: "15px",
                    background: selectedBooking?.booking_id === booking.booking_id ? "#3a0ca3" : "#FFFFFF",
                    color: selectedBooking?.booking_id === booking.booking_id ? "#276F88" : "#333",
                    textTransform: "none",
                    padding: "15px",
                    fontWeight: "600",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    boxShadow: selectedBooking?.booking_id === booking.booking_id ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
                    textAlign: "left",
                    minHeight: "75px",
                    width: isMobile ? '300px' : "100%",
                    border: '1px solid #eaeaea'
                  }}
                  onClick={() => clickedBooking(booking)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <div style={{ flex: 1 }}>
                      <Typography
                        variant="body1"
                        style={{
                          fontWeight: "700",
                          color: selectedBooking?.booking_id === booking.booking_id ? "#ffffff" : "#424242",
                          textTransform: "capitalize"
                        }}
                      >
                        {booking.property_name.length > 28
                          ? booking.property_name.slice(0, 28) + "..."
                          : booking.property_name}
                      </Typography>

                      <Typography variant="body2" style={{
                        color: selectedBooking?.booking_id === booking.booking_id ? "#ffffff" : "#707070",
                      }}>
                        ({booking.booking_id})
                      </Typography>
                    </div>
                  </div>

                  <div style={{ marginTop: "5px", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <span
                      style={{
                        background: getStatusColor(booking.status),
                        color: "#fff",
                        padding: "4px 10px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "600",
                        flex: "0 1 auto",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {booking.status}
                    </span>
                    <Typography variant="body2"
                      style={{
                        color: selectedBooking?.booking_id === booking.booking_id ? "#ffffff" : "#707070",
                        textAlign: "right", marginLeft: "auto"
                      }}
                    >
                      {new Date(booking.created_on).toLocaleDateString("en-GB")}
                    </Typography>
                  </div>
                </Button>
              ))
            )}

          </div>

          {
            !isMobile ? (
              <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: "#f3f3ff", padding: "20px", borderRadius: '10px', width: '100%', border: '1px solid #e3e3f8', height: "100%", maxHeight: "480px", overflowY: 'auto' }}>
                <div>


                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",

                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{ fontWeight: 700, color: "#1C1C1C", textTransform: "capitalize" }}
                    >
                      {selectedBooking.property_name} ({selectedBooking.booking_id})
                    </Typography>

                    <span
                      style={{
                        background: getStatusColor(selectedBooking.status),
                        color: "#fff",
                        padding: "7px 10px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "600",
                        height: isMobile ? "35px" : '100%'

                      }}
                    >
                      {selectedBooking.status}
                    </span>
                  </div>


                  {/* <div style={{ marginBottom: '20px' }}>
                    <Typography
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        width: isMobile ? '100%' : '48%',
                        minWidth: '150px',
                        marginBottom: "10px"

                      }}
                    >
                      Room Type:
                      <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '40px' }}>
                        {selectedBooking.accommodation_types.join(", ")}
                      </span>
                    </Typography>
                    <Typography
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        width: '100%',
                        minWidth: '150px',
                        marginBottom: "10px"
                      }}
                    >
                      Address:
                      <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '60px' }}>
                        {selectedBooking.address}
                      </span>
                    </Typography>
                    <Typography
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        width: "100%",
                        marginBottom: "10px"

                      }}
                    >
                      City:
                      <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '92px' }}>
                        {selectedBooking.city}
                      </span>
                    </Typography>
                    <Typography
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        display: isMobile ? 'flex' : 'inline-block',
                        width: '100%',
                        minWidth: '150px',
                        marginBottom: '12px',

                      }}
                    >
                      Duration:
                      <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: isMobile ? '55px' : '58px' }}>
                        {new Date(selectedBooking.checkin_date).toLocaleDateString("en-GB")} -
                        {new Date(selectedBooking.checkout_date).toLocaleDateString("en-GB")}
                      </span>
                    </Typography>

                    <Typography
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        width: '48%',
                        minWidth: '150px',
                        marginBottom: '12px',

                      }}
                    >
                      Guests:
                      <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '70px' }}>
                        {selectedBooking.total_guests}
                      </span>
                    </Typography>

                    <Typography
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        display: 'inline-block',
                        width: '48%',
                        minWidth: '150px',
                      }}
                    >
                      Paid Amount:
                      <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '28px' }}>
                        ₹ {selectedBooking.paid_amount}
                      </span>
                    </Typography>
                  </div> */}

                  <div style={{ marginBottom: '20px' }}>
                    <Typography
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        width: isMobile ? '100%' : '48%',
                        minWidth: '150px',
                        marginBottom: "10px"
                      }}
                    >
                      Room Type:
                      <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '40px' }}>
                        {selectedBooking.accommodation_types.join(", ")}
                      </span>
                    </Typography>

                    <Typography
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        width: '100%',
                        minWidth: '150px',
                        marginBottom: "10px"
                      }}
                    >
                      Address:
                      <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '60px' }}>
                        {selectedBooking.address}
                      </span>
                    </Typography>

                    <Typography
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        width: "100%",
                        marginBottom: "10px"
                      }}
                    >
                      City:
                      <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '92px' }}>
                        {selectedBooking.city}
                      </span>
                    </Typography>

                    <Typography
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        display: isMobile ? 'flex' : 'inline-block',
                        width: '100%',
                        minWidth: '150px',
                        marginBottom: '12px',
                      }}
                    >
                      Duration:
                      <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: isMobile ? '55px' : '58px' }}>
                        {new Date(selectedBooking.checkin_date).toLocaleDateString("en-GB")} -
                        {new Date(selectedBooking.checkout_date).toLocaleDateString("en-GB")}
                      </span>
                    </Typography>

                    <Typography
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        width: '48%',
                        minWidth: '150px',
                        marginBottom: '12px',
                      }}
                    >
                      Guests:
                      <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '70px' }}>
                        {selectedBooking.total_guests}
                      </span>
                    </Typography>

                    <Typography
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        display: 'inline-block',
                        width: '48%',
                        minWidth: '150px',
                      }}
                    >
                      Paid Amount:
                      <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '28px' }}>
                        ₹ {selectedBooking.paid_amount}
                      </span>
                    </Typography>

                    <Button
                      variant="text"
                      onClick={handleToggleSummary}
                      style={{ marginTop: '10px' ,textTransform:"capitalize",color:"#3e3e3e",textDecoration:"underline"}}
                    >
                      {isFullSummaryVisible ? 'See Less' : 'See More'}
                    </Button>

                    {/* Full Summary (Conditional Rendering) */}
                    {isFullSummaryVisible && (
                      <>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            width: '48%',
                            minWidth: '150px',
                            marginBottom: '12px',
                          }}
                        >
                          No of Days:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '35px' }}>
                            {selectedBooking.booking_cost.No_of_Days}
                          </span>
                        </Typography>

                        <Typography
                          style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            width: '48%',
                            minWidth: '150px',
                            marginBottom: '12px',
                          }}
                        >
                          No of Persons:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '35px' }}>
                            {selectedBooking.booking_cost.No_of_Persons}
                          </span>
                        </Typography>

                        <Typography
                          style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            width: '48%',
                            minWidth: '150px',
                            marginBottom: '12px',
                          }}
                        >
                          Payable Amount:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '28px' }}>
                            ₹ {selectedBooking.booking_cost.Payable_Amount}
                          </span>
                        </Typography>

                        <Typography
                          style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            width: '48%',
                            minWidth: '150px',
                            marginBottom: '12px',
                          }}
                        >
                          Pending Amount:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '28px' }}>
                            ₹ {selectedBooking.booking_cost.Pending_Amount}
                          </span>
                        </Typography>

                        <Typography
                          style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            width: '48%',
                            minWidth: '150px',
                            marginBottom: '12px',
                          }}
                        >
                          Total Booking Cost:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '28px' }}>
                            ₹ {selectedBooking.booking_cost.Total_Booking_Cost}
                          </span>
                        </Typography>

                        <Typography
                          style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            width: '48%',
                            minWidth: '150px',
                            marginBottom: '12px',
                          }}
                        >
                          Total GST Cost:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '28px' }}>
                            ₹ {selectedBooking.booking_cost.Total_GST_Cost}
                          </span>
                        </Typography>

                        <Typography
                          style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            width: '48%',
                            minWidth: '150px',
                            marginBottom: '12px',
                          }}
                        >
                          Total Rooms Cost:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '28px' }}>
                            ₹ {selectedBooking.booking_cost.Total_Rooms_Cost}
                          </span>
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            width: '48%',
                            minWidth: '150px',
                            marginBottom: '12px',
                          }}
                        >
                          Discount:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '35px' }}>
                            {selectedBooking.booking_cost.Discount}
                          </span>
                        </Typography>

                        <Typography
                          style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            width: '48%',
                            minWidth: '150px',
                            marginBottom: '12px',
                          }}
                        >
                          Total Service Additional Cost:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '28px' }}>
                            ₹ {selectedBooking.booking_cost.Total_Service_Additional_Cost}
                          </span>
                        </Typography>
                      </>
                    )}
                  </div>


                  <Typography style={{ fontWeight: 600, fontSize: "16px", marginTop: "10px" }}>Guest Details:</Typography>
                  <div style={{ display: isMobile ? 'inline' : 'flex', gap: "50px" }}>
                    <Typography>{selectedBooking.first_name} {selectedBooking.last_name}</Typography>
                    <Typography>{selectedBooking.mobile}</Typography>
                    <Typography>{selectedBooking.email}</Typography>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: isMobile ? 'center' : "space-between",
                    // flexWrap: "wrap",
                    gap: "10px",
                    marginTop: '90px',

                  }}
                >

                  {selectedBooking.status === "Booked" && (
                    <Button
                      variant="text"
                      style={{
                        color: "#4361ee",
                        textTransform: "capitalize",
                        borderRadius: "8px",
                        fontWeight: "600",
                        padding: "10px 15px",
                        fontSize: isMobile ? '12px' : "14px",
                        minWidth: "90px",
                        display: "flex",
                        alignItems: "center",
                        // marginTop:isMobile?"15px":'0px'
                      }}
                      onClick={() => {
                        handleOpenCancelDialog();
                        handleOpenDetails();
                      }}
                    >
                      Cancel Booking
                    </Button>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>


                    <Button
                      variant="text"
                      style={{
                        textTransform: "capitalize",
                        fontWeight: "600",
                        padding: isMobile ? '5px 5px' : "10px 15px",
                        fontSize: isMobile ? '12px' : "14px",
                        minWidth: "90px",
                        borderRadius: "8px",
                        color: "#4361ee",
                        border: "1px solid #4361ee",

                        display: "flex",
                        alignItems: "center",
                        height: isMobile ? '40px' : '40px'
                      }}
                      onClick={() => {
                        handleDownloadReceipt();
                        handleOpenDetails();
                      }}
                    >
                      Download Receipt
                    </Button>
                    <Button onClick={handleChatIconClick} style={{
                      backgroundColor: "#4361ee", color: "#fff", textTransform: "capitalize",
                      fontSize: "14px",
                      minWidth: "90px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      height: isMobile ? '40px' : '40px',
                      padding: "0px 16px 0px 16px"

                    }}>
                      <Chat style={{ fontSize: "16px", marginRight: "5px" }} /> Contact Property
                    </Button>
                  </div>



                </div>
              </div>


            ) : (
              <Dialog
                open={showDetails}
                onClose={() => setShowDetails(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                  style: {
                    borderRadius: "10px",
                    minHeight: "450px",
                    width: "550px",
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                  <DialogTitle style={{ fontSize: "18px" }}>
                    Booking Details
                  </DialogTitle>
                  <IconButton onClick={() => setShowDetails(false)}>
                    <Close />
                  </IconButton>
                </Box>

                <DialogContent style={{ padding: "0px 24px" }}>
                  <Typography style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>

                    {selectedBooking?.property_name} ({selectedBooking?.booking_id})
                  </Typography>
                  <span
                    style={{
                      background: getStatusColor(selectedBooking.status),
                      color: "#fff",
                      padding: "7px 10px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "600",
                      // height: isMobile ? "35px" : '100%'

                    }}
                  >
                    {selectedBooking.status}
                  </span>



                  <Typography variant="body1" style={{ marginTop: "20px" }}>Room Type: {selectedBooking?.accommodation_types?.join(", ")}</Typography>
                  <Typography variant="body1">Duration: {new Date(selectedBooking?.checkin_date).toLocaleDateString("en-GB")} - {new Date(selectedBooking?.checkout_date).toLocaleDateString("en-GB")}</Typography>
                  <Typography variant="body1">Guests: {selectedBooking?.total_guests}</Typography>
                  <Typography variant="body1">Paid Amount: ₹ {selectedBooking?.paid_amount}</Typography>
                  <Button
                      variant="text"
                      onClick={handleToggleSummary}
                      style={{ marginTop: '10px' ,textTransform:"capitalize",color:"#3e3e3e",textDecoration:"underline"}}
                    >
                      {isFullSummaryVisible ? 'See Less' : 'See More'}
                    </Button>
                  {isFullSummaryVisible && (
                      <>
                        <Typography
                         
                        >
                          No of Days:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '35px' }}>
                            {selectedBooking.booking_cost.No_of_Days}
                          </span>
                        </Typography>

                        <Typography
                         
                        >
                          No of Persons:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '35px' }}>
                            {selectedBooking.booking_cost.No_of_Persons}
                          </span>
                        </Typography>

                        <Typography
                        
                        >
                          Payable Amount:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '28px' }}>
                            ₹ {selectedBooking.booking_cost.Payable_Amount}
                          </span>
                        </Typography>

                        <Typography
                         
                        >
                          Pending Amount:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '28px' }}>
                            ₹ {selectedBooking.booking_cost.Pending_Amount}
                          </span>
                        </Typography>

                        <Typography
                         
                        >
                          Total Booking Cost:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '28px' }}>
                            ₹ {selectedBooking.booking_cost.Total_Booking_Cost}
                          </span>
                        </Typography>

                        <Typography
                         
                        >
                          Total GST Cost:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '28px' }}>
                            ₹ {selectedBooking.booking_cost.Total_GST_Cost}
                          </span>
                        </Typography>

                        <Typography
                         
                        >
                          Total Rooms Cost:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '28px' }}>
                            ₹ {selectedBooking.booking_cost.Total_Rooms_Cost}
                          </span>
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            width: '48%',
                            minWidth: '150px',
                            marginBottom: '12px',
                          }}
                        >
                          Discount:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '35px' }}>
                            {selectedBooking.booking_cost.Discount}
                          </span>
                        </Typography>

                        <Typography
                         
                        >
                          Total Service Additional Cost:
                          <span style={{ fontWeight: 400, fontSize: "14px", marginLeft: '28px' }}>
                            ₹ {selectedBooking.booking_cost.Total_Service_Additional_Cost}
                          </span>
                        </Typography>
                      </>
                    )}
                  <Typography style={{ fontWeight: 600, fontSize: "16px", marginTop: "10px" }}>Guest Details:</Typography>
                  <div style={{ display: isMobile ? 'inline' : 'flex', gap: "50px" }}>
                    <Typography>{selectedBooking.first_name} {selectedBooking.last_name}</Typography>
                    <Typography>{selectedBooking.mobile}</Typography>
                    <Typography>{selectedBooking.email}</Typography>
                  </div>


                </DialogContent>
                <Button
                  // variant="outlined"
                  style={{
                    textTransform: "capitalize",
                    fontWeight: "600",
                    // padding:"8px 16px",
                    fontSize: "14px",
                    border: "1px solid #4361ee",
                    width: "100px",
                    borderRadius: "8px",
                    marginLeft: "20px",
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    color: "#4361ee",
                    height: isMobile ? '40px' : '40px'
                  }}
                  onClick={() => {
                    handleDownloadReceipt();
                    handleOpenDetails();
                  }}
                >
                  Download
                </Button>
                <DialogActions style={{ padding: "16px 24px ", justifyContent: 'space-between', marginTop: "60px", height: "100%" }}>
                  {selectedBooking.status === "Booked" && (
                    <Button
                      variant="text"
                      style={{
                        color: "#4361ee",
                        textTransform: "capitalize",
                        borderRadius: "8px",
                        fontWeight: "600",
                        padding: "8px 16px",
                        fontSize: "14px",
                        minWidth: "90px",
                        display: "flex",
                        alignItems: "center",
                        // marginTop:isMobile?"15px":'0px'
                      }}
                      onClick={() => {
                        handleOpenCancelDialog();
                        handleOpenDetails();
                      }}
                    >
                      Cancel Booking
                    </Button>
                  )}

                  <Button onClick={handleChatIconClick} style={{
                    backgroundColor: "#4361ee", color: "#fff", textTransform: "capitalize",
                    fontSize: "14px",
                    minWidth: "90px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    height: isMobile ? '40px' : '100%'

                  }}>
                    <Chat style={{ fontSize: "14px", marginRight: "5px" }} /> Contact
                  </Button>


                </DialogActions>
              </Dialog>

            )
          }

        </div>
      </Container >
      <Box sx={{ height: "300px", backgroundColor: "#fffff", textAlign: "center", lineHeight: "100px" }}>
      </Box>
      <Dialog
        open={openCancelDialog}
        onClose={handleCloseCancelDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: "12px",
            minHeight: "450px",
            width: "550px",
          },
        }}
      >
        <DialogTitle borderBottom="1px solid #d3d3d3" fontSize='16px' justifyContent='space-between' display='flex'>
          <Typography marginTop='8px'>  Cancel Booking</Typography>
          <IconButton onClick={handleCloseCancelDialog} >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ padding: "0px", margin: "25px" }}>
          <Typography mb={2}><span style={{ fontWeight: "bolder" }}> Booking ID: </span> {selectedBooking?.booking_id}</Typography>

          <FormControl fullWidth>
            <Select
              multiple
              value={cancelReasons}
              onChange={handleReasonChange}
              renderValue={(selected) => selected.join(", ")}
              style={{
                background: "#F6F6F6",
                borderRadius: "6px",
                height: "40px",
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: "auto",
                  },
                },
              }}
            >
              {reasonOptions.map((reason) => (
                <MenuItem key={reason} value={reason}>
                  <Checkbox checked={cancelReasons.includes(reason)} />
                  <ListItemText primary={reason} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {cancelReasons.includes("Other") && (
            <>
              <Typography variant="body2" style={{ marginTop: "15px", color: "#555" }}>
                Enter your reason (optional):
              </Typography>
              <TextField
                fullWidth
                value={customReason}
                onChange={handleCustomReasonChange}
                label="Type your reason here..."
                variant="outlined"
                size="small"
                style={{ marginTop: "5px" }}
                InputProps={{
                  style: { height: "90px" },
                }}
              />
            </>
          )}
          <div style={{ display: 'flex', gap: "4px", marginTop: "6px" }}>

            <ErrorOutline style={{ color: "#4361ee", }} />
            <Typography style={{ textAlign: 'start', width: "100%" }} >
              Refund will be processed to your Wallet.
            </Typography>
          </div>

        </DialogContent>
        <hr />
        <DialogActions style={{ padding: "0px 24px 16px" }}>
          <Button
            onClick={handleConfirmCancel}
            disabled={cancelReasons.length === 0}
            style={{
              background: cancelReasons.length > 0 ? "#4361ee" : "#e7e7e7",
              color: cancelReasons.length > 0 ? "#fff" : '#c4c4c4',
              marginBottom: "5px",
              borderRadius: "6px",
              width: "170px",
              textTransform: "capitalize",
            }}
          >
            Confirm Cancellation
          </Button>
        </DialogActions>
      </Dialog>


      {
        isMobile ?
          <Dialog open={openChat} fullWidth sx={{
            '& .MuiDialog-paper': {
              borderRadius: '8px',            // Rounded corners
              width: '100%',                   // Full width of the dialog container
              height: '100%',
              maxHeight: "540px",                  // Full height of the dialog container
              overflow: 'hidden',              // Prevents content from overflowing
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Light shadow around the dialog
              background: '#fff',              // White background color
              display: 'flex',                  // Flexbox layout
              flexDirection: 'column',         // Stack items vertically
              justifyContent: 'space-between', // Distribute space evenly between elements
              position: "relative"             // Ensure elements are positioned within the dialog
            },
          }}>

            <DialogTitle sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#3047EC',
              justifyContent: "space-between",
              display: 'flex',
              maxHeight: "65px",
              padding: "16px"

            }}>

              <Box sx={{ display: "flex", alignContent: 'center', textAlign: 'center' }}>

                <IconButton style={{ color: "#fff" }} onClick={handleCloseChat} >
                  <ArrowBackIosNew style={{ fontSize: "16px" }} />
                </IconButton> <Typography variant="h6" fontSize='16px' marginTop={0.4}>
                  Chat( {selectedBooking?.property_name})
                </Typography>
              </Box>
              <Box>
                <IconButton style={{ color: "#fff", fontSize: "16px", marginTop: "-5px" }} onClick={handleCloseChat} >

                  <CloseOutlined />
                </IconButton>
              </Box>


            </DialogTitle>

            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                borderBottom: '1px solid #e3e3e3',
              }}
            >
              <List
                sx={{
                  flexGrow: 1,
                  maxHeight: '500px',
                  overflowY: 'auto',
                  padding: 0,
                  marginBottom: '1rem',
                }}
              >
                {messages && Array.isArray(messages) && messages.length > 0 ? (
                  messages.map((message) => (
                    <ListItem
                      key={message.chat_id}
                      sx={{
                        display: 'flex',
                        justifyContent: message.is_guest === false ? 'flex-start' : 'flex-end',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {/* Avatar for guests */}
                      {message.is_guest === false && (
                        <Box sx={{ marginRight: '10px' }}>
                          <Avatar
                            sx={{ height: "32px", width: "32px" }}
                            src={Profile}
                          >
                          </Avatar>
                        </Box>
                      )}

                      {/* Message content */}
                      <ListItemText
                        primary={message.message}
                        // secondary={
                        //   message.is_guest:message.admin_role || 'Unknown Admin'
                        // }
                        sx={{
                          backgroundColor: message.is_guest === true ? '#E5EEFF' : '#F2F2F2',
                          color: message.is_guest === true ? '#013499' : '#000000',
                          borderRadius: '6px',
                          padding: '12px 14px',
                          maxWidth: '75%',
                          wordWrap: 'break-word',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        {!message.is_guest && (
                          <div
                            style={{
                              fontSize: '12px',
                              marginTop: '5px',
                              fontStyle: 'italic',
                              color: '#7A7A7A',
                            }}
                          >
                            {message.admin_role || 'Unknown Role'}
                          </div>
                        )}
                      </ListItemText>
                    </ListItem>
                  ))
                ) : (
                  <Typography sx={{ textAlign: 'center', color: '#888', marginTop: '200px' }}>
                    No messages
                  </Typography>
                )}
              </List>
            </DialogContent>

            <DialogActions sx={{
              padding: '1rem',
              justifyContent: 'space-between',
              alignItems: 'center',
              display: 'flex',
            }}>
              <Box display="flex" alignItems="center" sx={{ width: "100%", }}>


                <TextField
                  placeholder="Type a message......"
                  fullWidth
                  variant="standard"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  sx={{
                    marginRight: '1rem',
                    border: 'none',
                    '& .MuiOutlinedInput-root': {
                      border: 'none',
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '10px',
                    },
                  }}
                  InputProps={{
                    // startAdornment: (
                    //   <InputAdornment position="start">
                    //     <IconButton sx={{ padding: 0 }}>
                    //       <AttachFile style={{ color: "#898989" }} />
                    //     </IconButton>
                    //   </InputAdornment>
                    // ),
                    disableUnderline: true,
                  }}
                />




                <IconButton
                  onClick={handleSendMessage}
                  color="primary"
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    backgroundColor: "none",
                    background: "none",
                  }}
                >
                  <Send />
                </IconButton>
              </Box>

            </DialogActions>
          </Dialog>
          :
          <Drawer open={openChat} anchor="bottom" fullWidth maxWidth="sm" sx={{
            '& .MuiDrawer-paper': {
              borderRadius: '10px',
              maxHeight: "500px",
              minWidth: "400px",
              width: '500px',
              height: '500px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              background: '#fff',
              left: "20px",
              bottom: "50px",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            },
          }}>
            <DialogTitle sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#3047EC',
              justifyContent: "space-between",
              display: 'flex',
              maxHeight: "65px",
              padding: "16px"

            }}>

              <Box sx={{ display: "flex", alignContent: 'center', textAlign: 'center' }}>

                <IconButton style={{ color: "#fff" }} onClick={handleCloseChat} >
                  <ArrowBackIosNew style={{ fontSize: "18px" }} />
                </IconButton> <Typography variant="h6" marginTop={0.2} marginLeft={3}>
                  Chat( {selectedBooking?.property_name})
                </Typography>
              </Box>
              <Box>
                <IconButton style={{ color: "#fff" }} onClick={handleCloseChat} >

                  <CloseOutlined />
                </IconButton>
              </Box>


            </DialogTitle>



            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                borderBottom: '1px solid #e3e3e3',
              }}
            >
              <List
                sx={{
                  flexGrow: 1,
                  maxHeight: '500px',
                  overflowY: 'auto',
                  padding: 0,
                  marginBottom: '1rem',
                }}
              >
                {messages && Array.isArray(messages) && messages.length > 0 ? (
                  messages.map((message) => (
                    <ListItem
                      key={message.chat_id}
                      sx={{
                        display: 'flex',
                        justifyContent: message.is_guest === false ? 'flex-start' : 'flex-end',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {message.is_guest === false && (
                        <Box sx={{ marginRight: '10px' }}>
                          <Avatar
                            sx={{ height: "32px", width: "32px" }}
                            src={Profile}
                          >
                          </Avatar>
                        </Box>
                      )}

                      <ListItemText
                        primary={message.message}
                        // secondary={
                        //   message.is_guest
                        //     ? message.user_name || 'Customer'
                        //     : message.admin_role || 'Unknown Admin'
                        // }
                        sx={{
                          backgroundColor: message.is_guest === true ? '#E5EEFF' : '#F2F2F2',
                          color: message.is_guest === true ? '#013499' : '#000000',
                          borderRadius: '6px',
                          padding: '12px 14px',
                          maxWidth: '75%',
                          wordWrap: 'break-word',
                          display: 'flex',
                          fontSize: "14px",
                          flexDirection: 'column',
                        }}
                      >
                        {!message.is_guest && (
                          <div
                            style={{
                              fontSize: '12px',
                              marginTop: '5px',
                              fontStyle: 'italic',
                              color: '#7A7A7A',
                            }}
                          >
                            {message.admin_role || 'Unknown Role'}
                          </div>
                        )}
                      </ListItemText>
                    </ListItem>
                  ))
                ) : (
                  <Typography sx={{ textAlign: 'center', color: '#888', marginTop: '200px' }}>
                    No messages
                  </Typography>
                )}
              </List>
            </DialogContent>



            <DialogActions sx={{
              padding: '1rem',
              justifyContent: 'space-between',
              alignItems: 'center',
              display: 'flex',
            }}>
              <Box display="flex" alignItems="center" sx={{ width: "100%", }}>


                <TextField
                  placeholder="Type a message......"
                  fullWidth
                  variant="standard"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  sx={{
                    marginRight: '1rem',
                    border: 'none',
                    '& .MuiOutlinedInput-root': {
                      border: 'none',
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '10px',
                      fontSize: "14px"
                    },
                  }}
                  InputProps={{

                    disableUnderline: true,
                  }}

                />




                <IconButton
                  onClick={handleSendMessage}
                  color="primary"
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    backgroundColor: "none",
                    background: "none",
                  }}
                >
                  <Send />
                </IconButton>
              </Box>

            </DialogActions>
          </Drawer>
      }

    </div >
  );
};

export default MyBooking;
