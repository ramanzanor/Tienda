const Producto = require('../models/Producto')

const { MongoClient } = require('Mongodb');
const DB_NAME = 'tienda'
const URI = `mongodb+srv://raul_manzano:Rmr95184@cluster0.kp0fa.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

const client = new MongoClient(URI);

async function createProducto(nombre, precio, existencias, status) {
    try {
        await client.connect();
        console.log("Conectado a la base")
        const TIENDA_COLLECTION = client.db(DB_NAME).collection('productos')
        const res = await TIENDA_COLLECTION.insertOne({
            nombre: nombre,
            precio: precio,
            existencias: existencias,
            status: status
        })
        console.log(res)

    } catch (e) {
        console.log("Ocurrio un error")
        console.log(e)
    } finally {
        client.close()
    }
}


async function getProductos() {
    try {
        await client.connect();
        console.log("Conectado a la base")
        const TIENDA_COLLECTION = client.db(DB_NAME).collection('productos')
        const res = TIENDA_COLLECTION.find()
        const misProductos = [

        ]

        await res.forEach((p) => {

            const newProducto = new Producto(p.nombre, p.precio, p.existencias, p.status)
            misProductos.push(newProducto)

        })
        console.log(misProductos)
        return misProductos

    } catch (e) {
        console.log("Ocurrio un error")
        console.log(e)
    } finally {
        client.close()
    }
}
/* function getProductos() { //  GET     /Products          
    return misProductos
} */

function getProductoByIndex(i) { //GET   /Products/:index   
    return misProductos[i]
}

async function deleteProducto(nombre) {
    // misProductos[i].nombre = nombre
    // const nombre = "Atun"
    //const nombre = misProductos[i].nombre
    try {
        await client.connect();
        console.log("Conectado a la base")
        const TIENDA_COLLECTION = client.db(DB_NAME).collection('productos')
        const res = await TIENDA_COLLECTION.deleteOne({
            nombre: nombre,
        })
        console.log(res)

    } catch (e) {
        console.log("Ocurrio un error")
        console.log(e)
    } finally {
        client.close()
    }
    //return misProductos.splice(i, 1); //DELETE    /Products/:index
}

async function updateProducto(i, nombre, precio, existencias, status) { //PATCH      /Products/:index
    /* misProductos[i].nombre = nombre
    misProductos[i].precio = precio
    misProductos[i].existencias = existencias
    misProductos[i].status = status */
    try {
        await client.connect();
        console.log("Conectado a la base")
        const TIENDA_COLLECTION = client.db(DB_NAME).collection('productos')
        const productoActualizado = new Producto(nombre, precio, existencias, status)
        const res = await TIENDA_COLLECTION.updateOne({ nombre: nombre }, {
            nombre: nombre,
            precio: precio,
            existencias: existencias,
            status: status
        })
        console.log(res)
        return productoActualizado
    } catch (e) {
        console.log("Ocurrio un error")
        console.log(e)
    } finally {
        client.close()
    }
}



/* function createProducto(nombre, precio, existencias, status) { //POST      /Products
    const newProducto = new Producto(nombre, precio, existencias, status)
    misProductos.push(newProducto)
}
 */
module.exports = {
    getProductos,
    getProductoByIndex,
    deleteProducto,
    updateProducto,
    createProducto

}