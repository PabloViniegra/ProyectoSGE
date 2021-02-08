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