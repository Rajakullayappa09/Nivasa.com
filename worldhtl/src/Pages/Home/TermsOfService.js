import React, { useEffect } from "react";
 import localization_en from "../../assets/Localization/localization-en.json";
 import localization_es from "../../assets/Localization/localization-es.json";
import { useBooking } from "./BookingContext";
 
const TermsOfService = () => {
    const { bookingData, setBookingData, setSubmittedBooking, setShowFormInHeader, setLanguageLabels, languageLabels } = useBooking();
  useEffect(() => {
        const storedLanguage = localStorage.getItem('language') || 'en'; // Get the language from localStorage
        if (storedLanguage === 'en') {
            setLanguageLabels(localization_en); // Set English labels
        } else if (storedLanguage === 'es') {
            setLanguageLabels(localization_es); // Set Spanish labels
        }
    }, []);

    const escalationSteps = languageLabels?.termsOfService?.escalationSteps || [
        {
          textstepmain: "File a complaint through the WorldofHostel app or contact the associated PSP Bank.",
          link: {
            url: "https://worldofhostel.com/support",
            text: "WorldofHostel Support",
          },
        },
        {
          text: "If the complaint is not resolved, escalate it to the respective PSP Bank.",
          subLinks: [
            {
              bank: "ICICI Bank",
              url: "https://www.icicibank.com/complaints",
              text: "File a Complaint",
            },
            {
              bank: "IndusInd Bank",
              url: "https://www.indusind.com/complaints",
              text: "File a Complaint",
            },
          ],
        },
        {
          text: "If no resolution is provided, escalate the complaint to NPCI.",
          link: {
            url: "https://www.npci.org.in/complaints",
            text: "NPCI Complaint Form",
          },
        },
        {
          text: "If the issue remains unresolved, appeal to the Banking Ombudsman or the Digital Complaints Ombudsman.",
        },
      ];
      const terms = [
        {
          title: "Severability",
          description:
            "If any part of these terms is found invalid, the rest shall remain enforceable.",
        },
        {
          title: "Jurisdiction",
          description:
            "These terms are governed by Indian law and subject to courts in Delhi.",
        },
        {
          title: "Amendments",
          description: "WorldofHostel may update these terms as necessary.",
        },
        {
          title: "Confidentiality",
          description:
            "Users must maintain the confidentiality of any sensitive information shared by WorldofHostel.",
        },
        {
          title: "Feedback",
          description: "Users may provide feedback for service improvement.",
        },
        {
          title: "Privacy Policy",
          description:
            "Refer to the WorldofHostel Privacy Policy available on our website.",
        },
      ];


      const paymentteem = [
        {
          title: "Prepaid Bookings",
          description:"The total booking amount is paid at the time of booking and includes the reservation rate, taxes, service fees, and any applicable booking or convenience fees.",
        },
        {
          title: "Partial Payment ",
          description: "In certain cases, WOH Hotels may allow partial payments at the time of booking, with the remaining amount due per the booking terms. If incorrect payment details are provided, WOH Hotels reserves the right to cancel the booking.",
        },
        {
          title: "Pay at Hotel ",
          description: 
"The full payment is made directly to the hotel at check-in. For international bookings, payments may be charged in local or other designated currencies. Users should check with their banks regarding foreign exchange fees or transaction charges.",        },
       
      ];
    const styles = {
        // container: {
        //   width: "80%",
        //   margin: "auto",
        //   background: "white",
        //   padding: "20px",
        //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        //   textAlign: "center",
        // },
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
 
    };
    return (
        <div
            style={{
                maxWidth: "100%",
                padding: "50px 0px 0px 40px ",
                // background: "white",
                // borderRadius: "10px",
                // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                // fontFamily: "Arial, sans-serif",
            }}
        >
              <h2
        style={{
          fontSize: "25px",
          fontWeight: "Roboto",
          textTransform: "uppercase",
          marginBottom: "10px",
          color: "#1C1C1C",
          height: "28px",
        }}
      >
        {languageLabels?.termsOfService?.termsTitle || "TERMS OF SERVICE"}
      </h2>

      {/* Effective Date */}
      <p
        style={{
          fontSize: "16px",
          color: "#5E6282",
          marginBottom: "20px",
          fontWeight: 500,
        }}
      >
        <strong>
          {languageLabels?.termsOfService?.effectiveDate ||
            "Effective Date: 05, February 2025"}
        </strong>
      </p>

      {/* Applicability Section */}
      <div style={{ marginTop: "40px" }}>
        <h3 style={styles.heading}>
          {languageLabels?.termsOfService?.applicabilityTitle || "APPLICABILITY"}
        </h3>
        <p style={styles.paragraph}>
          {languageLabels?.termsOfService?.applicabilityText1 ||
            "This User Agreement, along with the Terms of Service (collectively referred to as the 'User Agreement'), establishes the terms and conditions for the use of services and products offered by World of Hostel ('WoH')."}
        </p>
        <p style={styles.paragraph}>
          {languageLabels?.termsOfService?.applicabilityText2 ||
            "Any individual ('User') who inquires about or purchases any products or services from WoH through its websites, mobile applications, representatives, offices, call centers, branch offices, franchisees, or agents (collectively referred to as 'Sales Channels') agrees to be bound by this User Agreement. The websites and mobile applications of WoH are collectively referred to as the 'Website'."}
        </p>
        <p style={styles.paragraph}>
          {languageLabels?.termsOfService?.applicabilityText3 ||
            "Both the User and WoH are individually referred to as a 'Party' and collectively as 'Parties' under this User Agreement."}
        </p>
        <p style={styles.paragraph}>
          {languageLabels?.termsOfService?.applicabilityText4 ||
            "The 'Terms of Service' available on WoH's website outline the terms and conditions applicable to various services or products provided by WoH. Users must refer to the relevant Terms of Service applicable to the specific product or service they book. These Terms of Service are binding on the User."}
        </p>
      </div>
 
 
          {/* Eligibility to Use Section */}
<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.eligibilityTitle || "ELIGIBILITY TO USE"}
</h3>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.eligibilityText1 ||
    "The User must be at least 18 years old and possess the legal authority to enter into an agreement to use the services of WoH. If a User is under 18 years of age, they are not permitted to register or transact on the Website."}
