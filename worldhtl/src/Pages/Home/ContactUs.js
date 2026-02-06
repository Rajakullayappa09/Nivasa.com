import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import emailjs from "@emailjs/browser";
import localization_en from "../../assets/Localization/localization-en.json";
import localization_es from "../../assets/Localization/localization-es.json";
import { useBooking } from "./BookingContext";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: '',
    subject: "",
    message: "",
  });
  const { bookingData, setBookingData, setSubmittedBooking, setShowFormInHeader, setLanguageLabels, languageLabels } = useBooking();

  const [status, setStatus] = useState("");
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'en'; // Get the language from localStorage
    if (storedLanguage === 'en') {
      setLanguageLabels(localization_en); // Set English labels
    } else if (storedLanguage === 'es') {
      setLanguageLabels(localization_es); // Set Spanish labels
    }
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const serviceID = "service_oo5vkfe"; // Replace with your EmailJS service ID
    const templateID = "template_gh5ki5l"; // Replace with your EmailJS template ID
    const publicKey = "Co-XZGuLwjT1i_rzq"; // Replace with your EmailJS public key

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setStatus("Email Sent Successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((error) => {
        setStatus("Failed to send email. Please try again.");
        console.error("Email send error:", error);
      });
  };
  const isContactPage = window.location.pathname === '/contactus';
  const isMobile = window.innerWidth <= 768;
  const navigate = useNavigate();

  return (
    <div className="">
      <div onClick={() => navigate('/')} style={{ fontFamily: "Poppins, sans-serif", fontSize: isMobile ? "12px" : "14px", fontWeight: "400", color: '#9C9C9C', position: "sticky", top: "50px", backgroundColor: "white", backgroundSize: "cover", padding: "28px 18px", marginLeft: (isContactPage && isMobile) ? "10px" : "100px", height: (isContactPage && isMobile) ? "0px" : "100px" }}>
        {languageLabels?.footer?.home || "Home"}  <span style={{ color: '#424242', fontFamily: "Poppins, sans-serif", fontSize: isMobile ? '12px' : "14px", fontWeight: "400" }}>  <span><ArrowForwardIcon /></span>{languageLabels?.footer?.contactus || "Contact Us"}   </span>
      </div>
      <div style={{ padding: (isMobile) ? '10px 0px 0px 20px' : "0px 0px 0px 120px" }}>
        <h2 className="text-green-600 font-bold text-lg" style={{ fontFamily: "Poppins,sans-serif", color: "#666666", fontSize: "20px", fontWeight: "500" }}>{languageLabels?.footer?.contactus || "Contact Us"} </h2>
        <h1 className="text-3xl font-bold mt-2" style={{ fontFamily: "Volkhov,sans-serif", color: "#3a0ca3", fontSize: "44px", fontWeight: "600", lineHeight: isMobile ? "50px" : "75px" }}>{languageLabels?.contactUsPage?.discoverMore || "Discover More, Wander Freely."}</h1>
        <p className="text-gray-600 mt-4" style={{ fontFamily: "Poppins,sans-serif", color: "#464646", fontSize: "18px", fontWeight: "600" }}>{languageLabels?.contactUsPage?.tellUshow || "Tell us how we can help."}</p>

        <form onSubmit={handleSubmit} className="mt-0 space-y-4">
          <textarea
            name="message"
            placeholder={languageLabels?.contactUsPage?.starttypinghere || "Start typing here"}
            className="w-full p-3 border rounded-md focus:ring focus:ring-green-300"
            rows="5"
            style={{
              width: isMobile ? "90%" : '60%', borderRadius: "15px", backgroundColor: "#F4F4F4",
              marginBottom: "20px", fontFamily: "Poppins,sans-serif", fontSize: "14px", fontWeight: "600"
            }}
            value={formData.message}
            onChange={handleChange}
          />

          <p style={{ fontFamily: "Poppins,sans-serif", color: "#464646", fontSize: "18px", fontWeight: "600" }}>{languageLabels?.contactUsPage?.pleaseProvideYourDetails || "Please provide your details."}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ display: "flex", gap: "20px", width: "90%", marginBottom: "25px" }}>
            <input
              type="text"
              name="fullName"
              style={{ width: isMobile ? "100%" : "50%", borderRadius: "10px", backgroundColor: "#F4F4F4", fontFamily: "Poppins,sans-serif", fontSize: "14px", fontWeight: "600" }}
              placeholder={languageLabels?.contactUsPage?.fullName || "Full name*"}
              className="p-3 border rounded-md focus:ring focus:ring-green-300"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

          </div>
          <div style={{ display: "flex", gap: "20px", width: "90%", marginBottom: "20px" }}>
            <input
              type="email"
              name="email"
              placeholder={languageLabels?.contactUsPage?.email || "Email address*"}
              style={{ width: isMobile ? "100%" : "50%", borderRadius: "10px", backgroundColor: "#F4F4F4", fontFamily: "Poppins,sans-serif", fontSize: "14px", fontWeight: "600" }}
              className="w-full p-3 border rounded-md focus:ring focus:ring-green-300"
              value={formData.email}
              onChange={handleChange}
              required
            />


          </div>
          <div style={{ display: "flex", gap: "20px", width: "90%", marginBottom: "20px" }}>
            <input
              type="text"
              name="mobile"
              placeholder={languageLabels?.contactUsPage?.mobilenumber || "Mobile Number*"}
              style={{ width: isMobile ? "100%" : "50%", borderRadius: "10px", backgroundColor: "#F4F4F4", fontFamily: "Poppins,sans-serif", fontSize: "14px", fontWeight: "600" }}
              className="w-full p-3 border rounded-md focus:ring focus:ring-green-300"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>



          <button
            style={{ margin: isMobile ? '20px 0px 60px' : "20px 0px 60px", borderRadius: "10px", fontFamily: "Poppins,sans-serif", fontSize: "16px", fontWeight: "600", backgroundColor: '#4361ee', width: isMobile ? '90%' : '', boxShadow: isMobile ? '0px 8px 16px   #b9b9b9' : '', marginBottom: "60px" }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#3a0ca3'} // Hover effect
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4361ee'}
            type="submit"
            className="w-full  text-white font-bold rounded-md hover:bg-blue-700 transition"
          >{languageLabels?.contactUsPage?.sendMessage || "Send Message"}
          </button>
        </form>
        {status && <p className="mt-4 text-center text-red-600">{status}</p>}
      </div>
    </div>
  );
};

export default ContactUs;





