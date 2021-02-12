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
            .then (response => response.sort((a,b) => {
                return a.fullName.localeCompare(b.fullName)
            }))
            .then(response => {
                let select = document.getElementById('supplierForReport');
                response.forEach(s => {
                    let option = document.createElement('option');
                    option.setAttribute('value', s.id);
                    option.innerHTML = s.fullName;
                    select.appendChild(option);
                });
            })
    }

    document.getElementById("generateReport").addEventListener("click", ev => {
        ev.preventDefault();
        generateReport();
    })

    async function generateReport(){

        let supplier = document.getElementById("supplierForReport");
        let dateInit = document.getElementById("startDate");
        let dateLast = document.getElementById("endDate");

        let url = 'http://localhost:8080/api/v1/reports/purchases/'+ supplier.value + '/'+ dateInit.value +'/'+ dateLast.value;
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
                if (response.ok){
                    response.text()
                    .then(response => {
                        let mostrarInforme = document.getElementById("mostrarInforme")
                        mostrarInforme.setAttribute('src','../../Reports/' + response + '.pdf')
                    })

                }
            });
    }
