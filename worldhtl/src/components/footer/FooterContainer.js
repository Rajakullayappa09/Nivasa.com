import React, { useEffect } from 'react'
import { IconButton, Typography } from '@mui/material'
import './Footer.css'
import { Link, NavLink } from 'react-router-dom';
import TermsOfService from '../../Pages/Home/TermsOfService';
import FacebookRounded from '@mui/icons-material/FacebookRounded';
import Instagram from '@mui/icons-material/Instagram';
import WhatsApp from '@mui/icons-material/WhatsApp';
import Menulogo from '../../assets/nivasa-logo.svg'
import { useBooking } from '../../Pages/Home/BookingContext';
import localization_en from "../../assets/Localization/localization-en.json";
import localization_es from "../../assets/Localization/localization-es.json";
import { LinkedIn, Twitter, YouTube } from '@mui/icons-material';

const FooterContainer = () => {
    const { showFormInHeader, setShowFormInHeader, setLanguageLabels, languageLabels } = useBooking();


    useEffect(() => {
        const storedLanguage = localStorage.getItem('language') || 'en';
        if (storedLanguage === 'en') {
            setLanguageLabels(localization_en);
        } else if (storedLanguage === 'es') {
            setLanguageLabels(localization_es);
        }
    }, []);
    const handleFacebookClick = () => {
        window.open('https://www.facebook.com/profile.php?id=61572562786564', '_blank');
    };

    const handleInstagramClick = () => {
        window.open('https://www.instagram.com/nivasa/', '_blank');
    };

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/1234567890', '_blank'); // Replace with actual WhatsApp number or link
    };
    const handleYouTubeClick = () => {
        window.open('https://www.youtube.com/channel/UC_Nivasa_Channel', '_blank'); // Replace with actual YouTube channel
    };
    
    const handleLinkedinClick = () => {
        window.open('https://www.linkedin.com/in/kiran-kumar-915179350/', '_blank'); // Replace with actual WhatsApp number or link
    };
    const handleTwitterClick = () => {
        window.open('https://x.com/Nivasax', '_blank'); // Replace with actual Twitter handle
    };

    return (
        <div className="main-footer">

            <div className="footer-content">
                <div className="footer-section logo-section">
                    <img src={Menulogo} alt="Nivasa Logo" className="footer-logo" />
                </div>

                <div className="footer-section">
                    <Typography className="head" variant="h6"> {languageLabels?.footer?.company || "Company"}</Typography>
                    <div className="footer-list">
                        <Link to="/" className="footer-link">{languageLabels?.footer?.home || "Home"}</Link>
                    </div>
                </div>

                <div className="footer-section">
                    <Typography className="head" variant="h6"> {languageLabels?.footer?.links || "Links"}</Typography>
                    <div className="footer-list">
                        <Link to="/privacy&policys" className="footer-link">{languageLabels?.footer?.privacyPolicy || "Privacy Policy"}</Link>
                        <Link to="/terms&conditions" className="footer-link"> {languageLabels?.footer?.termsConditions || "Terms & Conditions"}</Link>
                    </div>
                </div>

                <div className="footer-section">
                    <Typography className="head" variant="h6">{languageLabels?.footer?.contactus || "Contact Us"} </Typography>
                    <div className="footer-list">
                        <Link to="/contactus" className="footer-link">{languageLabels?.footer?.contactus || "Contact Us"} </Link>
                        <div className="social-icons">
                            <NavLink >
                                <FacebookRounded className="social-icon" />
                            </NavLink>

                            <NavLink >
                                <Instagram className="social-icon" />
                            </NavLink>

                          
                             <NavLink >
                                <YouTube className="social-icon" />
                            </NavLink>
                            <NavLink >
                                <LinkedIn className="social-icon" />
                            </NavLink>
                            <NavLink >
                                <Twitter className="social-icon" />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

           
        </div>
    );
};

export default FooterContainer;