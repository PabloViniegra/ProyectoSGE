async function getFirstId() {
    let url = 'http://localhost:8080/api/v1/production'
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    let id;
    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => id = response[response.length - 1].id)
    if (id == undefined) id = 1;
    return id;
}

async function loadProductionOrderList() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let idSampling;
    let id = params.get("id");
    if (id == undefined) id = await getFirstId();
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
                            bar.setAttribute('value', Number(25))
                            bar.innerHTML = '33%';
                            break;
                        case 'EN PROCESO':
                            bar.setAttribute('value', Number(50))
                            bar.innerHTML = '66%';
                            break;
                        case 'TRAMITADO':
                            bar.setAttribute('value', Number(75))
                            bar.innerHTML = '100%';
                            break;
                    }
                    let bdyDelete = document.getElementById('deleteTableProduction')
                    let trBorrar = document.createElement('tr')
                    let celdaBorrarId = document.createElement('td')
                    celdaBorrarId.innerHTML = response.id;
                    trBorrar.appendChild(celdaBorrarId);
                    let celdaFecha = document.createElement('td')
                    celdaFecha.innerHTML = response.date
                    trBorrar.appendChild(celdaFecha)
                    let celdaEstado = document.createElement('td')
                    celdaEstado.innerHTML = response.status
                    trBorrar.appendChild(celdaEstado)
                    let celdacantidad = document.createElement('td')
                    celdacantidad.innerHTML = response.quantity
                    trBorrar.appendChild(celdacantidad)
                    bdyDelete.appendChild(trBorrar);
                    let modifySampling = document.getElementById('updateSampling')
                    let optionSampling = document.createElement('option')
                    let modifyClient = document.getElementById('updateClientProduction')
                    let optionClient = document.createElement('option')
                    let modifyQuantity = document.getElementById('updateQuantityProduction')
                    let updateStatus = document.getElementById('updateStatusProduction')
                    let modifyStaff = document.getElementById('updateStaffProduction')
                    let modifyButton = document.getElementById('modifyProduction')
                    let optionStaff = document.createElement('option')
                    optionClient.innerHTML = response.client.fullName
                    optionClient.value = response.client.id
                    modifyClient.appendChild(optionClient)
                    optionSampling.innerHTML = response.sampling.name
                    optionSampling.value = response.sampling.id
                    modifySampling.appendChild(optionSampling)
                    modifyQuantity.value = response.quantity
                    modifyButton.setAttribute('idParaModificar', id)
                    updateStatus.value = response.status;
                    optionStaff.innerHTML = response.staff.name
                    optionStaff.value = response.staff.idStaff
                    modifyStaff.appendChild(optionStaff)
                    loadTableDetails(idSampling)
                    document.getElementById('btnDetalle').addEventListener('click', () => {
                        location.href = 'detailSampling.html?id=' + idSampling
                    })


                })
            }
        })

    await fetch(url2, getInit)
        .then(response => response.json())
        .then(response => {

            if (response != null) {
                let final = 1;
                if (response.length > 20) {
                    final = response.length - 20;
                } else {
                    final = 0;
                }

                for (let i = response.length - 1; i >= final; i--) {
                    let a = document.createElement('a');
                    let urlSampling = 'production.html?id=' + response[i].id;
                    a.setAttribute('href', urlSampling);

                    let li = document.createElement('li');

                    let ii = document.createElement('i');
                    ii.setAttribute('class', 'fab fa-product-hunt');
                    li.appendChild(ii);

                    li.innerHTML = li.innerHTML + ' ' + response[i].client.fullName + ' - ' + response[i].date + ' - ' + response[i].status;

                    a.appendChild(li);

                    document.getElementById('LastProductionList').appendChild(a);
                }
            }


        })
}

