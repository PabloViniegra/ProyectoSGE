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
    let url = '/reports/staffReceiptSale/'+ valueSelect +'/'+ initdate.value +'/'+ lastdate.value;
    console.log(url)
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/text'
        }
    }

    let urlReport = '../../Reports/informe-ventas-' + valueSelect + '.pdf';
    await fetch(urlReport, getInit)
        .then(response => {
            console.log(response)
            if (response.ok) {
                response.text()
                    .then(response => {
                        let mostrarInforme = document.getElementById("mostrarInforme")
                        mostrarInforme.setAttribute('src', urlReport)
                    })

            }
        });
}
