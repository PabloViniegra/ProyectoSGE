let idProduct;

async function loadPurchasesList() {
    let url = 'http://localhost:8080/api/v1/purchases'
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
                let urlSupplier = 'purchases.html?id=' + response[i].id + '&idSupplier=' + response[i].supplier;
                a.setAttribute('href', urlSupplier);

                let li = document.createElement('li');

                let ii = document.createElement('i');
                ii.setAttribute('class', 'fas fa-clipboard mr-2');
                li.appendChild(ii);

                li.innerHTML = li.innerHTML + ' ' + response[i].id + ' - ' + response[i].receipt.receiptDate;

                a.appendChild(li);

                document.getElementById('LastSuppliersListList').appendChild(a);
            }
        })
}

async function loadPurchase() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get('id')
    let idSupplier = params.get('idSupplier');
    if (id == undefined) id = 1
    if (idSupplier == undefined) idSupplier = 1;
    let urlSupplier = 'http://localhost:8080/api/v1/supplier/' + idSupplier;
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    await fetch(urlSupplier, getInit)
        .then(response => response.json())
        .then(response => {
            let name = document.getElementById('NombreProveedor')
            name.innerHTML = name.innerHTML + response.fullName;
            let dni = document.getElementById('DniProveedor')
            dni.innerHTML = dni.innerHTML + response.dni;
            let email = document.getElementById('EmailProveedor')
            email.innerHTML = email.innerHTML + response.email;
            let tele = document.getElementById('TelefonoProveedor')
            tele.innerHTML = tele.innerHTML + response.telephones[0].number;
            let dire = document.getElementById('DireccionProveedor')
            dire.innerHTML = dire.innerHTML + response.directions[0].direction;
            let button = document.getElementById('EnlaceProveedor')
            button.setAttribute('href', 'suppliers.html?id=' + idSupplier)
        })
    let urlPurchase = 'http://localhost:8080/api/v1/purchases/' + id;
    await fetch(urlPurchase, getInit)
        .then(response => response.json())
        .then(response => {
            console.log(response)

            let discount = document.getElementById('descuentoCompra')
            discount.innerHTML = discount.innerHTML + response.receipt.discounts;
            let iva = document.getElementById('ivaCompra')
            iva.innerHTML = iva.innerHTML + response.receipt.iva + '%';
            let subtotal = document.getElementById('subtotalCompra')
            subtotal.innerHTML = subtotal.innerHTML + response.receipt.subtotal;
            let total = document.getElementById('totalCompra')
            total.innerHTML = total.innerHTML + response.receipt.total;
            let date = document.getElementById('fechaCompra')
            date.innerHTML = date.innerHTML + response.receipt.receiptDate;
            let button = document.getElementById('enlaceRecibo')
            button.setAttribute('href', 'receipts.html?id=' + idSupplier)

            let idPersonal = document.getElementById('idStaff')
            idPersonal.innerHTML = idPersonal.innerHTML + response.staff.idStaff;
            let nameStaff = document.getElementById('nameStaff')
            nameStaff.innerHTML = nameStaff.innerHTML + response.staff.name;
            let possitionStaff = document.getElementById('possitionStaff')
            possitionStaff.innerHTML = possitionStaff.innerHTML + response.staff.positionStaff.name;
            let emailStaff = document.getElementById('emailStaff')
            emailStaff.innerHTML = emailStaff.innerHTML + response.staff.email;

            let tBody = document.getElementById('products')
            response.purchaseLines.forEach(line => {

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
        .then(response => {
            let select = document.getElementById('supplierForPurchase');
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
                option.setAttribute("buyPrice", c.buyPrice)
                option.innerHTML = c.name;
                select.appendChild(option);
            });
        })

}

function addProductToTheCart() {
    let form = document.getElementById('formAdd');
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
    let quantity = document.getElementById('countPurchase')
    let table = document.getElementById('productPurchase')
    let subtotal = document.getElementById('subTotalPurchase')
    let count = document.getElementById('countPurchase')
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
    let optionnValue = Number(select.options[select.selectedIndex].getAttribute('buyPrice'))
    let actualValue = Number(subtotal.value)
    let countQuantity = Number(count.value)
    subtotal.value = actualValue + (optionnValue * countQuantity);
    let ivaValue = Number(iva.value);
    total.value = (actualValue + (optionnValue * countQuantity)) * ((ivaValue / 100) + 1)
}

function applyDiscount() {
    let subtotal = document.getElementById('subTotalPurchase')
    let discount = document.getElementById('discount')
    let total = document.getElementById('total')
    let iva = document.getElementById('iva')
    let discountValue = Number(discount.value)
    let actualValue = Number(subtotal.value)
    let ivaValue = Number(iva.value);
    let total2 = actualValue * ((ivaValue / 100) + 1)
    total.value = total2 - (total2 * (discountValue / 100))
}

/*
async function getInfoFromProduct() {
    let url = 'http://localhost:8080/api/v1/products/' + idProduct;
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
            let precioSinIva = response.sellPrice;
            precioSinIva.innerHTML = precioSinIva.innerHTML
            let subtotal = document.getElementById("subTotalPurchase")
            let precioConIva = precioSinIva * 1.21;
            let totalCompra = precioConIva * document.getElementById("countPurchase").value;
            totalCompra.innerHTML = totalCompra.innerHTML + totalCompra
            subtotal.innerHTML = precioSinIva * document.getElementById("countPurchase").value;
            let total = document.getElementById("totalPurchase")
            total.innerHTML = totalCompra
        })
}*/
