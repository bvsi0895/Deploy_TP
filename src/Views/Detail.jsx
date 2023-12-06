import React, { useState, useContext } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Grid, Tooltip } from '@mui/material';
import { AddShoppingCart, ExpandMore as ExpandMoreIcon, RemoveShoppingCart } from '@mui/icons-material';
import accounting from 'accounting';
import Collapse from '@mui/material/Collapse';
import { CarritoContext } from '../providers/carritoContext.jsx';

const Detail = (props) => {
  const { titulo, autor, precio_$, url_imagen, nro_paginas, peso, fecha_publicacion, ISBN, editorial, idioma, descripcion, id } = props;
  const [expanded, setExpanded] = useState(false);
  const { carrito, agregarAlCarrito, removerDelCarrito } = useContext(CarritoContext);
  const estaEnCarrito = carrito.some(item => item.id === id);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const manejarAgregarAlCarrito = () => {
    agregarAlCarrito({ id, titulo, precio_$ });
  };

  const manejarRemoverDelCarrito = () => {
    removerDelCarrito(id);
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
              alt="Portada del libro"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardContent>
              <CardHeader
                title={titulo}
                subheader={autor}
              />
              <Typography variant='h5' color='textSecondary'>
                {accounting.formatMoney(precio_$, { precision: 0 })}
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
              {estaEnCarrito ? (
                <Tooltip title="Quitar del carrito">
                  <IconButton aria-label="remove from cart" onClick={manejarRemoverDelCarrito}>
                    <RemoveShoppingCart fontSize='large' />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Agregar al carrito">
                  <IconButton aria-label="add to cart" onClick={manejarAgregarAlCarrito}>
                    <AddShoppingCart fontSize='large' />
                  </IconButton>
                </Tooltip>
              )}
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
            <Typography >Argumento:</Typography>
            <Typography >
               {descripcion}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default Detail;
