import React, { useState } from 'react';
import logo from '../../src/assets/login.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  Grid,
  Box,
} from '@mui/material';
import { Google } from '@mui/icons-material';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const [errorMessage, setErrorMessage] = useState({
    message: '',
  });

  const history = useNavigate();

  const [isSignedUp, setIsSignedUp] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSignedUp(!isSignedUp);
  };

  const [userData, setUserData] = useState({
    mail: '',
    password: '',
    rol: '',
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [property]: value });
  };

  const submit = (e) => {
    e.preventDefault();

    // Resto del código ...

    // No olvides agregar el resto del código del método 'submit'
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar src={logo} alt="Logo" sx={{ width: 100, height: 100, marginBottom: 2 }} />
        <Typography component="h1" variant="h5">
          {isSignedUp ? 'Login' : 'Sign Up'}
        </Typography>
        <form method="post" onSubmit={submit} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            name="mail"
            value={userData.mail}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            id="pass"
            label="Contraseña"
            variant="outlined"
            name="password"
            value={userData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {!isSignedUp ? (
            <div>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Elija su rol...</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  name="rol"
                  onChange={handleChange}
                  value={userData.rol}
                  label="Rol"
                >
                  <MenuItem value={'cliente'}>Cliente</MenuItem>
                  <MenuItem value={'admin'}>Vendedor</MenuItem>
                </Select>
              </FormControl>
            </div>
          ) : (
            ''
          )}
          <Typography color="error" mt={2}>
            {errorMessage.message}
          </Typography>
          <Button variant="contained" type="submit" color="primary" fullWidth mt={2}>
            Enviar
          </Button>
          <Button variant="outlined" startIcon={<Google />} onClick={loginWithRedirect} fullWidth mt={2}>
            Ingresar con Google
          </Button>
        </form>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {isSignedUp ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
          </Typography>
          <Button onClick={handleLogin} fullWidth variant="contained" color="secondary" mt={2}>
            {isSignedUp ? 'Registrarse' : 'Iniciar sesión'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
