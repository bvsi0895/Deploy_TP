const { DataTypes } = require('sequelize');

module.exports=(sequelize)=>{
    sequelize.define("Producto",{
       id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
       titulo:{type:DataTypes.STRING(60), allowNull: false},
       autor:{type:DataTypes.STRING(40), allowNull: false},
       precio_$:{type:DataTypes.INTEGER, allowNull:false},
       nro_paginas:{type:DataTypes.INTEGER},
       peso:{type:DataTypes.INTEGER},
       fecha_publicacion:{type:DataTypes.DATEONLY, allowNull:false},
       ISBN:{type:DataTypes.STRING(16), allowNull:false, unique:true},
       editorial:{type:DataTypes.STRING, allowNull: false},
       idioma:{type:DataTypes.STRING, allowNull: false},
       descripcion:{type:DataTypes.TEXT},
    //    categoria:{type:DataTypes.INTEGER, allowNull:false}, 
       stock:{type:DataTypes.BOOLEAN},
       url_imagen:{type:DataTypes.STRING}
    
    }
    )
    };
