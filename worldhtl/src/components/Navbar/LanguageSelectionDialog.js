// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Typography,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText
// } from "@mui/material";
// import { Close } from "@mui/icons-material";
// import { useBooking } from "../../Pages/Home/BookingContext";
// import localization_en from "../../assets/Localization/localization-en.json";
// import localization_es from "../../assets/Localization/localization-es.json";
// import localization_tm from "../../assets/Localization/localization-tm.json";
// import localization_hi from "../../assets/Localization/localization-hi.json";
// import localization_tl from "../../assets/Localization/localization-tl.json";

// const LanguageSelectionDialog = ({ open, onClose }) => {
//   const { setLanguageLabels, setLanguage } = useBooking();
//   const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("language") || "en");
//   const [searchTerm, setSearchTerm] = useState("");

//   const languages = [
//     { code: "en", label: "English" },
//     { code: "es", label: "Spanish" },
//     { code: "ta", label: "Tamil" },
//     { code: "hi", label: "Hindi" },
//     { code: "te", label: "Telugu" }
//   ];

//   const filteredLanguages = searchTerm.length >= 2
//     ? languages.filter(lang => lang.label.toLowerCase().includes(searchTerm.toLowerCase()))
//     : [];

//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
//     const selectedLangLabel = languages.find(lang => lang.code === language).label;
//     setSearchTerm(selectedLangLabel);
//   };

//   const handleSelectLanguage = () => {
//     localStorage.setItem("language", selectedLanguage);
//     setLanguage(selectedLanguage);

//     const languageMap = {
//       en: localization_en,
//       es: localization_es,
//       ta: localization_tm,
//       hi: localization_hi,
//       te: localization_tl
//     };

//     setLanguageLabels(languageMap[selectedLanguage]);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle
//         sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
//       >
//         <Typography variant="h6" sx={{ fontWeight: "bold" }}>Select Language</Typography>
//         <IconButton onClick={onClose}>
//           <Close />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent>
//         <TextField
//           fullWidth
//           label="Search Language"
//           variant="outlined"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ marginBottom: 2 }}
//         />

//         {searchTerm.length >= 2 && filteredLanguages.length > 0 && (
//           <List>
//             {filteredLanguages.map(lang => (
//               <ListItem key={lang.code} disablePadding>
//                 <ListItemButton
//                   selected={selectedLanguage === lang.code}
//                   onClick={() => handleLanguageChange(lang.code)}
//                 >
//                   <ListItemText primary={lang.label} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         )}

//         {searchTerm.length >= 2 && filteredLanguages.length === 0 && (
//           <Typography color="error" sx={{ textAlign: "center", mt: 2 }}>
//             No matching language found
//           </Typography>
//         )}
//       </DialogContent>

//       <DialogActions sx={{ justifyContent: "space-between", padding: "16px 24px" }}>
//         <Button onClick={onClose} sx={{ color: "#666", fontSize: "1rem" }}>Cancel</Button>
//         <Button
//           onClick={handleSelectLanguage}
//           color="primary"
//           variant="contained"
//           sx={{ fontSize: "1rem" }}
//         >
//           Apply
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default LanguageSelectionDialog;

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
//   Typography,
//   Grid,
//   Box
// } from "@mui/material";
// import { Close } from "@mui/icons-material";
// import { useBooking } from "../../Pages/Home/BookingContext";
// import localization_en from "../../assets/Localization/localization-en.json";
// import localization_es from "../../assets/Localization/localization-es.json";
// import localization_tm from "../../assets/Localization/localization-tm.json";
// import localization_hi from "../../assets/Localization/localization-hi.json";
// import localization_tl from "../../assets/Localization/localization-tl.json";

// const LanguageSelectionDialog = ({ open, onClose }) => {
//   const { setLanguageLabels, setLanguage } = useBooking();
//   const [selectedLanguage, setSelectedLanguage] = useState(
//     localStorage.getItem("language") || "en"
//   );

//   const languages = [
//     { code: "en", label: "English" },
//     { code: "es", label: "Español" },
//     { code: "hi", label: "हिन्दी" },
//     { code: "ta", label: "தமிழ்" },
//     { code: "te", label: "తెలుగు" }
//   ];

//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
//     localStorage.setItem("language", language);
//     setLanguage(language);

//     const languageMap = {
//       en: localization_en,
//       es: localization_es,
//       tm: localization_tm,
//       hi: localization_hi,
//       tl: localization_tl
//     };

