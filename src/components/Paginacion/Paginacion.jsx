import React from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

const Paginacion = ({ totalElementos, elementosPorPagina, paginaActual, cambiarPagina }) => {
    const totalPages = Math.ceil(totalElementos / elementosPorPagina);

    const handleChange = (event, value) => {
        cambiarPagina(value);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Pagination 
                count={totalPages} 
                page={paginaActual} 
                onChange={handleChange} 
                color="primary" 
            />
        </Box>
    );
};

export default Paginacion;
