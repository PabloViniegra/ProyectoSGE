async function loadAllProducts() {
    let url = 'http://localhost:8080/api/v1/products';
    let getInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    let table = document.getElementById('tableAllProducts');
    let tblBody = document.getElementById('bodyTableProducts');
    await fetch(url, getInit)
        .then(response => response.json())
        .then(response => {
            response.forEach(p => {
                let row = document.createElement('tr');
                let celda1 = document.createElement('td');
                celda1.innerHTML = p.id;
                row.appendChild(celda1);
                let celda2 = document.createElement('td');
                celda2.innerHTML = p.name;
                row.appendChild(celda2);
                let celda3 = document.createElement('td');
                celda3.innerHTML = p.description;
                row.appendChild(celda3);
                let celda4 = document.createElement('td');
                celda4.innerHTML = p.type;
                row.appendChild(celda4);
                let celda5 = document.createElement('td');
                celda5.innerHTML = p.stock;
                row.appendChild(celda5);

                tblBody.appendChild(row);
                row.addEventListener("click", () => {
                    let id = p.id;
                    location.href = 'stockMovements.html?id=' + id;
                });
                table.appendChild(tblBody);
            });


        })

}

function filterTableProducts() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableAllProducts");
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