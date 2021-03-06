async function loadLastStaffs() {
    let url = 'http://localhost:8080/api/v1/staffs'
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
            let final = 1;
            if (response.length > 20) {
                final = response.length - 20;
            } else {
                final = 0;
            }

            for (let i = response.length - 1; i >= final; i--) {
                let a = document.createElement('a');
                let urlStaff = 'staff.html?id=' + response[i].idStaff;
                a.setAttribute('href', urlStaff);

                let li = document.createElement('li');

                let ii = document.createElement('i');
                ii.setAttribute('class', 'fas fa-adress-card mr-2');
                li.appendChild(ii);

                li.innerHTML = li.innerHTML + ' ' + response[i].name + ' - ' + response[i].email;

                a.appendChild(li);

                document.getElementById('lastStaffList').appendChild(a);
            }
        })

}

async function loadStaff() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get('id');
    if (id == undefined) id = 1;
    let urlStaff = 'http://localhost:8080/api/v1/staffs/' + id;
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    await fetch(urlStaff, getInit)
        .then(response => {
            if (response.ok) {
                response.json().then(response => {
                    let name = document.getElementById('nameStaff')
                    name.innerHTML = name.innerHTML + ' ' + response.name;
                    let email = document.getElementById('emailStaff')
                    email.innerHTML = email.innerHTML + ' ' + response.email;
                    let position = document.getElementById('namePositionStaff')
                    position.innerHTML = position.innerHTML + ' ' + response.positionStaff.name;
                    let tel = document.getElementById('telephoneStaff');
                    tel.innerHTML = tel.innerHTML + response.telephone;
                    let section = document.getElementById('sectionPositionStaff')
                    section.innerHTML = section.innerHTML + ' ' + response.positionStaff.section;
                    let privilege = document.getElementById('privilegePositionStaff')
                    privilege.innerHTML = privilege.innerHTML + ' ' + response.positionStaff.privilege;

                    //Modificacion
                    let nameModificar = document.getElementById('personalNameM')
                    nameModificar.value = response.name;
                    let emailModificar = document.getElementById('personalEmailM')
                    emailModificar.value = response.email;
                    let telefonoModificar = document.getElementById('inputTelefonoPersonalM');
                    telefonoModificar.value = response.telephone;
                    let positionModificar = document.getElementById('positionStaffM')
                    positionModificar.value = response.positionStaff.name;
                    let sectionModificar = document.getElementById('seccionPersonalM')
                    sectionModificar.value = response.positionStaff.section;
                    let privilegeModificar = document.getElementById('privilegioPersonalM')
                    privilegeModificar.value = response.positionStaff.privilege;

                    //Carga del dato en la celda de la tabla
                    let tblBody = document.getElementById('bodyTableStaff');
                    let row = document.createElement('tr');
                    let celda1 = document.createElement('td');
                    celda1.innerHTML = response.idStaff;
                    row.appendChild(celda1);
                    let celda2 = document.createElement('td');
                    celda2.innerHTML = response.name;
                    row.appendChild(celda2);
                    let celda3 = document.createElement('td');
                    celda3.innerHTML = response.email;
                    row.appendChild(celda3);
                    let celda4 = document.createElement('td');
                    celda4.innerHTML = response.positionStaff.name;
                    row.appendChild(celda4);
                    let celda5 = document.createElement('td');
                    celda5.innerHTML = response.positionStaff.section;
                    row.appendChild(celda5);
                    let celda6 = document.createElement('td');
                    celda6.innerHTML = response.positionStaff.privilege;
                    row.appendChild(celda6);
                    let celda7 = document.createElement('td');
                    celda7.innerHTML = response.telephone;
                    row.appendChild(celda7);

                    tblBody.appendChild(row);
                })

            }
        })

}
async function addStaff() {
    let form = document.getElementById('addStaff');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        if (id == undefined) id = 1
        let name = document.getElementById('personalNameInput');
        let email = document.getElementById('personalEmailInput');
        let password = document.getElementById('inputPassword');
        let tel = document.getElementById('inputTelefonoPersonal');
        let position = document.getElementById('inputNombrePuesto');
        let seccion = document.getElementById('seccionPersonalAdd');
        let privilegio = document.getElementById('privilegioPersonal');

        let data = {
            name: name.value,
            email: email.value,
            password: password.value,
            telephone: tel.value,
            positionStaff: {
                name: position.value,
                section: seccion.value,
                privilege: privilegio.value
            }
        }

        let url = 'http://localhost:8080/api/v1/staffs'
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
            .then(response => console.log(response))

        location.href = 'staff.html?id=' + id;
    })
}

function updateStaff() {
    let form = document.getElementById('updateStaff');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        if (id == undefined) id = 1
        let name = document.getElementById('personalNameM');
        let email = document.getElementById('personalEmailM');
        let password = document.getElementById('inputPasswordM')
        let tel = document.getElementById('inputTelefonoPersonalM');
        let position = document.getElementById('positionStaffM');
        let seccion = document.getElementById('seccionPersonalM');
        let privilegio = document.getElementById('privilegioPersonalM');

        let data = {
            name: name.value,
            email: email.value,
            telephone: tel.value,
            password: password.value,
            positionStaff: {
                name: position.value,
                section: seccion.value,
                privilege: privilegio.selectedIndex
            }
        }
        console.log(data);

        let url = 'http://localhost:8080/api/v1/staffs/' + id;
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
        //.then(location.href = 'staff.html?id=' + id)
        location.href = 'staff.html?id=' + id
    })
}

async function deleteStaff() {
    let form = document.getElementById('deleteStaff')
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        let url = 'http://localhost:8080/api/v1/staffs/' + id;
        let deleteInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        await fetch(url, deleteInit)
            .then(response => console.log(response))

        location.href = 'staff.html';
    })
}

async function loadAllStaffs() {
    let url = 'http://localhost:8080/api/v1/staffs';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    let table = document.getElementById('tableAllStaffs');
    let tblBody = document.getElementById('bodyTableStaffs');
    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => {

            response.forEach(s => {
                let row = document.createElement('tr');
                let celda1 = document.createElement('td');
                celda1.innerHTML = s.idStaff;
                row.appendChild(celda1);
                let celda2 = document.createElement('td');
                celda2.innerHTML = s.name;
                row.appendChild(celda2);
                let celda3 = document.createElement('td');
                celda3.innerHTML = s.email;
                row.appendChild(celda3);
                let celda4 = document.createElement('td');
                celda4.innerHTML = s.telephone;
                row.appendChild(celda4);
                let celda5 = document.createElement('td');
                celda5.innerHTML = s.positionStaff.idPositionStaff;
                row.appendChild(celda5);
                let celda6 = document.createElement('td');
                celda6.innerHTML = s.positionStaff.name;
                row.appendChild(celda6);
                let celda7 = document.createElement('td');
                celda7.innerHTML = s.positionStaff.section;
                row.appendChild(celda7);
                let celda8 = document.createElement('td');
                celda8.innerHTML = s.positionStaff.privilege;
                row.appendChild(celda8);

                tblBody.appendChild(row);
                row.addEventListener("click", () => {
                    let id = s.idStaff;
                    location.href = 'staff.html?id=' + id;
                });
                table.appendChild(tblBody);

            });


        })

}

function filterTableStaff() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableAllStaffs");
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