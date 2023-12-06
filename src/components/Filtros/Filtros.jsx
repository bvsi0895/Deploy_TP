import React, { useState, useEffect} from 'react';
import { FormControl, InputLabel, Select, MenuItem, Slider, Typography, Grid } from '@mui/material';

const Filtros = ({ onFilterChange, onPriceChange, onSortChange, precioMax }) => {
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState(precioMax || 100);

    useEffect(() => {
        if (typeof precioMax === 'number' && !isNaN(precioMax)) {
            setPrecio(precioMax);
        }
    }, [precioMax]);

    // Función para cargar las categorías desde el backend
    useEffect(() => {
        fetch('http://localhost:3000/categorias')
            .then(response => response.json())
            .then(data => setCategorias(data))
            .catch(error => console.error('Error al cargar categorías:', error));
    }, []);

    const handleCategoriaChange = (e) => {
        const nuevaCategoria = e.target.value;
        setCategoria(nuevaCategoria);
        if (onFilterChange) {
            onFilterChange(nuevaCategoria, precio);
        }
    };

    const handlePrecioChange = (e) => {
        const nuevoPrecio = e.target.value;
        setPrecio(nuevoPrecio);
        if (onPriceChange) {
            onPriceChange(nuevoPrecio, categoria);
        }
    };

    const handleSortChange = (e) => {
        if (onSortChange) {
            onSortChange(e.target.value);
        }
    };

    const precioSlider = (
        <Grid item xs={12} sm={4}>
            <div>
                <Typography gutterBottom>Ajustar precio</Typography>
                <Slider
                    value={precio}
                    onChange={handlePrecioChange}
                    min={0}
                    max={precioMax || 100}
                    valueLabelDisplay="auto"
                />
            </div>
        </Grid>
    );

    return (
        <Grid container spacing={2} sx={{ marginTop: '10px' }}>
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                    <InputLabel>Categoría</InputLabel>
                        <Select
                            value={categoria}
                            label="Categoría"
                            onChange={handleCategoriaChange}
                        >
                            <MenuItem value="">
                                <em>Todas las categorías</em>
                            </MenuItem>
                            {categorias.map((cat) => (
                                <MenuItem key={cat.id} value={cat.nombre}>{cat.nombre}</MenuItem>
                            ))}
                        </Select>
                </FormControl>
            </Grid>

            {precioSlider}

            <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                    <InputLabel>Ordenar por</InputLabel>
                    <Select
                        label="Ordenamiento"
                        onChange={handleSortChange}
                    >
                        <MenuItem value="precio_asc">Precio: Menor a Mayor</MenuItem>
                        <MenuItem value="precio_desc">Precio: Mayor a Menor</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default Filtros;