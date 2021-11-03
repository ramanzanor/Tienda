const { Router } = require('express')
const router = Router()
const { createPedido, getPedido, deleteProductoPedido } = require('../controllers/pedidoController')
    //const yup = require('yup')



//Ruta que debe regresar el pedido
router.get('/', async(req, res) => {
    const pedido = await getPedido()
    res.status(200).json({
        data: pedido,
        message: "pedido listed",
        statusCode: 200
    })

})

//Ruta para crear un pedido eso creo
router.post('/', async(req, res) => {

    const { nomproducto, precio, cantidad, totalproducto } = req.body;
    await createPedido(nomproducto, precio, cantidad, totalproducto)
    res.status(201).json({
        message: "pedido created",
        statusCode: 201
    })
})
router.delete('/nombre/:nombre', async(req, res) => {
    const nombre = req.params.nombre
    const productopedido = await deleteProductoPedido(nombre)
    res.status(200).json({
        data: productopedido,
        message: "productpedido deleted",
        statusCode: 200
    })
})

module.exports = router