import React, { useState, useEffect } from 'react';
import styles from './PanelAdministrador.module.css';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';





const PanelAdministrador = () => {
  const [producto, setProducto] = useState({
    titulo: '',
    autor: '',
    precio_$: 0,
    nro_paginas: 0,
    peso: 0,
    fecha_publicacion: '', 
    ISBN: '',
    editorial: '',
    idioma: '',
    descripcion: '',
    stock: false,
    url_imagen: '',
    categoria: []
  });


  const [categorias, setCategorias] = useState([]);
  const [isbnExists, setIsbnExists] = useState(false);
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);
  const [urlImagen, setUrlImagen] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('https://backtp-production.up.railway.app/categorias-buscar-todas'); 
        if (!response.ok) {
          throw new Error('Error al obtener categorías.');
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener categorías:', error.message);
      }
    };

    // Llama a la función para obtener las categorías cuando se monta el componente
    fetchCategorias();
  }, []); 


  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setProducto({ ...producto, [name]: checked });
    } else {
      setProducto({ ...producto, [name]: value });
    }
    // setProducto({ ...producto, [name]: value });
    if (name === 'ISBN') {
      checkIsbnExists(value);
      console.log(value)
    }
    console.log(producto)
  };



  const handleCategoriaChange = (event) => {
    const value = event.target.value;
    const updatedCategorias = [...producto.categoria];
  
    // Si la categoría ya está seleccionada, quítala; de lo contrario, agrégala
    if (updatedCategorias.includes(value)) {
      const index = updatedCategorias.indexOf(value);
      updatedCategorias.splice(index, 1);
    } else {
      updatedCategorias.push(value);
    }
  
    setProducto({ ...producto, categoria: updatedCategorias });
  };


  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (producto.ISBN.length === 13) {
      checkIsbnExists(producto.ISBN);
      if (!isbnExists) {
        await postData();
        // Restablecer el estado del formulario
        setProducto({
          titulo: '',
          autor: '',
          precio_$: 0,
          nro_paginas: 0,
          peso: 0,
          fecha_publicacion: '', 
          ISBN: '',
          editorial: '',
          idioma: '',
          descripcion: '',
          stock: false,
          url_imagen: '',
          categoria: []
        });
        // Mostrar un mensaje de éxito al usuario
        deleteImage();
        setGuardadoExitoso(true);
      } else {
        window.alert('ISBN ya existe en la base de datos');
      }
    } else {
      window.alert('El ISBN debe tener 13 dígitos');
    }
  
    console.log('Datos del libro', producto);
  };
 
  const checkIsbnExists = async (isbn) => {
    const isbnString = String(isbn);

    const url = `https://backtp-production.up.railway.app/producto/check?isbn=${isbnString}`; // Reemplaza con tu endpoint real
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setIsbnExists(data.exists);
    } catch (error) {
      console.error('Error al verificar el ISBN:', error.message);
    }
  };

    const postData = async () => {
        const url = 'https://backtp-production.up.railway.app/';       
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
              
              ...producto,
              precio_$: parseInt(producto.precio_$, 10), 
          peso: parseInt(producto.peso, 10), 
          categorias: producto.categoria.map(Number),
              // stock: producto.stock === "on" ? true : false,
              // [name]: value === 'true', 
             
             
          }),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
      
          const data = await response.json();
          console.log('Respuesta del servidor:', data);
          // Puedes manejar la respuesta del servidor según tus necesidades
      
        } catch (error) {
          console.error('Error al enviar la solicitud:', error.message);
          // Puedes manejar los errores aquí
        }
    };
    // Aquí puedes enviar el producto al backend o realizar otras acciones necesarias
    
    // Enviar el producto al backend, etc.
    const precioValue = producto.precio_$;


    const changeUploadImage = async (e) => {
      const file = e.target.files[0];
      const data = new FormData();
  
      data.append('file', file);
      data.append('upload_preset', 'preset_libros');
  
      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dnefbrqfz/image/upload', data);
        console.log(response.data);
        setProducto({ ...producto, url_imagen: response.data.secure_url });
        setUrlImagen(response.data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  
    const deleteImage = () => {
      setUrlImagen('');
    };

    const handleSnackbarClose = () => {
      setGuardadoExitoso(false);
    };


    return (
     
    

    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Formulario de Producto</h2>
        
        <div className={styles.formGroup}>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={producto.titulo}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="autor">Autor:</label>
          <input
            type="text"
            id="autor"
            name="autor"
            value={producto.autor}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>


<div className={styles.formGroup}>
          <label htmlFor="precio_$">Precio:</label>
          <input
            type="number"
            id="precio_$"
            name="precio_$"
            value={precioValue}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nro_paginas">Número de Páginas:</label>
          <input
            type="number"
            id="nro_paginas"
            name="nro_paginas"
            value={producto.nro_paginas}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="peso">Peso:</label>
          <input
            type="number"
            id="peso"
            name="peso"
            value={producto.peso}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
  <label htmlFor="fecha_publicacion">Fecha de Publicación:</label>
  <input
    type="date"
    id="fecha_publicacion"
    name="fecha_publicacion"
    value={producto.fecha_publicacion}
    onChange={handleInputChange}
    required
    className={styles.input}
    pattern="\d{4}-\d{2}-\d{2}" // Patrón para el formato YYYY-MM-DD
  />
</div>

        <div className={styles.formGroup}>
          <label htmlFor="ISBN">ISBN:</label>
          <input
            type="text"
            id="ISBN"
            name="ISBN"
            value={producto.ISBN}
            onChange={handleInputChange}
            required
            className={styles.input}
            />
            {producto.ISBN.length !== 13 && (
      <span className={styles.error}>El ISBN debe tener 13 dígitos</span>
    )}
    {isbnExists && (
      <span className={styles.error}>El ISBN ya existe en la base de datos</span>
    )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="editorial">Editorial:</label>
          <input
            type="text"
            id="editorial"
            name="editorial"
            value={producto.editorial}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

      


<div className={styles.formGroup}>
  <label htmlFor="idioma">Idioma:</label>
  <select
    id="idioma"
    name="idioma"
    value={producto.idioma}
    onChange={handleInputChange}
    required
    className={styles.input}
    >
    <option value="">Selecciona una categoría</option>
    <option value="Castellano">Castellano</option>
    <option value="Inglés">Inglés</option>
    <option value="Aleman">Alemán</option>
    <option value="Latin">Latín</option>
    <option value="Frances">Francés</option>
    <option value="Hebreo">Hebreo</option>
    <option value="Otro">Otro</option>
  </select>
</div>


        <div className={styles.formGroup}>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleInputChange}
            rows={4}
            cols={50}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={producto.categoria}
            onChange={handleCategoriaChange}
            className={styles.input}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>


        <div className={styles.formGroup}>
      <label>Stock:</label>
      <div>
        <input
          type="radio"
          id="stockTrue"
          name="stock"
          value="true"
          checked={producto.stock === true}
          onChange={handleInputChange}
          className={styles.checkbox}
        />
        <label htmlFor="stockTrue">Disponible</label>
      </div>
      <div>
        <input
          type="radio"
          id="stockFalse"
          name="stock"
          value="false"
          checked={producto.stock === false}
          onChange={handleInputChange}
          className={styles.checkbox}
        />
        <label htmlFor="stockFalse">No Disponible</label>
      </div>
    </div>


        <div className={styles.formGroup}>
          <label htmlFor="url_imagen">Seleccionar Imagen:</label>
          <input
            type="file"
            id="url_imagen"
            name="url_imagen"
            onChange={(e) => {
              handleInputChange(e);
              changeUploadImage(e);
            }}
            className={styles.input}
            accept="image/*"
            required
          />
          {urlImagen && (
            <div>
              <img src={urlImagen} alt="Imagen seleccionada" />
              <span className={styles.imageURL}>{urlImagen}</span>
              <button onClick={deleteImage}>Eliminar Imagen</button>
            </div>
          )}
        </div>

        <button type="submit" className={styles.button} disabled={isbnExists || producto.ISBN.length !== 13}>
    Guardar Producto
  </button>
</form>

{guardadoExitoso && (
        <Snackbar
          open={guardadoExitoso}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message="¡Producto guardado exitosamente!"
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      )}
</div>
);
            };    



export default PanelAdministrador;
