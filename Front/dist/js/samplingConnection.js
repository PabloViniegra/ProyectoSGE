async function loadSampling() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get("id");
    if (id == undefined) {
        id = 1
    };
    let url = 'http://localhost:8080/api/v1/sampling'
    let urlDetails = 'http://localhost:8080/api/v1/detailsampling';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    await fetch(url + '/' + id, getInit)
        .then(response => {
            if (response.ok) {
                response.json().then(async response => {
                    let deleteForm = document.getElementById('bodyDeleteSampling');
                    let trDelete = document.createElement('tr')
                        //id-nombre-personal-producto
                    let tdId = document.createElement('td')
                    let idSampling = response.id;
                    tdId.innerHTML = idSampling
                    trDelete.appendChild(tdId)

                    let tdNombre = document.createElement('td')
                    tdNombre.innerHTML = response.name;
                    trDelete.appendChild(tdNombre)

                    let tdPersonal = document.createElement('td')
                    tdPersonal.innerHTML = response.staff.name;
                    trDelete.appendChild(tdPersonal)

                    let tdProducto = document.createElement('td')
                    tdProducto.innerHTML = response.product.name;
                    trDelete.appendChild(tdProducto)
                    deleteForm.appendChild(trDelete)

                    //Cargando la carta
                    let nombreEscandalloCarta = document.getElementById('nombreEscandallo')
                    nombreEscandalloCarta.innerHTML = nombreEscandalloCarta.innerHTML + response.name;

                    let idEscandalloCarta = document.getElementById('idEscandallo')
                    idEscandalloCarta.innerHTML = idEscandalloCarta.innerHTML + response.id

                    let personalEscandalloProducto = document.getElementById('personalEscandallo')
                    personalEscandalloProducto.innerHTML = personalEscandalloProducto.innerHTML + response.staff.name;

                    let productoEscandalloCarta = document.getElementById('nombreProducto')
                    productoEscandalloCarta.innerHTML = productoEscandalloCarta.innerHTML + response.product.name;

                    let stockEscandalloCarta = document.getElementById('stockProducto')
                    stockEscandalloCarta.innerHTML = stockEscandalloCarta.innerHTML + response.product.stock;

                    document.getElementById('inputSamplingM').value = response.name;
                    let staffM = document.getElementById('staffM')
                    let productM = document.getElementById('productM')
                    staffM.setAttribute('value', response.staff.idStaff)
                    staffM.innerText = response.staff.name;
                    productM.setAttribute('value', response.product.id)
                    productM.innerText = response.product.name;

                    await fetch(urlDetails, getInit)
                        .then(response => response.json())
                        .then(response => {
                            let tableDet = document.getElementById('bodyMostrarDet')
                            response.forEach(detalle => {
                                if (detalle.sampling.id == idSampling) {
                                    let tr = document.createElement('tr')
                                    let td1 = document.createElement('td')
                                    let td2 = document.createElement('td')
                                    td1.innerText = detalle.product.name
                                    td2.innerText = detalle.quantity
                                    tr.appendChild(td1)
                                    tr.appendChild(td2)
                                    tableDet.appendChild(tr)
                                }
                            })
                        })
                    
                        
                })
            }
        })

    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => {
            let final = 1;
            if (response.length > 20) {
                final = response.length - 20;
            } else {
                final = 0
            }

            for (let i = response.length - 1; i >= final; i--) {
                let a = document.createElement('a')
                let urlSampling = 'sampling.html?id=' + response[i].id;
                a.setAttribute('href', urlSampling)

                let li = document.createElement('li')

                let ii = document.createElement('i');
                ii.setAttribute('class', 'fas fa-dice-d20')
                li.appendChild(ii);
                li.innerHTML = li.innerHTML + ' ' + response[i].name + ' - ' + response[i].staff.name;

                a.appendChild(li)

                document.getElementById('lastSamplingList').appendChild(a);
            }
        })

        document.getElementById('goToDetail').addEventListener('click', () => {
            location.href = 'detailSampling.html?id=' + id;
        })
}

async function loadAllSampling() {
    let url = 'http://localhost:8080/api/v1/sampling';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    let table = document.getElementById('tableAllSampling');
    let tblBody = document.getElementById('bodyTableSampling');

    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => {
            response.forEach(samp => {
                let row = document.createElement('tr');
                //ID-nombre-producto-personal
                let celdaID = document.createElement('td')
                celdaID.innerHTML = samp.id;
                row.appendChild(celdaID)
                celdaID.addEventListener('click', () => {
                    location.href = 'sampling.html?id=' + samp.id;
                })

                let celdaNombre = document.createElement('td')
                celdaNombre.innerHTML = samp.name;
                row.appendChild(celdaNombre)
                celdaNombre.addEventListener('click', () => {
                    location.href = 'sampling.html?id=' + samp.id;
                })

                let celdaProducto = document.createElement('td')
                celdaProducto.innerHTML = samp.product.name
                row.appendChild(celdaProducto)
                celdaProducto.addEventListener('click', () => {
                    location.href = 'products.html?id=' + samp.product.id;
                })

                let celdaPersonal = document.createElement('td')
                celdaPersonal.innerHTML = samp.staff.name;
                row.appendChild(celdaPersonal)
                tblBody.appendChild(row);
                celdaPersonal.addEventListener('click', () => {
                    location.href = 'staff.html?id=' + samp.staff.idStaff;
                })
            });
        })
    table.appendChild(tblBody)

}

