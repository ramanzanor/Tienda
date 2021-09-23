let cors = require("cors")
const express = require('express')
const app = express()
const routerProducts = require('./routes/products.routes')
const routerPedido = require('./routes/pedido.routes')

//MIDDLEWARES
app.use(express.json())
app.use(cors())

//ROUTES
app.use('/products', routerProducts)
app.use('/pedidos', routerPedido)

module.exports = app