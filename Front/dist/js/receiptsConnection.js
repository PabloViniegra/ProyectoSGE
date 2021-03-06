async function loadLastReceipts() {
    let url = 'http://localhost:8080/api/v1/receipts'
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
                let urlReceipt = 'receipts.html?id=' + response[i].id;
                a.setAttribute('href', urlReceipt);

                let li = document.createElement('li');

                let ii = document.createElement('i');
                ii.setAttribute('class', 'fas fa-clipboard mr-2');
                li.appendChild(ii);

                li.innerHTML = li.innerHTML + ' ' + response[i].id + ' - ' + response[i].receiptDate;

                a.appendChild(li);

                document.getElementById('lastReceiptsList').appendChild(a);
            }
        })

}

async function loadReceipt() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get('id')
    if (id == undefined) id = 1;
    let urlReceipt = 'http://localhost:8080/api/v1/receipts/' + id;
    let urlVentas ='http://localhost:8080/api/v1/sales'
    let urlCompras ='http://localhost:8080/api/v1/purchases' 
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    await fetch(urlReceipt, getInit)
        .then(response => {
            if (response.ok) {
                response.json().then(async response => {
                    let fecha = document.getElementById('fechafactura')
                    fecha.innerHTML = response.receiptDate;
                    let discount = document.getElementById('discount')
                    discount.innerHTML = discount.innerHTML + ' ' + response.discounts;
                    let subtotal = document.getElementById('subtotal')
                    subtotal.innerHTML = subtotal.innerHTML + ' ' + response.subtotal;
                    let iva = document.getElementById('iva')
                    iva.innerHTML = iva.innerHTML + ' ' + response.iva;
                    let total = document.getElementById('total')
                    total.innerHTML = total.innerHTML + ' ' + response.total;
                    let operacion = document.getElementById('operacion')
                    let sales=[];
                    let purchases=[];
                    await fetch(urlVentas,getInit)
                    .then(response => response.json())
                    .then (response => sales = response)

                    await fetch(urlCompras,getInit)
                    .then (response => response.json())
                    .then (response => purchases = response)    
                    sales.forEach(sale => {
                        if (sale.receipt.id == response.id){
                            operacion.innerHTML = operacion.innerHTML + ' Venta'
                        }
                    })
                    purchases.forEach(purchase => {
                        if (purchase.receipt.id == response.id){
                            operacion.innerHTML = operacion.innerHTML + ' Compra'
                        }
                    })

                    //Modificacion
                    let subtotalModificar = document.getElementById('inputSubtotalM')
                    subtotalModificar.value = response.subtotal;
                    let discountModificar = document.getElementById('inputDiscountM')
                    discountModificar.value = response.discounts;
                    let ivaModificar = document.getElementById('inputIvaM')
                    ivaModificar.value = response.iva;
                    let totalModificar = document.getElementById('inputTotalM')
                    totalModificar.value = response.total;

                    //Carga del dato en la celda de la tabla
                    let table = document.getElementById('tableReceiptsLoad');
                    let tblBody = document.getElementById('bodyTableReceipts');
                    let row = document.createElement('tr');
                    let celda1 = document.createElement('td');
                    celda1.innerHTML = response.id;
                    row.appendChild(celda1);
                    let celda2 = document.createElement('td');
                    celda2.innerHTML = response.receiptDate;
                    row.appendChild(celda2);
                    let celda3 = document.createElement('td');
                    celda3.innerHTML = response.subtotal;
                    row.appendChild(celda3);
                    let celda4 = document.createElement('td');
                    celda4.innerHTML = response.discounts;
                    row.appendChild(celda4);
                    let celda5 = document.createElement('td');
                    celda5.innerHTML = response.iva;
                    row.appendChild(celda5);
                    let celda6 = document.createElement('td');
                    celda6.innerHTML = response.total;
                    row.appendChild(celda6);

                    tblBody.appendChild(row);
                    table.appendChild(tblBody);
                })
            }
        })

}

async function addReceipt() {
    let form = document.getElementById('addReceipt');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        if (id == undefined) id = 1
        let current = new Date();
        let fecha = current.getFullYear() + '-' + current.getMonth() + '-' + current.getDate() + ' ' + current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();
        let subtotal = document.getElementById('inputSubtotalA');
        let descuento = document.getElementById('inputDiscountA');
        let iva = document.getElementById('inputIvaA');
        let total = document.getElementById('inputTotalA');
        console.log(fecha);

        let data = {
            receiptDate: fecha,
            discounts: descuento.value,
            subtotal: subtotal.value,
            iva: iva.value,
            total: total.value,
        }

        let url = 'http://localhost:8080/api/v1/receipts'
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

        location.href = 'receipts.html?id=' + id;
    })
}

