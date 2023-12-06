import React, { createContext, useState, useEffect  } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  // Cargar el carrito inicial desde localStorage
  const cargarCarritoInicial = () => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  };

  const [carrito, setCarrito] = useState(cargarCarritoInicial());
  const [cargaInicialCompleta, setCargaInicialCompleta] = useState(false);

  useEffect(() => {
    setCargaInicialCompleta(true);
  }, []);

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = producto => {
    setCarrito(carritoActual => [...carritoActual, producto]);
  };

  const removerDelCarrito = productoId => {
    setCarrito(carritoActual => carritoActual.filter(item => item.id !== productoId));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.setItem('carrito', JSON.stringify([])); // Actualiza también el localStorage
  };

  const actualizarCantidad = (productoId, cantidad) => {
    setCarrito(carritoActual =>
      carritoActual.map((producto) =>
        producto.id === productoId ? { ...producto, cantidad: cantidad } : producto
      )
    );
  };

  return (
    <CarritoContext.Provider value={{ carrito, setCargaInicialCompleta, agregarAlCarrito, removerDelCarrito, actualizarCantidad, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
