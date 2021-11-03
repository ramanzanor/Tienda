const Pedido = require('../models/Pedido')

const { MongoClient } = require('Mongodb');
const DB_NAME = 'tienda'
const URI = `mongodb+srv://raul_manzano:Rmr95184@cluster0.kp0fa.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(URI);

async function createPedido(nameprod, precio, cantidad, totalproducto) {
    try {
        await client.connect();
        console.log("Conectado a la base")
        const TIENDA_COLLECTION = client.db(DB_NAME).collection('pedidos')
        const FIND = await TIENDA_COLLECTION.find({ nombreprod: nameprod }).toArray()
        console.log(await FIND[0].nombreprod)
        const Nombre = await FIND[0].nombreprod
        const Cantidad1 = await FIND[0].cantidad

        if (Nombre === nameprod) {
            const cantidadact = parseInt(Cantidad1) + parseInt(cantidad)
            const TotalProductoAct = cantidadact * parseFloat(precio)
            console.log(cantidadact)
            const res = await TIENDA_COLLECTION.updateOne({ nombreprod: nameprod }, {
                $set: {
                    nombreprod: nameprod,
                    precio: precio,
                    cantidad: cantidadact,
                    totalproducto: TotalProductoAct
                }
            })

        } else {
            const res = await TIENDA_COLLECTION.insertOne({
                nombreprod: nameprod,
                precio: precio,
                cantidad: cantidad,
                totalproducto: totalproducto
            })
            console.log(res)

        }

    } catch (e) {
        console.log("Ocurrio un error")
        console.log(e)
    } finally {
        client.close()
    }
}


async function getPedido() {
    try {
        await client.connect();
        console.log("Conectado a la base")
        const TIENDA_COLLECTION = client.db(DB_NAME).collection('pedidos')
        const res = TIENDA_COLLECTION.find()
        const miPedido = [

        ]

        await res.forEach((p) => {

            const newPedido = new Pedido(p.nombreprod, p.precio, p.cantidad, p.totalproducto)
            miPedido.push(newPedido)

        })
        console.log(miPedido)
        return miPedido

    } catch (e) {
        console.log("Ocurrio un error")
        console.log(e)
    } finally {
        client.close()
    }
}

async function deleteProductoPedido(nombre) {
    try {
        await client.connect();
        console.log("Conectado a la base")
        console.log(nombre)
        const TIENDA_COLLECTION = client.db(DB_NAME).collection('pedidos')
        const res = await TIENDA_COLLECTION.deleteOne({
            nombreprod: nombre,
        })
        console.log(res)

    } catch (e) {
        console.log("Ocurrio un error")
        console.log(e)
    } finally {
        client.close()
    }

}
/* function deleteProductoPedido(i) {
    return miPedido.splice(i, 1);
} */

module.exports = {
    getPedido,
    createPedido,
    deleteProductoPedido
}