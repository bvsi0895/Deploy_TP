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
        event.preventDefault(); 
        onSearchSubmit(searchTerm.toLowerCase()); // Convierte el término de búsqueda a minúsculas antes de enviarlo
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'left', margin: '10px 50px 10px 0px'  }}>
            <TextField
                label="Buscar libro"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                InputLabelProps={{
                    style: { color: searchTerm ? 'red' : 'gray'}
                }}
                sx={{ marginRight: '8px',
                      background: 'azure',
                      width: '500px',
                      height: '50px',
                      borderRadius: '5px',
                   }}
            />
            <IconButton type="submit" aria-label="search">
                <SearchIcon />
            </IconButton>
        </form>
    );
};

export default Searchbar;
