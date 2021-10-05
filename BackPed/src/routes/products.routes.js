const { Router } = require('express')
const router = Router()
const { getProductos, getProductoByIndex, deleteProducto, updateProducto, createProducto } = require('../controllers/productsController')
const yup = require('yup')

/* router.post('/', (req, res) => {
    res.send("RUTA ESCUCHANDO")
}) */

//Ruta que regresa todos los productos
router.get('/', async(req, res) => {
    const productos = await getProductos()
    res.status(200).json({
        data: productos,
        message: "products listed",
        statusCode: 200
    })

})


router.get('/:index', (req, res) => {
    const index = req.params.index
    console.log(index)
    const producto = getProductoByIndex(index)
    res.status(200).json({
        data: producto,
        message: "product finded",
        statusCode: 200

    })
})

router.delete('/nombre/:nombre', async(req, res) => {
        const nombre = req.params.nombre
        const producto = await deleteProducto(nombre)
        res.status(200).json({
            data: producto,
            message: "product deleted",
            statusCode: 200
        })
    })
    //Ruta para actualizar producto por index
router.patch('/:index', async(req, res) => {
    const index = req.params.index
    const { nombre, precio, existencias, status } = req.body;
    const productoActualizado = await updateProducto(index, nombre, precio, existencias, status)
    res.status(200).json({
        data: productoActualizado,
        message: "product updated",
        statusCode: 200
    })

})

//Ruta para crear un producto
router.post('/', (req, res) => {
    const schemaProducto = yup.object().shape({
        nombre: yup.string().required(),
        precio: yup.number().required().min(0),
        existencias: yup.number().required().min(0),
        //status: yup.boolean().required()
    })

    schemaProducto.validateSync(req.body)

    const { nombre, precio, existencias, status } = req.body;
    createProducto(nombre, precio, existencias, status)
    res.status(201).json({
        message: "product created",
        statusCode: 201
    })
})

//Ruta para crear pedido
router.post('/', (req, res) => {

    const { nomproducto, precio, cantidad, totalproducto } = req.body;
    createPedido(nomproducto, precio, cantidad, totalproducto)
    res.status(201).json({
        message: "product created",
        statusCode: 201
    })
})

module.exports = router