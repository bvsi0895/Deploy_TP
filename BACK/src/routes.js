const express = require('express');
const {Router}=require("express");
const sequelize = require("./DB_connection");
const findAllCategorias = require("./controllers/findAllCategorias");
const createCategoria = require("./controllers/createCategoria");
const createProducto = require("./controllers/createProducto");
const findAllProductos = require("./controllers/findAllProductos");
const getProductoById = require('./controllers/getProductoById');
// const bodyParser =require('body-parser');
const router = Router();
router.use(express.json());
// router.use(bodyParser.json());

router.get("/", findAllProductos);

router.post("/", createProducto);

router.get("/categoria", findAllCategorias);

router.post("/categoria", createCategoria);

router.get("/detail/:id", getProductoById);

module.exports = router;