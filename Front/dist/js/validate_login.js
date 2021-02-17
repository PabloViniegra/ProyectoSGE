function loginButton() {
    const form = document.getElementById("form-login");
    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        validate_login();
    });
}

async function validate_login() {
    const url = "http://localhost:8080/api/v1/login";
    const email = document.getElementById("email");
    const pass = document.getElementById("password");
    let body = { email: email.value }
    let postInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    }

    await fetch(url, postInit)
        .then(response => response.json())
        .then(result => {
            if (pass.value == result.password) {
                sessionStorage.setItem('idStaff', result.idStaff)
                location.href = "views/index.html";
            } else {
                let p = document.getElementById('debug');
                p.innerHTML = 'Las credenciales no son correctas';
            }
        }).catch(() => {
            let p = document.getElementById('debug');
            p.innerHTML = 'El usuario no existe en el sistema';
        })
}

async function accessStaff() {
    let user_session = sessionStorage.getItem('idStaff')
    let url = "http://localhost:8080/api/v1/staffs/" + user_session;
    let getInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
        }
    };
    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => {
            if (response.positionStaff.privilege != 0) {
                document.getElementById('debug').innerHTML = 'Necesitas ser administrador para acceder a este módulo.';
            } else {
                location.href = 'staff.html';
            }
        })
}