package net.juanxxiii.rest.controller;

import net.juanxxiii.db.entity.*;
import net.juanxxiii.dto.JasperSales;
import net.juanxxiii.reportService.ReportService;
import net.juanxxiii.services.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class Controller {

    private final QueryService queryService;
    private final ReportService reportService;

    @Autowired
    public Controller(QueryService queryService, ReportService reportService) {
        this.queryService = queryService;
        this.reportService = reportService;
    }

    //Client Mapping
    @PostMapping("/clients")
    public ResponseEntity<?> newClient(@RequestBody Client newClient) {
        Client client = queryService.saveClient(newClient);
        if (client != null) {
            return ResponseEntity.ok(client);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/clients")
    public ResponseEntity<List<Client>> getClientList() {
        return ResponseEntity.ok(queryService.getClientList());
    }

    @GetMapping("/clients/{id}")
    public ResponseEntity<?> getClient(@PathVariable("id") int id) {
        Client client = queryService.getClient(id);
        if (client != null) {
            return ResponseEntity.ok(client);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/clients/{id}")
    public ResponseEntity<?> updateClient(@RequestBody Client newClient, @PathVariable("id") int id) {
        int client = queryService.updateClient(newClient, id);
        if (client != -1) {
            return ResponseEntity.ok("Client updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/clients/{id}")
    public ResponseEntity<?> partialUpdateClient(@RequestBody Client client, @PathVariable("id") int id) {
        int value = queryService.partialUpdateClient(client, id);
        if (value != -1) {
            return ResponseEntity.ok("Client partially updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/clients/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable("id") int id) {
        queryService.deleteClient(id);
        return ResponseEntity.ok("Client deleted");
    }

    //Supplier Mapping
    @PostMapping("/supplier")
    public ResponseEntity<Supplier> newSupplier(@RequestBody Supplier newSupplier) {
        Supplier supplier = queryService.saveSupplier(newSupplier);
        if (supplier != null) {
            return ResponseEntity.ok(supplier);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/supplier")
    public ResponseEntity<List<Supplier>> getSupplierList() {
        return ResponseEntity.ok(queryService.getSupplierList());
    }

    @GetMapping("/supplier/{id}")
    public ResponseEntity<?> getSupplier(@PathVariable("id") int id) {
        Supplier supplier = queryService.getSupplier(id);
        if (supplier != null) {
            return ResponseEntity.ok(supplier);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/supplier/{id}")
    public ResponseEntity<?> updateSupplier(@RequestBody Supplier newSupplier, @PathVariable("id") int id) {
        int supplier = queryService.updateSupplier(newSupplier, id);
        if (supplier != -1) {
            return ResponseEntity.ok("Supplier updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/supplier/{id}")
    public ResponseEntity<?> partialUpdateSupplier(@RequestBody Supplier supplier, @PathVariable("id") int id) {
        int value = queryService.partialUpdateSupplier(supplier, id);
        if (value != -1) {
            return ResponseEntity.ok("Supplier partially updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/supplier/{id}")
    public ResponseEntity<?> deleteSupplier(@PathVariable("id") int id) {
        queryService.deleteSupplier(id);
        return ResponseEntity.ok("Supplier deleted");
    }


    //Staff Mapping
    @PostMapping("/staffs")
    public ResponseEntity<Staff> newStaff(@RequestBody Staff staff) {
        return ResponseEntity.ok(queryService.saveStaff(staff));
    }

    @GetMapping("/staffs")
    public List<Staff> getAllStaff() {
        return queryService.getAllStaff();
    }

    @GetMapping("/staffs/{id}")
    public Staff getStaff(@PathVariable("id") int id) {
        return queryService.getStaff(id);
    }

    @PutMapping("/staffs/{id}")
    public ResponseEntity<?> updateStaff(@RequestBody Staff staff, @PathVariable int id) {
        int value = queryService.updateStaff(staff, id);
        if (value != -1) {
            return ResponseEntity.ok("staff updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/staffs/{id}")
    public ResponseEntity<?> partialUpdateStaff(@RequestBody Staff staff, @PathVariable int id) {
        int value = queryService.partialUpdateStaff(staff, id);
        if (value != -1) {
            return ResponseEntity.ok("staff updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/staffs/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable("id") int id) {
        queryService.deleteStaff(id);
        return ResponseEntity.ok("Staff deleted");
    }

    //Product Mapping
    @PostMapping("/products")
    public ResponseEntity<?> newProduct(@RequestBody Product newProduct) {
        Product product = queryService.saveProduct(newProduct);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProductList() {
        return ResponseEntity.ok(queryService.getProducts());
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProduct(@PathVariable("id") int id) {
        Product product = queryService.getProduct(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/lastproducts")
    public ResponseEntity<List<Product>> getTwentyLastProducts() {
        return ResponseEntity.ok(queryService.getLastProducts());
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(@RequestBody Product product, @PathVariable int id) {
        int value = queryService.updateProduct(product, id);
        if (value != -1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/products/{id}")
    public ResponseEntity<?> partialUpdateProduct(@RequestBody Product product, @PathVariable int id) {
        int value = queryService.partialUpdateProduct(product, id);
        if (value != -1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") int id) {
        queryService.deleteProduct(id);
        return ResponseEntity.noContent().build();

    }

    //Receipt Mapping
    @PostMapping("/receipts")
    public ResponseEntity<?> newReceipt(@RequestBody Receipt newReceipt) {
        Receipt receipt = queryService.saveReceipt(newReceipt);
        if (receipt != null) {
            return ResponseEntity.ok(receipt);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/receipts")
    public ResponseEntity<List<Receipt>> getReceiptList() {
        return ResponseEntity.ok(queryService.getReceipts());
    }

    @GetMapping("/receipts/{id}")
    public ResponseEntity<?> getReceipt(@PathVariable("id") int id) {
        Receipt receipt = queryService.getReceipt(id);
        if (receipt != null) {
            return ResponseEntity.ok(receipt);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/receipts/{id}")
    public ResponseEntity<?> updateReceipt(@RequestBody Receipt receipt, @PathVariable("id") int id) {
        int value = queryService.updateReceipt(receipt, id);
        if (value != -1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/receipts/{id}")
    public ResponseEntity<?> partialUpdateReceipt(@RequestBody Receipt receipt, @PathVariable("id") int id) {
        int value = queryService.partialUpdateReceipt(receipt, id);
        if (value != -1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/receipts/{id}")
    public ResponseEntity<?> deleteReceipt(@PathVariable("id") int id) {
        queryService.deleteReceipt(id);
        return ResponseEntity.noContent().build();
    }

    //Sale Mapping
    @PostMapping("/sales")
    public ResponseEntity<?> newSale(@RequestBody Sale newSale) {
        Sale sale = queryService.saveSale(newSale);
        if (sale != null) {
            return ResponseEntity.ok(sale);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/sales")
    public ResponseEntity<List<Sale>> getSaleList() {
        return ResponseEntity.ok(queryService.getSaleList());
    }

    @GetMapping("/sales/{id}")
    public ResponseEntity<?> getSale(@PathVariable("id") int id) {
        Sale sale = queryService.getSale(id);
        if (sale != null) {
            return ResponseEntity.ok(sale);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/sales/{id}")
    public ResponseEntity<?> updateSale(@RequestBody Sale newSale, @PathVariable("id") int id) {
        int sale = queryService.updateSale(newSale, id);
        if (sale != -1) {
            return ResponseEntity.ok("Sale updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/sales/{id}")
    public ResponseEntity<?> updatePartialSale(@RequestBody Sale newSale, @PathVariable("id") int id) {
        int sale = queryService.partialUpdateSale(newSale, id);
        if (sale != -1) {
            return ResponseEntity.ok("Sale updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/sales/{id}")
    public ResponseEntity<?> deleteSale(@PathVariable("id") int id) {
        queryService.deleteSale(id);
        return ResponseEntity.ok("Sale deleted");
    }

    //Purchase Mapping
    @PostMapping("/purchases")
    public ResponseEntity<?> newPurchase(@RequestBody Purchase newPurchase) {
        Purchase purchase = queryService.savePurchase(newPurchase);
        if (purchase != null) {
            return ResponseEntity.ok(purchase);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/purchases")
    public ResponseEntity<List<Purchase>> getPurchaseList() {
        return ResponseEntity.ok(queryService.getPurchaseList());
    }

    @GetMapping("/purchases/{id}")
    public ResponseEntity<?> getPurchases(@PathVariable("id") int id) {
        Purchase purchase = queryService.getPurchase(id);
        if (purchase != null) {
            return ResponseEntity.ok(purchase);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/purchases/{id}")
    public ResponseEntity<?> updatePurchase(@RequestBody Purchase newPurchase, @PathVariable("id") int id) {
        int purchase = queryService.updatePurchase(newPurchase, id);
        if (purchase != -1) {
            return ResponseEntity.ok("Purchase updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/purchases/{id}")
    public ResponseEntity<?> updatePartialPurchase(@RequestBody Purchase newPurchase, @PathVariable("id") int id) {
        int purchase = queryService.partialUpdatePurchase(newPurchase, id);
        if (purchase != -1) {
            return ResponseEntity.ok("Purchase updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/purchases/{id}")
    public ResponseEntity<?> deletePurchase(@PathVariable("id") int id) {
        queryService.deletePurchase(id);
        return ResponseEntity.ok("Purchase deleted");
    }

    //Other things
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Staff email) {
        Staff staff = queryService.getStaffByEmail(email.getEmail());
        if (staff != null) {
            return ResponseEntity.ok(staff);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/possitionStaff")
    public List<PositionStaff> getPossitionStaffList() {
        return queryService.getPossitionStaffList();
    }

    //Population Mapping
    @PostMapping("/populations")
    public ResponseEntity<?> newPopulation(@RequestBody Population newPopulation) {
        Population population = queryService.savePopulation(newPopulation);
        if (population != null) {
            return ResponseEntity.ok(population);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Sampling Mapping
    @GetMapping("/sampling")
    public List<Sampling> getSamplingList() {
        return queryService.getAllSampling();
    }

    @GetMapping("/sampling/{id}")
    public ResponseEntity<?> getSampling(@PathVariable("id") int id) {
        Sampling sampling = queryService.getSampling(id);
        if (sampling != null) {
            return ResponseEntity.ok(sampling);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/sampling")
    public ResponseEntity<?> newSampling(@RequestBody Sampling newSampling) {
        Sampling sampling = queryService.saveSampling(newSampling);
        if (sampling != null) {
            return ResponseEntity.ok(sampling);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/sampling/{id}")
    public ResponseEntity<?> updateSampling(@RequestBody Sampling newsampling, @PathVariable("id") int id) {
        int samplingRequest = queryService.updateSampling(newsampling, id);
        if (samplingRequest != -1) {
            return ResponseEntity.ok("Purchase updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/populations")
    public ResponseEntity<List<Population>> getPopulationList() {
        return ResponseEntity.ok(queryService.getPopulations());
    }

    @GetMapping("/populations/{id}")
    public ResponseEntity<?> getPopulation(@PathVariable("id") int id) {
        Population population = queryService.getPopulation(id);
        if (population != null) {
            return ResponseEntity.ok(population);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/sampling/{id}")
    public ResponseEntity<?> deleteSampling(@PathVariable("id") int id) {
        queryService.deleteSampling(id);
        return ResponseEntity.ok("sampling deleted");
    }

    //DetailSampling Mapping
    @GetMapping("/detailsampling")
    public List<DetailSampling> getDetailSamplingList() {
        return queryService.getDetailSamplingList();
    }

    @GetMapping("/detailsampling/{id}")
    public ResponseEntity<?> getDetailSampling(@PathVariable("id") int id) {
        DetailSampling detailSampling = queryService.getDetailSampling(id);
        if (detailSampling != null) {
            return ResponseEntity.ok(detailSampling);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/detailsampling")
    public ResponseEntity<?> newDetailSampling(@RequestBody DetailSampling newDetail) {
        DetailSampling detailSampling = queryService.saveDetailSampling(newDetail);
        if (detailSampling != null) {
            return ResponseEntity.ok(detailSampling);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/populations/{id}")
    public ResponseEntity<?> updatePopulation(@RequestBody Population newPopulation, @PathVariable("id") int id) {
        int population = queryService.updatePopulation(newPopulation, id);
        if (population != -1) {
            return ResponseEntity.ok("Population updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/detailsampling/{id}")
    public ResponseEntity<?> updateDetailSampling(@RequestBody DetailSampling newDetail,
                                                  @PathVariable("id") int id) {
        int request = queryService.updateDetailSampling(newDetail, id);
        if (request != -1) {
            return ResponseEntity.ok("Purchase updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/populations/{id}")
    public ResponseEntity<?> deletePopulation(@PathVariable("id") int id) {
        queryService.deletePopulation(id);
        return ResponseEntity.ok("Population deleted");
    }

    @DeleteMapping("/detailsampling/{id}")
    public ResponseEntity<?> deleteDetailSampling(@PathVariable("id") int id) {
        queryService.deleteDetailSampling(id);
        return ResponseEntity.ok("detail sampling deleted");
    }

    //Production Mapping

    @GetMapping("/production")
    public List<Production> getListProduction() {
        return queryService.getListProduction();
    }

    @GetMapping("/production/{id}")
    public ResponseEntity<?> getProduction(@PathVariable("id") int id) {
        Production production = queryService.getProduction(id);
        if (production != null) {
            return ResponseEntity.ok(production);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/production/process")
    public List<Production> getProductionInProcess() {
        return queryService.getProductionProcessList();
    }

    @PostMapping("/production")
    public ResponseEntity<?> newProdcution(@RequestBody Production newproduction) {
        Production production = queryService.saveProduction(newproduction);
        if (production != null) {
            return ResponseEntity.ok(production);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/production/{id}")
    public ResponseEntity<?> partialUpdateStatus(@RequestBody Production newProduction,
                                                 @PathVariable("id") int id) {
        int request = queryService.updateStatus(newProduction.getStatus(), id);
        if (request != -1) {
            return ResponseEntity.ok("Production order updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/production/{id}")
    public ResponseEntity<?> updateProduction(@RequestBody Production newProduction, @PathVariable("id") int id) {
        int request = queryService.updateProduction(newProduction, id);
        if (request != -1) {
            return ResponseEntity.ok("Production order updated");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/production/{id}")
    public ResponseEntity<?> deleteProduction(@PathVariable("id") int id) {
        queryService.deleteProduction(id);
        return ResponseEntity.ok("production order deleted");
    }


    //Report Mapping
    @GetMapping("/clientReport/{format}")
    public String generateClientReport(@PathVariable("format") String format) {
        return reportService.exportReport(format);
    }

    @GetMapping("/reports/sales/{client}/{dateinit}/{datelast}")
    public String exportReportSales(@PathVariable("client") int client,@PathVariable("dateinit") String dateinit, @PathVariable("datelast") String datelast) {
        List<JasperSales> jasper = queryService.getReportList(client,dateinit,datelast);
        if (jasper != null) {
            return reportService.exportReportSales(jasper);
        } else {
            return "No existe ese cliente";
        }
    }

}



