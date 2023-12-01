const {Producto, Categoria}=require("../DB_connection");




const getProductoById = async (req, res) => {
    const idRequerido = req.params.id;
   
    try{
        const productoEncontrado = await Producto.findOne({
            where: {id : idRequerido }
        })

        return res.status(200).json(productoEncontrado); 
    } catch (error) {
        res.status(404).json(error.message)
    }
   
}

module.exports = getProductoById;




// const getProductoById = async (request, response)=>{
//     const {id} = request.params;
//     try{
   
    // const character = data.find((char) =>char.id==id);
//     const producto = await findProductoById(id);
//     return response.status(200).json(producto);
//     }catch (error){
//         return response.status(404).json({
//             error: `El libro con ID ${id} no existe en la Base de Datos`,});

//     }

    
// };

//  module.exports = getProductoById;