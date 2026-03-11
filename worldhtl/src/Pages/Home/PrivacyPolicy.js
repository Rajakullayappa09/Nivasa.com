


import React, { useEffect } from "react";
import { useBooking } from "./BookingContext";

import localization_en from "../../assets/Localization/localization-en.json";
import localization_es from "../../assets/Localization/localization-es.json";

const PrivacyPolicy = () => {




    const { bookingData, setBookingData, setSubmittedBooking, setShowFormInHeader, setLanguageLabels, languageLabels } = useBooking();


    useEffect(() => {
        const storedLanguage = localStorage.getItem('language') || 'en'; // Get the language from localStorage
        if (storedLanguage === 'en') {
            setLanguageLabels(localization_en); // Set English labels
        } else if (storedLanguage === 'es') {
            setLanguageLabels(localization_es); // Set Spanish labels
        }
    }, []);

    const styles = {

        heading: {
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "20px",
            color: "#333",
        },
        paragraph: {
            fontSize: "16px",
            color: "#676767",
            lineHeight: "1.6",
            marginTop: "5px",
            width: '100%',
        },
        item: {
            marginBottom: "10px",
            color: "#333",

        },
        title: {
            fontWeight: "bold",
            color: "#4B4B4B",
        },

        description: {
            color: "#676767",
            width: '100%'
        }


    };


    const permissions = [
        { title: "Camera", description: "To upload photos for your profile or hotel reviews, and record videos for video reviews." },
        { title: "Identity", description: "To auto-fill email IDs for a seamless experience, including linking with Facebook or Google+ logins." },
        { title: "Location", description: "To provide location-based deals, auto-fill nearby airports or cities for travel bookings, and recommend nearby hotels." },
        { title: "SMS", description: "To auto-fill one-time passwords (OTPs) during transactions for a smoother experience." },
        { title: "Phone", description: "To facilitate calls to hotels, airlines, or customer support." },
        { title: "Contacts", description: "To enable social features, such as sharing your bookings with friends and sending referral links." },
        { title: "Photo/Media/Files", description: "To store map data on your device for offline access." },
        { title: "Wi-Fi Connection", description: "To improve app performance and load maps and images faster." },
        { title: "Device ID & Call Information", description: "To uniquely identify users and prevent fraud." },
        { title: "Calendar", description: "To sync your travel plans with your device’s calendar." },
        { title: "Bluetooth", description: "For seamless integration with third-party services, like self-driving vehicle locks." },
        { title: "Video/Audio", description: "To upload videos for reviews and ensure good audio quality in your submissions." },
        { title: "Phone Number", description: "To optimize login and travel booking experiences." },
        { title: "IMEI/IMSI ", description: "To identify users uniquely and prevent fraud." },
        { title: "Subscription Information", description: "To optimize app performance based on your network type and keep you updated on train statuses." },
        { title: "SIM Serial Number ", description: "To authenticate your mobile number for UPI registration." },
    ];
    const Iospermissions = [
        { title: "Notifications", description: "To send travel updates, offers, and booking information." },
        { title: "Contacts ", description: "For social features like sharing bookings or sending referral links." },
        { title: "Location ", description: "To provide personalized deals and auto-fill nearby locations during booking." },

    ]
    

    return (
        <div style={{ width: "100%", padding: "50px 0px 0px 40px ", }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, textTransform: "uppercase", marginBottom: "10px", color: '#1C1C1C', }} >
                {languageLabels?.privacyPolicy?.heading || 'Privacy Policy – Nivasa'}     </h2>
            <p style={{ fontSize: "16px", color: "#5E6282", marginBottom: "20px", fontWeight: 500 }}>
                <strong>   {languageLabels?.privacyPolicy?.versionInfo || 'Version: 1.0 | Effective Date: [date to be insert ] | Binding Across All Continents</strong '} </strong>
            </p>
            <div style={{ marginTop: '40px' }}>
      <h3 style={styles.heading}>
        {languageLabels?.privacyPolicy?.sections?.introduction?.title || 'Introduction:'}
      </h3>
      <p style={styles.paragraph}>
        {languageLabels?.privacyPolicy?.sections?.introduction?.content ||
          "Nivasa (hereinafter referred to as 'WDH') understands the importance of safeguarding the privacy of our users and maintaining the confidentiality of the information provided. As a responsible data controller and processor, we take every measure to ensure that your personal data is handled securely."}
      </p>
      <p style={styles.paragraph}>
        {languageLabels?.privacyPolicy?.sections?.dataHandling?.content ||
          "This Privacy Policy outlines the practices for collecting, storing, and processing your personal information (as defined below) by WDH and its affiliated entities."}
      </p>
    </div>



            
    <h3 style={styles.heading} >{languageLabels?.privacyPolicy?.sections?.scopeTitle ||"Scope" } :</h3>
            <p style={styles.paragraph} >
            {languageLabels?.privacyPolicy?.sections?.scope?.paragraph1 ||"This Privacy Policy applies to any individual ('User') who purchases, intends to purchase, or inquires about any products or services offered by WDH via any of our customer channels, including our website, mobile site, mobile app, or offline channels such as call centers and physical offices (collectively referred to as 'Sales Channels')."}</p>
            <p style={styles.paragraph} >
            {languageLabels?.privacyPolicy?.sections?.scope?.paragraph2 ||  "For the purposes of this Privacy Policy, 'you' or 'your' refers to the User, and 'we,' 'us,' or 'our' refers to Workdofhostels. This Policy covers our website, mobile site(s), and mobile app(s)."}            </p>
            <p style={styles.paragraph} >
             {languageLabels?.privacyPolicy?.sections?.scope?.paragraph3 ||  " By using or accessing our website or any other Sales Channels, you agree to the terms outlined in this Privacy Policy. If you do not agree with this policy, please refrain from using or accessing our Sales Channels. "  }         </p>
 
 
            <h3 style={styles.heading}  > {languageLabels?.privacyPolicy?.thirdPartylinksTitle || " Third-Party Links"} :</h3>

            <p style={styles.paragraph} >{languageLabels?.privacyPolicy?.thirdPartylinks?.paragraph1 || "This Privacy Policy does not apply to third-party websites, mobile apps, or external platforms, even if they are linked to our website. We encourage you to review the privacy policies of any third parties with whom you interact, as their data practices may differ significantly from ours." }</p>

<h3 style={styles.heading}>{languageLabels?.privacyPolicy?.internationalUsersTitle || "International Users"} :</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.internationalUsers?.paragraph1 || 
  "If you are located outside India, please note that the data you share with WDH will primarily be processed in India or other jurisdictions where WDH or its third-party partners operate. By agreeing to this Privacy Policy, you consent to the processing of your personal information as described herein, even if the data protection laws in these locations differ from those in your country of residence."}