</p>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.eligibilityText2 ||
    "If a minor wishes to use or transact on the Website, such use must be conducted by a person of legal contracting age (such as a parent or legal guardian). WoH reserves the right to terminate membership and/or block access to the Website if it is discovered that a minor or legally incompetent individual has falsely registered."}
</p>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.eligibilityText3 ||
    "Before using the Website, approaching any Sales Channels, or procuring services from WoH, the User must read and understand this User Agreement. Acceptance of this User Agreement is deemed binding upon any use of WoH’s services. If the User disagrees with any part of this Agreement, they must refrain from accessing or using WoH's services."}
</p>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.eligibilityText4 ||
    "All rights and liabilities of the User and WoH regarding any services or products facilitated by WoH are limited to the scope of this User Agreement."}
</p>

{/* Content Section */}
<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.contentTitle || "CONTENT"}
</h3>
<p
  style={{
    fontSize: "16px",
    color: "#555",
    lineHeight: "1.6",
    marginTop: "5px",
    width: "100%",
  }}
>
  {languageLabels?.termsOfService?.contentText1 ||
    "All content provided through various Sales Channels, including but not limited to audio, images, software, text, and icons ('Content'), is owned or licensed by WoH and protected under applicable intellectual property laws. Users may only use this Content as expressly permitted by WoH."}
</p>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.contentText2 ||
    "Users must follow all instructions provided by WoH regarding the use of Content."}
</p>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.contentText3 ||
    "WoH owns and displays various proprietary logos, service marks, and trademarks on the Website and other Sales Channels. The User is not granted any rights or licenses to use these proprietary logos, service marks, or trademarks. Unauthorized use of the Content constitutes a violation of applicable laws."}
</p>

<h3
  style={{
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "20px",
    color: "#333",
  }}
>
  {languageLabels?.termsOfService?.websiteUsageTitle || "WEBSITE USAGE"}
</h3>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.websiteUsageText1 ||
    "The Website is intended for lawful use by bona fide Users."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.websiteUsageText2 ||
    "Users must not distribute, exchange, modify, sell, or transmit any material from the Website, including but not limited to text, images, audio, and video, for commercial or public purposes."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.websiteUsageText3 ||
    "This User Agreement grants Users a limited, non-exclusive, non-transferable right to use the Website in accordance with the specified terms. Users must not interrupt or attempt to disrupt the operation of the Website."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.websiteUsageText4 ||
    "Access to certain Website features may only be available to registered Users. Registration may require Users to provide information, which may be personal or optional. Users represent and warrant that all provided information is true and accurate."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.websiteUsageText5 ||
    "WoH reserves the right to terminate access to the Website or any portion of it at any time without notice for maintenance or other reasons."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.websiteUsageText6 ||
    "WoH endeavors to ensure that its Website is free from viruses or malware. However, Users download or obtain data at their own risk and are solely responsible for any damage to their devices or data loss resulting from such activities."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.websiteUsageText7 ||
    "WoH reserves the right to improve or modify the Website at any time without prior notice. Users may report unlawful, objectionable, or infringing content to support@worldofhostel.com. Upon receiving a report, WoH will investigate and take appropriate action."}
</p>

 
<h2 style={styles.heading}>
  {languageLabels?.termsOfService?.userResponsibilitiesTitle || "USER RESPONSIBILITIES"}
</h2>

<h3 style={{ fontSize: '16px', fontWeight: 300, lineHeight: '20px' }}>
  {languageLabels?.termsOfService?.userResponsibilitiesText1 ||
    "Users"} <strong>{languageLabels?.termsOfService?.userResponsibilitiesStrong || "must not"}</strong> 
  {languageLabels?.termsOfService?.userResponsibilitiesText2 ||
    " host, display, upload, publish, transmit, or share any content on WoH’s Website or app that:"}
</h3>

<ul style={styles.paragraph}>
  <li>{languageLabels?.termsOfService?.userResponsibilitiesList1 || "Belongs to another person without authorization;"}</li>
  <li>{languageLabels?.termsOfService?.userResponsibilitiesList2 || "Is obscene, pornographic, or invasive of privacy;"}</li>
  <li>{languageLabels?.termsOfService?.userResponsibilitiesList3 || "Promotes money laundering, gambling, or violence;"}</li>
  <li>{languageLabels?.termsOfService?.userResponsibilitiesList4 || "Harms minors;"}</li>
  <li>{languageLabels?.termsOfService?.userResponsibilitiesList5 || "Infringes on intellectual property rights;"}</li>
  <li>{languageLabels?.termsOfService?.userResponsibilitiesList6 || "Deceives or misleads recipients;"}</li>
  <li>{languageLabels?.termsOfService?.userResponsibilitiesList7 || "Impersonates another person;"}</li>
  <li>{languageLabels?.termsOfService?.userResponsibilitiesList8 || "Threatens national security or public order;"}</li>
  <li>{languageLabels?.termsOfService?.userResponsibilitiesList9 || "Contains malicious software or viruses;"}</li>
  <li>{languageLabels?.termsOfService?.userResponsibilitiesList10 || "Violates any applicable laws."}</li>
