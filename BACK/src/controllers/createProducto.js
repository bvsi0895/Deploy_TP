const {Producto} = require("../DB_connection")

const createProducto= async (req, res)=>{
    try {
        const {titulo, autor, precio_$, nro_paginas, peso, fecha_publicacion, ISBN, editorial, idioma, descripcion, stock, url_imagen, categoria} = req.body;
    
    const newProducto = await Producto.create({
        titulo,
        autor,
        precio_$,
        nro_paginas,
        peso, 
        fecha_publicacion,
        ISBN,
        editorial,
        idioma,
        descripcion,
        stock,
        url_imagen,
    })

newProducto.addCategoria(categoria); 
return res.status(200).json(newProducto);
    
// 
}

   
    catch (error) {
        res.status(500).json(error.message)
    }
    
}

module.exports=createProducto;