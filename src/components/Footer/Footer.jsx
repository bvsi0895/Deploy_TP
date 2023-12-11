import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Container,
  Grid,
  Link,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SendIcon from '@mui/icons-material/Send';

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
  const [respuesta, setRespuesta] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://backtp-production.up.railway.app/enviar-formulario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      await response.json();
      setRespuesta('Mensaje enviado con éxito.');
      setTimeout(() => {
        setOpen(false);
        setRespuesta('');
      }, 2000);
    } catch (error) {
      setRespuesta('Error al enviar el mensaje: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#2196F3',
        color: 'primary.main',
        mt: 3,
        py: 3,
        flexGrow: 1,
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Container maxWidth="false">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color='#FFFFFF' gutterBottom>
              Grupo 2 DWA - Henry
            </Typography>
            <Typography variant="subtitle1" color='#FFFFFF'>
              Edward Adalid Pereira, Andrea Purrinos, Valentina Paglino, Jorge Conti
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color='#FFFFFF'>
              ¿Tienes preguntas? Por favor, no dudes en contactarnos.
            </Typography>
            <Button
              onClick={handleOpen}
              color="secondary"
              style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center' }}
            >
              <MailOutlineIcon sx={{ fontSize: 28, marginRight: 4 }} /> Contacto
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div>
              <Link href="#" color='#FFFFFF' variant="body2" style={{ marginRight: '10px' }}>
                Acerca de Nosotros
              </Link>
              <Link href="#" color='#FFFFFF' variant="body2" style={{ marginRight: '10px' }}>
                Política de Privacidad
              </Link>
              <Link href="#" color='#FFFFFF' variant="body2">
                Términos de Servicio
              </Link>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
        {'Derechos Reservados © '}
        BookFinder
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <MailOutlineIcon /> Formulario de Contacto
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              variant="outlined"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Mensaje"
              variant="outlined"
              name="mensaje"
              multiline
              rows={4}
              value={formData.mensaje}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
              disabled={isLoading}
              fullWidth
              sx={{ mt: 2 }}
            >
              {isLoading ? 'Enviando...' : 'Enviar'}
            </Button>
          </form>
          {respuesta && <Typography color="primary" mt={2}>{respuesta}</Typography>}
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
};

export default Footer;
