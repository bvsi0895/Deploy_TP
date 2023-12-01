const {Categoria}=require("../DB_connection")

const createCategoria =async (req, res)=>{
    try {
        const {nombre} = req.body
        const newCategoria = await Categoria.findOrCreate({
            where: {nombre: nombre} }); 
        return res.json(newCategoria);
    } catch (error) {
        res.status(500).json(error.message)
    }
    
   
};

module.exports = createCategoria;