</ul>

 
<h3 style={styles.heading}>
                {languageLabels?.termsOfService?.reportProcedureTitle || "PROCEDURE TO REPORT OBJECTIONABLE OR INFRINGING CONTENT"}
            </h3>
            <p style={styles.paragraph}>
                {languageLabels?.termsOfService?.reportProcedureText ||
                    "Users may report unlawful, objectionable, or infringing content found on the Website or app. Complaints should be sent to "}
                <a href="mailto:legal@worldofhostel.com" className="text-blue-600 underline">
                    legal@worldofhostel.com
                </a>{" "}
                {languageLabels?.termsOfService?.reportContentDescriptionEnd || " and must include:"}
            </p>
            <ul style={styles.list}>
                <li>{languageLabels?.termsOfService?.reportContentList1 || "A clear identification of the violation."}</li>
                <li>{languageLabels?.termsOfService?.reportContentList2 || "The location of the material on the Website (including a link if applicable)."}</li>
                <li>{languageLabels?.termsOfService?.reportContentList3 || "Proof of ownership for intellectual property complaints."}</li>
                <li>{languageLabels?.termsOfService?.reportContentList4 || "Contact information for further communication."}</li>
            </ul>
            <p style={styles.paragraph}>
                {languageLabels?.termsOfService?.reportConsent ||
                    "By submitting a complaint, the complainant consents to WoH sharing complaint details with relevant third parties, including the accused parties, for evaluation."}
            </p>
            <p style={styles.paragraph}>
                {languageLabels?.termsOfService?.reportReview ||
                    "WoH will review complaints within the timeframe prescribed by applicable law. Users must provide all necessary information to facilitate the investigation. WoH shall not be liable for any action or omission in response to a complaint, nor does it guarantee specific outcomes for reported issues. All rights of WoH in such matters are fully reserved."}
            </p>

            <h3 style={styles.heading}>
                {languageLabels?.termsOfService?.travelAgentBookingsTitle || "BOOKINGS BY TRAVEL AGENTS"}
            </h3>
            <p style={styles.paragraph}>
                {languageLabels?.termsOfService?.travelAgentRestrictions ||
                    "Except with prior registration as a B2B agent, priority partner, or franchisee with World of Hostel (“WoH”) and explicit permission to use the Website for commercial purposes, all travel agents, tour operators, consolidators, or aggregators (collectively referred to as “Travel Agents”) are strictly prohibited from using the Website for any commercial or resale purpose. If such unauthorized bookings are detected, WoH reserves the right, without limitation, to immediately cancel all such bookings without prior notice, withhold payments, or deny any refunds. WoH shall not be liable for any incidental loss or damage arising from such bookings. The liability for any cancellations shall solely rest with the Travel Agents."}
            </p>
            <p style={styles.paragraph}>
                {languageLabels?.termsOfService?.travelAgentDiscounts ||
                    "All discounts and offers displayed on the Website are exclusively for individual Users making legitimate bookings and are not applicable to Travel Agents unless explicitly stated."}
            </p>

            <h3 style={styles.heading}>
                {languageLabels?.termsOfService?.wohLiabilityTitle || "LIMITED LIABILITY OF WOH"}
            </h3>
            <p style={styles.paragraph}>
                {languageLabels?.termsOfService?.wohLiabilityDescription ||
                    "WoH functions solely as a facilitator connecting Users with hostels, accommodations, and other service providers (“Service Providers”). Unless explicitly stated otherwise, WoH does not act as a reseller and its liability is limited to confirming a booking as per the User’s selection."}
            </p>
            <p style={styles.paragraph}>
                {languageLabels?.termsOfService?.wohLiabilityExclusion ||
                    "Any disputes, issues, or grievances regarding the quality of services, facilities, or experiences at the booked accommodations shall be the sole responsibility of the respective Service Providers. WoH assumes no liability for any errors, omissions, breaches, representations, or negligence of any Service Provider."}
            </p>
            <h5
    style={{
        fontSize: "16px",
        lineHeight: "1.6",
        marginTop: "5px",
        width: "100%",
    }}
>
    {languageLabels?.termsOfService?.wohDisclaimerTitle ||
        "Unless explicitly committed by WoH:"}
</h5>
<ul style={styles.paragraph}>
    {(languageLabels?.termsOfService?.wohDisclaimerPoints || [
        "WoH does not guarantee the standard, quality, or availability of services provided by Service Providers.",
        "WoH is not responsible for any discrepancy between the actual service provided and the descriptions listed on the Website.",
        "WoH shall not be liable for any changes or cancellations by the Service Providers.",
    ]).map((point, index) => (
        <li key={index}>{point}</li>
    ))}
</ul>
<p style={styles.paragraph}>
    {languageLabels?.termsOfService?.wohBookingAcknowledgment ||
        "By booking through WoH, the User acknowledges that WoH merely provides a technology platform for bookings and that the ultimate contract of service is between the User and the Service Provider."}
</p>

<h3 style={styles.heading}>
    {languageLabels?.termsOfService?.userResponsibilityTitle || "USER'S RESPONSIBILITY"}
</h3>
{(languageLabels?.termsOfService?.userResponsibilityPoints || []).map((point, index) => (
    <p key={index} style={styles.paragraph}>{point}</p>
))}

<h3 style={styles.heading}>
    {languageLabels?.termsOfService?.securityAccountTitle || "SEGURIDAD E INFORMACIÓN DE LA CUENTA"}
</h3>
{(languageLabels?.termsOfService?.securityAccountPoints || []).map((point, index) => (
    <p key={index} style={styles.paragraph}>{point}</p>
))}

