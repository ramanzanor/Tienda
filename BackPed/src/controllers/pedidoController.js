const Pedido = require('../models/Pedido')

const miPedido = [

]

function createPedido(nombreprod, precio, cantidad, totalproducto) {
    const newPedido = new Pedido(nombreprod, precio, cantidad, totalproducto)
    miPedido.push(newPedido)
    console.log(miPedido)
}

function getPedido() {
    return miPedido
}

function deleteProductoPedido(i) {
    return miPedido.splice(i, 1);
}

module.exports = {
    getPedido,
    createPedido,
    deleteProductoPedido
}