</p>

<h3 style={styles.heading}>{languageLabels?.privacyPolicy?.withdrawingConsentTitle || "Withdrawing consent may"} :</h3>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.withdrawingConsent?.paragraph1 || 
  "Significantly impact our ability to serve you effectively, possibly resulting in the cancellation of your booking or failure to confirm it. Restrict our ability to manage your current or future bookings, which could affect your trip or require cancellation of services already arranged. This Privacy Policy forms part of the User Agreement between you and Workdofhostels, and any capitalized terms used but not defined in this document will have the meaning assigned to them in the User Agreement."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.withdrawingConsent?.paragraph2 || 
  "If you have any questions regarding this policy or our data processing practices, please contact us directly."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.typeOfInformationTitle || "TYPE OF INFORMATION WE COLLECT AND ITS LEGAL BASIS"}
</h3>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.typeOfInformation?.paragraph1 || 
  "The information we collect is essential to provide the services you choose, fulfill our legal obligations, and meet our responsibilities to third parties, as outlined in our User Agreement."}
</p>

<h5 style={{ fontSize: "16px", width: '100%' }}>
  {languageLabels?.privacyPolicy?.typeOfInformation?.subheading || 
  "Personal Information we collect includes, but is not limited to, the following:"}
</h5>
<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.registrationInformationTitle || "Registration Information"} :
</h3>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.registrationInformation?.paragraph1 || 
  "When you register or subscribe to our website, we collect personal details such as your name, gender, marital status, religion, age, profile picture, contact information (email address, postal address, phone number), and any other information you provide, such as your frequent flyer number or banking details (including credit/debit card info). This also includes payment history, billing information, and lifestyle details that you share with us."}
