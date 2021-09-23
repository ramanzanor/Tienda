async function getProductos() {
    const res = await MyFetch({ method: 'GET', path: '/products' })
    return res.data
        // return misProductos   -->los traia del front de los que estan aqui arriba
}

async function getProductoByIndex(i) {
    const res = await MyFetch({ method: 'GET', path: '/products' })
    return res.data[i]
        //return misProductos[i]
}

async function deleteProducto(i) {
    const res = await MyFetch({ method: 'delete', path: '/products/' + i })
    return res.data
        //return misProductos.splice(i, 1);
}

async function updateProducto(i, nombre, precio, existencias, status) {
    const res = await MyFetch({ method: 'PATCH', path: '/products/' + i, body: { nombre, precio, existencias, status } })
        //en la linea anterior descomponemos el body
    res.data[i].nombre = nombre
    res.data[i].precio = precio
    res.data[i].existencias = existencias
    res.data[i].status = status

}

async function createProducto(nombre, precio, existencias, status) {
    const res = await MyFetch({ method: 'post', path: '/products', body: { nombre, precio, existencias, status } })

    //const newProducto = new Producto(nombre, precio, existencias, status)
    //misProductos.push(newProducto)
    //res.data.push(newProducto) // esta de mas?
}


async function createPedido(nomproducto, precio, cantidad, totalproducto) {
    const res = await MyFetch({ method: 'post', path: '/pedidos', body: { nomproducto, precio, cantidad, totalproducto } })
        // res.data.push(newPedido)
}
async function getPedido() {
    const res = await MyFetch({ method: 'GET', path: '/pedidos' })
    return res.data

}
async function deleteProductoPedido(i) {
    const res = await MyFetch({ method: 'delete', path: '/pedidos/' + i })
    return res.data

}