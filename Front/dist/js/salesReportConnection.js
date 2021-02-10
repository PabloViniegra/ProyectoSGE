async function getAllClientsInaSelected() {
    let url = 'http://localhost:8080/api/v1/clients';
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
            let select = document.getElementById('clientForReport');
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

            let client = document.getElementById("clientForReport");
            let dateInit = document.getElementById("startDate");
            let dateLast = document.getElementById("endDate");

            let url = 'http://localhost:8080/api/v1/reports/sales/'+ client.value + '/'+ dateInit.value +'/'+ dateLast.value;
            let getInit = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }

            console.log(url)

            await fetch(url, getInit)
                .then(response => {
                    console.log(response)
                });
    }
