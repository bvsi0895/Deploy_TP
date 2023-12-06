import React, { useState } from 'react';
import DetalleDeProducto from '../Detalle de Producto/DetalleDeProducto';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paginacion from '../Paginacion/Paginacion';
import { spacing } from '@mui/system';

function ListadoDeProductos(props) {
    const { libros } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const librosPorPagina = 8;
    const indexOfLastLibro = currentPage * librosPorPagina;
    const indexOfFirstLibro = indexOfLastLibro - librosPorPagina;
    const librosActuales = libros.slice(indexOfFirstLibro, indexOfLastLibro);

    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <Box m={{ marginTop: 10 }}  sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {librosActuales.map((libro) => {
                        const { categoria } = libro;
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
                        );
                    })}
                </Grid>
            </Box>
            <Paginacion 
                totalElementos={libros.length} 
                elementosPorPagina={librosPorPagina} 
                paginaActual={currentPage} 
                cambiarPagina={handleChangePage} 
            />
        </div>
    )
}

export default ListadoDeProductos;