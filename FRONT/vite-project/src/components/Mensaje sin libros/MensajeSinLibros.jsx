import React from 'react';
import { Grid, Typography } from '@mui/material/';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const MensajeSinLibros = () => {
  return (
    <Grid container justify="center" alignItems="center" style={{ height: '800px' }}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          <SentimentDissatisfiedIcon style={{ fontSize: 180, verticalAlign: 'middle' }} /><br/>
          No hay libros para las opciones seleccionadas, intenta con otro precio o categoría
        </Typography>
      </Grid>
    </Grid>
  );
}

export default MensajeSinLibros;