async function updateOrder() {
    let form = document.getElementById('updateProduction')
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let modifyButton = document.getElementById('modifyProduction')
        let id = modifyButton.getAttribute('idParaModificar')
        let url = 'http://localhost:8080/api/v1/production/' + id
        let getInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        let statusModify = document.getElementById('updateStatusProduction')
        let status = statusModify.options[statusModify.selectedIndex].value;
        if (status == 'EN PROCESO') {
            let data = {
                status: status
            }
            let patchInit = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }
            let podemosModificar = true;
            let stonks = [];
            let idStonks = [];
            let quantityStonks = [];
            await fetch(url, getInit)
                .then(response => response.json())
                .then(async response => {
                    let url2 = 'http://localhost:8080/api/v1/detailsampling'
                    await fetch(url2, getInit)
                        .then(response2 => response2.json())
                        .then(response2 => {
                            response2.forEach(detalle => {
                                if (detalle.sampling.id == response.sampling.id) {
                                    if ((detalle.quantity * response.quantity) > detalle.product.stock) {
                                        podemosModificar = false;
                                    } else {
                                        stonks.push(detalle.product.stock)
                                        idStonks.push(detalle.product.id)
                                        quantityStonks.push(detalle.quantity * response.quantity)
                                    }
                                }
                            })
                        })
                    if (podemosModificar) {
                        await fetch(url, patchInit)
                        for (let i = 0; i < idStonks.length; i++) {
                            let url3 = 'http://localhost:8080/api/v1/products/' + idStonks[i]
                            let data2 = {
                                stock: stonks[i] - quantityStonks[i]
                            }
                            let patchInit2 = {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                },
                                body: JSON.stringify(data2)
                            }
                            console.log(data2)
                            await fetch(url3, patchInit2)
                        }
                    } else {
                        document.getElementById('debug').innerHTML = 'NO HAY STOCK SUFICIENTE DE ALGUNOS PRODUCTOS'
                    }
                })
        } else {
            await fetch(url, getInit)
                .then(response => response.json())
                .then(async response => {
                    if (response.status == 'EN PROCESO' && status != 'SOLICITADO') {
                        let data3 = {
                            status: status
                        }
                        let patchInit3 = {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify(data3)
                        }
                        await fetch(url, patchInit3)

                        let url4 = 'http://localhost:8080/api/v1/products/' + response.sampling.product.id
                        let data4 = {
                            stock: response.sampling.product.stock + response.quantity
                        }
                        let patchInit4 = {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify(data4)
                        }
                        await fetch(url4, patchInit4)
                    } else if (response.status == 'EN PROCESO' && status == 'SOLICITADO') {
                        let data = {
                            status: status
                        }
                        let patchInit = {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify(data)
                        }   
                        let stonks = [];
                        let idStonks = [];
                        let quantityStonks = [];
                        await fetch(url, getInit)
                            .then(response => response.json())
                            .then(async response => {
                                let url2 = 'http://localhost:8080/api/v1/detailsampling'
                                await fetch(url2, getInit)
                                    .then(response2 => response2.json())
                                    .then(response2 => {
                                        response2.forEach(detalle => {
                                            if (detalle.sampling.id == response.sampling.id) {
                                                stonks.push(detalle.product.stock)
                                                idStonks.push(detalle.product.id)
                                                quantityStonks.push(detalle.quantity * response.quantity)

                                            }
                                        })
                                    })
                                await fetch(url, patchInit)
                                for (let i = 0; i < idStonks.length; i++) {
                                    let url3 = 'http://localhost:8080/api/v1/products/' + idStonks[i]
                                    let data2 = {
                                        stock: stonks[i] + quantityStonks[i]
                                    }
                                    let patchInit2 = {
                                        method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Accept': 'application/json'
                                        },
                                        body: JSON.stringify(data2)
                                    }
                                    console.log(data2)
                                    await fetch(url3, patchInit2)
                                }

                            })
                    }

                })

        }
        location.href = 'production.html?id=' + id;
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
                    tdSampling.innerHTML = element.product.name
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
                tdStaff.innerHTML = element.staff.name
                row.appendChild(tdStaff)
                body.appendChild(row)
                tdId.addEventListener('click', () => { location.href = 'production.html?id=' + element.id })
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

async function getAllSamplingInASelect() {
    let url = 'http://localhost:8080/api/v1/sampling';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    let select = document.getElementById('samplingForProduction')

    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => response.sort((a, b) => {
            return a.name.localeCompare(b.name)
        }))
        .then(response => {
            response.forEach(element => {
                let option = document.createElement('option')
                option.innerHTML = element.name
                option.setAttribute('value', element.id)
                select.appendChild(option)
            });
        })
}

async function getAllClientsInASelect() {
    let url = 'http://localhost:8080/api/v1/clients';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    let select = document.getElementById('clientForProduction')

    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => response.sort((a, b) => {
            return a.fullName.localeCompare(b.fullName)
        }))
        .then(response => {
            response.forEach(element => {
                let option = document.createElement('option')
                option.innerHTML = element.fullName
                option.setAttribute('value', element.id)
                select.appendChild(option)
            });
        })
}

async function getAllStaffInASelect() {
    let url = 'http://localhost:8080/api/v1/staffs';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    let select = document.getElementById('staffForProduction')

    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => response.sort((a, b) => {
            return a.name.localeCompare(b.name)
        }))
        .then(response => {
            response.forEach(element => {
                let option = document.createElement('option')
                option.innerHTML = element.name
                option.setAttribute('value', element.idStaff)
                select.appendChild(option)
            });
        })
}

async function addProductionOrder() {
    let form = document.getElementById('formProduction');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let current = new Date();
        let fecha = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        let formSampling = document.getElementById('samplingForProduction').value;
        let idClient = document.getElementById('clientForProduction').value;
        let quantity = document.getElementById('quantityForProduction').value;
        let status = document.getElementById('statusForProduction').value;
        let idStaff = document.getElementById('staffForProduction').value;
        let data = {
            quantity: quantity,
            status: status,
            date: fecha,
            client: await cargarClient(idClient),
            staff: await cargarStaff(idStaff),
            sampling: await cargarSampling(formSampling)
        }
        let url = 'http://localhost:8080/api/v1/production';
        let postInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }

        let id;
        await fetch(url, postInit)
            .then(response => response.json())
            .then(response => id = response.id)

        location.href = 'production.html?id=' + id;
    })
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

async function cargarClient(client) {
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    let urlProduct = 'http://localhost:8080/api/v1/clients/' + client;
    let fullClient;
    await fetch(urlProduct, getInit)
        .then(response => response.json())
        .then(response => fullClient = response)
    return fullClient;
}

async function deleteOrder() {
    let form = document.getElementById('formDelete')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        let url = 'http://localhost:8080/api/v1/production/' + id;
        let deleteInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        await fetch(url, deleteInit)
            .then(response => console.log(response))

        location.href = 'production.html';
    })
}