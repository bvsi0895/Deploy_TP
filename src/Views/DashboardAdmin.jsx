

import React from 'react';
import { Link } from 'react-router-dom'; 
import { AppBar, Toolbar, Button } from '@mui/material';
import styles from './DashboardAdmin.module.css';
import PATHROUTES from '../helpers/PathRoutes.helper';

const DashboardAdmin = () => {
  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <Button component={Link} to={PATHROUTES.FORMPRODUCTOS} color="inherit" className={styles.button}>
          Alta de Producto
        </Button>
        <Button component={Link} to={PATHROUTES.FORMCATEGORIA} color="inherit" className={styles.button}>
          Alta de Categoria
        </Button>
        <Button component={Link} to={PATHROUTES.VERPRODUCTOS} color="inherit" className={styles.button}>
          Ver Mis Productos
        </Button>
        <Button component={Link} to={PATHROUTES.VERCATEGORIAS} color="inherit" className={styles.button}>
          Ver Mis Categorias
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardAdmin;