</p>
<h5 style={{ fontSize: "18px", lineHeight: "1.6", marginTop: "3px", width: '100%' }}>
  {languageLabels?.privacyPolicy?.otherInformationTitle || "Other Information"} :
</h5>

<ul style={styles.paragraph}>
  {(languageLabels?.privacyPolicy?.otherInformation?.list || [
    "Transactional data (excluding banking details) about your e-commerce activities and buying behavior.",
    "Security-related data, such as usernames, passwords, and email addresses associated with your account.",
    "Files you store on our servers, including images and documents.",
    "Public domain information or data from third parties, including social media profiles (e.g., name, email, friend list, profile picture).",
    "Information regarding any other traveler(s) booked through your account. If you're making a booking for someone else, you confirm that they’ve agreed to share their data with us."
  ]).map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.visaServicesTitle || "Visa Services Information"} :
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.visaServices?.paragraph || 
  "If you request visa-related services, we collect copies of your passport, bank statements, filled application forms, photos, and any other necessary documentation required by the respective embassy to process your visa."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.internationalBookingsTitle || "International Bookings Compliance"} :
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.internationalBookings?.paragraph || 
  "For international bookings, you may be required to provide details such as PAN (Permanent Account Number), passport details, or other information as per service provider requirements or in compliance with the Liberalized Remittance Scheme (LRS) of the Reserve Bank of India (RBI). If you don’t provide this information, we may not be able to process your booking."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.contactlessCheckinTitle || "Contactless Hotel Check-in"} :
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.contactlessCheckin?.paragraph || 
  "If you choose contactless check-in at hotels, we may collect copies of your government-issued identification (Aadhaar, driving license, election card, etc.), a self-declaration form, and any other necessary travel-related details (e.g., date of birth, origin/destination, place of residence). Covid-19 Vaccination Status: If required, we may collect your Covid-19 vaccination status and certificate, including any related information necessary for travel or other services. We do not process beneficiary IDs or other confidential information on your vaccination certificate."}
</p>
<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.howWeUseTitle || "HOW WE USE YOUR PERSONAL INFORMATION"}
</h3>

<h5 style={{ fontSize: "18px", lineHeight: "1.6", marginTop: "3px" }}>
  {languageLabels?.privacyPolicy?.howWeUseIntro?.subTitle || 
  "We use the personal information we collect for various purposes, including:"}
</h5>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.bookingTransactionalTitle || "Booking and Transactional Use"} :
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.bookingTransactional?.paragraph || 
  "When making a booking, we process your personal information, including payment details (credit/debit card numbers, banking info, etc.), to complete the booking process. We also use this information to confirm reservations, send booking updates, and handle customer service interactions."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.customerServiceTitle || "Customer Service & Account Management"} :
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.customerService?.paragraph || 
  "If you request visa-related services, we collect copies of your passport, bank statements, filled application forms, photos, and any other necessary documentation required by the respective embassy to process your visa."}
</p>
<h5 style={{ fontSize: "18px", lineHeight: "1.6", marginTop: "3px", width: '100%' }}>
  {languageLabels?.privacyPolicy?.useInfo?.title || "We use your information to"} :
</h5>

