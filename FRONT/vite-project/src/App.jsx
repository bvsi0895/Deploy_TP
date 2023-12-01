import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListadoDeProductos from './components/Listado de Productos/ListadoDeProductos';
import SearchBar from './components/SearchBar/SearchBar';
import Detail from './Views/Detail';
import Navbar from './components/NavBar/NavBar';
import MensajeSinLibros from './components/Mensaje sin libros/MensajeSinLibros';
import Filtros from './components/Filtros/Filtros';

function App() {
  const [libros, setLibros] = useState([]);
  const [librosFiltrados, setLibrosFiltrados] = useState([]);
  const [precioMax, setPrecioMax] = useState(0);
  const [filtroActual, setFiltroActual] = useState({ categoria: '', precio: 100000, ordenamiento: 'precio_desc' });

  // Obtener los libros al cargar el componente
   // useEffect(() => {
    // fetch('http://localhost:3000') // Modo desarrollo
    // ...

    useEffect(() => {
      fetch(import.meta.env.VITE_DB_DEPLOY)
        .then((response) => response.json())
        .then((data) => {
          setLibros(data);
          setLibrosFiltrados(data);
          const maxPrecioEncontrado = data.reduce((max, libro) => Math.max(max, libro.precio_$), 0);
          const precioMaxConIncremento = maxPrecioEncontrado * 1.10; // Incrementa en un 10%
          const precioMaxRedondeado = Math.ceil(precioMaxConIncremento / 1000) * 1000; // Redondea hacia arriba al múltiplo de 1000 más cercano
          setPrecioMax(precioMaxRedondeado);
        });
    }, []);

    // Modificar aplicarFiltro para incluir el ordenamiento
    const aplicarFiltro = () => {
      let queryParams = '';
      if (filtroActual.categoria) {
        queryParams += `categoria=${filtroActual.categoria}&`;
      }
      queryParams += `precio=${filtroActual.precio}&`;
      queryParams += `ordenamiento=${filtroActual.ordenamiento}`; // Agregar ordenamiento al query

      // fetch(`http://localhost:3000/?${queryParams}`) // Modo desarrollo
      fetch(`${import.meta.env.VITE_DB_DEPLOY}/?${queryParams}`) // Modo producción

        .then((response) => response.json())
        .then((data) => setLibrosFiltrados(data))
        .catch((error) => console.error('Error:', error));
    };

    const onPriceChange = (precio) => {
      setFiltroActual((prevState) => ({ ...prevState, precio: precio }));
      aplicarFiltro();
    };

    // Manejar el cambio de filtro y ordenamiento
    const handleFilterChange = (categoria) => {
      setFiltroActual((prevState) => ({ ...prevState, categoria: categoria }));
      aplicarFiltro();
    };

    // Agregar una función para manejar el cambio en el ordenamiento
    const onSortChange = (ordenamiento) => {
      setFiltroActual((prevState) => ({ ...prevState, ordenamiento: ordenamiento }));
      aplicarFiltro();
    };

    useEffect(() => {
      aplicarFiltro(); // Aplica el filtro cada vez que cambia filtroActual
    }, [filtroActual]);

    return (
      <div>
        <Navbar />
        <SearchBar />
        <Filtros
          onFilterChange={handleFilterChange}
          onPriceChange={onPriceChange}
          onSortChange={onSortChange} // Pasar onSortChange a Filtros
          precioMax={precioMax}
        />

        <Routes>
          <Route
            path={'/'}
            element={
              librosFiltrados.length > 0 ? (
                <ListadoDeProductos libros={librosFiltrados} />
              ) : (
                <MensajeSinLibros />
              )
            }
          />
          <Route path={'/detail/:id'} element={<Detail />} />
        </Routes>
      </div>
    );
  };

  export default App;
