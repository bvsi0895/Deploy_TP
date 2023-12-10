import React, { useState } from 'react';
import Typography from '@mui/material/Typography';

const PasarelaDePago = ({ total,cerrarModal, children, onProcesarPago }) => {
  
  const procesarPago = async () => {
    try {
      const resultado = await onProcesarPago(); // Llamada a la función específica de la pasarela de pago
      if (resultado) {
        cerrarModal();  // Cierra el modal después de un pago exitoso
        alert('Pago procesado con éxito');
      } else {
        alert('Error al procesar el pago');
        }
    } catch (error) {
      alert('Error al procesar el pago');
      }
  };

  return (
    <div>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
        Pasarela de pago
      </Typography>
      {children} {/* Renderiza los componentes específicosde la pasarela de pago */}
      <button onClick={procesarPago}>Pagar</button>
    </div>
  );
};

export default PasarelaDePago;