<h3 style={styles.heading}>
    {languageLabels?.termsOfService?.feesAndPaymentTitle || "TARIFAS Y PAGOS"}
</h3>
{(languageLabels?.termsOfService?.feesAndPaymentPoints || []).map((point, index) => (
    <p key={index} style={styles.paragraph}>{point}</p>
))}

<h3 style={styles.heading}>
    {languageLabels?.termsOfService?.mobileNumberUsageTitle || "USO DEL NÚMERO DE TELÉFONO MÓVIL Y DETALLES DE COMUNICACIÓN POR WORLD OF HOSTEL"}
</h3>
{(languageLabels?.termsOfService?.mobileNumberUsagePoints || []).map((point, index) => (
    <p key={index} style={styles.paragraph}>{point}</p>
))}
 <h5 style={{ fontSize: "16px", lineHeight: "1.6", marginTop: "5px", width: "100%" }}>
  {languageLabels?.termsOfService?.communicationConsent || "The User unconditionally consents to such communications via SMS, WhatsApp, voice calls, emails, or any other mode, acknowledging that they are:"}
</h5>

<ul style={styles.paragraph}>
  <li>{languageLabels?.termsOfService?.communicationRequest || "Based on the User’s request and authorization;"}</li>
  <li>{languageLabels?.termsOfService?.communicationTransactional || "Transactional in nature and not unsolicited commercial communication;"}</li>
  <li>{languageLabels?.termsOfService?.communicationCompliance || "Compliant with relevant regulatory guidelines."}</li>
</ul>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.communicationIndemnity || "The User indemnifies World of Hostel against any losses or damages incurred due to actions taken by regulatory authorities arising from complaints related to the above communications, including errors in the contact details provided by the User."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.insuranceTitle || "INSURANCE"}
</h3>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.insuranceResponsibility || "Unless explicitly offered by World of Hostel as part of a service or booking, obtaining travel insurance is the sole responsibility of the User. World of Hostel will not accept claims related to any issues arising from the lack of sufficient insurance coverage."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.insuranceClaims || "If insurance is provided as part of a booking, it will be governed by the terms and conditions of the respective third-party insurance provider. World of Hostel acts only as a facilitator, and any claims or disputes must be addressed directly with the insurance company. World of Hostel will not be responsible for any partial or full denial of claims."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.visaObligationTitle || "VISA OBLIGATION"}
</h3>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.visaResponsibility || "Users making international bookings through World of Hostel are solely responsible for obtaining any necessary visas, including transit visas or other travel authorizations required by the destination country or transit countries."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.visaLiability || "World of Hostel is not liable for any issues, including travel restrictions or denied entry, resulting from visa-related complications. Refunds, if applicable, will be processed as per the booking and cancellation policies of the respective service providers."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.forceMajeureTitle || "FORCE MAJEURE"}
</h3>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.forceMajeureDescription1 || 
    "In exceptional circumstances, World of Hostel and/or its service providers may be unable to fulfill confirmed bookings due to events beyond reasonable control, including but not limited to natural disasters, labor unrest, insolvency, government regulations, pandemics, terrorist activities, operational disruptions, or technical failures."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.forceMajeureDescription2 || 
    "If prior knowledge of such an event is available, World of Hostel will make its best effort to provide alternative options or refunds where applicable. However, as a facilitator, World of Hostel is not liable for any losses incurred due to Force Majeure events. The User must seek resolution directly from the respective service providers."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.thirdPartyTitle || "ADVERTISERS & THIRD-PARTY LINKS"}
</h3>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.thirdPartyDescription1 || 
    "World of Hostel’s website may contain links to third-party websites. These are not controlled by World of Hostel, and the company is not responsible for their content, accuracy, or reliability. Accessing such third-party websites is at the User’s own risk."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.thirdPartyDescription2 || 
    "World of Hostel does not endorse any advertisers or linked sites and will not be held liable for any losses or damages resulting from reliance on third-party content."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.rightToRefuseTitle || "RIGHT TO REFUSE SERVICE"}
</h3>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.rightToRefuseDescription || 
    "World of Hostel reserves the right to decline any booking at its sole discretion without obligation to provide a reason."}
</p>
<h5 style={{
  fontSize: "16px",
  lineHeight: "1.6",
  marginTop: "5px",
  width: '100%'
}}>
  {languageLabels?.termsOfService?.accountTerminationTitle || 
    "The company may suspend or terminate a User’s account if:"}
</h5>

<ul style={styles.paragraph}>
  <li>{languageLabels?.termsOfService?.accountTerminationBreach || 
    "The User breaches any terms of this agreement;"}</li>
  <li>{languageLabels?.termsOfService?.accountTerminationMisleadingInfo || 
    "The User provides inaccurate, misleading, or unverifiable information;"}</li>
  <li>{languageLabels?.termsOfService?.accountTerminationFraud || 
    "The User engages in fraudulent or unlawful activities."}</li>
</ul>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.serviceRefusal || 
    "Service providers may also refuse service to Users based on health concerns, safety reasons, behavioral issues, or government-mandated travel restrictions. In such cases, any claims, refunds, or damages shall be handled solely between the User and the service provider."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.cancellationPolicyTitle || "CANCELLATION POLICY"}
</h3>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.cancellationPolicyInfo || 
    "Users must provide accurate and valid information when booking through World of Hostel. If any misrepresentation is detected, World of Hostel reserves the right to cancel the booking without prior notice."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.cancellationPolicyLiability || 
    "If a booking is canceled by regulatory authorities, service providers, or due to suspected fraudulent activity, World of Hostel will not be liable for any resultant losses. Refunds, if applicable, will be processed as per the respective cancellation policies."}
