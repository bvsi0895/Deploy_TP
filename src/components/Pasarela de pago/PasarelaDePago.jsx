import React, { useState } from 'react';
import axios from 'axios';

const PasarelaDePago = ({ total }) => {
  const [loading, setLoading] = useState(false);

  const obtenerTokenDeUala = async () => {
    try {
      setLoading(true);

      // Obtener token de acceso
      const responseToken = await axios.post('https://auth.stage.ua.la/1/auth/token', {
        user_name: process.env.REACT_APP_UALA_USER_NAME,
        client_id: process.env.REACT_APP_UALA_CLIENT_ID,
        client_secret_id: process.env.REACT_APP_UALA_CLIENT_SECRET,
        grant_type: process.env.REACT_APP_UALA_GRANT_TYPE,
      });

      const accessToken = responseToken.data.access_token;

      // Datos para la solicitud de pago
      const datosPago = {
        amount: '10.20',
        description: 'Venta',
        userName: 'your-username', // Reemplaza con tu lógica para obtener el nombre de usuario
        callback_fail: 'https://www.google.com/search?q=failed',
        callback_success: 'https://www.google.com/search?q=success',
        notification_url: 'https://www.notificationurl.com',
      };

      // Realizar la solicitud de pago
      const responsePago = await axios.post('https://checkout.stage.ua.la/1/checkout', datosPago, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      // Puedes manejar la respuesta de la solicitud de pago según tus necesidades
      console.log('Respuesta de la solicitud de pago:', responsePago.data);

    } catch (error) {
      console.error('Error al realizar la solicitud de pago:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={obtenerTokenDeUala} disabled={loading}>
        {loading ? 'Realizando pago...' : 'Iniciar Pago con Ualá'}
      </button>
    </div>
  );
};

export default PasarelaDePago;