//     setLanguageLabels(languageMap[language] || localization_en);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
//       <DialogTitle
//         sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
//       >
//         <Typography variant="h6" sx={{ fontWeight: "bold" }}>Language</Typography>
//         <IconButton onClick={onClose}>
//           <Close />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent>
//         <Grid container spacing={2}>
//           {languages.map((lang) => (
//             <Grid item xs={4} key={lang.code}>
//               <Box
//                 onClick={() => handleLanguageChange(lang.code)}
//                 sx={{
//                   textAlign: "center",
//                   padding: "8px",
//                   borderRadius: "8px",
//                   cursor: "pointer",
//                   fontSize: "1rem",
//                   fontWeight: selectedLanguage === lang.code ? "bold" : "normal",
//                   backgroundColor: selectedLanguage === lang.code ? "#eee" : "transparent",
//                   border: selectedLanguage === lang.code ? "2px solid black" : "none",
//                   transition: "0.3s",
//                   "&:hover": { backgroundColor: "#f0f0f0" }
//                 }}
//               >
//                 {lang.label}
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default LanguageSelectionDialog;

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  Box,
  TextField,
  Divider,
  InputAdornment
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useBooking } from "../../Pages/Home/BookingContext";
import localization_en from "../../assets/Localization/localization-en.json";
import localization_es from "../../assets/Localization/localization-es.json";
import localization_tm from "../../assets/Localization/localization-tm.json";
import localization_hi from "../../assets/Localization/localization-hi.json";
import localization_tl from "../../assets/Localization/localization-tl.json";
import localization_fr from "../../assets/Localization/localization-fr.json";
import localization_pr from "../../assets/Localization/localization-pr.json";
import localization_kn from "../../assets/Localization/localization-kn.json";
import localization_ml from "../../assets/Localization/localization-ml.json";

import { SearchIcon } from "lucide-react";

const LanguageSelectionDialog = ({ open, onClose }) => {
  const { setLanguageLabels, setLanguage } = useBooking();
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "hi", label: "हिंदी " },
    { code: "ta", label: "ஆங்கிலம்" },
    { code: "te", label: "తెలుగు" },
    { code: "fr", label: "Français" },
    { code: "pr", label: "Português" },
    { code: "kn", label: "ಕನ್ನಡ" },
    { code: "ml", label: "മലയാളം" }

  ];

  // Filter languages based on search input
  const filteredLanguages = languages.filter((lang) =>
    lang.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem("language", language);
    setLanguage(language);

    const languageMap = {
      en: localization_en,
      es: localization_es,
      ta: localization_tm,
      hi: localization_hi,
      te: localization_tl,
      fr: localization_fr,
      pr: localization_pr,
      kn: localization_kn,
      ml: localization_ml

    };

    setLanguageLabels(languageMap[language] || localization_en);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}  maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: "12px",
            minHeight: "450px",
            width: "650px",
          },
        }} >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between",borderBottom:"1px solid #d3d3d3",minHeight:"40px"}}>
        <Box sx={{display:'flex',justifyContent:"space-between",width:"100%",alignContent:'center'}}>

        <Typography sx={{ fontWeight: "bold", fontSize: "16px",marginTop:"8px" }}>
          {selectedLanguage === "en" && "Select Language"}
          {selectedLanguage === "hi" && "भाषा चुनें"}
          {selectedLanguage === "te" && "భాషను ఎంచుకోండి"}
          {selectedLanguage === "ta" && "மொழியைத் தேர்ந்தெடுக்கவும்"}
          {selectedLanguage === "es" && "Seleccionar idioma"}
          {selectedLanguage === "fr" && "Sélectionner la langue"}
          {selectedLanguage === "pr" && "Selecionar idioma"}
          {selectedLanguage === "kn" && "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ"}
          {selectedLanguage === "ml" && "ഭാഷ തിരഞ്ഞെടുക്കുക"}
        </Typography>
        
        {/* <TextField
          variant="outlined"
          size="small"
          placeholder={
            selectedLanguage === "en" ? "Search language" :
              selectedLanguage === "hi" ? "भाषा खोजें" :
                selectedLanguage === "te" ? "భాషను వెతకండి" :
                  selectedLanguage === "ta" ? "மொழியை தேடுக" :
                    selectedLanguage === "es" ? "Buscar idioma" :
                      selectedLanguage === "fr" ? "Rechercher la langue" :
                        selectedLanguage === "pr" ? "Pesquisar idioma" :
                          selectedLanguage === "kn" ? "ಭಾಷೆ ಹುಡುಕು" :
                            selectedLanguage === "ml" ? "ഭാഷ അന്വേഷിക്കുക" :
                              "Search language"
          } value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "300px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        /> */}
        <IconButton onClick={onClose} style={{}}>
          <Close />
        </IconButton>
        </Box>

      </DialogTitle>
      <DialogContent>

        <Grid container spacing={2} p={0} mt={2}>
          {filteredLanguages.length > 0 ? (
            filteredLanguages.map((lang) => (
              <Grid item xs={5}  xl={4} md={4} key={lang.code}>
                <Box
                  onClick={() => handleLanguageChange(lang.code)}
                  sx={{
                    textAlign: "center",
                    padding: "8px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: selectedLanguage === lang.code ? "bold" : "normal",
                    backgroundColor: selectedLanguage === lang.code ? "#eee" : "transparent",
                    border: selectedLanguage === lang.code ? "2px solid black" : "none",
                    transition: "0.3s",
                    "&:hover": { backgroundColor: "#f0f0f0" }
                  }}
                >
                  {lang.label}
                </Box>
              </Grid>
            ))
          ) : (
            <Typography variant="body2" sx={{ textAlign: "center", }}>
              No languages found
            </Typography>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageSelectionDialog;
