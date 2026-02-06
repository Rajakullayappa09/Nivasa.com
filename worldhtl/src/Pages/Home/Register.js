import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Grid, Card, CardContent, Typography, Alert, LinearProgress } from '@mui/material';

const Register = ({ currentPractice }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [orgId] = useState(currentPractice?.org_id || '');
  const [roleName, setRoleName] = useState('');
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!userName) newErrors.userName = 'User Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!mobile) newErrors.mobile = 'Mobile number is required';
    else if (!/^\d+$/.test(mobile)) newErrors.mobile = 'Mobile number is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters long';
    if (!roleName) newErrors.roleName = 'Role Type is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setError('');
    setSuccessMessage('');
    setProgress(50);

    const payload = { user_name: userName, email, mobile, password, org_id: orgId, role_name: roleName };

    try {
      localStorage.setItem('user', JSON.stringify(payload));
      setSuccessMessage('User created successfully!');
      setProgress(100);
      navigate('/login');
    } catch (err) {
      setError('Failed to create user. Please check your input.');
      setProgress(0);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card style={{marginTop:'30px'}}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            User Register
          </Typography>
         
          {error && <Alert severity="error">{error}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} error={!!errors.userName} helperText={errors.userName} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={!!errors.email} helperText={errors.email} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} error={!!errors.mobile} helperText={errors.mobile} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={!!errors.password} helperText={errors.password} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Organization ID" value={orgId} disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Role Type" value={roleName} onChange={(e) => setRoleName(e.target.value)} error={!!errors.roleName} helperText={errors.roleName} />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Create User
            </Button>
          </form>
          {progress > 0 && <LinearProgress variant="determinate" value={progress} sx={{ mt: 2 }} />}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
