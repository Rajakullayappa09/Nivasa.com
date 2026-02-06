import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); 
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2, color: '#777' }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 3 }}
        onClick={handleGoHome}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default PageNotFound;
