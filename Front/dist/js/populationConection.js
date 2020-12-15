async function loadPopulation() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get("id");
    if (id == undefined) id = 28932;
    let url = 'http://localhost:8080/api/v1/populations';
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
                    tdId.innerHTML = response.idPopulation;
                    trDelete.appendChild(tdId)
                    let tdPoblacion = document.createElement('td')
                    tdPoblacion.innerHTML = response.population;
                    trDelete.appendChild(tdPoblacion)
                    let tdProvincia = document.createElement('td')
                    tdProvincia.innerHTML = response.province;
                    trDelete.appendChild(tdProvincia)
                    deleteForm.appendChild(trDelete)

                    let codPostal2 = document.getElementById('inputCodPostalM')
                    codPostal2.value = response.idPopulation;
                    let population2 = document.getElementById('inputPoblacionM')
                    population2.value = response.population;
                    let province2 = document.getElementById('inputProvinciaM')
                    province2.value = response.province;

                    let title = document.getElementById('PoblacionT')
                    title.innerHTML = title.innerHTML + response.population;
                    let codPostal = document.getElementById('codPostal')
                    codPostal.innerHTML = codPostal.innerHTML + response.idPopulation;
                    let population = document.getElementById('poblacion')
                    population.innerHTML = population.innerHTML + response.population;
                    let province = document.getElementById('provincia')
                    province.innerHTML = province.innerHTML + response.province;
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
                let urlClient = 'population.html?id=' + response[i].idPopulation;
                a.setAttribute('href', urlClient);

                let li = document.createElement('li');

                let ii = document.createElement('i');
                ii.setAttribute('class', 'fas fa-clipboard mr-2');
                li.appendChild(ii);

                li.innerHTML = li.innerHTML + ' ' + response[i].idPopulation + ' - ' + response[i].population + ' - ' + response[i].province;

                a.appendChild(li);

                document.getElementById('PopulationList').appendChild(a);
            }
        })
}

async function addPopulation() {
    let form = document.getElementById('addPopulation')

    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        if (id == undefined) id = 28932;
        let codPostal = document.getElementById('inputCodPostal')
        let population = document.getElementById('inputPoblacion')
        let province = document.getElementById('inputProvincia')

        let data = {
            idPopulation: codPostal.value,
            population: population.value,
            province: province.value
        }

        let url = 'http://localhost:8080/api/v1/populations';
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
            .then(response => id = response.idPopulation)

        location.href = 'population.html?id=' + id;
    })
}

async function updatePopulation() {
    let form = document.getElementById('updatePopulation')

    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        if (id == undefined) id = 28932;
        let codPostal = document.getElementById('inputCodPostalM')
        let population = document.getElementById('inputPoblacionM')
        let province = document.getElementById('inputProvinciaM')

        let data = {
            idPopulation: codPostal.value,
            population: population.value,
            province: province.value
        }

        let url = 'http://localhost:8080/api/v1/populations';
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
            .then(response => id = response.idPopulation)

        location.href = 'population.html?id=' + id;
    })
}

function deletePopulation() {
    let form = document.getElementById('deletePopulation')
    form.addEventListener('submit', async(e) => {
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        if (id == undefined) id = 28932;
        let url = 'http://localhost:8080/api/v1/populations/' + id;
        let deleteInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        await fetch(url, deleteInit)
            .then(response => console.log(response))

        location.href = 'population.html';
    })

}