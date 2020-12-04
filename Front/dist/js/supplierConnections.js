async function loadSupplier() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get("id");
    if (id == undefined) id = 1
    let url = 'http://localhost:8080/api/v1/supplier';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    await fetch(url + '/' + id, getInit)
        .then(response => response.json())
        .then(response => {
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

            let name = document.getElementById('NombreSupplier')
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
            let tele = document.getElementById('telefonos')
            tele.innerHTML = tele.innerHTML + response.telephones[0].number;
            let inputTelephones = document.getElementById('inputTelephone2')
            inputTelephones.value = response.telephones[0].number;
            let dire = document.getElementById('direcciones')
            dire.innerHTML = dire.innerHTML + response.directions[0].direction;
            let inputDirections = document.getElementById('inputDirection2')
            inputDirections.value = response.directions[0].direction;
        })

    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => {
            let final = 1;
            if (response.length > 20) {
                final = 20;
            } else {
                final = response.length;
            }
            for (let i = 0; i < final; i++) {
                let a = document.createElement('a');
                let urlSuppliers = 'suppliers.html?id=' + response[i].id;
                a.setAttribute('href', urlSuppliers);

                let li = document.createElement('li');

                let ii = document.createElement('i');
                ii.setAttribute('class', 'fas fa-clipboard mr-2');
                li.appendChild(ii);

                li.innerHTML = li.innerHTML + ' ' + response[i].fullName + ' - ' + response[i].dni;

                a.appendChild(li);

                document.getElementById('lastSupplierList').appendChild(a);
            }
        })
}

async function loadAllSuppliers() {
    let url = 'http://localhost:8080/api/v1/supplier';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    let table = document.getElementById('tableAllSuppliers');
    let tblBody = document.getElementById('bodyTableSuppliers');
    await fetch(url,getInit)
        .then(response => response.json())
        .then (response => {
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
                r.telephones.forEach(telephone => {
                    celda5.innerHTML = celda5.innerHTML + "\n" + telephone.number;
                });
                row.appendChild(celda5);

                let celda6 = document.createElement('td');
                r.directions.forEach(dir => {
                    celda6.innerHTML = celda6.innerHTML + "\n" + dir.direction;
                });
                row.appendChild(celda6);

                let celda7 = document.createElement('td');
                r.purchases.forEach(purchase => {
                    celda7.innerHTML = celda7.innerHTML + "\n" + purchase.receipt.receiptDate;
                });
                row.appendChild(celda7);
                tblBody.appendChild(row);

            });

        })
}

async function addSupplier() {
    let form = document.getElementById('addSupplier')

    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        if (id == undefined) id = 1
        let name = document.getElementById('inputCompleteName')
        let email = document.getElementById('inputEmail')
        let dni = document.getElementById('inputDNI')
        let telephone = document.getElementById('inputTelephone')
        let direction = document.getElementById('inputDirection')

        let data = {
            fullName: name.value,
            email: email.value,
            dni: dni.value,
            telephones: [{
                number: telephone.value
            }],
            directions: [{
                direction: direction.value
            }],
            purchases: []
        }

        let url = 'http://localhost:8080/api/v1/supplier';
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
            .then(respone => console.log(respone))

        location.href = 'suppliers.html?id=' + id;
    })
}

async function updateSupplier() {
    let form = document.getElementById('updateSupplier')

    form.addEventListener('submit', async(e) => {
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        if (id == undefined) id = 1
        e.preventDefault();
        let name = document.getElementById('inputCompleteName2')
        let email = document.getElementById('inputEmail2')
        let dni = document.getElementById('inputDNI2')
        let telephone = document.getElementById('inputTelephone2')
        let direction = document.getElementById('inputDirection2')

        let data = {
            fullName: name.value,
            email: email.value,
            dni: dni.value,
            telephones: [{
                number: telephone.value
            }],
            directions: [{
                direction: direction.value
            }],
            purchases: []
        }

        console.log(data)

        let url = 'http://localhost:8080/api/v1/supplier/' + id;
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

        location.href = 'suppliers.html?id=' + id;
    })
}

function deleteSupplier() {
    let form = document.getElementById('deleteSupplier')
    form.addEventListener('submit', async(e) => {
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        let url = 'http://localhost:8080/api/v1/supplier/' + id;
        let deleteInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        await fetch(url, deleteInit)
            .then(response => console.log(response))

        location.href = 'suppliers.html';
    })

}