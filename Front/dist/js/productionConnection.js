
async function loadProductionOrderList() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let idSampling;
    let id = params.get("id");
    if (id == undefined) id = 1;
    let url = 'http://localhost:8080/api/v1/production/process';
    let url2 = 'http://localhost:8080/api/v1/production'
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    await fetch(url2 + '/' + id, getInit)
        .then(response => {
            if (response.ok) {
                response.json().then(response => {
                    let personal = document.getElementById('personalProduccion')
                    let fecha = document.getElementById('fechaProduccion')
                    let cantidad = document.getElementById('cantidadProduccion')
                    let estado = document.getElementById('estadoProduccion')
                    let cliente = document.getElementById('clienteProduccion')
                    let escandallo = document.getElementById('escandalloProduccion')
                    let bar = document.getElementById('progressProd')
                    personal.innerHTML = personal.innerHTML + response.staff.name
                    idSampling = response.sampling.id;
                    fecha.innerHTML = fecha.innerHTML + response.date
                    cantidad.innerHTML = cantidad.innerHTML + response.quantity
                    estado.innerHTML = estado.innerHTML + response.status
                    cliente.innerHTML = cliente.innerHTML + response.client.fullName
                    escandallo.innerHTML = escandallo.innerHTML + response.sampling.name
                    switch (response.status) {
                        case 'SOLICITADO':
                            bar.setAttribute('aria-valuenow', 25)
                            break;
                        case 'EN PROCESO':
                            bar.setAttribute('aria-valuenow', 50)
                            break;
                        case 'TRAMITADO':
                            bar.setAttribute('aria-valuenow', 75)
                            break;
                    }
                    loadTableDetails(idSampling)
                    document.getElementById('btnDetalle').addEventListener('click', () => {
                        location.href = 'detailSampling.html?id=' + idSampling
                    })
                })
            }
        })
        
    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => {

            if (response != null) {
                for (let i = 0; i < response.length; i++) {
                    let a = document.createElement('a');
                    let urlSampling = 'production.html?id=' + response[i].id;
                    a.setAttribute('href', urlSampling);

                    let li = document.createElement('li');

                    let ii = document.createElement('i');
                    ii.setAttribute('class', 'fab fa-product-hunt');
                    li.appendChild(ii);

                    li.innerHTML = li.innerHTML + ' ' + response[i].client.fullName + ' - ' + response[i].date;

                    a.appendChild(li);

                    document.getElementById('LastProductionList').appendChild(a);
                }
            }


        })
}

async function loadTableDetails(idSampling) {
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    let urlSampling = 'http://localhost:8080/api/v1/detailsampling';
    let bodyTbl = document.getElementById('tablaMostrarDetalle')
    await fetch(urlSampling, getInit)
        .then(response => response.json())
        .then(response => {
            response.forEach(element => {
                if (element.sampling.id == idSampling) {
                    let row = document.createElement('tr')
                    let tdId = document.createElement('td')
                    tdId.innerHTML = element.id;
                    row.appendChild(tdId)
                    let tdSampling = document.createElement('td')
                    tdSampling.innerHTML = element.sampling.name
                    row.appendChild(tdSampling)
                    let tdQuantity = document.createElement('td')
                    tdQuantity.innerHTML = element.quantity
                    row.appendChild(tdQuantity)
                    bodyTbl.appendChild(row)
                }
            });
        })
}

async function getAllOrderProductions() {
    let body = document.getElementById('bodyTableProduction')
    let url = 'http://localhost:8080/api/v1/production';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => {
            response.forEach(element => {
                let row = document.createElement('tr')
                let tdId = document.createElement('td')
                tdId.innerHTML = element.id;
                row.appendChild(tdId)
                let tdClient = document.createElement('td')
                tdClient.innerHTML = element.client.fullName
                row.appendChild(tdClient)
                let tdProduct = document.createElement('td')
                tdProduct.innerHTML = element.sampling.name
                row.appendChild(tdProduct)
                let tdQuantity = document.createElement('td')
                tdQuantity.innerHTML = element.quantity
                row.appendChild(tdQuantity)
                let tdDate = document.createElement('td')
                tdDate.innerHTML = element.date
                row.appendChild(tdDate)
                let tdStatus = document.createElement('td')
                tdStatus.innerHTML = element.status
                row.appendChild(tdStatus)
                let tdStaff = document.createElement('td')
                tdStatus.innerHTML = element.staff.name
                row.appendChild(tdStaff)
                body.appendChild(row)
                tdClient.addEventListener('click', () => { location.href = 'clients.html?id=' + element.client.id })
                tdProduct.addEventListener('click', () => { location.href = 'sampling.html?id=' + element.sampling.id })


            });
        })
}

function filterTableProduction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableAllProduction");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