</p>
<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.fraudPreventionTitle || "FRAUD PREVENTION & SECURITY"}
</h3>

<p style={{
  fontSize: "16px",
  color: "#555",
  lineHeight: "1.6",
  marginTop: "5px",
  width: '100%'
}}>
  {languageLabels?.termsOfService?.fraudPreventionInfo || 
  "World of Hostel’s representatives will never request sensitive personal information such as credit/debit card details, passwords, or OTPs. Users should report any suspicious activity immediately."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.indemnityTitle || "FRAUD PREVENTION & SECURITY"}
</h3>

<h5 style={{
  fontSize: "16px",
  lineHeight: "1.6",
  marginTop: "5px",
  width: '100%'
}}>
  {languageLabels?.termsOfService?.indemnityAgreement || 
  "The User agrees to indemnify and hold harmless World of Hostel, its affiliates, and representatives against any claims, liabilities, or losses arising from:"}
</h5>

<ul style={styles.paragraph}>
  <li>
    {languageLabels?.termsOfService?.indemnityBreach || 
    "Breach of any representation or obligation by the User;"}
  </li>
  <li>
    {languageLabels?.termsOfService?.indemnityLawViolation || 
    "Violations of applicable laws or regulations;"}
  </li>
  <li>
    {languageLabels?.termsOfService?.indemnityMisuse || 
    "Misuse of the platform or fraudulent activities."}
  </li>
</ul>
<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.covidPoliciesTitle || "COVID-19 RELATED POLICIES"}
</h3>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.covidPoliciesInfo || 
  "Due to the ongoing impact of COVID-19, service providers may cancel or refuse service to Users based on health and safety guidelines. Refunds, if applicable, will be processed according to the policies of the service provider."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.covidCompliance || 
  "Users are responsible for complying with all government-mandated health advisories, including providing necessary health declarations, downloading government-specified applications, and adhering to safety protocols during travel."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.covidTerms || 
  "These terms are designed to ensure a smooth booking experience for all Users of World of Hostel. By using our services, you acknowledge and agree to these policies."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.upiTermsTitle || "WorldofHostel UPI Terms & Conditions"}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.upiTpapInfo || 
  "WorldofHostel as a Third-Party Application Provider (TPAP) under UPI"}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.upiProviderDetails || 
  "WorldofHostel is a TPAP authorized by NPCI to facilitate UPI payments through its partner PSP banks, ICICI Bank and IndusInd Bank. As a TPAP, WorldofHostel enables customers to use UPI services while ensuring compliance with NPCI’s regulations."}
</p>

<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.upiSupport || 
  "In accordance with agreements between WorldofHostel, ICICI Bank, IndusInd Bank, and NPCI, WorldofHostel provides first-level support for customer grievances related to UPI transactions. If a complaint remains unresolved, users may escalate it to their PSP Bank, their linked bank account provider, NPCI, and ultimately the Banking Ombudsman or the Ombudsman for Digital Complaints."}
</p>

