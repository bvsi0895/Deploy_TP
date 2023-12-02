import React from 'react'
import DetalleDeProducto from '../Detalle de Producto/DetalleDeProducto'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


function ListadoDeProductos(props) {
    const { libros }=props
   
    
   

  return (
    <div>
         <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {libros.map((libro) => {
          const {categoria} = libro;
          const nombre = categoria ? categoria.nombre : 'Arte';


          return (
          <Grid key={libro.id} item xs={12} sm={6} md={4} lg={3}>
            <DetalleDeProducto 
           
            id = {libro.id}
            url_imagen = {libro.url_imagen}
            titulo = {libro.titulo}
            autor={libro.autor}
            precio_$={libro.precio_$}
            editorial={libro.editorial}
            categoria={nombre}
            sinopsis={libro.descripcion}
            nro_paginas={libro.nro_paginas}
            idioma={libro.idioma}
            ISBN={libro.ISBN}
            peso={libro.peso}
            fecha_publicacion={libro.fecha_publicacion}
            />
          </Grid>
        )})}
      </Grid>
    </Box>

        {/* {libros.map((libro)=>{
          const [categoria] = libro.Categoria;
          const {nombre} =categoria; 
          
            return(
            <DetalleDeProducto
            key = {libro.id}
            id = {libro.id}
            url_imagen = {libro.url_imagen}
            titulo = {libro.titulo}
            autor={libro.autor}
            precio_$={libro.precio_$}
            editorial={libro.editorial}
            categoria={nombre}
          
            año_publicacion={libro.año_publicacion}

        
            />
            );

        })} */}
    </div>
  )
}

export default ListadoDeProductos