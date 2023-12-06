import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { AddShoppingCart } from '@mui/icons-material';
import accounting from 'accounting';
import { Button, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Detail from './../../Views/Detail.jsx';
import React, { useState, useContext } from 'react';
import { CarritoContext } from '../../providers/carritoContext.jsx';
import Tooltip from '@mui/material/Tooltip';




const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
})); 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 5,
  pt: 2,
  px: 4,
  pb: 3,
};

function DetalleDeProducto(props) {
  const { agregarAlCarrito, removerDelCarrito, carrito } = useContext(CarritoContext);
  const { id, titulo, autor, precio_$, url_imagen, nro_paginas, peso, fecha_publicacion, ISBN, editorial, idioma, descripcion } = props;
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const estaEnCarrito = carrito.some(item => item.id === id);

  const manejarAgregarAlCarrito = () => {
    agregarAlCarrito({ id, titulo, precio_$ });
  };

  const manejarRemoverDelCarrito = () => {
    removerDelCarrito(id);
  };

  // Función para manejar la expansión del Collapse
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Función para abrir el Modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Función para cerrar el Modal
  const handleClose = () => {
    setOpen(false);
  };


  return (
   <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      
      <CardMedia
        component="img"
        height="400"
        width="700"
        image={url_imagen}
        alt="Portada"
      />
      <CardHeader 
        title={
          <Typography variant='h5'>
            {titulo}
          </Typography>
        }
      
      subheader={
        <Typography variant='body2' color='textSecondary' noWrap>
          {autor}
        </Typography>
      }        
      />
      <CardContent sx={{ flexGrow: 1, padding: 2 }}>
      <Typography            
           variant='h5'
           color='textSecondary'
           >
             {accounting.formatMoney(precio_$, { precision: 0 })}
            </Typography>
        <Typography variant="body2" color="text.secondary"> 
       
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      {estaEnCarrito ? (
        <Tooltip title="Quitar del carrito">
        <IconButton aria-label="remove from cart" onClick={manejarRemoverDelCarrito}>
          <RemoveShoppingCartIcon />
        </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Agregar al carrito">
        <IconButton aria-label="add to cart" onClick={manejarAgregarAlCarrito}>
          <AddShoppingCart fontSize='large' />
        </IconButton>
        </Tooltip>
      )}
     

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <React.Fragment>
      <Button onClick={handleOpen}>Ver detalle</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
        <Detail
                id={id}
                titulo={titulo}
                autor={autor}
                precio_$={precio_$}
                url_imagen={url_imagen}
                nro_paginas={nro_paginas}
                peso={peso}
                fecha_publicacion={fecha_publicacion}
                ISBN={ISBN}
                editorial={editorial}
                idioma={idioma}
                descripcion={descripcion}
              />
        
          <Button onClick={handleClose}>CERRAR</Button>
        </Box>
      </Modal>
    </React.Fragment>
      </CardActions>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Argumento:</Typography>
          <Typography>
          </Typography>
          <Typography>
             {descripcion}
          </Typography>
         
        </CardContent>
      </Collapse>
    </Card>

  )
}

export default DetalleDeProducto