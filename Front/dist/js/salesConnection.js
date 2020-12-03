async function loadSalesList() {
    let url = 'http://localhost:8080/api/v1/sales'
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
                final = 20;
            } else {
                final = response.length;
            }
            for (let i = 0; i < final; i++) {
                let a = document.createElement('a');
                let urlClient = 'salesOperation.html?id=' + response[i].id + '&idClient=' + response[i].client;
                a.setAttribute('href', urlClient);

                let li = document.createElement('li');

                let ii = document.createElement('i');
                ii.setAttribute('class', 'fas fa-clipboard mr-2');
                li.appendChild(ii);

                li.innerHTML = li.innerHTML + ' ' + response[i].id + ' - ' + response[i].receipt.receiptDate;

                a.appendChild(li);

                document.getElementById('LastClientList').appendChild(a);
            }
        })
}

async function loadSale() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get('id')
    let idClient = params.get('idClient');
    if (id == undefined) id = 1
    if (idClient == undefined) idClient = 1;
    let urlCliente = 'http://localhost:8080/api/v1/clients/' + idClient;
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    await fetch(urlCliente, getInit)
        .then(response => response.json())
        .then(response => {
            let name = document.getElementById('NombreCliente')
            name.innerHTML = name.innerHTML + response.fullName;
            let dni = document.getElementById('DniCliente')
            dni.innerHTML = dni.innerHTML + response.dni;
            let email = document.getElementById('EmailCliente')
            email.innerHTML = email.innerHTML + response.email;
            let iban = document.getElementById('IbanCliente')
            iban.innerHTML = iban.innerHTML + response.iban;
            let tele = document.getElementById('TelefonoCliente')
            tele.innerHTML = tele.innerHTML + response.telephones[0].number;
            let dire = document.getElementById('DireccionCliente')
            dire.innerHTML = dire.innerHTML + response.directions[0].direction;
            let button = document.getElementById('EnlaceCliente')
            button.setAttribute('href', 'clients.html?id=' + idClient)
        })
    let urlSale = 'http://localhost:8080/api/v1/sales/' + id;
    await fetch(urlSale, getInit)
        .then(response => response.json())
        .then(response => {
            console.log(response)

            let discount = document.getElementById('descuentoVenta')
            discount.innerHTML = discount.innerHTML + response.receipt.discounts;
            let iva = document.getElementById('ivaVenta')
            iva.innerHTML = iva.innerHTML + response.receipt.iva + '%';
            let subtotal = document.getElementById('subtotalVenta')
            subtotal.innerHTML = subtotal.innerHTML + response.receipt.subtotal;
            let total = document.getElementById('totalVenta')
            total.innerHTML = total.innerHTML + response.receipt.total;
            let date = document.getElementById('fechaVenta')
            date.innerHTML = date.innerHTML + response.receipt.receiptDate;
            let button = document.getElementById('enlaceRecibo')
            button.setAttribute('href', 'receipts.html?id=' + idClient)

            let idPersonal = document.getElementById('idStaff')
            idPersonal.innerHTML = idPersonal.innerHTML + response.staff.idStaff;
            let nameStaff = document.getElementById('nameStaff')
            nameStaff.innerHTML = nameStaff.innerHTML + response.staff.name;
            let possitionStaff = document.getElementById('possitionStaff')
            possitionStaff.innerHTML = possitionStaff.innerHTML + response.staff.positionStaff.name;
            let emailStaff = document.getElementById('emailStaff')
            emailStaff.innerHTML = emailStaff.innerHTML + response.staff.email;

            let tBody = document.getElementById('products')
            response.saleLines.forEach(line => {
                //line.idProduct
                let tr = document.createElement('tr');
                let id = document.createElement('td');
                id.innerHTML = line.idProduct.id;
                tr.appendChild(id);
                let name = document.createElement('td');
                name.innerHTML = line.idProduct.name;
                tr.appendChild(name);
                let description = document.createElement('td');
                description.innerHTML = line.idProduct.description;
                tr.appendChild(description);
                let sellPrice = document.createElement('td');
                sellPrice.innerHTML = line.idProduct.sellPrice;
                tr.appendChild(sellPrice);
                let buyPrice = document.createElement('td');
                buyPrice.innerHTML = line.idProduct.buyPrice;
                tr.appendChild(buyPrice);
                let quantity = document.createElement('td');
                quantity.innerHTML = line.quantity;
                tr.appendChild(quantity);
                let type = document.createElement('td');
                type.innerHTML = line.idProduct.type;
                tr.appendChild(type);
                tBody.appendChild(tr)
            });
        })
}

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
        .then(response => {
            let select = document.getElementById('clienteForSale');
            response.forEach(c => {
                let option = document.createElement('option');
                option.setAttribute('value', c.id);
                option.innerHTML = c.fullName;
                select.appendChild(option);
            });
        })
}

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
        .then(response => {
            let select = document.getElementById('personalName');
            response.forEach(c => {
                let option = document.createElement('option');
                option.setAttribute('value', c.id);
                option.innerHTML = c.name;
                select.appendChild(option);
            });
        })
}

async function getAllProductsInaSelected() {
    let url = 'http://localhost:8080/api/v1/products';
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
            let select = document.getElementById('productName');
            response.forEach(c => {
                let option = document.createElement('option');
                option.setAttribute('value', c.id);
                option.setAttribute("sellPrice", c.sellPrice)
                option.innerHTML = c.name + " - " + c.sellPrice + "€";
                select.appendChild(option);
            });
        })
}

function addProductToTheCart() {
    let form = document.getElementById('formSale');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    let button1 = document.getElementById('addProduct');
    button1.addEventListener('click', () => {
        createProduct();
    })
    let button2 = document.getElementById('applyDiscount');
    button2.addEventListener('click', () => {
        applyDiscount();
    })
}

function createProduct() {
    let select = document.getElementById('productName')
    let quantity = document.getElementById('countSell')
    let table = document.getElementById('productSale')
    let subtotal = document.getElementById('subtotal')
    let count = document.getElementById('countSell')
    let total = document.getElementById('total')
    let iva = document.getElementById('iva')
    let tr = document.createElement('tr')
    let td1 = document.createElement('td')
    td1.innerHTML = select.options[select.selectedIndex].text;
    tr.appendChild(td1);
    let td2 = document.createElement('td')
    td2.innerHTML = quantity.value;
    tr.appendChild(td2);
    table.appendChild(tr);
    let optionnValue = Number(select.options[select.selectedIndex].getAttribute('sellPrice'))
    let actualValue = Number(subtotal.value)
    let countQuantity = Number(count.value)
    subtotal.value = actualValue + (optionnValue * countQuantity);
    let ivaValue = Number(iva.value);
    total.value = (actualValue + (optionnValue * countQuantity)) * ((ivaValue / 100) + 1)
}

function applyDiscount() {
    let subtotal = document.getElementById('subtotal')
    let discount = document.getElementById('discount')
    let total = document.getElementById('total')
    let iva = document.getElementById('iva')
    let discountValue = Number(discount.value)
    let actualValue = Number(subtotal.value)
    let ivaValue = Number(iva.value);
    let total2 = actualValue * ((ivaValue / 100) + 1)
    total.value = total2 - (total2 * (discountValue / 100))
}