<ul style={styles.paragraph}>
  {(languageLabels?.privacyPolicy?.useInfo?.list || [
    "Confirm and update bookings.",
    "Provide support and assistance with your bookings.",
    "Send confirmations via SMS, email, or WhatsApp.",
    "Customize our website and app based on your preferences.",
    "Prevent fraud and ensure the security of your account."
  ]).map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.surveysFeedbackTitle || "Surveys & Feedback"} :
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.surveysFeedbackText ||
    "We occasionally conduct surveys to gather feedback on our services. Participation is voluntary, and your responses are typically anonymized and used to improve our website, services, and promotional content."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.marketingPromotionsTitle || "Marketing & Promotions"} :
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.marketingPromotionsText ||
    "To improve your user experience and offer personalized promotions, we may use your information to send marketing emails or newsletters about travel deals, special offers, and new services. You can opt out of these communications at any time."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.rewardProgramsTitle || "Reward Programs"} :
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.rewardProgramsText ||
    "From time to time, we may run reward programs offering travel-related prizes or discounts. If you participate, we use your personal information to enroll you, track your rewards, and fulfill your prizes. You may opt out of such programs by contacting us."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.thirdPartyServicesTitle || "Third-Party Services"} :
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.thirdPartyServicesText ||
    "In some cases, we may share anonymized or aggregated data with third parties to help us improve our services. For example, we may engage third parties for payment processing, data hosting, or fraud detection. Any sharing of personal information with third parties will always be done in accordance with applicable laws and your consent."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.fraudDetectionTitle || "Fraud Detection & Credit Verification"} :
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.fraudDetectionText1 ||
    "In certain cases, we may verify customer information, including credit details, to detect fraud or assess creditworthiness for certain services, such as offering bookings on credit. We may also use your information to ensure the integrity and security of our services."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.fraudDetectionText2 ||
    "By providing us with your personal information, you consent to its use as described in this Privacy Policy. If you do not wish to share certain information, we may be unable to process your requests or bookings as intended."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.fraudDetectionText3 ||
    "For any further questions or concerns about your data, feel free to contact us."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.dataRetentionTitle || "How Long Do We Keep Your Personal Information?"} :
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.dataRetentionText1 ||
    "At Nivasa, we retain your personal information for as long as it is reasonably necessary to fulfill the purposes outlined in this Privacy Policy. In some cases, we may retain your data for longer periods, particularly when required to comply with legal, regulatory, tax, or accounting obligations."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.dataRetentionText2 ||
    "Once your personal data is no longer needed, we will ensure it is securely deleted or stored in a manner that prevents its further use by the business."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.dataRetentionText3 ||
    "If you wish to delete your account, you can do so using this "}
  <a href="#">
    {languageLabels?.privacyPolicy?.deleteAccountLinkText || "[Link]"}
  </a>.
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.cookiesSessionDataTitle || "COOKIES AND SESSION DATA"}
</h3>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.cookiesTitle || "Cookies"} :
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.cookiesText1 ||
    "At Nivasa, we use cookies to personalize your experience on our website and to display relevant advertisements. Our use of cookies is standard practice, similar to that of other reputable online platforms."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.cookiesText2 ||
    "Cookies are small files stored by your browser on your device’s hard drive. They allow us to enhance your browsing experience, such as remembering your login information (only your password is required after the initial login), and delivering personalized offers or ads based on your preferences."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.cookiesText3 ||
    "We may also use cookies to display advertisements on third-party websites. These cookies help us track the effectiveness of our ads and show you relevant services that might interest you. Third-party advertising companies may also use technologies like pixel tags to measure the success of ads and serve you personalized offers. All information collected through these cookies is anonymous and does not link back to your personal identity."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.cookiesText4 ||
    "While most browsers accept cookies by default, you can adjust your browser settings to control how cookies are handled. However, blocking cookies from Nivasa might impact the functionality of the website, potentially limiting your ability to enjoy a seamless booking experience. You may also opt to block cookies from specific websites while allowing cookies from trusted sources."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.sessionDataText ||
    "Automatic Logging of Session Data: Whenever you visit our website, certain session data is automatically logged. This includes information such as your IP address, the operating system and browser you’re using, and details about your activities on the website (e.g., pages visited, duration of visit). We use this data to understand user preferences, diagnose technical issues, and improve our website’s performance."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.sessionDataText2 ||
    "While session data doesn’t identify you personally, it can help us determine your Internet Service Provider (ISP) and approximate geographic location based on your IP address. This information is collected anonymously and is used to enhance your experience on the website."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.dataSharingTitle || "WITH WHOM YOUR PERSONAL INFORMATION IS SHARED"}
