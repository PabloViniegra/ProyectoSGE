function getSuppliers() {
    var name = "";
    var dni = "";

    fetch('localhost:8080/api/v1/supplier')
        .then(response => response.json())
        .then(json => console.log(json))

}

