async function loadClient() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get("id");
    if (id == undefined) id = 1;
    let url = 'http://localhost:8080/api/v1/clients';
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
                    let deleteForm = document.getElementById('bodyDelete');
                    let trDelete = document.createElement('tr')
                        //id - nombre - email - dni
                    let tdId = document.createElement('td')
                    tdId.innerHTML = response.id;
                    trDelete.appendChild(tdId)
                    let tdNombre = document.createElement('td')
                    tdNombre.innerHTML = response.fullName;
                    trDelete.appendChild(tdNombre)
                    let tdEmail = document.createElement('td')
                    tdEmail.innerHTML = response.email;
                    trDelete.appendChild(tdEmail)
                    let tdDni = document.createElement('td')
                    tdDni.innerHTML = response.dni;
                    trDelete.appendChild(tdDni)
                    deleteForm.appendChild(trDelete)

                    let name = document.getElementById('NombreCliente')
                    name.innerHTML = name.innerHTML + response.fullName;
                    let inputName = document.getElementById('inputCompleteName2');
                    inputName.value = response.fullName;
                    let id = document.getElementById('id')
                    id.innerHTML = id.innerHTML + response.id;
                    let dni = document.getElementById('dni')
                    dni.innerHTML = dni.innerHTML + response.dni;
                    let inputDni = document.getElementById('inputDNI2')
                    inputDni.value = response.dni;
                    let email = document.getElementById('email')
                    email.innerHTML = email.innerHTML + response.email;
                    let inputEmail = document.getElementById('inputEmail2')
                    inputEmail.value = response.email;
                    let iban = document.getElementById('iban')
                    iban.innerHTML = iban.innerHTML + response.iban;
                    let inputIban = document.getElementById('inputIBAN2')
                    inputIban.value = response.iban;
                    let tele = document.getElementById('telefonos')
                    tele.innerHTML = tele.innerHTML + response.telephones[0].number;
                    let inputTelephones = document.getElementById('inputTelephone2')
                    inputTelephones.value = response.telephones[0].number;
                    let dire = document.getElementById('direcciones')
                    dire.innerHTML = dire.innerHTML + response.directions[0].direction;
                    let inputDirections = document.getElementById('inputDirection2')
                    inputDirections.value = response.directions[0].direction;
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
                final = 0;
            }

            for (let i = response.length - 1; i >= final; i--) {
                let a = document.createElement('a');
                let urlClient = 'clients.html?id=' + response[i].id;
                a.setAttribute('href', urlClient);

                let li = document.createElement('li');

                let ii = document.createElement('i');
                ii.setAttribute('class', 'fas fa-clipboard mr-2');
                li.appendChild(ii);

                li.innerHTML = li.innerHTML + ' ' + response[i].fullName + ' - ' + response[i].dni;

                a.appendChild(li);

                document.getElementById('LastClientList').appendChild(a);
            }
        })
}

async function addClient() {
    let form = document.getElementById('addClient')

    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        if (id == undefined) id = 1
        let name = document.getElementById('inputCompletName')
        let email = document.getElementById('inputEmail')
        let iban = document.getElementById('inputIBAN')
        let dni = document.getElementById('inputDNI')
        let telephone = document.getElementById('inputTelephone')
        let direction = document.getElementById('inputDirection')
        let select = document.getElementById('population')
        let codPostal2;
        let population2;
        let province2;

        let url2 = 'http://localhost:8080/api/v1/populations/' + select.options[select.selectedIndex].value;
        let getInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        await fetch(url2, getInit)
            .then(response => response.json())
            .then(response => {
                codPostal2 = response.idPopulation,
                    population2 = response.population,
                    province2 = response.province
            })

        let data = {
            fullName: name.value,
            email: email.value,
            iban: iban.value,
            dni: dni.value,
            telephones: [{
                number: telephone.value
            }],
            directions: [{
                direction: direction.value
            }],
            sales: [],
            population: {
                idPopulation: codPostal2,
                population: population2,
                province: province2
            }
        }

        let url = 'http://localhost:8080/api/v1/clients';
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
            .then(response => id = response.id)

        location.href = 'clients.html?id=' + id;
    })
}

