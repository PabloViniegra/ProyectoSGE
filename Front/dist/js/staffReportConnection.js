async function getAllStaffInaSelected() {
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
        .then(response => response.sort((a, b) => {
            return a.name.localeCompare(b.name)
        }))
        .then(response => {
            let select = document.getElementById('staffInASelected');
            response.forEach(async c => {
                let option = document.createElement('option');
                option.setAttribute('value', c.idStaff);
                option.innerHTML = c.name;
                select.appendChild(option);
            })
        })
}

document.getElementById("generateReport").addEventListener("click", ev => {
    ev.preventDefault();
    generateReport();
})

async function generateReport() {

    let initdate = document.querySelector('#startDate')
    let lastdate = document.querySelector('#endDate')
    let staffSelected = document.querySelector('#staffInASelected');
    let valueSelect = staffSelected.options[staffSelected.selectedIndex].value;    
    let url = 'http://localhost:8080/api/v1/reports/purchases/' + valueSelect + '/' + initdate.value + '/' + lastdate.value;
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/text'
        }
    }

    console.log(url)

    await fetch(url, getInit)
        .then(response => {
            console.log(response)
            if (response.ok) {
                response.text()
                    .then(response => {
                        let mostrarInforme = document.getElementById("mostrarInforme")
                        mostrarInforme.setAttribute('src', '../../Reports/' + response + '.pdf')
                    })

            }
        });
}
