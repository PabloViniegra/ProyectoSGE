async function loadDetailSampling() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get("id");
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
                    let tdDelete = document.createElement('td')
                    let btn = document.createElement('button')
                    btn.innerHTML = 'Borrar'
                    btn.setAttribute('class', 'btn btn2 mt-4')
                    btn.setAttribute('type', 'button')
                    btn.addEventListener('click', () => {
                        deleteDetail(element.id)
                    })
                    tdDelete.appendChild(btn)
                    row.appendChild(tdProduct)
                    row.appendChild(tdCantidad)
                    row.appendChild(tdDelete)
                    row.setAttribute('value', element.id);
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
        .then(response => response.sort(function(a, b) {
            a.name.localeCompare(b.name);
        }))
        .then(response => {
            response.forEach(element => {

                if (element.type == 'SIMPLE') {
                    let option = document.createElement('option')
                    option.innerHTML = element.name;
                    option.setAttribute('value', element.id);
                    select.appendChild(option)
                }

            });
        })
}

async function addProductToDetail() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get("id");
    let idDetails;
    let product = document.getElementById('selectProduct').options[document.getElementById('selectProduct').selectedIndex];
    let body = document.getElementById('bodyTableDetails');
    let quantity = document.getElementById('cantidadProductoA')
    let row = document.createElement('tr')
    let tdDelete = document.createElement('td')
    let tdProducto = document.createElement('td')
    let tdCantidad = document.createElement('td')
    let btn = document.createElement('button')
    btn.innerHTML = 'Borrar'
    btn.setAttribute('class', 'btn btn-dark mt-4')
    btn.setAttribute('type', 'button')

    tdDelete.appendChild(btn)

    tdProducto.innerHTML = product.text;
    tdCantidad.innerHTML = quantity.value;
    row.appendChild(tdProducto)
    row.appendChild(tdCantidad)
    row.appendChild(tdDelete)
    body.appendChild(row);

    let data2 = {
        quantity: quantity.value,
        product: await cargarProduct(product.value),
        sampling: await cargarSampling(id)
    }
    let urlDetails = 'http://localhost:8080/api/v1/detailsampling';
    let postInit2 = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data2)
    }
    await fetch(urlDetails, postInit2)
        .then(response => response.json())
        .then(response => idDetails = response.id)
    row.setAttribute('value', idDetails)
    btn.addEventListener('click', () => {
        deleteDetail(idDetails)
    })
}

async function cargarProduct(product) {
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    let urlProduct = 'http://localhost:8080/api/v1/products/' + product;
    let fullProduct;
    await fetch(urlProduct, getInit)
        .then(response => response.json())
        .then(response => fullProduct = response)
    return fullProduct;
}

async function cargarSampling(sampling) {
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    let urlSampling = 'http://localhost:8080/api/v1/sampling/' + sampling;
    let fullSampling;
    await fetch(urlSampling, getInit)
        .then(response => response.json())
        .then(response => fullSampling = response)
    return fullSampling;
}



async function deleteDetail(id) {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let idDetail = params.get("id");
    let url = 'http://localhost:8080/api/v1/detailsampling/' + id;
    let deleteInit = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    await fetch(url, deleteInit)
        .then(response => console.log(response));


    location.href = 'detailSampling.html?id=' + idDetail;
}