<h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
                {languageLabels?.termsOfService?.faqsTitle || "Frequently Asked Questions (FAQs)"}
            </h3>

            <h5 style={{ fontSize: "16px", lineHeight: "1.6", marginTop: "5px", width: "100%" }}>
                {languageLabels?.termsOfService?.npcQuestion || "What is NPCI?"}
            </h5>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6", marginBottom: "10px" }}>
                {languageLabels?.termsOfService?.npcAnswer || 
                "The National Payments Corporation of India (NPCI) is an entity authorized by the Reserve Bank of India (RBI) that operates and regulates the UPI payment system."}
            </p>

            <h5 style={{ fontSize: "16px", lineHeight: "1.6", marginTop: "5px", width: "100%" }}>
                {languageLabels?.termsOfService?.pspQuestion || "What is a PSP Bank?"}
            </h5>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6", marginBottom: "10px" }}>
                {languageLabels?.termsOfService?.pspAnswer || 
                "A Payment Service Provider (PSP) is a banking institution authorized to facilitate UPI transactions. PSPs partner with TPAPs to provide UPI services to end users."}
            </p>

            <h5 style={{ fontSize: "16px", lineHeight: "1.6", marginTop: "5px", width: "100%" }}>
                {languageLabels?.termsOfService?.tpapQuestion || "What is a TPAP?"}
            </h5>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6", marginBottom: "10px" }}>
                {languageLabels?.termsOfService?.tpapAnswer || 
                "A Third-Party Application Provider (TPAP) is an entity that offers UPI-compliant applications to users for conducting UPI transactions."}
            </p>

            <h5 style={{ fontSize: "16px", lineHeight: "1.6", marginTop: "5px", width: "100%" }}>
                {languageLabels?.termsOfService?.endUserQuestion || "Who is an End-User Customer?"}
            </h5>
            <ul style={{
                fontSize: "16px",
                color: "#555",
                lineHeight: "1.6",
                marginTop: "5px",
                width: '100%'
            }}>
                <li>{languageLabels?.termsOfService?.anindividualwho}An individual who utilizes UPI services to send and receive payments.</li>
            </ul>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
                {languageLabels?.termsOfService?.title || "Roles & Responsibilities"}
            </h3>
            <h5 style={{ fontSize: "16px", lineHeight: "1.6", marginTop: "5px", width: "100%" }}>
                {languageLabels?.termsOfService?.npcTitle || "NPCI’s Responsibilities:"}
            </h5>
            <ul style={{ fontSize: "16px", color: "#555", lineHeight: "1.6", marginBottom: "10px" }}>
                <li>{languageLabels?.termsOfService?.npcPoint1 || "Owns and regulates the UPI platform."}</li>
                <li>{languageLabels?.termsOfService?.npcPoint2 || "Sets rules and standards for UPI participants."}</li>
                <li>{languageLabels?.termsOfService?.npcPoint3 || "Approves and audits UPI participants, including banks and TPAPs."}</li>
                <li>{languageLabels?.termsOfService?.npcPoint4 || "Ensures security and efficiency within the UPI network."}</li>
            </ul>
            <h5 style={{ fontSize: "16px", lineHeight: "1.6", marginTop: "5px", width: "100%" }}>
                {languageLabels?.termsOfService?.pspTitle || "PSP Bank’s Responsibilities:"}
            </h5>
            <ul style={{ fontSize: "16px", color: "#555", lineHeight: "1.6", marginBottom: "10px" }}>
                <li>{languageLabels?.termsOfService?.pspPoint1 || "Facilitates customer onboarding and account linking for UPI transactions."}</li>
                <li>{languageLabels?.termsOfService?.pspPoint2 || "Ensures compliance with security protocols and transaction integrity."}</li>
                <li>{languageLabels?.termsOfService?.pspPoint3 || "Conducts audits of TPAPs."}</li>
                <li>{languageLabels?.termsOfService?.pspPoint4 || "Manages dispute resolution mechanisms for UPI-related complaints."}</li>
            </ul>
            <h5 style={{ fontSize: "16px", lineHeight: "1.6", marginTop: "5px", width: "100%" }}>
                {languageLabels?.termsOfService?.tpapTitle || "TPAP’s Responsibilities (WorldofHostel):"}
            </h5>
            <ul style={{ fontSize: "16px", color: "#555", lineHeight: "1.6", marginBottom: "10px" }}>
                <li>{languageLabels?.termsOfService?.tpapPoint1 || "Provides a UPI-compliant platform for transactions in partnership with PSP Banks."}</li>
                <li>{languageLabels?.termsOfService?.tpapPoint2 || "Ensures adherence to security and data protection standards."}</li>
                <li>{languageLabels?.termsOfService?.tpapPoint3 || "Stores UPI transaction data exclusively in India."}</li>
                <li>{languageLabels?.termsOfService?.tpapPoint4 || "Offers a structured grievance redressal mechanism."}</li>
            </ul>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
        {languageLabels?.termsOfService?.disputetitle || "Dispute Redressal Mechanism"}
      </h3>
      <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "10px" }}>
        {languageLabels?.termsOfService?.description || "Users can raise UPI-related complaints through the WorldofHostel app, the respective PSP Bank, or NPCI."}
      </p>
      <h5 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>
        {languageLabels?.termsOfService?.escalationProcessTitle || "Complaint Escalation Process:"}
      </h5>
      <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
      {languageLabels?.termsOfService?.escalationProcessTitle || "Complaint Escalation Process:"}
    </h3>
    <ul style={{ fontSize: "16px", color: "#555", lineHeight: "1.6", marginBottom: "10px" }}>
      {escalationSteps.map((step, index) => (
        <li key={index} style={{ marginBottom: "10px" }}>
          {step.textstepmain || step.text}
          {step.link && (
            <>{" "}
              <a href={step.link.url} style={{ color: "blue", textDecoration: "underline" }}>
                {step.link.text}
              </a>
            </>
          )}
          {step.subLinks && (
            <ul>
              {step.subLinks.map((sub, idx) => (
                <li key={idx}>
                  {sub.bank}:{" "}
                  <a href={sub.url} style={{ color: "blue", textDecoration: "underline" }}>
                    {sub.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
 
      <h5 style={{
                fontSize: "16px",
                // color: "#555",
                lineHeight: "1.6",
                marginTop: "5px",
                width: '100%'
            }}
            >
   {languageLabels?.termsOfService?.termsTitle1||" Additional Terms"}</h5>

<ul style={{ listStyle: "none", paddingLeft: "0" }}>
        {terms.map((term, index) => (
          <li key={index} style={{ marginBottom: "10px", display: "flex" }}>
            <span style={{ color: "gray", marginRight: "10px" }}>■</span>
            <strong>{ languageLabels?.termsOfService?.terms?.[index]?.title||term.title} :</strong> <span> { languageLabels?.termsOfService?.terms?.[index]?.description||term.description}</span>
          </li>
        ))}
      </ul>
      <h5 style={{
  fontSize: "16px",
  lineHeight: "1.6",
  marginTop: "5px",
  width: '100%'
}}>
  {languageLabels?.termsOfService?.grievanceRedressalContact?.title || "Grievance Redressal Contact"}:
</h5>
<ul style={styles.paragraph}>
  <li>{languageLabels?.termsOfService?.grievanceRedressalContact?.details[0]?.label || "Grievance Officer Email"}: {languageLabels?.termsOfService?.grievanceRedressalContact?.details[0]?.value || "[Provide Email]"}</li>
  <li>{languageLabels?.termsOfService?.grievanceRedressalContact?.details[1]?.label || "Working Hours"}: {languageLabels?.termsOfService?.grievanceRedressalContact?.details[1]?.value || "Monday to Friday (9:00 AM – 6:00 PM IST)"}</li>
</ul>

<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.roleOfWorldOfHostelHotelsAndLimitationOfLiability?.title || "ROLE OF WORLD OF HOSTEL HOTELS AND LIMITATION OF LIABILITY"}
</h3>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.roleOfWorldOfHostelHotelsAndLimitationOfLiability?.content[0] || "World of Hostel Hotels (WOH Hotels) acts solely as a facilitator, providing an online platform for users to select and book various accommodations, including hotels, hostels, home-stays, bed and breakfast establishments, farmhouses, and other alternative lodging options."}
</p>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.roleOfWorldOfHostelHotelsAndLimitationOfLiability?.content[1] || "All information regarding accommodations, including hotel classification, images, room types, amenities, and available facilities, is provided by the respective establishments. This information is for reference only. Any discrepancies between website images and actual hotel conditions must be addressed directly with the hotel. WOH Hotels holds no responsibility for such discrepancies and will not be liable for any resolution process between the user and the hotel."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.hotelInformationAndTerms?.title || "HOTEL INFORMATION AND TERMS"}
</h3>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.hotelInformationAndTerms?.content[0] || "The hotel booking confirmation issued by WOH Hotels is based entirely on the availability information provided by the hotel. WOH Hotels cannot be held responsible for any failure by the hotel to accommodate a user despite a confirmed booking, deficiencies in service standards, or any other service-related issues. If a hotel denies check-in due to overbooking, technical errors, or any other reason, WOH Hotels' liability is limited to offering an alternative accommodation (subject to availability) or refunding the booking amount (if paid). Any other service-related disputes must be resolved directly between the user and the hotel."  }
</p>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.hotelInformationAndTerms?.content[1] ||  "Hotels retain the right to admission, and WOH Hotels has no influence over their check-in policies. Some hotels may deny check-in to unmarried or unrelated couples, guests without proper identification, or local residents. In such cases, WOH Hotels is not responsible, and no refund will be provided."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.userResponsibilities?.title || "USER RESPONSIBILITIES"}
</h3>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.userResponsibilities?.content[0] || "Users are liable for any damage caused to the hotel property due to their actions or those of their accompanying guests. The extent of such damage will be determined by the hotel, and WOH Hotels will not intervene."}
</p>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.userResponsibilities?.content[1] || "The primary guest must be at least 18 years old for check-in. A valid identity proof and address proof must be presented at check-in; failure to do so may result in denial of accommodation without refund."}
</p>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.userResponsibilities?.content[2] || "Check-in and check-out times, along with any changes to these timings, are subject to hotel policies. Early check-in or late check-out requests depend on availability and may incur additional charges."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.additionalCharges?.title || "ADDITIONAL CHARGES"}
</h3>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.additionalCharges?.content[0] || "The booking amount paid by the user covers only the stay. Some bookings may include breakfast or meals as specified at the time of booking. Any other services such as laundry, room service, internet, telephone usage, or extra food and beverages must be paid for directly at the hotel."}
</p>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.additionalCharges?.content[1] || "Hotels may impose mandatory meal surcharges during festive periods such as Christmas, New Year's Eve, or other holidays. These charges must be settled directly at the hotel, and WOH Hotels has no control over their application."}
</p>

