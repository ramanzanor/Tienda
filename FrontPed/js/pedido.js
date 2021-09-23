const body = document.querySelector('body');

body.onload = async() => {
    const productos = await getProductos()
        //console.log(productos)
    cargar(productos)
}

function cargar(productos) {
    const select = document.querySelector("#nombreprod"); //Seleccionamos el select

    for (let i = 0; i < productos.length; i++) {
        const option = document.createElement("option"); //Creamos la opcion
        option.value = i //al atributo value del select le damos el valor de i
        option.innerHTML = productos[i].nombre; //Metemos el texto en la opción
        select.appendChild(option); //Metemos la opción en el select

    }
    select.onclick = (e) => {
        //obtenemos el valor de i mediante el atributo value y lo asignamos a a
        const a = document.querySelector("#nombreprod").value
        document.querySelector('#precio').value = productos[a].precio
    }

}

function fillTablePedido(pedido) {
    const pedidoTableBody = document.querySelector('#pedidoTableBody')
    pedido.forEach((p, i) => {

        const iBasura = document.createElement('i')
        iBasura.className = "far fa-trash-alt"

        iBasura.onclick = async() => {
            const res = confirm('Esta seguro de borrar el producto?')
            if (res) {
                deleteProductoPedido(i)
                clearTable()
                fillTablePedido(await getPedido())
            }
        }


        const tdDelete = document.createElement('td')

        const trProduct = document.createElement('tr')
        const tdNombre = document.createElement('td')
        const tdCantidad = document.createElement('td')
        const tdPrecio = document.createElement('td')
        const tdTotalprod = document.createElement('td')


        tdNombre.textContent = p.nomproducto
        tdCantidad.textContent = p.cantidad
        tdPrecio.textContent = p.precio
        tdTotalprod.textContent = p.totalproducto


        tdDelete.appendChild(iBasura)
        trProduct.appendChild(tdDelete)
        trProduct.appendChild(tdNombre)
        trProduct.appendChild(tdPrecio)
        trProduct.appendChild(tdCantidad)
        trProduct.appendChild(tdTotalprod)

        pedidoTableBody.appendChild(trProduct)
    });

}
const btnAgregar = document.querySelector('#agregar');

btnAgregar.onclick = async(e) => {
    const x = document.getElementById("nombreprod");
    const nombreprod = x.options[x.selectedIndex].text;
    console.log(nombreprod)
        //const nombre = document.querySelector('#nombre').select
    const cantidad = document.querySelector('#cantidad').value
    const precio = document.querySelector('#precio').value
    const totalproducto = cantidad * precio
    await createPedido(nombreprod, precio, cantidad, totalproducto)
    alert("Agregado")
    clearTable()
    fillTablePedido(await getPedido())
    cuentaTotal(await getPedido())
    e.preventDefault();
}

function fillFormProductToSelect(i) {
    const producto = getProductoByIndex(i)
    document.querySelector('#nombreprod').value = producto.nombre
    document.querySelector('#existencias').value = producto.existencias
    document.querySelector('#precio').value = producto.precio
    btnAgregar.textContent = "Actualizar"
    btnAgregar.onclick = (e) => btnActualizarController(e, i)
}


function clearTable() {
    const pedidoTableBody = document.querySelector('#pedidoTableBody')
    pedidoTableBody.innerHTML = ''
}


function cuentaTotal(pedido) {

    let subtotal = 0
    pedido.forEach((p, i) => {
        subtotal += pedido[i].totalproducto
    })

    document.querySelector('#subtotal').textContent = subtotal
    const iva = subtotal * .16
    document.querySelector('#iva').textContent = iva
    const total = subtotal + iva
    document.querySelector('#total').textContent = total
}

const btnComprar = document.querySelector('#comprar');
btnComprar.onclick = (e) => {
    const total = document.querySelector('#total').textContent
    alert("El total a pagar es: $" + total)

    location.reload()

    e.preventDefault();
}