async function updateClient() {
    let form = document.getElementById('updateClient')

    form.addEventListener('submit', async(e) => {
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        if (id == undefined) id = 1
        e.preventDefault();
        let name = document.getElementById('inputCompleteName2')
        let email = document.getElementById('inputEmail2')
        let iban = document.getElementById('inputIBAN2')
        let dni = document.getElementById('inputDNI2')
        let telephone = document.getElementById('inputTelephone2')
        let direction = document.getElementById('inputDirection2')

        let data = {
            fullName: name.value,
            email: email.value,
            iban: iban.value,
            dni: dni.value,
            telephones: [{
                number: telephone.value
            }],
            directions: [{
                direction: direction.value
            }],
            sales: []
        }

        console.log(data)

        let url = 'http://localhost:8080/api/v1/clients/' + id;
        let postInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }

        await fetch(url, postInit)
            .then(response => console.log(response))

        location.href = 'clients.html?id=' + id;
    })
}

function deleteClient() {
    let form = document.getElementById('deleteClient')
    form.addEventListener('submit', async(e) => {
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        let url = 'http://localhost:8080/api/v1/clients/' + id;
        let deleteInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        await fetch(url, deleteInit)
            .then(response => console.log(response))

        location.href = 'clients.html';
    })

}

async function loadAllClients() {
    let url = 'http://localhost:8080/api/v1/clients';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    let table = document.getElementById('tableAllClients');
    let tblBody = document.getElementById('bodyTableClients');
    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => {
            response.forEach(r => {
                let row = document.createElement('tr');

                let celda1 = document.createElement('td');
                celda1.innerHTML = r.id;
                row.appendChild(celda1);

                let celda2 = document.createElement('td');
                celda2.innerHTML = r.fullName;
                row.appendChild(celda2);

                let celda3 = document.createElement('td');
                celda3.innerHTML = r.email;
                row.appendChild(celda3);

                let celda4 = document.createElement('td');
                celda4.innerHTML = r.dni;
                row.appendChild(celda4);

                let celda5 = document.createElement('td');
                celda5.innerHTML = r.iban;
                row.appendChild(celda5);

                let celda6 = document.createElement('td');
                let select6 = document.createElement('select')
                select6.setAttribute('class', 'browser-default custom-select bg-dark text-white')
                celda6.appendChild(select6)
                r.telephones.forEach(tel => {
                    let hijoSelect6 = document.createElement('option')
                    hijoSelect6.innerHTML = tel.number + '<br>';
                    select6.appendChild(hijoSelect6)
                });
                row.appendChild(celda6);


                let celda7 = document.createElement('td');
                let select7 = document.createElement('select')
                select7.setAttribute('class', 'browser-default custom-select bg-dark text-white')
                celda7.appendChild(select7)
                r.directions.forEach(dir => {
                    let hijoSelect7 = document.createElement('option')
                    hijoSelect7.innerHTML = dir.direction + '<br>';
                    select7.appendChild(hijoSelect7)
                });
                row.appendChild(celda7);

                let celda8 = document.createElement('td');
                let select8 = document.createElement('select')
                select8.setAttribute('class', 'browser-default custom-select bg-dark text-white')
                celda8.appendChild(select8)
                r.sales.forEach(sale => {
                    let hijoSelect8 = document.createElement('option')
                    hijoSelect8.innerHTML = sale.receipt.receiptDate; + '<br>';
                    select8.appendChild(hijoSelect8)
                });
                row.appendChild(celda8);
                row.addEventListener("click", () => {
                    let id = r.id;
                    location.href = 'clients.html?id=' + id;
                });
                table.appendChild(tblBody);

                tblBody.appendChild(row);
            });


        })
}

function filterTableClients() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableAllClients");
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

async function getAllPopulationsInASelect() {
    let url = 'http://localhost:8080/api/v1/populations';
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
            return a.population.localeCompare(b.population)
        }))
        .then(response => {
            let select = document.getElementById('population');
            response.forEach(c => {
                let option = document.createElement('option');
                option.setAttribute('value', c.idPopulation)
                option.innerHTML = c.population;
                select.appendChild(option);
            });
        })
}