<h3 style={styles.heading}>
  {languageLabels?.termsOfService?.paymentTerms?.title || "PAYMENT TERMS"}
</h3>
<p style={styles.paragraph}>
  {languageLabels?.termsOfService?.paymentTerms?.content[0] || "Bookings may be made on either a 'Prepaid' or 'Pay at Hotel' basis, as specified by the hotel on the WOH Hotels platform."}
</p>

<ul style={{ listStyle: "none", paddingLeft: "0" }}>
        {paymentteem.map((term, index) => (
          <li key={index} style={{ marginBottom: "10px", display: "flex" }}>
            <span style={{ color: "gray", marginRight: "10px" , }}>■</span>
           <span style={{fontWeight:'bold', width:"150px"}}>{languageLabels?.termsOfService?.paymentteem?.[index]?.title||term.title}  </span><span style={{width:'100%'}}> {languageLabels?.termsOfService?.paymentteem?.[index]?.description||term.description}</span>
          </li>
        ))}
      </ul>
      <p style={styles.paragraph}>
    {languageLabels?.termsOfService?.payments?.creditCardPolicy || 
    "Some hotels may require users to provide a credit card or cash deposit upon check-in to cover incidental expenses. This requirement is independent of any payments made to WOH Hotels and is solely at the discretion of the hotel."}
</p>

<p style={styles.paragraph}>
    {languageLabels?.termsOfService?.payments?.securityPolicy || 
    "For security purposes, users must provide valid payment details. WOH Hotels reserves the right to cancel bookings if incorrect payment information is detected."}
</p>

<p style={styles.paragraph}>
    {languageLabels?.termsOfService?.payments?.acknowledgement || 
    "By using WOH Hotels' services, users acknowledge and agree to the above terms and conditions."}
</p>

<h3 style={styles.heading}>
    {languageLabels?.termsOfService?.activities?.title || "WORLD OF HOSTEL - ACTIVITIES AND OTHER SERVICES"}
</h3>

<h3 style={styles.heading}>
    {languageLabels?.termsOfService?.definitions?.title || "DEFINITIONS"}
</h3>

<p style={styles.paragraph}>
    {languageLabels?.termsOfService?.definitions?.activityDefinition || 
    "'Activity' refers to any service or experience booked through the World of Hostel platform, including but not limited to day tours, sightseeing, spa & wellness, adventure sports, cruises, theme/amusement parks, buffets, dining experiences, or any other listed activity."}
</p>

<p style={styles.paragraph}>
    {languageLabels?.termsOfService?.definitions?.activityProviderDefinition || 
    "The entity providing the Activity shall be referred to as the 'Activity Provider,' who is solely responsible for delivering the booked service or product to the User."}
</p>

<h3 style={styles.heading}>
    {languageLabels?.termsOfService?.liability?.title || "ROLE OF WORLD OF HOSTEL AND LIMITATION OF LIABILITY"}
</h3>

<p style={styles.paragraph}>
    {languageLabels?.termsOfService?.liability?.facilitatorRole || 
    "World of Hostel acts solely as a facilitator, enabling Users to book Activities through its platform. The actual transaction and service fulfillment occur between the User and the Activity Provider."}
