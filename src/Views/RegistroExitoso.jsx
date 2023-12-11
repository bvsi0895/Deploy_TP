import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Container, Box } from '@mui/material';

const RegistroExitoso = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" align="center" gutterBottom>
          Su registro se ha realizado correctamente.
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Por favor, vuelva a login e ingrese su usuario y contraseña.
        </Typography>
        <Box display="flex" justifyContent="center">
          <Link to="/login">
            <Button variant="contained" color="primary">
              Volver a Login
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistroExitoso;
