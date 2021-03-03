async function getAllSuppliersInaSelected() {
    let url = 'http://localhost:8080/api/v1/supplier';
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
            return a.fullName.localeCompare(b.fullName)
        }))
        .then(response => {
            let select = document.getElementById('checkBoxes');
            select.style.textAlign = 'center';
            let selectAll = document.createElement("input");
            selectAll.setAttribute('type', 'button');
            selectAll.setAttribute('id', 'selectAll');
            selectAll.setAttribute('value', 'Select all');
            select.appendChild(selectAll);

            response.forEach(s => {
                let label = document.createElement('label')
                label.setAttribute('for', s.fullName)
                let checkbox = document.createElement('input')
                checkbox.setAttribute('type', 'checkbox')
                checkbox.setAttribute('id', s.fullName)
                checkbox.setAttribute('value', s.id)
                label.innerHTML = s.fullName;
                label.appendChild(checkbox)
                select.appendChild(label)
            });

            document.getElementById('selectAll').onclick = function() {
                let x = 0;
                var checkboxes = document.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox =>{
                        if (checkbox.checked == true){
                            x = x + 1;
                        }
                        if (x >= 0 && x < checkboxes.length){
                            checkboxes.forEach(checkbox => {
                                checkbox.checked = true;
                            })
                        }else if (x == checkboxes.length){
                            checkboxes.forEach(checkbox => {
                                checkbox.checked = false;
                            })
                        }

                    }
                )

            }
        })
}

document.getElementById("generateReport").addEventListener("click", ev => {
    ev.preventDefault();
    generateReport();
})

async function generateReport() {

    let markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
    let dateInit = document.getElementById("startDate");
    let dateLast = document.getElementById("endDate");
    let stringClients = [];
    for (let checkbox of markedCheckbox) {
        if (checkbox.checked) {
            stringClients.push(checkbox.value);
        }
    }
    console.log(stringClients);
    let definitiveString = stringClients.join('-');
    console.log('String: ' + definitiveString)
    let url = 'http://localhost:8080/api/v1/reports/purchases/' + definitiveString + '/' + dateInit.value + '/' + dateLast.value;
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