</p>

<p style={styles.paragraph}>
    {languageLabels?.termsOfService?.liability?.noPickupService || 
    "World of Hostel does not provide pick-up or drop-off services for any Activity unless explicitly mentioned in the booking confirmation."}
</p>

<h5 style={{
    fontSize: "16px",
    lineHeight: "1.6",
    marginTop: "5px",
    width: '100%'
}}>
    {languageLabels?.termsOfService?.worldOfHostelLiability?.title || "World of Hostel shall not be responsible for:"}
</h5>
<ul style={styles.paragraph}>
    <li>{languageLabels?.termsOfService?.worldOfHostelLiability?.points[0] || "Any damage, loss, injury, accident, death, breakdown, schedule changes, cancellations without cause, inaccurate information, or service deficiencies caused by the Activity Provider."}</li>
    <li>{languageLabels?.termsOfService?.worldOfHostelLiability?.points[1] || "The health, safety, or well-being of the User during or after availing of the Activity."}</li>
    <li>{languageLabels?.termsOfService?.worldOfHostelLiability?.points[2] || "Any additional services purchased directly by the User from the Activity Provider."}</li>
    <li>{languageLabels?.termsOfService?.worldOfHostelLiability?.points[3] || "Any incorrect or misleading information provided by the Activity Provider."}</li>
</ul>
<p style={styles.paragraph}>
    {languageLabels?.termsOfService?.worldOfHostelLiability?.note || "The maximum liability of World of Hostel is limited to refunding the booking amount received for the reserved Activity."}
</p>    
<h3 style={styles.heading}>
    {languageLabels?.termsOfService?.responsibilitiesOfTheUsers?.title || "RESPONSIBILITIES OF THE USERS"}
</h3>

<ul style={styles.paragraph}>
    <li>{languageLabels?.termsOfService?.responsibilitiesOfTheUsers?.points?.[0] || "Users must comply with the terms and conditions of both the Activity Provider and World of Hostel."}</li>
    <li>{languageLabels?.termsOfService?.responsibilitiesOfTheUsers?.points?.[1] || "Users must present a valid booking/confirmation voucher issued by World of Hostel to avail of the Activity."}</li>
    <li>{languageLabels?.termsOfService?.responsibilitiesOfTheUsers?.points?.[2] || "Users must carry appropriate identification documents, including but not limited to an identity proof, address proof, or passport (for international Activities), as specified by the Activity Provider."}</li>
    <li>{languageLabels?.termsOfService?.responsibilitiesOfTheUsers?.points?.[3] || "Users may be required to sign waivers, consent forms, safety declarations, medical statements, or other documents before participating in an Activity, as mandated by the Activity Provider."}</li>
    <li>{languageLabels?.termsOfService?.responsibilitiesOfTheUsers?.points?.[4] || "Users must address any concerns directly with the Activity Provider after confirmation of their reservation."}</li>
    <li>{languageLabels?.termsOfService?.responsibilitiesOfTheUsers?.points?.[5] || "Users are responsible for ensuring they meet all eligibility criteria for the Activity, including but not limited to age limits, weight restrictions, medical conditions, or any other specific requirements. If found ineligible, the Activity Provider may deny participation without refund."}</li>
</ul>

<h3 style={styles.heading}>
    {languageLabels?.termsOfService?.paymentsBookingsAndCancellations?.title || "PAYMENTS, BOOKINGS, AND CANCELLATIONS"}
</h3>

<ul style={styles.paragraph}>
    <li>{languageLabels?.termsOfService?.paymentsBookingsAndCancellations?.points?.[0] || "Reservations are subject to the cancellation and refund policies of the respective Activity Provider, which may vary."}</li>
    <li>{languageLabels?.termsOfService?.paymentsBookingsAndCancellations?.points?.[1] || "World of Hostel may charge applicable taxes, service fees, or convenience fees where applicable."}</li>
</ul>

<h3 style={styles.heading}>{languageLabels?. termsOfService?.specialOffersAndCoupons?.specialOffers}</h3>
<h5 style={{ fontSize: "16px", lineHeight: "1.6", marginTop: "5px", width: "100%" }}>
    {languageLabels?.termsOfService?.specialOffersAndCoupons?.title || "The following terms apply to any coupons provided by World of Hostel:"}
</h5>
<ul style={styles.paragraph}>
    <li>{languageLabels?.termsOfService?.specialOffersAndCoupons?.points[0] || "World of Hostel’s responsibility is limited to issuing the coupon upon receipt of payment from the User."}</li>
    <li>{languageLabels?.termsOfService?.specialOffersAndCoupons?.points[1] || "The redemption of the coupon is solely the User’s responsibility, and the Activity Provider is responsible for delivering the service."}</li>
    <li>{languageLabels?.termsOfService?.specialOffersAndCoupons?.points[2] || "Coupons have a stated expiry date and cannot be used beyond that date."}</li>
    <li>{languageLabels?.termsOfService?.specialOffersAndCoupons?.points[3] || "Coupons are non-redeemable for cash."}</li>
    <li>{languageLabels?.termsOfService?.specialOffersAndCoupons?.points[4] || "Once purchased, coupons cannot be refunded or canceled."}</li>
</ul>
<p style={styles.paragraph}>
    {languageLabels?.termsOfService?.specialOffersAndCoupons?.disputeInfo || "For any disputes or clarifications, Users are encouraged to directly communicate with the Activity Provider or contact World of Hostel for assistance within the scope of its facilitation role."}
</p>
 </div>
    );
};
 
export default TermsOfService;
 