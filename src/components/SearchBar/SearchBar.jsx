import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { red } from '@mui/material/colors';

const Searchbar = ({ onSearchSubmit }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        onSearchSubmit(searchTerm.toLowerCase()); // Convierte el término de búsqueda a minúsculas antes de enviarlo
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', margin: '70px 0 0 0'  }}>
            <TextField
                label="Buscar libro"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ marginRight: '8px', background: 'azure' }}
            />
            <IconButton type="submit" aria-label="search">
                <SearchIcon />
            </IconButton>
        </form>
    );
};

export default Searchbar;
