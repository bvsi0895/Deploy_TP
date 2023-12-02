import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from '../../assets/logo.png' 
import Badge from '@mui/material/Badge';
import { makeStyles, styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ClassNames } from '@emotion/react';



const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',

    },
}));


export default function Navbar() {
  

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#2196F3' /* Puedes cambiar este color */ }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={logo}/> 
          </IconButton>
          <Typography variant="h7" component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
            Hola Invitado  
          </Typography>
          <Button color="inherit" >Sign In</Button>
  
          <IconButton aria-label="cart">
           <StyledBadge badgeContent={5} color= "secondary" >
             <ShoppingCartIcon />
           </StyledBadge>
          </IconButton>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}