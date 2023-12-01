const { Producto, Categoria } = require("../DB_connection");

const findAllProductos = async (req, res) => {
    try {
        const opciones = {
            include: [{
                model: Categoria,
                attributes: ["nombre"],
                through: {
                    attributes: [],
                },
            }],
        };

        // Filtrado por categoría si se proporciona el parámetro
        const filtroCategoria = req.query.categoria;
        if (filtroCategoria) {
            opciones.include[0].where = { nombre: filtroCategoria };
        }

        // Aquí puedes añadir más lógica de filtrado si lo necesitas

        const productos = await Producto.findAll(opciones);
        return res.status(200).json(productos);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = findAllProductos;