async function updateReceipt() {
    let form = document.getElementById('updateReceipt')

    form.addEventListener('submit', async (e) => {
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        if (id == undefined) id = 1
        e.preventDefault();
        let fecha = document.getElementById('inputDateReceiptM');
        let subtotal = document.getElementById('inputSubtotalM');
        let descuento = document.getElementById('inputDiscountM');
        let iva = document.getElementById('inputIvaM');
        let total = document.getElementById('inputTotalM');

        let data = {
            receiptDate: fecha.value,
            discounts: descuento.value,
            subtotal: subtotal.value,
            iva: iva.value,
            total: total.value,
        }

        console.log(data)

        let url = 'http://localhost:8080/api/v1/products' + id;
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

        location.href = 'receipts.html?id=' + id;
    })
}

async function deleteReceipt() {
    let form = document.getElementById('deleteReceipt')
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get("id");
        let url = 'http://localhost:8080/api/v1/receipts/' + id;
        let deleteInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        await fetch(url, deleteInit)
            .then(response => console.log(response))

        location.href = 'receipts.html';
    })

}

async function loadAllReceipts() {
    let url = 'http://localhost:8080/api/v1/receipts';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    let table = document.getElementById('tableAllReceipts');
    let tblBody = document.getElementById('bodyTableReceipts');
    let input = document.getElementById("myInput");

    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let date = params.get('date')
    if (date != undefined) {
        input.value = date;
    }
    await fetch(url, getInit)
        .then(response => response.json())
        .then( async response => {
            let urlVentas = 'http://localhost:8080/api/v1/sales';
            let urlCompras = 'http://localhost:8080/api/v1/purchases';
            let getInit = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
            let sales=[];
            let purchases=[];
            await fetch (urlVentas, getInit)
            .then (response => response.json())
            .then (response => sales = response);

            await fetch(urlCompras, getInit)
            .then (response => response.json())
            .then (response => purchases = response);
            response.forEach(r => {
                let row = document.createElement('tr');
                let celda1 = document.createElement('td');
                celda1.innerHTML = r.id;
                row.appendChild(celda1);
                let celda2 = document.createElement('td');
                celda2.innerHTML = r.receiptDate;
                row.appendChild(celda2);
                let celdaOperacion = document.createElement('td');
                sales.forEach(sale => {
                    if (sale.receipt.id == r.id) {
                        celdaOperacion.innerHTML = 'Venta'
                    }
                })
                purchases.forEach(purchase => {
                    if (purchase.receipt.id == r.id) {
                        celdaOperacion.innerHTML = 'Compra'
                    }
                })
                row.appendChild(celdaOperacion)
                let celda3 = document.createElement('td');
                celda3.innerHTML = r.discounts;
                row.appendChild(celda3);
                let celda4 = document.createElement('td');
                celda4.innerHTML = r.subtotal;
                row.appendChild(celda4);
                let celda5 = document.createElement('td');
                celda5.innerHTML = r.iva;
                row.appendChild(celda5);
                let celda6 = document.createElement('td');
                celda6.innerHTML = r.total;
                row.appendChild(celda6);
                tblBody.appendChild(row);
                row.addEventListener("click", () => {
                    let id = r.id;
                    location.href = 'receipts.html?id=' + id;
                });
                table.appendChild(tblBody);
                table.appendChild(tblBody);
            });


        })

}

function filterTableReceipts() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableAllReceipts");
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

async function generateReport() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get('id')
    let url = 'http://localhost:8080/api/v1/sales';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    let check = false;
    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => {
            response.forEach(async sale => {
                if (sale.receipt.id == id) {
                    check = true;
                    let urlReport = 'http://localhost:8080/api/v1/reports/receipt/' + id;
                    let getInitReport = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/text'
                        }
                    }
                    await fetch(urlReport, getInitReport)
                        .then(response => {
                            if (response.ok) {
                                response.text()
                                    .then(response => {
                                        let mostrarInforme = document.getElementById("mostrarInforme")
                                        mostrarInforme.setAttribute('src', '../../Reports/' + response + '.pdf')
                                        console.log(response)
                                    })
                            }
                        });
                }
            })
        if (!check) {
            document.getElementById('debug').innerHTML = 'No se puede hacer facturas de compras';
            
        }
        })
}