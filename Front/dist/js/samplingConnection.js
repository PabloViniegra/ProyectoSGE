
async function loadSampling() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get("id")
    if (id == undefined) id = 1;
    let url = 'http://localhost:8080/api/v1/sampling'
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
                response.json().then(response => {
                    let deleteForm = document.getElementById('bodyDeleteSampling');
                    let trDelete = document.createElement('tr')
                    //id-nombre-personal-producto
                    let tdId = document.createElement('td')
                    tdId.innerHTML = response.id;
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

                    //TODO: LLevar los datos a los campos de actualización

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
            let firstSampling = true;
            let select = document.getElementById('inputStaffA');
            response.forEach(c => {
                let option = document.createElement('option');
                option.setAttribute('value', c.idStaff)
                option.innerHTML = c.name;
                select.appendChild(option);

                if (firstSampling) {
                    $('#inputStaffA').val(c.idStaff);
                    $('.selectpicker').selectpicker('render');
                    console.log('id: ' + c.idStaff)
                    firstSampling = false;

                }
            });
        })
    $('.selectpicker').selectpicker('refresh');
}