function filterTableSampling() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableAllSampling");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
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

async function getAllStaffInASelect() {
    let url = 'http://localhost:8080/api/v1/staffs';
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
            let select = document.getElementById('inputStaffA');

            response.forEach(c => {
                let option = document.createElement('option');
                option.setAttribute('value', c.idStaff)
                option.innerHTML = c.name;
                select.appendChild(option);
            });
        })
}

async function getAllProductsInASelected() {
    let url = 'http://localhost:8080/api/v1/products';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    await fetch(url, getInit)
        .then(response => response.json())
        .then (response => response.sort((a,b) => {
            return a.name.localeCompare(b.name)
        }))
        .then(response => {
            let select = document.getElementById('inputProductA');
            let select2 = document.getElementById('inputDetalleComponente');
            response.forEach(c => {
                let option = document.createElement('option');
                option.setAttribute('value', c.id)
                option.innerHTML = c.name;
                if (c.type == 'SIMPLE') {
                    select2.appendChild(option)
                } else if (c.type == 'COMPUESTO') {
                    select.appendChild(option)
                }
            });
        })
}

async function addSampling() {
    let form = document.getElementById('addSampling');
    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        if (id == undefined) id = 1
        let name = document.getElementById('inputSamplingA');
        let staff = Number(document.getElementById('inputStaffA').value);
        let product = Number(document.getElementById('inputProductA').value);

        let fullStaff = await cargarStaff(staff)
        let fullProduct = await cargarProduct(product)

        if (fullProduct.type != "COMPUESTO") {
            let debug = document.getElementById('debug')
            debug.innerText = 'Seleccione un producto compuesto'
            return null;
        }

        let data = {
            name: name.value,
            staff: fullStaff,
            product: fullProduct
        }

        console.log(data)

        let url = 'http://localhost:8080/api/v1/sampling';
        let postInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }

        await fetch(url, postInit)
            .then(response => response.json())
            .then(async response => {
                id = response.id;
                let body = document.getElementById('tablaDetalles')
                for (let i = 1; i < body.rows.length; i++) {
                    let objCells = body.rows.item(i).cells;
                    let prodID = objCells.item(0).getAttribute('value');
                    let quantity = objCells.item(1).innerHTML;
                    let product = await cargarProduct(prodID)
                    let data2 = {
                        quantity: quantity,
                        product: product,
                        sampling: response
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
                }
            })

        location.href = 'sampling.html?id=' + id;
    })
}

async function cargarStaff(staff) {
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    let urlProduct = 'http://localhost:8080/api/v1/staffs/' + staff;
    let fullStaff;
    await fetch(urlProduct, getInit)
        .then(response => response.json())
        .then(response => fullStaff = response)
    return fullStaff;
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

async function addDetails() {
    let body = document.getElementById('bodyTblAñadirDet')
    let tr = document.createElement('tr')
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let cantidad = document.getElementById('inputDetalleCantidad').value
    let select = document.getElementById('inputDetalleComponente')
    let producto = select.options[select.selectedIndex].text
    td2.innerText = cantidad;
    td1.innerText = producto;
    td1.setAttribute("value", select.value)
    tr.appendChild(td1)
    tr.appendChild(td2)
    body.appendChild(tr)
}

async function updateSampling() {
    let form = document.getElementById('updateSampling');
    form.addEventListener('submit', async(e) => {
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        if (id == undefined) id = 1
        e.preventDefault();
        let name = document.getElementById('inputSamplingM')
        let staff = document.getElementById('staffM').value
        let product = document.getElementById('productM').value

        let fullStaff = await cargarStaff(staff)
        let fullProduct = await cargarProduct(product)

        let data = {
            name: name.value,
            staff: fullStaff,
            product: fullProduct
        }

        console.log(data)

        let url = 'http://localhost:8080/api/v1/sampling/' + id;
        let putInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }

        await fetch(url, putInit)
            .then(response => console.log(response))

        location.href = 'sampling.html?id=' + id;
    })
}

function deleteSampling() {
    let form = document.getElementById('deleteSampling');
    form.addEventListener('submit', async(e) => {
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        let url = 'http://localhost:8080/api/v1/sampling/' + id;
        let deleteInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        await fetch(url, deleteInit)
            .then(response => console.log(response))

        location.href = 'sampling.html';
    })
}