</h3>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.serviceProvidersTitle || "Service Providers and Suppliers"} :
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.serviceProvidersText ||
    "To fulfill your booking, we may share your personal information with third-party service providers, such as airlines, hotels, bus services, taxi rentals, railways, and other suppliers involved in delivering the services you've booked. By making a reservation through Nivasa, you authorize us to share your information with these service providers. However, please note that we do not authorize these suppliers to use your data for purposes beyond fulfilling their role in your booking. Since these suppliers act as independent data controllers, Nivasa cannot be held responsible for their handling of your data. We recommend reviewing the privacy policies of the respective service providers to understand how they manage your personal information."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.serviceProvidersText2 ||
    "We do not sell, rent, or trade individual customer data to third parties. We only share personal information with our business partners or vendors who help us provide services, referrals, or promotional offers based on your booking history."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.sameGroupCompaniesTitle || "COMPANIES IN THE SAME GROUP"} :
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.sameGroupCompaniesText ||
    "To improve personalization and service efficiency, we may share your personal information within our affiliate or partner companies under secure conditions. This allows us to offer you information about additional services or products that may interest you, or to assist with any queries related to your bookings."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.sameGroupCompaniesText2 ||
    "If Nivasa is acquired by another company, your personal data may be transferred to the acquirer as part of the transaction. Similarly, if we undergo business restructuring, expansion, or transfer part of our operations, your information may be transferred to the new business entity or part of the business unit involved."}
</p>
<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.businessPartnersTitle || "BUSINESS PARTNERS AND THIRD-PARTY VENDORS"} :
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.businessPartnersText ||
    "We may share specific personal data with our business partners or third-party vendors to enhance your travel experience, such as offering co-branded credit cards, travel insurance, or other services that benefit Nivasa users. When you engage with services from our partners, those services will be governed by the partner's own privacy policies."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.businessPartnersText2 ||
    "We may also share your information with third parties we engage to handle certain tasks on our behalf, such as payment processing, data hosting, and data analysis."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.businessPartnersText3 ||
    "Additionally, we may use anonymous or aggregated personal data for research, statistical analysis, and reporting. This data helps us improve our services and may be shared with advertisers, suppliers, and business partners to enhance their offerings. This aggregated data does not identify you personally and is used solely for business analysis and operational improvement."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.businessPartnersText4 ||
    "Occasionally, Nivasa may hire third parties for market research or surveys. In such cases, any information shared with these third parties is strictly used for these specific projects and protected by confidentiality agreements. They will only use the data for these purposes and in compliance with applicable regulations."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.disclosureTitle || "DISCLOSURE OF INFORMATION"} :
</h3>

<h3 style={{ fontSize: "18px", lineHeight: "1.6", marginTop: "3px" }}>
  {languageLabels?.privacyPolicy?.disclosureSubtitle ||
    "In addition to the above, we may disclose your personal information in the following situations:"}
</h3>

<ul style={styles.paragraph}>
  {(languageLabels?.privacyPolicy?.disclosureList || [
    "As required by law, regulatory authorities, or court order.",
    "For internal compliance, audit purposes, or to secure our systems.",
    "To protect our rights, property, or those of our affiliates, employees, or customers, or when necessary to identify, contact, or take legal action against individuals causing harm or violating our rights.",
    "Such disclosures may occur without your prior knowledge, and Nivasa will not be held liable for any damages arising from these actions."
  ]).map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>


<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.userGeneratedContentTitle || "USER-GENERATED CONTENT"}
</h3>
<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.userGeneratedContentText ||
    "Nivasa allows users to share their experiences through reviews, ratings, and general poll questions. Users can also post questions related to the services offered on the platform or answer questions from other users. Additionally, we may contact you through third-party services to gather feedback about your recent bookings. While participation in feedback is entirely voluntary, you may receive notifications via email, SMS, WhatsApp, or in-app alerts asking you to share a review, respond to user queries, or contribute to a poll. Reviews can be written or submitted in video format, and they may also appear on other travel-related platforms."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.userGeneratedContentTypesTitle || "The types of User-Generated Content (UGC) we collect include:"}
</h3>

