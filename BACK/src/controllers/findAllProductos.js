const { Producto, Categoria } = require("../DB_connection");
const { Op } = require("sequelize");

const findAllProductos = async (req, res) => {
    try {
        const categoriaNombre = req.query.categoria;
        const precioMax = req.query.precio;
        const ordenamiento = req.query.ordenamiento; // Agregar el parámetro de ordenamiento

        let condiciones = {
            include: [{
                model: Categoria,
                attributes: ["nombre"],
                through: { attributes: [] }
            }]
        };

        if (categoriaNombre) {
            condiciones.include[0].where = { nombre: categoriaNombre };
        }

        if (precioMax) {
            condiciones.where = { 
                precio_$: { [Op.lte]: precioMax }
            };
        }

        // Agregar lógica de ordenamiento
        if (ordenamiento) {
            switch (ordenamiento) {
                case 'precio_asc':
                    condiciones.order = [['precio_$', 'ASC']];
                    break;
                case 'precio_desc':
                    condiciones.order = [['precio_$', 'DESC']];
                    break;
                // Puedes agregar más casos si hay otros criterios de ordenamiento
            }
        }

        const productos = await Producto.findAll(condiciones);

        return res.status(200).json(productos);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = findAllProductos;
