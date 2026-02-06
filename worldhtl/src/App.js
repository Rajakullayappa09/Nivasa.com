import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Router, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home/Home';
import NavbarHeader from './components/Navbar/NavbarHeader';
import Booking from './Pages/Booking/Booking';
import Login from './Pages/Home/Login';
import Userprofile from './Pages/Home/UserProfile';
import Register from './Pages/Home/Register';
import MyBooking from './Pages/Booking/MyBooking';
import { BookingProvider } from './Pages/Home/BookingContext';
import PropertiesList from './Pages/PropertiesList/PropertiesList';
import BookingCart from './Pages/Cart/BookingCart';
import BookingForm from './Pages/Booking/BookingForm';
import NotFound from './Pages/Home/NotFound';
import FooterContainer from './components/footer/FooterContainer';
import { CircularProgress } from '@mui/material';
import TermsOfService from './Pages/Home/TermsOfService';
import PrivacyPolicy from './Pages/Home/PrivacyPolicy';
import PageNotFound from './Pages/Home/NotFound';
import ContactUs from './Pages/Home/ContactUs';
// import 'material-react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const ScrollToTop = () => {
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {

  const [loading, setLoading] = useState(true);



  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }, []);


  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", alignItems: 'center', minHeight: '100%',height:'100vh' }}>
        <CircularProgress />
      </div>
    );
  }
  return (




    <BookingProvider>
       <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar 
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <ScrollToTop />
        <NavbarHeader />
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/userprofile' element={<Userprofile />} />
          <Route path='/userregister' element={<Register />} />
          <Route path='/mybooking' element={<MyBooking />} />
          <Route path='/propertiesList' element={<PropertiesList />} />
          <Route path='/BookingCart/:property_id' element={<BookingCart />} />
          <Route path='/Booking' element={<Booking />} />
          <Route path='/terms&conditions' element={<TermsOfService />} />
          <Route path='/privacy&policys' element={<PrivacyPolicy />} />
          <Route path='/contactus' element={<ContactUs />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
       

        <FooterContainer />
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;
