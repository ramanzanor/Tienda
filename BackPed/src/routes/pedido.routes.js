const { Router } = require('express')
const router = Router()
const { createPedido, getPedido, deleteProductoPedido } = require('../controllers/pedidoController')
    //const yup = require('yup')



//Ruta que debe regresar el pedido
router.get('/', (req, res) => {
    const pedido = getPedido()
    res.status(200).json({
        data: pedido,
        message: "pedido listed",
        statusCode: 200
    })

})

//Ruta para crear un pedido eso creo
router.post('/', (req, res) => {

    const { nomproducto, precio, cantidad, totalproducto } = req.body;
    createPedido(nomproducto, precio, cantidad, totalproducto)
    res.status(201).json({
        message: "pedido created",
        statusCode: 201
    })
})
router.delete('/:index', (req, res) => {
    const index = req.params.index
    const productopedido = deleteProductoPedido(index)
    res.status(200).json({
        data: productopedido,
        message: "productpedido deleted",
        statusCode: 200
    })
})

module.exports = router