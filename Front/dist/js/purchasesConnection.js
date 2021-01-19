
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
                final = response.length-20;
            } else {
                final = 0;
            }
            
            for (let i = response.length-1; i >= final; i--) {
                let a = document.createElement('a');
                let urlSupplier = 'purchasesOperation.html?id=' + response[i].id + '&idSupplier=' + response[i].supplier;
                a.setAttribute('href', urlSupplier);

                let li = document.createElement('li');

                let ii = document.createElement('i');
                ii.setAttribute('class', 'fas fa-clipboard mr-2');
                li.appendChild(ii);

                li.innerHTML = li.innerHTML + ' ' + response[i].id + ' - ' + response[i].receipt.receiptDate;

                a.appendChild(li);

                document.getElementById('lastSupplierList').appendChild(a);
            }
        })
}

async function loadPurchase() {
    const querystring = location.search;
    const params = new URLSearchParams(querystring)
    let id = params.get('id')
    let idSupplier = params.get('idSupplier');
    if (id == undefined) id = 1;
    if (idSupplier == undefined) idSupplier = 1;
    let urlSupplier = 'http://localhost:8080/api/v1/supplier/' + idSupplier;
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    let supplierName = await fetch(urlSupplier, getInit)
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
            return response.fullName;
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
            button.setAttribute('href', 'allreceipts.html?id=' + response.receipt.id + '&date=' + response.receipt.receiptDate)

            let idPersonal = document.getElementById('idStaff')
            idPersonal.innerHTML = idPersonal.innerHTML + response.staff.idStaff;
            let nameStaff = document.getElementById('nameStaff')
            nameStaff.innerHTML = nameStaff.innerHTML + response.staff.name;
            let possitionStaff = document.getElementById('possitionStaff')
            possitionStaff.innerHTML = possitionStaff.innerHTML + response.staff.positionStaff.name;
            let emailStaff = document.getElementById('emailStaff')
            emailStaff.innerHTML = emailStaff.innerHTML + response.staff.email;
            let buttonStaff = document.getElementById('enlaceStaff')
            buttonStaff.setAttribute('href', 'staff.html?id=' + response.staff.idStaff)


            let tBody = document.getElementById('products')
            response.purchaseLines.forEach(line => {
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
            let tableDeleteBody = document.getElementById('deleteTablePurchase')
            let trDelete = document.createElement('tr')
            let celda1 = document.createElement('td')
            celda1.innerHTML = response.id
            let celda2 = document.createElement('td')
            celda2.innerHTML = supplierName
            let celda3 = document.createElement('td')
            celda3.innerHTML = response.staff.name
            let celda4 = document.createElement('td')
            celda4.innerHTML = response.receipt.receiptDate
            let celda5 = document.createElement('td')
            celda5.innerHTML = response.receipt.total
            trDelete.appendChild(celda1)
            trDelete.appendChild(celda2)
            trDelete.appendChild(celda3)
            trDelete.appendChild(celda4)
            trDelete.appendChild(celda5)
            tableDeleteBody.appendChild(trDelete)
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
                option.setAttribute('value', c.idStaff);
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
                option.setAttribute('buyPrice', c.buyPrice)
                option.innerHTML = c.name + ' - ' + c.buyPrice + '€';
                select.appendChild(option);
            });
        })
}

function addProductToTheCart() {
    let form = document.getElementById('formPurchase');
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
    let button3 = document.getElementById('addPurchase');
    button3.addEventListener('click', () => {
        addPurchase();

    })
    let button4 = document.getElementById('deletePurchase');
    button4.addEventListener('click', () => {
        deletePurchase();
    })
}

