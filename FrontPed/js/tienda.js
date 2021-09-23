const body = document.querySelector('body');

body.onload = async() => {
    const productos = await getProductos()
    console.log(productos)
    fillTable(productos)
}

//Al dar click al icono de pluma esta funcion pone los valores en el formulario y cambia el boton
async function fillFormProductToUpdate(i) {
    const producto = await getProductoByIndex(i)
    document.querySelector('#nombre').value = producto.nombre
    document.querySelector('#existencias').value = producto.existencias
    document.querySelector('#precio').value = producto.precio
    btnAgregar.textContent = "Actualizar"
    btnAgregar.onclick = (e) => btnActualizarController(e, i)
}

function fillTable(products) {
    const productsTableBody = document.querySelector('#productsTableBody')
    products.forEach((p, i) => {

        const iPluma = document.createElement('i')
        iPluma.className = "fa fa-pen"
        const iBasura = document.createElement('i')
        iBasura.className = "far fa-trash-alt"

        iBasura.onclick = async() => {
            const res = confirm('Esta seguro de borrar el producto?')
            if (res) {
                deleteProducto(i)
                clearTable()
                fillTable(await getProductos())
            }
        }

        iPluma.onclick = () => {
            fillFormProductToUpdate(i)

        }


        const tdDelete = document.createElement('td')
        const tdUpdate = document.createElement('td')

        const trProduct = document.createElement('tr')
        const tdNombre = document.createElement('td')
        const tdExistencias = document.createElement('td')
        const tdPrecio = document.createElement('td')
            //const tdStatus = document.createElement('td')

        tdNombre.textContent = p.nombre
        tdExistencias.textContent = p.existencias
        tdPrecio.textContent = p.precio
            //tdStatus.textContent = p.status

        tdDelete.appendChild(iBasura)
        tdUpdate.appendChild(iPluma)
        trProduct.appendChild(tdDelete)
        trProduct.appendChild(tdUpdate)
        trProduct.appendChild(tdNombre)
        trProduct.appendChild(tdExistencias)
        trProduct.appendChild(tdPrecio)
            //trProduct.appendChild(tdStatus)

        productsTableBody.appendChild(trProduct)
    });

}

function clearTable() {
    const productsTableBody = document.querySelector('#productsTableBody')
    productsTableBody.innerHTML = ''
}

const btnAgregar = document.querySelector('#agregar');

btnAgregar.onclick = async(e) => {
    const nombre = document.querySelector('#nombre').value
    const existencias = document.querySelector('#existencias').value
    const precio = document.querySelector('#precio').value
    createProducto(nombre, precio, existencias)
    alert("Guardado")
    clearTable()
    fillTable(await getProductos())
    e.preventDefault();
}

async function btnActualizarController(e, i) {
    const nombre = document.querySelector('#nombre').value
    const existencias = document.querySelector('#existencias').value
    const precio = document.querySelector('#precio').value
    const status = document.querySelector('#status').value
    updateProducto(i, nombre, precio, existencias, status)
    alert('Actualizado')
    clearTable()
    fillTable(await getProductos())
    btnAgregar.textContent = "Agregar"
    btnAgregar.onclick = btnAgregarController
    e.preventDefault();

}