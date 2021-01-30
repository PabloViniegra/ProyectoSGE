

async function loadDetailSampling() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get("id");
    if (id == undefined) {
        id = 1
    };
    let url = 'http://localhost:8080/api/v1/detailsampling';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => {
            let body = document.getElementById('bodyTableDetails')
            response.forEach(element => {
                if (element.sampling.id == id) {
                    let row = document.createElement('tr');
                    let tdProduct = document.createElement('td');
                    let tdCantidad = document.createElement('td')
                    tdProduct.innerHTML = element.product.name;
                    tdCantidad.innerHTML = element.quantity;
                    row.appendChild(tdProduct)
                    row.appendChild(tdCantidad)
                    body.appendChild(row)
                }
            });

        })
}

async function showProductsInSelected() {
    let url = 'http://localhost:8080/api/v1/products'
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    let select = document.getElementById('selectProduct')
    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => response.sort(function(a,b){
            a.name.localeCompare(b.name);
        }))
        .then(response => {
            response.forEach(element => {

                if (element.type == 'SIMPLE') {
                    let option = document.createElement('option')
                    option.innerHTML = element.name;
                    option.setAttribute('value',element.id);
                    select.appendChild(option)
                }

            });
        })
}

function addProductToDetail() {
    let product = document.getElementById('selectProduct').options[document.getElementById('selectProduct').selectedIndex];
    let body = document.getElementById('bodyTableDetails');
    let quantity = document.getElementById('cantidadProductoA')
    let row = document.createElement('tr')
    let tdProducto = document.createElement('td')
    let tdCantidad = document.createElement('td')
    tdProducto.innerHTML = product.text;
    tdCantidad.innerHTML = quantity.value;
    row.appendChild(tdProducto)
    row.appendChild(tdCantidad)
    body.appendChild(row);


}

