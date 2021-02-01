
async function loadProductionOrderList() {
    let url = 'http://localhost:8080/api/v1/production/process';
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

            if (response != null) {
                for (let i = 0; i < response.length; i++) {
                    let a = document.createElement('a');
                    let urlSampling = 'production.html?id=' + response[i].id;
                    a.setAttribute('href', urlSampling);

                    let li = document.createElement('li');

                    let ii = document.createElement('i');
                    ii.setAttribute('class', 'fab fa-product-hunt');
                    li.appendChild(ii);

                    li.innerHTML = li.innerHTML + ' ' + response[i].client.fullName + ' - ' + response[i].date;

                    a.appendChild(li);

                    document.getElementById('LastProductionList').appendChild(a);
                }
            }


        })
}