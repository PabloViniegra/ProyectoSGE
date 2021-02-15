async function generateReport() {

    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get('id')
    if (id == undefined) id = 1;
    let urlProducto = 'http://localhost:8080/api/v1/products/' + id;
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    let getInitReport = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/text'
        }
    }
    let urlReport;
    await fetch(urlProducto, getInit)
        .then(response => response.json())
        .then(response => {
            if (response.type == 'SIMPLE') {
                urlReport = 'http://localhost:8080/api/v1/reports/stock/simple/' + id;
            } else if (response.type == 'COMPUESTO') {
                urlReport = 'http://localhost:8080/api/v1/reports/stock/composite/' + id;
            }
        })

    await fetch(urlReport, getInitReport)
        .then(response => {
            if (response.ok) {
                response.text()
                    .then(response => {
                        let mostrarInforme = document.getElementById("mostrarInforme")
                        mostrarInforme.setAttribute('src', '../../Reports/' + response + '.pdf')
                        console.log(response)
                    })
            }
        });
}

async function loadProduct() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get('id')
    if (id == undefined) id = 1;
    let urlProducto = 'http://localhost:8080/api/v1/products/' + id;
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    await fetch(urlProducto, getInit)
        .then(response => {
            if (response.ok) {
                response.json().then(response => {
                    let nameProduct = document.getElementById('nombreProducto');
                    nameProduct.innerHTML = response.name;
                    let idProduct = document.getElementById('idProducto')
                    idProduct.innerHTML = idProduct.innerHTML + response.id;
                    let tipo = document.getElementById('tipoProducto')
                    tipo.innerHTML = tipo.innerHTML + response.type;
                    let pvp = document.getElementById('pvpProducto')
                    pvp.innerHTML = pvp.innerHTML + response.sellPrice;
                    let pvr = document.getElementById('pvrProducto')
                    pvr.innerHTML = pvr.innerHTML + response.buyPrice;
                    let descripcion = document.getElementById('descripcionProducto')
                    descripcion.innerHTML = descripcion.innerHTML + response.description;
                    let stock = document.getElementById('stockProducto')
                    stock.innerHTML = stock.innerHTML + response.stock;
                })
            }
        })
}