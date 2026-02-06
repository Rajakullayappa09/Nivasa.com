import React, { useRef,useEffect, useState } from 'react';

import { Cancel, Visibility, VisibilityOff } from '@mui/icons-material';
// import 'react-toastify/dist/ReactToastify.css';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, IconButton, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from '@mui/icons-material/Close';
import config from "../../config";
import localization_en from "../../assets/Localization/localization-en.json";
import localization_es from "../../assets/Localization/localization-es.json";
import { useBooking } from './BookingContext';
import { toast } from 'react-toastify';

const API_BASE_URL = `${config.BASE_URL}`;
const Login = () => {
      const { bookingData, setBookingData, setSubmittedBooking, setShowFormInHeader, setLanguageLabels, languageLabels } = useBooking();
  
   const [selectedAccommodations, setSelectedAccommodations] = useState({});
    const [selectedAccommodationIds, setSelectedAccommodationIds] = useState([]); // NEW ARRAY FOR IDs
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [openOtpDialog, setOpenOtpDialog] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [newNumber, setNewNumber] = useState(mobileNumber);
  const [otpOpenlog, setOtpOpenlog] = useState(false);
  const [otp, setOtp] = useState(false);
  const [email, setemail] = useState('')

  const [Open, setOpen] = useState();
  const openmenu = Boolean(anchorEl);
 


    useEffect(() => {
        const storedLanguage = localStorage.getItem('language') || 'en'; // Get the language from localStorage
        if (storedLanguage === 'en') {
            setLanguageLabels(localization_en); // Set English labels
        } else if (storedLanguage === 'es') {
            setLanguageLabels(localization_es); // Set Spanish labels
        }
    }, []);

  useEffect(() => {
    document.querySelectorAll("button").forEach((btn) => {
      btn.style.opacity = "1";
      btn.style.visibility = "visible";
      btn.style.display = "block";
    });
  }, []);
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
   const toggleDrawer = (state) => () => {
    setOpen(state);
  };

 

   const otpRefs = useRef([]);
  
    const handleSendOtp = async () => {
  
  
      const otpRequestData = {
        mobile: mobileNumber,
        email: email,
      };
  
      try {
        const response = await fetch(API_BASE_URL+'/BookingUsers/login/request_otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
          },
          body: JSON.stringify(otpRequestData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert("OTP sent successfully!");
          otpRefs.current.forEach((input) => (input.value = "")); // Clear previous OTP input
          setOtpSent(true);
          setOtp(true);
          setOpenDialog(false);
          handleOpenOtpDialog();
          setOpenOtpDialog(true);
        } else {
  
          alert(`Failed to send OTP: ${data.message || "Unknown error"}`);
        }
      } catch (error) {
        alert(`Error sending OTP: ${error.message}`);
      }
    };
  

  
  const handleCloseLoginDialog = () => {
    setOtpOpenlog(false);
  };

  const handleCloseOtpDialog = () => {
    setOtp(false);
  };

  const handleOpenOtpDialog = () => {
    setOtpOpenlog(false); 
    setOtp(true); 
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(API_BASE_URL+"/BookingUsers/createCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(data);
        alert("Customer created successfully!");
        setOpen(false);
      } else {
        alert("Error submitting form!");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Something went wrong!");
    }
  };


  return (
   
    <>
    <Dialog open={otpOpenlog} onClose={handleCloseLoginDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '8px',
            maxHeight: '90vh',
            width: '70%',
            maxWidth: '500px'
          },
        }}>
           <DialogTitle sx={{ backgroundColor: '#f4f4f4', height: '55px' }}>
           <Box display="flex" justifyContent="space-between" fontSize="16px" fontWeight="700">

             </Box>
             <IconButton onClick={handleCloseLoginDialog} style={{ color: "#555" }}>
               <Cancel />
             </IconButton>
           </DialogTitle>
           <DialogContent style={{ height: '150px' }}>
             <Typography variant="body1">
               OTP will be sent to your mobile Whatsapp Number or Email address          </Typography>
             <TextField
               fullWidth
               value={mobileNumber}
               onChange={(e) => setMobileNumber(e.target.value)} // Correct the onChange handler
               variant="outlined"
               placeholder="Enter Phone number/ Email address"
               sx={{
                 mt: 2,
               }}
             />

           </DialogContent>
           <DialogActions style={{ display: "flex", justifyContent: "center" }}>
           <Button
          onClick={handleSendOtp}
          style={{ backgroundColor: "#07799F", color: "white", marginBottom: '15px' }}

        >
          Request OTPs
        </Button>

           </DialogActions>

         </Dialog>
         <Dialog
           open={otp}
           onClose={handleCloseOtpDialog}
           maxWidth='md'
           PaperProps={{
             style: { borderRadius: "22px" },
           }} >
           <DialogTitle style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 0 }}>
             <Typography variant="h6" style={{ fontWeight: "bold" }}>Login</Typography>
             <IconButton
               onClick={handleCloseOtpDialog}
               style={{ color: "#555" }}>
               <Cancel />
             </IconButton>
           </DialogTitle>
           <DialogContent style={{ height: '150px', width: '350px' }}>
             <Typography variant="body1">
              {languageLabels?.navbar?.enterOtp || "Enter OTP sent to your WhatsApp"}             </Typography>
             <TextField
               fullWidth
               variant="outlined"
               placeholder="Enter OTP here"
               sx={{
                 mt: 2,
               }}
             />
           </DialogContent>
           <DialogActions style={{ display: "flex", justifyContent: "center" }}>
             <Button

               style={{ backgroundColor: "#FFFFFF", color: "#07799F", marginBottom: '15px' }}
             >
               Back
             </Button>
             <Button
               onClick={() => {
                 toast.success("Booking Confirmed!");
                 handleCloseOtpDialog();
               }}
               style={{ backgroundColor: "#07799F", color: "white", marginBottom: '15px' }}
             >
               Submit OTP
             </Button>
           </DialogActions>

         </Dialog>


         <Dialog open={otp} onClose={handleCloseOtpDialog} PaperProps={{ style: { borderRadius: "22px" } }}>
           <DialogTitle style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 0 }}>
             <Typography variant="h6" style={{ fontWeight: "bold" }}>Login</Typography>
             <IconButton onClick={handleCloseOtpDialog} style={{ color: "#555" }}>
               <Cancel />
             </IconButton>
           </DialogTitle>
           <DialogContent style={{ height: '150px' }}>
             <Typography variant="body1"> {languageLabels?.navbar?.enterOtp || "Enter OTP sent to your WhatsApp"}</Typography>
             <TextField
               fullWidth
               variant="outlined"
               placeholder="Enter OTP"
               sx={{ mt: 2 }}
             />
           </DialogContent>
           <DialogActions style={{ display: "flex", justifyContent: "center" }}>
             <Button
               onClick={handleCloseOtpDialog} // Close the OTP dialog
               style={{
                 color: "#07799F",
                 backgroundColor: "#FFFFFF",
                 border: "none", // Remove border
             }}
             onMouseDown={(e) => (e.target.style.backgroundColor = "#C0C0C0")}
             onMouseUp={(e) => (e.target.style.backgroundColor = "#FFFFFF")}                 >
               Back
             </Button>
             <Button
               onClick={() => {
                 setIsVerified(true);
                 handleCloseOtpDialog();
               }}
               style={{ backgroundColor: "#07799F", color: "white", marginBottom: '15px' }}
             >
               Submit OTP
             </Button>
           </DialogActions>
         </Dialog>

         {<Drawer anchor="right" open={Open} onClose={toggleDrawer(false)}
           PaperProps={{
             sx: {
               width: 670,
               height: 500,
               position: "fixed",
               top: "20%",
               left: "30%",
               transform: "translate(-50%, -50%)",
               borderRadius: 8,
               boxShadow: 5,
               p: 3,
             },
           }}>
           <Box sx={{ p: 2 }}>
             <Box sx={{ display: "flex", justifyContent: "space-between", paddingBottom: "18px" }}>
               <Typography variant="h6" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', fontSize: "28px", fontWeight: "700" }}>
                 Personal Details
               </Typography>
               <CloseIcon />
             </Box>


             <Box sx={{ display: "flex", gap: 2, paddingBottom: "6px" }}>
               <TextField label="Enter first name"
                 onChange={handleChange}
                 name='first_name'
                 value={formData.first_name}

                 inputProps={{ style: { height: "16px", width: "295px", } }}
               />
               <TextField label="Last name"
                 value={formData.last_name}
                 name="last_name"
                 onChange={handleChange}
                 inputProps={{ style: { height: "16px", width: "295px" } }}
               />
             </Box>

             <Box sx={{ display: "flex", gap: 2, mt: 2, paddingBottom: "6px" }}>
               <TextField label="Mobile" fullWidth
                 name="mobile"
                 onChange={handleChange}
                 value={formData.mobile}

                 inputProps={{ style: { height: "16px", width: "295px" } }} />
               <TextField label="Enter your email"
                 onChange={handleChange}
                 name="email"
                 value={formData.email}

                 fullWidth inputProps={{ style: { height: "16px", width: "295px" } }} />
             </Box>

             <Box sx={{ display: "flex", gap: 2, mt: 2, paddingBottom: "6px" }}>
               <Select value={formData.country} fullWidth

                 onChange={handleChange}
                 name="country"
                 sx={{ height: "45px" }}>
                 <MenuItem value="India">India</MenuItem>
                 <MenuItem value="USA">USA</MenuItem>
                 <MenuItem value="UK">UK</MenuItem>
               </Select>
               <Select value={formData.city_name}
                 name='city_name'
                 fullWidth onChange={handleChange}
                 sx={{ height: "45px" }}>
                 <MenuItem value="Bengaluru">Bengaluru</MenuItem>
                 <MenuItem value="Delhi">Delhi</MenuItem>
                 <MenuItem value="Mumbai">Mumbai</MenuItem>
               </Select>
             </Box>

             <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2, marginBottom: "10px" }}>
               <Button onClick={toggleDrawer(false)} sx={{ color: "#07799F", fontFamily: 'Source Sans Pro,sans-serif', fontWeight: "500", fontSize: "16px", textTransform: "capitalize" }}>Back</Button>
               <Button variant="contained" sx={{ backgroundColor: "#07799F", padding: "8px 24px", fontFamily: 'Source Sans Pro,sans-serif', fontWeight: "500", fontSize: "16px", textTransform: "capitalize" }} onClick={handleSubmit}>Submit</Button>
             </Box>
           </Box>
         </Drawer>}
   </>

  );
};

export default Login;
