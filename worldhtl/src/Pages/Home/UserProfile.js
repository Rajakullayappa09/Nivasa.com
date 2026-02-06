import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Container,
  Box,
  Typography,
  Card,
  Avatar,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { Cancel, CheckCircle, Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import logowfh from "../../assets/nivasa-logo.svg";
import "../PropertiesList/PropertiesList.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, FormLabel } from "react-bootstrap";
import { Grid } from "react-loader-spinner";
import {
  saveUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  getUserToken,
} from "../../components/Storage/localStorageService";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import config from "../../config";
import profileimg from "../../assets/profileimg.png"
import localization_en from "../../assets/Localization/localization-en.json";
import localization_es from "../../assets/Localization/localization-es.json";
import { useBooking } from "./BookingContext";
import Userprofilemobile from '../../assets/Userprofilemobile.svg'
import { EditIcon, Icon } from "lucide-react";
const API_BASE_URL = `${config.BASE_URL}`;





const Userprofile = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [profilePicture, setProfilePicture] = useState({ profile_pic: "" });
  const [profile, setprofile] = useState(null);
  const { bookingData, setBookingData, setSubmittedBooking } = useBooking();


  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'en'; // Get the language from localStorage
    if (storedLanguage === 'en') {
      setLanguageLabels(localization_en); // Set English labels
    } else if (storedLanguage === 'es') {
      setLanguageLabels(localization_es); // Set Spanish labels
    }
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const modalWidth = isMobile ? "80%" : "40%";
  const { showFormInHeader, setShowFormInHeader, setLanguageLabels, languageLabels } = useBooking();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [mobileNumber, setMobileNumber] = useState('');
  const fileInputRef = useRef(null);

  const [selecteduser, setSelectedUser] = useState([]);

  const LOCAL_STORAGE_KEY = "user";
  const token = getUserToken()
  const [isHomePage, setIsHomePagen] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'en';
    if (storedLanguage === 'en') {
      setLanguageLabels(localization_en);
    } else if (storedLanguage === 'es') {
      setLanguageLabels(localization_es);
    }
  }, []);

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



  const vefitymobile = sessionStorage.getItem('verifiedMobileNumber', mobileNumber);


  const getUserDetails = () => {
    const userlogin = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!userlogin) {
      toast.info("User is not logged in!", {
        position: "bottom-left",
        hideProgressBar: true,
      });
      navigate('/')
      return;
    }


    setLoading(true)
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
      setUpdatedUser(storedUser);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  useEffect(() => {
    getUserDetails()

  }, []);

  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };



  const handleUpdate = async () => {
    const userlogin = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!userlogin) {
      toast.info("User is not logged in!", {
        position: "bottom-left",
        hideProgressBar: true,
      });
      return;
    }

    const parsedUser = JSON.parse(userlogin);
    const bookUserId = parsedUser?.book_user_id;
    const token = getUserToken()


    if (!token) {
      toast.info("No Token");
      return;
    }

    console.log("Token:", token);

    if (!bookUserId || !updatedUser) {
      console.error("Invalid request: bookUserId or updatedUser is missing");
      return;
    }

    const requestBody = {
      book_user_id: bookUserId, // ✅ Pass ID in the body
      ...updatedUser
    };

    try {
      const response = await axios.put(
        API_BASE_URL + `/BookingUsers/update/${bookUserId}`,
        requestBody,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      saveUserToLocalStorage(updatedUser);
      toast.success(response.data.Message || "Update Successfully");
      setOpenDialog(false);
    } catch (error) {
      if (error.response) {
        console.error("API Error:", error.response.status, error.response.data);
        toast.error(`Update failed: ${error.response.data.detail || "Unknown error"}`, {
          position: "bottom-left",
          hideProgressBar: true,
        });
      } else {
        console.error("Error updating user:", error);
        toast.error("Network error. Please try again.", {
          position: "bottom-left",
          hideProgressBar: true,
        });
      }
    }
  };



  const fetchImages = async () => {
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

      // Save the user profile in localStorage
      localStorage.setItem("userProfile", JSON.stringify(response.data.profile_pic));

      // Optionally, update the state if you are using it to render
      setprofile(response.data);

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();

  }, [])



  const handleProfilePictureUpload = async (file, selectedUser) => {
    if (!file) return;
    if (!selectedUser) {
      console.error("No user selected.");
      toast.error("No user selected. Please select a user.");
      return;
    }

    const bookUserId = selectedUser.book_user_id;

    if (!bookUserId) {
      console.error("bookUserId is missing.");
      toast.error("User ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_pic", file);

    try {
      // Sending the POST request with FormData
      const response = await axios.post(
        `${API_BASE_URL}/BookingUsers/Upload/Image/?book_user_id=${bookUserId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const newProfilePicUrl = response.data.profile_pic;
        setProfilePicture({ profile_pic: newProfilePicUrl });
        toast.success(response.data.Message || "Profile picture uploaded successfully!");
        fetchImages();
      } else {
        toast.error(response.data.detail || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error(error?.response?.data?.detail || "Upload failed. Please try again.");
    }
  };



  const handleEditIconClick = (user) => {
    fileInputRef.current.click(user);
  };

  const handleEditIconClickuser = (user, userDetails) => {
    console.log(user);
    setSelectedUser(user);
    // setFormData(user);
    setOpenDialog(true);  // Open the dialog
  };













  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", alignItems: 'center', minHeight: '100%', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }


  const ProfileDetail = ({ label, value, verified }) => (
    <div style={{ display: isMobile ? "inline-block" : "flex", alignItems: "center", gap: "8px", marginBottom: '20px' }}>
      <Typography style={{ fontWeight: "600", fontSize: "16px", color: "#3E3E3E", minWidth: isMobile ? '200px' : "140px" }}>
        {label}:
      </Typography>

      <Typography style={{ fontSize: "16px", color: "#3E3E3E", fontWeight: "400" }}>
        {value}
      </Typography>


    </div>
  );
  return (
    <div>


      <div style={{ height: "50px", width: "100%", backgroundColor: "#4361ee" }}></div>
      <Container maxWidth="md" sx={{ mt: isMobile ? 1 : 3, pb: 3 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Typography
            style={{
              color: "#1C1C1C",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            {languageLabels?.navbar?.myProfile || "  My Profile"}

          </Typography>
        </div>
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "100%" },
            height: { xs: "100%", sm: "100%", md: "500px" },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "flex-start",
            gap: "26px",
            p: isMobile ? 0 : 3,
            borderRadius: "12px",


          }}
        >




          <div
            style={{
              position: "relative",
              width: "150px",
              height: isMobile ? '100%' : "150px",
              margin: "0 auto",

            }}
          >
            <Avatar
              alt="Profile Picture"
              src={profile?.profile_pic || Userprofilemobile}
              sx={{
                width: {
                  xs: 107,
                  sm: 200,
                  md: 194
                },
                height: {
                  xs: 107,
                  sm: 200,
                  md: 194
                },
                ml: isMobile ? "10px" : "33px",
                borderRadius: "30px",
              }}
            />

            <IconButton
              sx={{
                position: "absolute",
                top: isMobile ? "0px" : "2px",  // Adjust the position for mobile
                right: isMobile ? "0px" : "-80px", // Ensure the button is close to the avatar for mobile
                backgroundColor: "white",
                boxShadow: 1,
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
                padding: 1, // Optional: Add some padding for better touch targets
              }}
              onClick={handleEditIconClick}
              aria-label="Edit"
            >
              <EditIcon sx={{ fontSize: 30, color: '#07799F' }} />
            </IconButton>

            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => handleProfilePictureUpload(e.target.files[0], user)} // Pass the selected file and user
            />
          </div>


          <div style={{ marginLeft: isMobile ? "10px" : "50px", width:isMobile?"100%":"500px",
                height:"100%",
               }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "center" : "start",
                gap: isMobile ? "0px" : "12px",
                marginBottom: isMobile ? "0px" : "20px",
               


              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "22px", sm: "28px" },
                  textTransform: "capitalize",
                  color: "#3E3E3E",
                }}
              >
                {updatedUser.first_name} {updatedUser.last_name}
              </Typography>
              <IconButton
                onClick={() => setOpenDialog(true)}
                sx={{
                  p: "6px",
                  bgcolor: "#EAEAEA",
                  borderRadius: "8px",
                }}
              >
                <BorderColorIcon
                  style={{ fontSize: "20px", color: "#666", height: "30px", width: "30px" }}
                />
              </IconButton>
            </div>

            <ProfileDetail
              label={languageLabels?.profile?.phoneNumber || "Phone Number"}
              value={updatedUser.mobile}
              verified
              style={{ minWidth: "200px" }} // Add minWidth for consistent detail width
            />
            <ProfileDetail
              label={languageLabels?.profile?.email || "Email"}
              value={updatedUser.email}
              verified
              style={{ minWidth: "200px" }} // Add minWidth for consistent detail width
            />
            <ProfileDetail
              label={languageLabels?.profile?.address || "Address"}
              value={updatedUser.address}
              style={{ width: "300px", maxHeight: "200px" }} // Corrected maxHeight property
            />

            <ProfileDetail
              label={languageLabels?.profile?.city || "City"}
              value={updatedUser.city_name}
              style={{ minWidth: "200px" }} // Add minWidth for consistent detail width
            />
            <ProfileDetail
              label={languageLabels?.profile?.country || "Country"}
              value={updatedUser.country}
              style={{ minWidth: "200px" }} // Add minWidth for consistent detail width
            />
          </div>

        </Box>
      </Container>



      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}

        maxWidth='md'
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '8px',
            minHeight: '450px',
            width: '450px'

          },
        }}
      >
        <Box sx={{ alignItems: 'center', borderBottom: '1px solid #e3e3e3', justifyContent: 'center' }}>

          <DialogTitle style={{ justifyContent: 'center', alignItems: 'center' }}>
            Update Profile
            <IconButton onClick={() => setOpenDialog(false)} style={{ float: "right", marginTop: "-5px" }}>
              <Close />
            </IconButton>
          </DialogTitle>
        </Box>

        <DialogContent>
          <div style={{
            display: 'flex',
            alignItems: isMobile ? 'start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',
          }}>
            <FormLabel style={{
              width: isMobile ? 'auto' : "120px",
              color: '#3e3e3e',
              marginBottom: isMobile ? '-5px' : '0px'
            }}>
              First Name:
            </FormLabel>
            <TextField
              name="first_name"
              fullWidth
              margin="dense"
              value={updatedUser.first_name || ""}
              onChange={handleInputChange}
              sx={{
                '& .MuiInputBase-root': { height: '35px', marginBottom: "8px" },
                '& .MuiInputLabel-root': { transform: 'translate(14px, 14px) scale(1)' },
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: isMobile ? 'start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',

          }}>
            <FormLabel style={{
              width: isMobile ? 'auto' : "120px",
              color: '#3e3e3e',
              marginBottom: isMobile ? '-5px' : '0px'

            }}>
              Last Name:
            </FormLabel>
            <TextField
              name="last_name"
              fullWidth
              margin="dense"
              value={updatedUser.last_name || ""}
              onChange={handleInputChange}
              sx={{
                '& .MuiInputBase-root': { height: '35px', marginBottom: "8px" },
                '& .MuiInputLabel-root': { transform: 'translate(14px, 14px) scale(1)' },
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: isMobile ? 'start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',

          }}>
            <FormLabel style={{
              width: isMobile ? 'auto' : "120px",
              color: '#3e3e3e',
              marginBottom: isMobile ? '-5px' : '0px'

            }}>
              Mobile:
            </FormLabel>
            <TextField
              name="mobile"
              fullWidth
              margin="dense"
              value={updatedUser.mobile || ""}
              onChange={handleInputChange}
              sx={{
                '& .MuiInputBase-root': { height: '35px', marginBottom: "8px" },
                '& .MuiInputLabel-root': { transform: 'translate(14px, 14px) scale(1)' },
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: isMobile ? 'start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',

          }}>
            <FormLabel style={{
              width: isMobile ? 'auto' : "120px",
              color: '#3e3e3e',
              marginBottom: isMobile ? '-5px' : '0px'

            }}>
              Email:
            </FormLabel>
            <TextField
              name="email"
              fullWidth
              margin="dense"
              value={updatedUser.email || ""}
              onChange={handleInputChange}
              sx={{
                '& .MuiInputBase-root': { height: '35px', marginBottom: "8px" },
                '& .MuiInputLabel-root': { transform: 'translate(14px, 14px) scale(1)' },
              }}
            />
          </div>

          {/* Address */}
          <div style={{
            display: 'flex',
            alignItems: isMobile ? 'start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',

          }}>
            <FormLabel style={{
              width: isMobile ? 'auto' : "120px",
              color: '#3e3e3e',
              marginBottom: isMobile ? '-5px' : '0px'

            }}>
              Address:
            </FormLabel>
            <TextField
              name="address"
              fullWidth
              margin="dense"
              value={updatedUser.address || ""}
              onChange={handleInputChange}
              sx={{
                '& .MuiInputBase-root': { height: '35px', marginBottom: "8px" },
                '& .MuiInputLabel-root': { transform: 'translate(14px, 14px) scale(1)' },
              }}
            />
          </div>

          {/* City */}
          <div style={{
            display: 'flex',
            alignItems: isMobile ? 'start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',

          }}>
            <FormLabel style={{
              width: isMobile ? 'auto' : "120px",
              color: '#3e3e3e',
              marginBottom: isMobile ? '-5px' : '0px'

            }}>
              City:
            </FormLabel>
            <TextField
              name="city_name"
              fullWidth
              margin="dense"
              value={updatedUser.city_name || ""}
              onChange={handleInputChange}
              sx={{
                '& .MuiInputBase-root': { height: '35px', marginBottom: "8px" },
                '& .MuiInputLabel-root': { transform: 'translate(14px, 14px) scale(1)' },
              }}
            />
          </div>

          {/* State */}
          <div style={{
            display: 'flex',
            alignItems: isMobile ? 'start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',

          }}>
            <FormLabel style={{
              width: isMobile ? 'auto' : "120px",
              color: '#3e3e3e',
              marginBottom: isMobile ? '-5px' : '0px'

            }}>
              State:
            </FormLabel>
            <TextField
              name="state"
              fullWidth
              margin="dense"
              value={updatedUser.state || ""}
              onChange={handleInputChange}
              sx={{
                '& .MuiInputBase-root': { height: '35px', marginBottom: "8px" },
                '& .MuiInputLabel-root': { transform: 'translate(14px, 14px) scale(1)' },
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: isMobile ? 'start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',

          }}>
            <FormLabel style={{
              width: isMobile ? 'auto' : "120px",
              color: '#3e3e3e',
              marginBottom: isMobile ? '-5px' : '0px'

            }}>
              Country:
            </FormLabel>
            <TextField
              name="country"
              fullWidth
              margin="dense"
              value={updatedUser.country || ""}
              onChange={handleInputChange}
              sx={{
                '& .MuiInputBase-root': { height: '35px', marginBottom: "8px" },
                '& .MuiInputLabel-root': { transform: 'translate(14px, 14px) scale(1)' },
              }}
            />
          </div>
        </DialogContent>

        <DialogActions style={{ display: "flex", justifyContent: "flex-end", padding: '16px' }}>
          <Button
            variant="outlined"
            sx={{
              color: '#000',
              borderColor: '#000',
              '&:hover': {
                backgroundColor: '#d3d3d3', // Light grey background on hover
                borderColor: '#000',
                color: '#000', // Ensures text color remains black on hover
              },
            }}
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </Button>

          <Button onClick={handleUpdate} style={{ backgroundColor: "#4361ee", color: '#fff', padding: "4px 16px", marginLeft: "8px", height: "35px" }}>Update</Button>
        </DialogActions>

      </Dialog>
      <Box
        sx={{
          width: "100%",
          height: "20vh",
          backgroundColor: "transparent",
        }}
      />
    </div>



  );
};

const ProfileDetail = ({ label, value, showCheckIcon = false }) => (
  <div style={{ display: "flex", gap: "20px" }}>
    <Typography variant="body1" style={{ fontWeight: 600, color: "#3E3E3E", minWidth: "130px" }}>
      {label} :
    </Typography>
    <Typography variant="body1" style={{ color: "#3E3E3E" }}>
      {value || "N/A"} {showCheckIcon && value && <CheckCircle color="#fff" fontSize="small" />}
    </Typography>
  </div>

);

export default Userprofile;