<ul style={styles.paragraph}>
  {(languageLabels?.privacyPolicy?.userGeneratedContentList || [
    "Reviews and Ratings",
    "Questions and Answers",
    "Crowd-sourced Data (polls)",
    "Each user posting a review, rating, question, or photograph will have a profile visible to other users. Your profile will display information like the number of trips taken, reviews written, questions answered, and photos shared."
  ]).map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>


<h5 style={styles.heading}>
  {languageLabels?.privacyPolicy?.optingOutTitle || "OPTING OUT OF PROMOTIONAL EMAILS"}
</h5>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.optingOutText ||
    "From time to time, you may receive promotional emails from us about special offers, discounts, new services, and updates on Nivasa. If you prefer not to receive these emails, simply click the 'unsubscribe' link or follow the opt-out instructions in any promotional email."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.permissionsTitle || "PERMISSIONS REQUIRED FOR OUR MOBILE APPS"}
</h3>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.permissionsText ||
    "When you install the Nivasa app on your device, we request certain permissions for the app to function optimally. You cannot customize these permissions. Below is a list of required permissions and how we use them:"}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.androidTitle || "For Android:"}
</h3>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.deviceAppHistoryTitle || "Device & App History"}
</h3>

<h5 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px", color: "#333" }}>
  {languageLabels?.privacyPolicy?.deviceAppHistoryText ||
    "To gather device-specific information like OS, network, hardware model, etc., to enhance your booking experience."}
</h5>
<div style={styles.containers}>
  {permissions.map((item, index) => (
    <p key={index} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
      <span style={styles.title}>{languageLabels?.privacyPolicy?.permissions?.[index]?.title || item.title} : </span>
      <span style={{ color: '#676767' }}>{languageLabels?.privacyPolicy?.permissions?.[index]?.description || item.description}</span>
    </p>
  ))}
</div>
 
            <h3 style={styles.heading}>{languageLabels?.privacyPolicy?.iosTitle||"For ios :"}</h3>
            <div style={styles.containers}>
                {Iospermissions.map((item, index) => (
                    <p key={index} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                        <span style={styles.title}>
                        {languageLabels?.privacyPolicy?.Iospermissions?.[index]?.title || item.title}
                            : </span>
                        <span style={{ color: '#676767' }}>  {languageLabels?.privacyPolicy?.Iospermissions?.[index]?.description || item.description}</span>
                    </p>
                ))}
        
            </div>


            <h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.protectionTitle || "HOW WE PROTECT YOUR PERSONAL INFORMATION"}
</h3>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.protectionText ||
    "All transactions on Nivasa are secure. We use TLS (Transport Layer Security) encryption to protect your personal information during transmission. Our website has robust security measures in place to protect against unauthorized access or misuse of your data. When you update or access your account information, we offer a secure server to ensure your details are protected."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.withdrawalTitle || "WITHDRAWAL OF CONSENT AND PERMISSION"}
</h3>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.withdrawalText ||
    "You have the right to withdraw your consent for the collection and processing of your personal information at any time. However, please note that doing so may limit your access to certain features or services on Nivasa. To withdraw consent, you can contact us at privacy@nivasa.com."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.rightsTitle || "YOUR RIGHTS REGARDING PERSONAL INFORMATION"}
</h3>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.rightsText ||
    "You can access and update your personal information through your user account. If you don't have an account, you can contact us at privacy@nivasa.com to request access, correction, or deletion of your information (with some mandatory fields excluded)."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.eligibilityTitle || "ELIGIBILITY TO TRANSACT WITH NIVASA"}
</h3>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.eligibilityText ||
    "You must be at least 18 years old to engage in transactions on Nivasa and to consent to the processing of your personal data."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.privacyPolicy?.policyChangesTitle || "CHANGES TO THE PRIVACY POLICY"}
</h3>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.policyChangesText ||
    "We reserve the right to update this privacy policy as needed to address legal, business, or customer requirements. We will notify users of any significant changes."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.privacyPolicy?.contactText ||
    "If you have concerns or questions regarding this privacy policy, please email us at privacy@nivasa.com. We will make every effort to address your concerns."}
</p>


        </div>
    );
};

export default PrivacyPolicy;