function createProduct() {
    let select = document.getElementById('productName')
    let quantity = document.getElementById('countSell')
    let table = document.getElementById('productPurchase')
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
    tr.setAttribute('id', select.value)
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

async function allPurchasesLoad() {
    let url = 'http://localhost:8080/api/v1/purchases';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    let body = document.getElementById('bodyAllPurchasesTable');
    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => {
            response.forEach(async purchase => {
                let row = document.createElement('tr');

                let celda1 = document.createElement('td');
                celda1.innerHTML = purchase.id;
                row.appendChild(celda1);
                celda1.addEventListener("click", () => {
                    let id = purchase.id;
                    location.href = 'purchases.html?id=' + id;
                });

                let celda2 = document.createElement('td');
                celda2.innerHTML = await giveMeSupplierName(purchase.supplier); //Habría que sacar el nombre del proveedor
                row.appendChild(celda2);
                celda2.addEventListener("click", () => {
                    let id = purchase.supplier;;
                    location.href = 'suppliers.html?id=' + id;
                });

                let celda3 = document.createElement('td');
                celda3.innerHTML = purchase.staff.name;
                row.appendChild(celda3);
                celda3.addEventListener("click", () => {
                    let id = purchase.staff.idStaff;
                    location.href = 'staff.html?id=' + id;
                });

                let celda4 = document.createElement('td');
                celda4.innerHTML = purchase.receipt.receiptDate;
                row.appendChild(celda4);
                celda4.addEventListener("click", () => {
                    let id = purchase.receipt.id;
                    location.href = 'receipts.html?id=' + id;
                });

                let celda5 = document.createElement('td');
                celda5.innerHTML = purchase.receipt.total;
                row.appendChild(celda5);

                let celda7 = document.createElement('td');
                let select = document.createElement('select')
                select.setAttribute('class', 'browser-default custom-select bg-dark text-white')
                celda7.appendChild(select)
                purchase.purchaseLines.forEach(line => {
                    let hijoSelect = document.createElement('option')
                    hijoSelect.innerHTML = line.idProduct.name + ' - ' + line.quantity + '<br>';
                    select.appendChild(hijoSelect)
                    hijoSelect.addEventListener("click", () => {
                        let id = line.idProduct.id;
                        location.href = 'product.html?id=' + id;
                    });
                });
                row.appendChild(celda7);

                body.appendChild(row);
                
            });
        })
}

async function giveMeSupplierName(id) {
    let url = 'http://localhost:8080/api/v1/supplier/' + id;
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    return await fetch(url, getInit)
        .then(response => response.json())
        .then(response => {
            return response.fullName;
        })
}

async function addPurchase() {
    let supplier = document.getElementById('supplierForPurchase');
    let staffId = document.getElementById('personalName');
    let current = new Date();
    let fecha = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate() + ' ' + current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();
    let subtotal = document.getElementById('subtotal');
    let descuento = document.getElementById('discount');
    let iva = document.getElementById('iva');
    let total = document.getElementById('total');
    let tablaProductos = document.getElementById('productPurchase')

    let urlStaff = 'http://localhost:8080/api/v1/staffs/' + staffId.value;
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    let purchaseLines = [];

    let hijos = tablaProductos.getElementsByTagName('tr')

    for (let index = 0; index < hijos.length; index++) {
        let producto = hijos[index];
        await cargarProductos(producto, purchaseLines);
    }

    let staff;

    await fetch(urlStaff, getInit)
        .then(response => response.json())
        .then(response => staff = response)

    let data = {
        supplier: supplier.value,
        staff: staff,
        receipt: {
            receiptDate: fecha,
            discounts: descuento.value,
            subtotal: subtotal.value,
            iva: iva.value,
            total: total.value
        },
        purchaseLines: purchaseLines
    }

    let url = 'http://localhost:8080/api/v1/purchases';
    let postInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }

    await fetch(url, postInit)
        .then(response => {
            if (response.ok) {
                crearCompra(purchaseLines);
            }
        })

    location.href = 'purchasesOperation.html'
}

async function cargarProductos(producto, purchaseLines) {
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    let urlProduct = 'http://localhost:8080/api/v1/products/' + producto.getAttribute('id');
    let product;
    await fetch(urlProduct, getInit)
        .then(response => response.json())
        .then(response => product = response)

    purchaseLines.push({
        idProduct: product,
        quantity: producto.lastChild.innerHTML
    })
}

async function crearCompra(purchaseLines) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    purchaseLines.forEach(async product => {
        let url = 'http://localhost:8080/api/v1/products/' + product.idProduct.id;
        let getInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        let body;
        let suma;
        await fetch(url, getInit)
            .then(response => response.json())
            .then(response => {
                suma = response.stock;
            })
        let sumaValue = Number(suma)
        let quantityValue = Number(product.quantity)
        suma = sumaValue + quantityValue;
        body = { stock: suma }
        console.log(body)
        let postInit = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        }
        await fetch(url, postInit)
            .then(response => {
                if (response.ok) { console.log('ok') }
            })
    })
    await delay(500)
    location.href = 'purchasesOperation.html'
}

function filterTablePurchases() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("allPurchasesTable");
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

    async function deletePurchase() {
        const querystring = location.search;
        const params = new URLSearchParams(querystring)
        let id = params.get('id')
        if (id == undefined) id = 1
        let url = 'http://localhost:8080/api/v1/purchases/' + id;
        let deleteInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }

        await fetch(url, deleteInit)
            .then(response => console.log(response))

        location.href = 'purchasesOperation.html';
}