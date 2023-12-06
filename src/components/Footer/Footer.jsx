import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, CircularProgress, Container, Grid, Link } from '@mui/material';
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
            const response = await fetch('http://localhost:3000/enviar-formulario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            await response.json();
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
        <Box component="footer" sx={{ bgcolor: 'black', color: 'primary.main', mt: 3, py: 3 }}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" color="inherit" gutterBottom>
                            BookFinder
                        </Typography>
                        <Typography variant="subtitle1" color="inherit">
                            Tu destino para encontrar y comprar libros en línea.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1" color="inherit">
                        ¿Tienes preguntas? Por favor, no dudes en contactarnos.
                      </Typography>
                        <Button onClick={handleOpen} color="inherit">
                            Contacto
                        </Button>
                    </Grid>
                </Grid>
            </Container>

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

// Estilos para el modal
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 'none'
};

export default Footer;
