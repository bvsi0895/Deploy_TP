import React, { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Grid } from '@mui/material';
import { AddShoppingCart, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import accounting from 'accounting';
import Collapse from '@mui/material/Collapse';

const Detail = (props) => {
  const { titulo, autor, precio_$, url_imagen, nro_paginas, peso, fecha_publicacion, ISBN, editorial, idioma, descripcion } = props;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <CardMedia
              component="img"
              height="400"
              width="700"
              image={url_imagen}
              alt="Portada"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <CardHeader
                  title={titulo}
                  subheader={autor}
                />
                <Typography variant='h5' color='textSecondary'>
                {accounting.formatMoney(precio_$, { precision: 0 })}
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <br />
                Cantidad de páginas: {nro_paginas}
                <br />
                Peso: {peso} gramos
                <br />
                Fecha de publicación: {fecha_publicacion}
                <br />
                ISBN: {ISBN}
                <br />
                Editorial: {editorial}
                <br />
                Idioma: {idioma}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to Card">
                <AddShoppingCart fontSize='large' />
              </IconButton>
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
          </Grid>
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Argumento:</Typography>
          <Typography paragraph>
          </Typography>
          <Typography paragraph>
             {descripcion}
          </Typography>
         
        </CardContent>
      </Collapse>
      </Card>
    </div>
  );
};

export default Detail;
