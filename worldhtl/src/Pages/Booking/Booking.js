import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Divider, Grid, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, Avatar, Menu, MenuItem, ListItemIcon } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';

import { Card } from "react-bootstrap";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import logowfh from "../../assets/nivasa-logo.svg";
import { Link } from "@mui/material";
import { doesSectionFormatHaveLeadingZeros } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';
import { AccountCircle, CancelOutlined, CancelRounded, ExitToApp, Login } from '@mui/icons-material';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import config from "../../config";
import { toast } from 'react-toastify';
const API_BASE_URL = `${config.BASE_URL}`;
const Booking = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    roomTitle,
    pricePerNight,
    total,
    totalguests,
    checkin_fromDate,
    checkout_toDate,
    city,
    guests,
    fromDate,
    toDate,
    property_id,
    name,
    accommodation_id
  } = location.state || {};
  console.log(name, accommodation_id);
  const [isVerified, setIsVerified] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [openOtpDialog, setOpenOtpDialog] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [newNumber, setNewNumber] = useState(mobileNumber);

  const handleOtpVerification = () => {
    // Logic to verify OTP
    setIsOtpVerified(true); 
    setIsVerified(true);// Set OTP as verified once successful
  };

  const handleVerifyMobile = () => {
    if (mobileNumber.length === 10) {
      setMobileVerified(true);
      setOpenDialog(true);
    } else {
      toast.error('Please enter a valid mobile number.');
    }
  };

  const handleVerifyEmail = () => {
    if (email.includes('@')) {
      setEmailVerified(true);
      setOpenDialog(true);
      toast.success('Email verified!');
    } else {
      toast.error('Please enter a valid email address.');
    }
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    toast.success('OTP sent successfully!');
    setOpenOtpDialog(true);
    
  };

  const handleSubmitOtp = () => {
    console.log('OTP:', otp);
    toast.success('OTP verified!');
    setOpenOtpDialog(false);
  };

  const handleProceedToPay = async () => {


    const bookingData = {
      property_id: property_id,
      checkin_date: fromDate,
      checkout_date: toDate,
      total_guests: totalguests,
      no_of_kids: 0,
      booking_source: "WorldOfHostels",
      booking_commission: 0,
      count_of_accommodation: 1,
      accommodation_ids: [accommodation_id],
      total_guests: guests,
      booking_customer_details: [
        {
          name: `${firstName} ${lastName}`,
          mobile: mobileNumber,
          email,
          city,
        },
      ],
      paid_amount: 0,
    };

    try {
      const response = await fetch(API_BASE_URL+'/booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Booking created successfully!');
      } else {
        toast.error(`Error creating booking: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  const loginButtonHoverStyle = {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
  };

  const handleEditNumber = () => {
    console.log('edit');


  }

  const handleVerifyNumber = () => {
    // Simulate the verification process
   
  };

  const handleBack = () => {
    setOpenOtpDialog(true);
  }

  const handleSaveNumber = () => {
    // Logic to save the new number
    console.log("New number saved:", newNumber);
    setIsEditing(false);
  }
  const handleclick = () => {
    navigate('/login')
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/userprofile'); // Navigate to Profile page
    handleClose();
  };

  const handleLogin = () => {
    navigate('/login'); // Navigate to Login page
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data
    navigate('/login'); // Redirect to login page
    handleClose();
  };

  return (
    <>
      <header className="headerStyle">
        <Link to="/" className="logoStyle">
          <img src={logowfh} alt="Nivasa Logo" />
        </Link>



        <Avatar
        sx={{ cursor: 'pointer' }}
        onClick={handleClick}
        src="https://via.placeholder.com/40" // Replace with user profile image
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleProfile}>
         
          My Profile
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogin}>
        
          Login
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          
          Logout
        </MenuItem>
      </Menu>



      </header>

      <div className="booking-container" style={{ padding: '60px 0px 20px 60px', background: 'linear-gradient(to bottom, #079F5B 40%, transparent 20%)' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <div className="booking-details" style={{ padding: '20px', borderRadius: "10px", boxShadow: "0px 0px 8px #C9C9C9", backgroundColor: "#FFFFFF" }}>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex">
                  <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{ fontSize: "30px" }} />
                  </IconButton>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Confirm Order</Typography>
                </Box>
                <Button style={{ textTransform: 'capitalize' }}
                  onClick={handleclick}
                >Login to your Account</Button>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 2 }}>Booking Details</Typography>
              <Box sx={{ background: '#F0F0F0', padding: 2, borderRadius: 2, marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{name}</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">Room Type:</Typography>
                    <Typography variant="body1">{roomTitle}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">Duration:</Typography>
                    <Typography variant="body1">{fromDate} - {toDate}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">Guests:</Typography>
                    <Typography variant="body1">{guests}</Typography>
                  </Grid>
                </Grid>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 2 }}>Personal Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      endAdornment: isVerified && (
                        <InputAdornment position="end">
                          <CheckCircleIcon color="success" />
                        </InputAdornment>
                      ),
                    }}
                  />
                
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid sx={{ padding: '100px 100px 40px 40%', gap: '40px' }}>

                <Button onClick={handleVerifyMobile} sx={{ color: 'white', fontSize: 14, backgroundColor: '#07799f', textTransform: 'capitalize', }}>
                  Verify Phone
                </Button>
                <Button onClick={handleVerifyEmail} variant='text' sx={{ color: '#07799f', fontSize: 14, textTransform: 'capitalize' }}>
                  Verify Email
                </Button>

              </Grid>
              <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                sx={{
                  "& .MuiPaper-root": {
                    padding: 2,
                    borderRadius: 2,
                    maxWidth: 400,
                    width: "100%",
                  },
                }}
              >
                <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
                  Verify Mobile Number
                </DialogTitle>
                <DialogContent sx={{ textAlign: "center" }}>
                  {!isEditing ? (
                    // Default View
                    <>
                      <Typography sx={{ mb: 2 }}>
                        OTP will be sent to your mobile number <strong>{mobileNumber}</strong>.
                      </Typography>
                      <Button
                        onClick={handleSendOtp}
                        sx={{
                          backgroundColor: "#07799f",
                          color: "#fff",
                          padding: "10px 20px",
                          borderRadius: 1,
                          fontSize: 14,
                          fontWeight: "bold",
                          textTransform: 'capitalize',
                          "&:hover": {
                            backgroundColor: "#07799f",
                          },
                        }}
                      >
                        Send OTP
                      </Button>
                      <Typography
                        component="a"
                        onClick={() => setIsEditing(true)} // Switch to editing view
                        sx={{
                          mt: 2,
                          display: "block",
                          color: "#07799f",
                          cursor: "pointer",
                          fontSize: 14,
                          textTransform: 'capitalize',
                        }}
                      >
                        Edit Number
                      </Typography>
                    </>
                  ) : (
                    // Editing View
                    <>
                      <Typography sx={{ mb: 2 }}>Enter your new mobile number:</Typography>
                      <TextField
                        fullWidth
                        value={newNumber}
                        onChange={(e) => setNewNumber(e.target.value)}
                        variant="outlined"
                        placeholder="Enter mobile number"
                        sx={{
                          mb: 2,
                        }}
                      />
                      <Button
                        onClick={handleSaveNumber}
                        sx={{
                          backgroundColor: "#07799f",
                          color: "#fff",
                          padding: "10px 20px",
                          borderRadius: 1,
                          fontSize: 14,
                          textTransform: 'capitalize',
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "#07799f",
                          },
                        }}
                      >
                        Save Number
                      </Button>
                    </>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setOpenDialog(false)}
                    sx={{ color: "gray", fontSize: 14, textTransform: 'capitalize', }}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>


              <Dialog
                open={openOtpDialog}
                onClose={() => setOpenOtpDialog(false)}
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: 2,
                    maxWidth: 400,
                    width: "100%",
                  },
                }}
              >
                <DialogTitle
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: '#dedede'
                  }}
                >
                  <Button
                    onClick={handleBack}
                    sx={{
                      minWidth: "auto",
                      padding: 0,
                      marginRight: 1,
                      color: "#000",
                      fontSize: '20px'
                    }}
                  >
                    <ArrowBackIcon />
                  </Button>
                  <Typography sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>
                    Verify Mobile Number
                  </Typography>
                  <Button
                    onClick={() => setOpenOtpDialog(false)}
                    sx={{ minWidth: "auto", padding: 0, color: "#000" }}
                  >
                    <CancelRounded />
                  </Button>
                </DialogTitle>
                <DialogContent sx={{ textAlign: "center" }}>
                  <Typography sx={{ mb: 2, mt: 4 }}>
                    Enter the OTP sent to <strong>{mobileNumber}</strong>.
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 3, border: 'none' }}>
                    {[...Array(6)].map((_, index) => (
                      <TextField
                        style={{ border: 'none' }}
                        key={index}
                        inputProps={{
                          maxLength: 1,
                          style: { textAlign: "center", fontSize: "18px", fontWeight: "600", backgroundColor: '#07799f', borderRadius: '6px', height: '10px', color: '#fff' },
                        }}
                        sx={{
                          width: "40px",
                          border: "none",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 1,
                          },
                        }}
                      />
                    ))}
                  </Box>
                  <Button
                    onClick={handleOtpVerification}
                    sx={{
                      backgroundColor: "#07799f",
                      color: "#fff",
                      padding: "10px 20px",
                      borderRadius: 1,
                      fontSize: 14,
                      fontWeight: "bold",
                      textTransform: 'capitalize',
                      "&:hover": {
                        backgroundColor: "#07799f",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </DialogContent>
              </Dialog>



            </div>

          </Grid>



          <Grid item xs={12} md={4} style={{ paddingRight: '32px' }} >
            <div className="my-booking" style={{ padding: '20px', border: '1px solid #ddd', backgroundColor: "#FFFFFF" }}>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>My Booking</Typography>
              <Box sx={{ background: '#f0f0f0', padding: 2, borderRadius: 2 }}>
                <Typography variant="body2">{fromDate} - {toDate} • {guests} Guests</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary">₹{pricePerNight} x 1 Nights</Typography>
                <Typography variant="body2">₹{total}</Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Tax</Typography>
                  <Typography variant="body2">₹680.00</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>Total</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>₹{total}</Typography>
                </Box>

                <Divider sx={{ mt: 2 }} />

                <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">Payable Now</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>₹800.00</Typography>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    onClick={handleProceedToPay}
                    variant="contained"
                    sx={{
                      backgroundColor: "#07799F",
                      color: "white",
                      textTransform: 'capitalize',
                      padding: '10px 20px',
                    }}
                    disabled={!isOtpVerified}
                  >
                    Proceed to Pay
                  </Button>
                </Box>
              </Box>
            </div>
          </Grid>

        </Grid>

      </div>
    </>
  );
};

export default Booking;
