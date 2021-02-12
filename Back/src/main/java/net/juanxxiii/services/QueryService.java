package net.juanxxiii.services;

import lombok.extern.java.Log;
import net.juanxxiii.db.entity.*;
import net.juanxxiii.db.repository.*;
import net.juanxxiii.dto.JasperPurchases;
import net.juanxxiii.dto.JasperSales;
import net.juanxxiii.dto.JasperStockComposite;
import net.juanxxiii.dto.JasperStockSimple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
@Log
public class QueryService {

    private final ClientRepository clientRepository;
    private final SupplierRepository supplierRepository;
    private final StaffRepository staffRepository;
    private final ClientTelephoneRepository clientTelephoneRepository;
    private final ClientDirectionRepository clientDirectionRepository;
    private final PositionStaffRepository positionStaffRepository;
    private final SaleRepository saleRepository;
    private final SaleLineRepository saleLineRepository;
    private final ProductRepository productRepository;
    private final ReceiptRepository receiptRepository;
    private final PurchaseRepository purchaseRepository;
    private final PurchaseLineRepository purchaseLineRepository;
    private final SupplierTelephoneRepository supplierTelephoneRepository;
    private final SupplierDirectionRepository supplierDirectionRepository;
    private final PopulationRepository populationRepository;
    private final SamplingRepository samplingRepository;
    private final DetailSamplingRepository detailSamplingRepository;
    private final ProductionRepository productionRepository;


    @Autowired
    public QueryService(ClientRepository clientRepository,
                        SupplierRepository supplierRepository,
                        StaffRepository staffRepository,
                        ClientTelephoneRepository clientTelephoneRepository,
                        ClientDirectionRepository clientDirectionRepository,
                        PositionStaffRepository positionStaffRepository,
                        SaleRepository saleRepository,
                        SaleLineRepository saleLineRepository,
                        ProductRepository productRepository,
                        ReceiptRepository receiptRepository,
                        SupplierTelephoneRepository supplierTelephoneRepository,
                        SupplierDirectionRepository supplierDirectionRepository,
                        PurchaseRepository purchaseRepository,
                        PurchaseLineRepository purchaseLineRepository,
                        PopulationRepository populationRepository,
                        SamplingRepository samplingRepository,
                        DetailSamplingRepository detailSamplingRepository,
                        ProductionRepository productionRepository) {
        this.clientRepository = clientRepository;
        this.supplierRepository = supplierRepository;
        this.staffRepository = staffRepository;
        this.clientTelephoneRepository = clientTelephoneRepository;
        this.clientDirectionRepository = clientDirectionRepository;
        this.positionStaffRepository = positionStaffRepository;
        this.saleRepository = saleRepository;
        this.saleLineRepository = saleLineRepository;
        this.productRepository = productRepository;
        this.receiptRepository = receiptRepository;
        this.supplierTelephoneRepository = supplierTelephoneRepository;
        this.supplierDirectionRepository = supplierDirectionRepository;
        this.purchaseRepository = purchaseRepository;
        this.purchaseLineRepository = purchaseLineRepository;
        this.populationRepository = populationRepository;
        this.samplingRepository = samplingRepository;
        this.detailSamplingRepository = detailSamplingRepository;
        this.productionRepository = productionRepository;
    }

    //Client queryList
    @Transactional
    public Client saveClient(Client newClient) {
        List<ClientTelephone> telephones = null;
        List<ClientDirection> directions = null;
        List<Sale> sales = null;
        if (!newClient.getTelephones().isEmpty()) {
            telephones = newClient.getTelephones();
            newClient.setTelephones(null);
        }
        if (!newClient.getDirections().isEmpty()) {
            directions = newClient.getDirections();
            newClient.setDirections(null);
        }
        if (!newClient.getSales().isEmpty()) {
            sales = newClient.getSales();
            newClient.setSales(null);
        }
        if (newClient.getPopulation() != null) {
            Population population = populationRepository.findById(newClient.getPopulation().getIdPopulation()).orElse(savePopulation(newClient.getPopulation()));
            newClient.setPopulation(population);
        }
        clientRepository.save(newClient);
        int id = clientRepository.lastId();
        if (telephones != null) {
            telephones.forEach(telephone -> {
                telephone.setClient(id);
                clientTelephoneRepository.save(telephone);
            });
        }
        if (directions != null) {
            directions.forEach(direction -> {
                direction.setClient(id);
                clientDirectionRepository.save(direction);
            });
        }
        if (sales != null) {
            sales.forEach(sale -> {
                sale.setClient(id);
                saveSale(sale);
            });
        }
        return clientRepository.findById(id).orElse(null);
    }

    public List<Client> getClientList() {
        return clientRepository
                .findAll();
    }

    public Client getClient(int id) {
        return clientRepository
                .findById(id)
                .orElse(null);
    }

    public int updateClient(Client newClient, int id) {
        return clientRepository.findById(id)
                .map(client -> {
                    List<ClientTelephone> telephones = client.getTelephones();
                    List<ClientDirection> directions = client.getDirections();
                    List<Sale> sales = client.getSales();
                    newClient.getTelephones()
                            .forEach(telephone -> {
                                if (!telephones.contains(telephone)) {
                                    telephone.setClient(client.getId());
                                    clientTelephoneRepository.save(telephone);
                                }
                            });
                    telephones.forEach(telephone -> {
                        if (!newClient.getTelephones().contains(telephone)) {
                            clientTelephoneRepository.deleteById(telephone.getId());
                        }
                    });
                    newClient.getDirections()
                            .forEach(direction -> {
                                if (!directions.contains(direction)) {
                                    direction.setClient(client.getId());
                                    clientDirectionRepository.save(direction);
                                }
                            });
                    directions.forEach(direction -> {
                        if (!newClient.getDirections().contains(direction)) {
                            clientDirectionRepository.deleteById(direction.getId());
                        }
                    });
                    newClient.getSales()
                            .forEach(sale -> {
                                if (!sales.contains(sale)) {
                                    sale.setClient(client.getId());
                                    saveSale(sale);
                                }
                            });
                    sales.forEach(sale -> {
                        if (!newClient.getSales().contains(sale)) {
                            deleteSale(sale.getId());
                        }
                    });
                    if (!client.getPopulation().equals(newClient.getPopulation())) {
                        Population population = populationRepository.findById(newClient.getPopulation().getIdPopulation()).orElse(savePopulation(newClient.getPopulation()));
                        clientRepository.updatePopulation(population.getIdPopulation(), id);
                    }
                    return clientRepository.updateClient(newClient.getFullName(), newClient.getDni(), newClient.getEmail(), newClient.getIban(), id);
                })
                .orElse(-1);
    }

    public int partialUpdateClient(Client newClient, int id) {
        return clientRepository.findById(id)
                .map(client -> {
                    if (newClient.getFullName() != null) {
                        clientRepository.updateClientName(newClient.getFullName(), id);
                    }
                    if (newClient.getDni() != null) {
                        clientRepository.updateClientDni(newClient.getDni(), id);
                    }
                    if (newClient.getIban() != null) {
                        clientRepository.updateClientIban(newClient.getIban(), id);
                    }
                    if (newClient.getEmail() != null) {
                        clientRepository.updateClientEmail(newClient.getEmail(), id);
                    }
                    if (newClient.getTelephones() != null) {
                        newClient.getTelephones().forEach(clientTelephone -> {
                            if (!client.getTelephones().contains(clientTelephone)) {
                                clientTelephone.setClient(client.getId());
                                clientTelephoneRepository.save(clientTelephone);
                            }
                        });
                        client.getTelephones().forEach(telephone -> {
                            if (!newClient.getTelephones().contains(telephone)) {
                                clientTelephoneRepository.deleteById(telephone.getId());
                            }
                        });
                    }
                    if (newClient.getDirections() != null) {
                        newClient.getDirections().forEach(clientDirection -> {
                            if (!client.getDirections().contains(clientDirection)) {
                                clientDirection.setClient(client.getId());
                                clientDirectionRepository.save(clientDirection);
                            }
                        });
                        client.getDirections().forEach(direction -> {
                            if (!newClient.getDirections().contains(direction)) {
                                clientDirectionRepository.deleteById(direction.getId());
                            }
                        });
                    }
                    if (newClient.getSales() != null) {
                        newClient.getSales()
                                .forEach(sale -> {
                                    if (!client.getSales().contains(sale)) {
                                        sale.setClient(client.getId());
                                        saveSale(sale);
                                    }
                                });
                        client.getSales().forEach(sale -> {
                            if (!newClient.getSales().contains(sale)) {
                                deleteSale(sale.getId());
                            }
                        });
                    }
                    return 1;
                })
                .orElse(-1);
    }

    public void deleteClient(int id) {
        clientRepository
                .delete(Objects
                        .requireNonNull(clientRepository
                                .findById(id)
                                .orElse(null)));
    }

    //Supplier queryList
    public Supplier saveSupplier(Supplier newSupplier) {
        List<SupplierTelephone> telephones = null;
        List<SupplierDirection> directions = null;
        List<Purchase> purchases = null;
        if (!newSupplier.getTelephones().isEmpty()) {
            telephones = newSupplier.getTelephones();
            newSupplier.setTelephones(null);
        }
        if (!newSupplier.getDirections().isEmpty()) {
            directions = newSupplier.getDirections();
            newSupplier.setDirections(null);
        }
        if (!newSupplier.getPurchases().isEmpty()) {
            purchases = newSupplier.getPurchases();
            newSupplier.setPurchases(null);
        }
        supplierRepository.save(newSupplier);
        int id = supplierRepository.lastId();
        if (telephones != null) {
            telephones.forEach(telephone -> {
                telephone.setSupplier(id);
                supplierTelephoneRepository.save(telephone);
            });
        }
        if (directions != null) {
            directions.forEach(direction -> {
                direction.setSupplier(id);
                supplierDirectionRepository.save(direction);
            });
        }
        if (purchases != null) {
            purchases.forEach(purchase -> {
                purchase.setSupplier(id);
                savePurchase(purchase);
            });
        }
        return supplierRepository.findById(id).orElse(null);
    }

    public List<Supplier> getSupplierList() {
        return supplierRepository
                .findAll();
    }

    public Supplier getSupplier(int id) {
        return supplierRepository
                .findById(id)
                .orElse(null);
    }

    public int updateSupplier(Supplier newSupplier, int id) {
        return supplierRepository.findById(id)
                .map(supplier -> {
                    List<SupplierTelephone> telephones = supplier.getTelephones();
                    List<SupplierDirection> directions = supplier.getDirections();
                    List<Purchase> purchases = supplier.getPurchases();
                    newSupplier.getTelephones()
                            .forEach(telephone -> {
                                if (!telephones.contains(telephone)) {
                                    telephone.setSupplier(supplier.getId());
                                    supplierTelephoneRepository.save(telephone);
                                }
                            });
                    telephones.forEach(telephone -> {
                        if (!newSupplier.getTelephones().contains(telephone)) {
                            supplierTelephoneRepository.deleteById(telephone.getId());
                        }
                    });
                    newSupplier.getDirections()
                            .forEach(direction -> {
                                if (!directions.contains(direction)) {
                                    direction.setSupplier(supplier.getId());
                                    supplierDirectionRepository.save(direction);
                                }
                            });
                    directions.forEach(sale -> {
                        if (!newSupplier.getDirections().contains(directions)) {
                            supplierDirectionRepository.deleteById(sale.getId());
                        }
                    });
                    newSupplier.getPurchases()
                            .forEach(purchase -> {
                                if (!purchases.contains(purchase)) {
                                    purchaseRepository.save(purchase);
                                }
                            });
                    purchases.forEach(purchase -> {
                        if (!newSupplier.getPurchases().contains(purchase)) {
                            purchase.setSupplier(supplier.getId());
                            purchaseRepository.deleteById(purchase.getId());
                        }
                    });
                    return supplierRepository.updateSupplier(newSupplier.getFullName(), newSupplier.getDni(), newSupplier.getEmail(), newSupplier.getId());
                })
                .orElse(-1);
    }

    public int partialUpdateSupplier(Supplier newSupplier, int id) {
        return supplierRepository.findById(id)
                .map(supplier -> {
                    if (newSupplier.getFullName() != null) {
                        supplierRepository.updateSupplierName(newSupplier.getFullName(), id);
                    }
                    if (newSupplier.getDni() != null) {
                        supplierRepository.updateSupplierDni(newSupplier.getDni(), id);
                    }
                    if (newSupplier.getEmail() != null) {
                        supplierRepository.updateSupplierEmail(newSupplier.getEmail(), id);
                    }
                    if (newSupplier.getTelephones() != null) {
                        newSupplier.getTelephones().forEach(supplierTelephone -> {
                            if (!supplier.getTelephones().contains(supplierTelephone)) {
                                supplierTelephone.setSupplier(supplier.getId());
                                supplierTelephoneRepository.save(supplierTelephone);
                            }
                        });
                        supplier.getTelephones().forEach(telephone -> {
                            if (!newSupplier.getTelephones().contains(telephone)) {
                                supplierTelephoneRepository.deleteById(telephone.getId());
                            }
                        });
                    }
                    if (newSupplier.getDirections() != null) {
                        newSupplier.getDirections().forEach(supplierDirection -> {
                            if (!supplier.getDirections().contains(supplierDirection)) {
                                supplierDirection.setSupplier(supplier.getId());
                                supplierDirectionRepository.save(supplierDirection);
                            }
                        });
                        supplier.getDirections().forEach(direction -> {
                            if (!newSupplier.getDirections().contains(direction)) {
                                supplierDirectionRepository.deleteById(direction.getId());
                            }
                        });
                    }
                    if (newSupplier.getPurchases() != null) {
                        newSupplier.getPurchases()
                                .forEach(purchase -> {
                                    if (!supplier.getPurchases().contains(purchase)) {
                                        purchase.setSupplier(supplier.getId());
                                        purchaseRepository.save(purchase);
                                    }
                                });
                        supplier.getPurchases().forEach(purchase -> {
                            if (!newSupplier.getPurchases().contains(purchase)) {
                                purchaseRepository.deleteById(purchase.getId());
                            }
                        });
                    }
                    return 1;
                }).orElse(-1);
    }

    public void deleteSupplier(int id) {
        supplierRepository
                .delete(Objects
                        .requireNonNull(supplierRepository
                                .findById(id)
                                .orElse(null)));
    }


    //Staff queryList
    public Staff saveStaff(Staff staff) {
        PositionStaff positionStaff = staff.getPositionStaff();
        PositionStaff pSRepo = positionStaffRepository.findByName(positionStaff.getName()).orElse(null);
        if (pSRepo == null) {
            positionStaffRepository.save(positionStaff);
        } else {
            staff.setPositionStaff(pSRepo);
        }
        return staffRepository.save(staff);
    }

    public List<Staff> getAllStaff() {
        return staffRepository
                .findAll();
    }

    public Staff getStaff(int id) {
        return staffRepository
                .findById(id)
                .orElse(null);
    }

    public int updateStaff(Staff staff, int id) {
        return staffRepository.findById(id).map(s -> {
            updatePositionStaff(staff, id, s);
            return staffRepository.updateStaff(staff.getName(), staff.getEmail(), staff.getPassword(), staff.getTelephone(), id);
        }).orElse(-1);
    }

    public int partialUpdateStaff(Staff staff, int id) {
        return staffRepository.findById(id).map(s -> {
            if (staff.getName() != null) {
                staffRepository.updateStaffName(staff.getName(), id);
            }
            if (staff.getEmail() != null) {
                staffRepository.updateStaffEmail(staff.getEmail(), id);
            }
            if (staff.getPassword() != null) {
                staffRepository.updateStaffPassword(staff.getPassword(), id);
            }
            if (staff.getTelephone() != 0) {
                staffRepository.updateStaffTelephone(staff.getTelephone(), id);
            }
            if (staff.getPositionStaff() != null) {
                updatePositionStaff(staff, id, s);
            }
            return 1;
        }).orElse(-1);
    }

    private void updatePositionStaff(Staff staff, int id, Staff s) {
        if (!staff.getPositionStaff().equals(s.getPositionStaff())) {
            PositionStaff pSRepo = positionStaffRepository.findByName(staff.getPositionStaff().getName()).orElse(null);
            if (pSRepo == null) {
                pSRepo = positionStaffRepository.save(staff.getPositionStaff());
            }
            staffRepository.updateIdPositionStaff(pSRepo.getIdPositionStaff(), id);
        }
    }

    public void deleteStaff(int id) {
        staffRepository.delete(Objects.requireNonNull(staffRepository.findById(id).orElse(null)));
    }

    //Product queryList
    public Product saveProduct(Product newProduct) {
        return productRepository.save(newProduct);
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product getProduct(int id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getLastProducts() {
        return productRepository.getLastProducts();
    }

    public int updateProduct(Product product, int id) {
        return productRepository.updateProduct(product.getName(),
                product.getDescription(),
                product.getBuyPrice(),
                product.getSellPrice(),
                product.getType(),
                product.getStock(),
                id);
    }

    public int partialUpdateProduct(Product product, int id) {
        return productRepository.findById(id).map(p -> {

            if (product.getName() != null) {
                productRepository.updateProductName(product.getName(), id);
            }
            if (product.getDescription() != null) {
                productRepository.updateProductDescription(product.getDescription(), id);
            }
            if (product.getBuyPrice() != 0) {
                productRepository.updateProductBuyPrice(product.getBuyPrice(), id);
            }
            if (product.getSellPrice() != 0) {
                productRepository.updateProductSellPrice(product.getSellPrice(), id);
            }
            if (product.getType() != null) {
                productRepository.updateProductType(product.getType(), id);
            }
            if (product.getStock() != 0) {
                productRepository.updateProductStock(product.getStock(), id);
            }
            return 1;
        }).orElse(-1);
    }

    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }

    //Receipt queryList
    public Receipt saveReceipt(Receipt newReceipt) {
        return receiptRepository.save(newReceipt);
    }

    public List<Receipt> getReceipts() {
        return receiptRepository.findAll();
    }

    public Receipt getReceipt(int id) {
        return receiptRepository.findById(id).orElse(null);
    }

    public int updateReceipt(Receipt receipt, int id) {
        return receiptRepository.updateReceipt(receipt.getReceiptDate(),
                receipt.getSubtotal(),
                receipt.getDiscounts(),
                receipt.getIva(),
                receipt.getTotal(),
                id);
    }

    public int partialUpdateReceipt(Receipt receipt, int id) {
        return receiptRepository.findById(id).map(r -> {
            if (receipt.getReceiptDate() != null) {
                receiptRepository.updateReceiptDate(receipt.getReceiptDate(), id);
            }
            if (receipt.getSubtotal() != 0) {
                receiptRepository.updateSubtotal(receipt.getSubtotal(), id);
            }
            if (receipt.getTotal() != 0) {
                receiptRepository.updateSubtotal(receipt.getTotal(), id);
            }
            if (receipt.getDiscounts() != 0) {
                receiptRepository.updateDiscounts(receipt.getDiscounts(), id);
            }
            if (receipt.getIva() != 0) {
                receiptRepository.updateIva(receipt.getIva(), id);
            }
            return 1;
        }).orElse(-1);

    }

    public void deleteReceipt(int id) {
        receiptRepository.deleteById(id);
    }

    //Sale queryList
    @Transactional
    public Sale saveSale(Sale newSale) {
        List<SaleLine> lines = null;
        if (!newSale.getSaleLines().isEmpty()) {
            lines = newSale.getSaleLines();
            lines.forEach(line -> {
                Product product = productRepository.findById(line.getIdProduct().getId()).orElse(productRepository.save(line.getIdProduct()));
                line.setIdProduct(product);
            });
            newSale.setSaleLines(null);
        }
        if (newSale.getReceipt() != null) {
            Receipt receipt = receiptRepository.findById(newSale.getReceipt().getId()).orElse(receiptRepository.save(newSale.getReceipt()));
            newSale.setReceipt(receipt);
        }
        if (newSale.getStaff() != null) {
            Staff staff = staffRepository.findById(newSale.getStaff().getIdStaff()).orElse(saveStaff(newSale.getStaff()));
            newSale.setStaff(staff);
        }
        saleRepository.save(newSale);
        int id = saleRepository.lastId();
        if (lines != null) {
            lines.forEach(line -> {
                line.setIdSale(id);
                saleLineRepository.save(line);
            });
        }
        return saleRepository.findById(id).orElse(null);
    }

    public List<Sale> getSaleList() {
        return saleRepository
                .findAll();
    }

    public Sale getSale(int id) {
        return saleRepository
                .findById(id)
                .orElse(null);
    }

    public int updateSale(Sale newSale, int id) {
        return saleRepository.findById(id)
                .map(sale -> {
                    List<SaleLine> saleLines = sale.getSaleLines();
                    newSale.getSaleLines()
                            .forEach(saleLine -> {
                                if (!saleLines.contains(saleLine)) {
                                    saleLine.setIdSale(sale.getId());
                                    saleLineRepository.save(saleLine);
                                }
                            });
                    saleLines.forEach(saleLine -> {
                        if (!newSale.getSaleLines().contains(saleLine)) {
                            saleLineRepository.deleteById(saleLine.getId());
                        }
                    });
                    updateSaleStaff(newSale, id, sale);
                    updateSaleReceipt(newSale, id, sale);
                    return saleRepository.updateSale(newSale.getClient(), id);
                })
                .orElse(-1);
    }

    public int partialUpdateSale(Sale newSale, int id) {
        return saleRepository.findById(id)
                .map(sale -> {
                    if (newSale.getSaleLines() != null) {
                        newSale.getSaleLines()
                                .forEach(saleLine -> {
                                    if (!sale.getSaleLines().contains(saleLine)) {
                                        saleLine.setIdSale(sale.getId());
                                        saleLineRepository.save(saleLine);
                                    }
                                });
                        sale.getSaleLines().forEach(saleLine -> {
                            if (!newSale.getSaleLines().contains(saleLine)) {
                                saleLineRepository.deleteById(saleLine.getId());
                            }
                        });
                    }
                    if (newSale.getStaff() != null) {
                        updateSaleStaff(newSale, id, sale);
                    }
                    if (newSale.getReceipt() != null) {
                        updateSaleReceipt(newSale, id, sale);
                    }
                    if (newSale.getClient() != 0) {
                        saleRepository.updateSale(newSale.getClient(), id);
                    }
                    return 1;
                })
                .orElse(-1);
    }

    private void updateSaleReceipt(Sale newSale, int id, Sale sale) {
        if (!sale.getReceipt().equals(newSale.getReceipt())) {
            Receipt rRepo = receiptRepository.findById(newSale.getReceipt().getId()).orElse(null);
            if (rRepo == null) {
                rRepo = receiptRepository.save(newSale.getReceipt());
            }
            saleRepository.updateIdReceipt(rRepo.getId(), id);
        }
    }

    private void updateSaleStaff(Sale newSale, int id, Sale sale) {
        if (!sale.getStaff().equals(newSale.getStaff())) {
            Staff sRepo = staffRepository.findByName(newSale.getStaff().getName()).orElse(null);
            if (sRepo == null) {
                sRepo = staffRepository.save(newSale.getStaff());
            }
            saleRepository.updateIdStaff(sRepo.getIdStaff(), id);
        }
    }

    public void deleteSale(int id) {
        saleRepository
                .delete(Objects
                        .requireNonNull(saleRepository
                                .findById(id)
                                .orElse(null)));
    }

    //Purchase queryList
    @Transactional
    public Purchase savePurchase(Purchase newPurchase) {
        List<PurchaseLine> lines = null;
        if (!newPurchase.getPurchaseLines().isEmpty()) {
            lines = newPurchase.getPurchaseLines();
            lines.forEach(line -> {
                Product product = productRepository.findById(line.getIdProduct().getId()).orElse(productRepository.save(line.getIdProduct()));
                line.setIdProduct(product);
            });
            newPurchase.setPurchaseLines(null);
        }
        if (newPurchase.getReceipt() != null) {
            Receipt receipt = receiptRepository.findById(newPurchase.getReceipt().getId()).orElse(receiptRepository.save(newPurchase.getReceipt()));
            newPurchase.setReceipt(receipt);
        }
        if (newPurchase.getStaff() != null) {
            Staff staff = staffRepository.findById(newPurchase.getStaff().getIdStaff()).orElse(saveStaff(newPurchase.getStaff()));
            newPurchase.setStaff(staff);
        }
        purchaseRepository.save(newPurchase);
        int id = purchaseRepository.lastId();
        if (lines != null) {
            lines.forEach(line -> {
                line.setIdPurchase(id);
                purchaseLineRepository.save(line);
            });
        }
        return purchaseRepository.findById(id).orElse(null);
    }

    public List<Purchase> getPurchaseList() {
        return purchaseRepository.findAll();
    }

    public Purchase getPurchase(int id) {
        return purchaseRepository.findById(id).orElse(null);
    }

    public int updatePurchase(Purchase newPurchase, int id) {
        return purchaseRepository.findById(id)
                .map(purchase -> {
                    List<PurchaseLine> purchaseLines = purchase.getPurchaseLines();
                    newPurchase.getPurchaseLines()
                            .forEach(purchaseLine -> {
                                if (!purchaseLines.contains(purchaseLine)) {
                                    purchaseLine.setIdPurchase(purchase.getId());
                                    purchaseLineRepository.save(purchaseLine);
                                }
                            });
                    purchaseLines.forEach(purchaseLine -> {
                        if (!newPurchase.getPurchaseLines().contains(purchaseLine)) {
                            purchaseLineRepository.deleteById(purchaseLine.getId());
                        }
                    });
                    updatePurchaseStaff(newPurchase, id, purchase);
                    updatePurchaseReceipt(newPurchase, id, purchase);
                    return purchaseRepository.updatePurchase(newPurchase.getSupplier(), id);
                })
                .orElse(-1);
    }

    private void updatePurchaseReceipt(Purchase newPurchase, int id, Purchase purchase) {
        if (!purchase.getReceipt().equals(newPurchase.getReceipt())) {
            Receipt rRepo = receiptRepository.findById(newPurchase.getReceipt().getId()).orElse(null);
            if (rRepo == null) {
                rRepo = receiptRepository.save(newPurchase.getReceipt());
            }
            purchaseRepository.updateIdReceipt(rRepo.getId(), id);
        }
    }

    private void updatePurchaseStaff(Purchase newPurchase, int id, Purchase purchase) {
        if (!purchase.getStaff().equals(newPurchase.getStaff())) {
            Staff sRepo = staffRepository.findByName(newPurchase.getStaff().getName()).orElse(null);
            if (sRepo == null) {
                sRepo = staffRepository.save(newPurchase.getStaff());
            }
            purchaseRepository.updateIdStaff(sRepo.getIdStaff(), id);
        }
    }

    public int partialUpdatePurchase(Purchase newPurchase, int id) {
        return purchaseRepository.findById(id)
                .map(purchase -> {
                    if (newPurchase.getPurchaseLines() != null) {
                        newPurchase.getPurchaseLines()
                                .forEach(purchaseLine -> {
                                    if (!purchase.getPurchaseLines().contains(purchaseLine)) {
                                        purchaseLine.setIdPurchase(purchase.getId());
                                        purchaseLineRepository.save(purchaseLine);
                                    }
                                });
                        purchase.getPurchaseLines().forEach(purchaseLine -> {
                            if (!newPurchase.getPurchaseLines().contains(purchaseLine)) {
                                purchaseLineRepository.deleteById(purchaseLine.getId());
                            }
                        });
                    }
                    if (newPurchase.getStaff() != null) {
                        updatePurchaseStaff(newPurchase, id, purchase);
                    }
                    if (newPurchase.getReceipt() != null) {
                        updatePurchaseReceipt(newPurchase, id, purchase);
                    }
                    if (newPurchase.getSupplier() != 0) {
                        purchaseRepository.updatePurchase(newPurchase.getSupplier(), id);
                    }
                    return 1;
                })
                .orElse(-1);

    }

    public void deletePurchase(int id) {
        purchaseRepository
                .delete(Objects
                        .requireNonNull(purchaseRepository
                                .findById(id)
                                .orElse(null)));
    }

    public Staff getStaffByEmail(String email) {
        staffRepository.findByEmail(email)
                .forEach(e -> log.info(e.toString()));
        return staffRepository.findByEmail(email).stream()
                .findFirst()
                .orElse(null);
    }

    public List<PositionStaff> getPossitionStaffList() {
        return positionStaffRepository.findAll();
    }

    //Population querys
    public Population savePopulation(Population newPopulation) {
        return populationRepository.save(newPopulation);
    }

    public List<Population> getPopulations() {
        return populationRepository.findAll();
    }

    public Population getPopulation(int id) {
        return populationRepository.findById(id).orElse(null);
    }

    public int updatePopulation(Population population, int id) {
        return populationRepository.updatePopulation(population.getPopulation(), population.getProvince(), id);
    }

    public void deletePopulation(int id) {
        populationRepository
                .delete(Objects
                        .requireNonNull(populationRepository
                                .findById(id)
                                .orElse(null)));
    }

    public List<Sampling> getAllSampling() {
        return samplingRepository.findAll();
    }

    public Sampling getSampling(int id) {
        return samplingRepository.findById(id).orElse(null);
    }


    public Sampling saveSampling(Sampling newSampling) {
        if (newSampling.getStaff() != null) {
            Staff staff = staffRepository.findById(newSampling.getStaff().getIdStaff()).orElse(staffRepository.save(newSampling.getStaff()));
            newSampling.setStaff(staff);
        }
        if (newSampling.getProduct() != null) {
            Product product = productRepository.findById(newSampling.getProduct().getId()).orElse(productRepository.save(newSampling.getProduct()));
            newSampling.setProduct(product);
        }
        return samplingRepository.save(newSampling);
    }

    public int updateSampling(Sampling newsampling, int id) {

        return samplingRepository.findById(id)
                .map(sampling -> {

                    if (!newsampling.getStaff().equals(sampling.getStaff())) {
                        Staff staff = staffRepository.findById(newsampling.getStaff().getIdStaff()).orElse(staffRepository.save(newsampling.getStaff()));
                        samplingRepository.updateStaff(staff.getIdStaff(), id);
                    }
                    if (newsampling.getProduct().equals(sampling.getProduct())) {
                        Product product = productRepository.findById(newsampling.getProduct().getId()).orElse(productRepository.save(newsampling.getProduct()));
                        samplingRepository.updateProduct(product.getId(), id);
                    }

                    return samplingRepository.updateSampling(newsampling.getName(), id);
                })
                .orElse(-1);
    }

    public void deleteSampling(int id) {
        samplingRepository
                .delete(Objects
                        .requireNonNull(samplingRepository
                                .findById(id)
                                .orElse(null)));
    }

    public List<DetailSampling> getDetailSamplingList() {
        return detailSamplingRepository.findAll();
    }

    public DetailSampling getDetailSampling(int id) {
        return detailSamplingRepository.findById(id).orElse(null);
    }

    public void deleteDetailSampling(int id) {
        detailSamplingRepository
                .delete(Objects
                        .requireNonNull(detailSamplingRepository
                                .findById(id)
                                .orElse(null)));
    }

    public List<Production> getListProduction() {
        return productionRepository.findAll();
    }

    public List<Production> getProductionProcessList() {
        return productionRepository.getProductionInProcess();
    }

    public Production getProduction(int id) {
        return productionRepository.findById(id).orElse(null);
    }

    public void deleteProduction(int id) {
        productionRepository
                .delete(Objects
                        .requireNonNull(productionRepository
                                .findById(id)
                                .orElse(null)));
    }

    public Production saveProduction(Production newProduction) {
        if (newProduction.getClient() != null) {
            Client client = clientRepository.findById(newProduction.getClient().getId()).orElse(saveClient(newProduction.getClient()));
            newProduction.setClient(client);
        }
        if (newProduction.getStaff() != null) {
            Staff staff = staffRepository.findById(newProduction.getStaff().getIdStaff()).orElse(saveStaff(newProduction.getStaff()));
            newProduction.setStaff(staff);
        }
        if (newProduction.getSampling() != null) {
            Sampling sampling = samplingRepository.findById(newProduction.getSampling().getId()).orElse(saveSampling(newProduction.getSampling()));
            newProduction.setSampling(sampling);
        }
        return productionRepository.save(newProduction);
    }

    public int updateStatus(String status, int id) {
        return productionRepository.findById(id).map(prod -> {
            if (status != null) {
                productionRepository.updateStatus(status, id);

            }
            return 1;
        }).orElse(-1);
    }

    public int updateProduction(Production newProduction, int id) {
        return productionRepository.findById(id).map(prod -> {
            if (!newProduction.getClient().equals(prod.getClient())) {
                Client client = clientRepository.findById(newProduction.getClient().getId()).orElse(saveClient(newProduction.getClient()));
                productionRepository.updateClient(client.getId(), id);
            }
            if (!newProduction.getStaff().equals(prod.getStaff())) {
                Staff staff = staffRepository.findById(newProduction.getStaff().getIdStaff()).orElse(saveStaff(newProduction.getStaff()));
                productionRepository.updateStaff(staff.getIdStaff(), id);
            }
            if (!newProduction.getSampling().equals(prod.getSampling())) {
                Sampling sampling = samplingRepository.findById(newProduction.getSampling().getId()).orElse(saveSampling(newProduction.getSampling()));
                productionRepository.updateClient(sampling.getId(), id);
            }

            productionRepository.updateProduction(newProduction.getQuantity(), newProduction.getStatus(), newProduction.getDate(), id);
            return 1;
        }).orElse(-1);
    }

    public DetailSampling saveDetailSampling(DetailSampling newDetail) {
        if (newDetail.getSampling() != null) {
            Sampling sampling = samplingRepository.findById(newDetail.getSampling().getId()).orElse(saveSampling(newDetail.getSampling()));
            newDetail.setSampling(sampling);
        }
        if (newDetail.getProduct() != null) {
            Product product = productRepository.findById(newDetail.getProduct().getId()).orElse(saveProduct(newDetail.getProduct()));
            newDetail.setProduct(product);
        }
        return detailSamplingRepository.save(newDetail);
    }

    public int updateDetailSampling(DetailSampling newDetail, int id) {
        return detailSamplingRepository.findById(id).map(det -> {
            if (!newDetail.getSampling().equals(det.getSampling())) {
                Sampling sampling = samplingRepository.findById(newDetail.getSampling().getId()).orElse(saveSampling(newDetail.getSampling()));
                detailSamplingRepository.updateSampling(sampling.getId(), id);
            }
            if (!newDetail.getProduct().equals(det.getProduct())) {
                Product product = productRepository.findById(newDetail.getProduct().getId()).orElse(saveProduct(newDetail.getProduct()));
                detailSamplingRepository.updateProduct(product.getId(), id);
            }
            return detailSamplingRepository.updateDetailSampling(newDetail.getQuantity(), id);
        }).orElse(-1);

    }

    public List<JasperSales> getReportList(int client, String dateinit, String datelast) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate d1 = LocalDate.parse(dateinit, formatter);
        LocalDate d2 = LocalDate.parse(datelast, formatter);
        List<JasperSales> reportSales = new ArrayList<>();
        Client newClient = clientRepository.findById(client).orElse(null);
        saleRepository.getSalesInThisdates(d1.toString(), d2.toString()).stream()
                .filter(sale -> sale.getClient() == Objects.requireNonNull(newClient).getId())
                .forEach(sale -> {
                    JasperSales jas = new JasperSales();
                    jas.setIdDoc(sale.getId());
                    jas.setClient(newClient.getFullName());
                    jas.setDni(newClient.getDni());
                    jas.setReceiptDate(sale.getReceipt().getReceiptDate());
                    jas.setSubtotal(sale.getReceipt().getSubtotal());
                    jas.setQuote(sale.getReceipt().getSubtotal() * (sale.getReceipt().getIva() / 100));
                    jas.setIva(sale.getReceipt().getIva());
                    jas.setTotal(sale.getReceipt().getTotal());
                    jas.setImportTotal(reportSales.stream()
                            .map(JasperSales::getTotal)
                            .reduce(0F, Float::sum) + jas.getTotal());
                    reportSales.add(jas);
                });

        return reportSales;
    }

    public List<JasperPurchases> getReportPurchasesList(int supplier, String dateinit, String datelast) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate d1 = LocalDate.parse(dateinit, formatter);
        LocalDate d2 = LocalDate.parse(datelast, formatter);
        List<JasperPurchases> reportPurchases = new ArrayList<>();
        Supplier newsupplier = supplierRepository.findById(supplier).orElse(null);
        purchaseRepository.getPurchasesInThisDates(d1.toString(), d2.toString())
                .stream().filter(p -> p.getSupplier() == Objects.requireNonNull(newsupplier).getId())
                .forEach(purchase -> {
                    JasperPurchases jas = new JasperPurchases();
                    jas.setIdDoc(purchase.getId());
                    jas.setDate(purchase.getReceipt().getReceiptDate());
                    jas.setSupplier(newsupplier.getFullName());
                    jas.setDni(newsupplier.getDni());
                    jas.setSubtotal(purchase.getReceipt().getSubtotal());
                    jas.setQuote(purchase.getReceipt().getSubtotal() * (purchase.getReceipt().getIva() / 100));
                    jas.setIva(purchase.getReceipt().getIva());
                    jas.setTotal(purchase.getReceipt().getTotal());
                    jas.setImportTotal(reportPurchases.stream()
                            .map(JasperPurchases::getTotal).reduce(0F, Float::sum) + jas.getTotal());
                    reportPurchases.add(jas);
                });
        return reportPurchases;
    }

    public List<JasperStockSimple> getReportStockSimpleProducts(int product) {
        List<JasperStockSimple> listStockSimple = new ArrayList<>();
        Product newproduct = productRepository.findById(product).orElse(null);
        List<JasperStockSimple> sortedList = null;
        if (newproduct != null) {
            List<SaleLine> linesSale = saleLineRepository.getSaleLinesWithThisProduct(newproduct.getId());
            List<PurchaseLine> linesPurchase = purchaseLineRepository.getPurchaseLinesWithThisProduct(newproduct.getId());
            linesSale.forEach(ls -> {
                JasperStockSimple jasper = new JasperStockSimple();
                Optional<Sale> sale = saleRepository.findById(ls.getIdSale());
                if (sale.isPresent()) {
                    jasper.setDate(sale.get().getReceipt().getReceiptDate());
                    jasper.setAgent(clientRepository.findById(sale.get().getClient()).get().getFullName());
                    jasper.setUdssales(ls.getQuantity());
                    jasper.setPrice(ls.getIdProduct().getSellPrice() * ls.getQuantity());
                    jasper.setProducto(newproduct.getName());
                    jasper.setUdspurchases(0);
                    listStockSimple.add(jasper);
                } else {
                    System.err.println("La venta parece estar vacía");
                    log.info("La venta parece estar vacía");
                }
            });
            linesPurchase.forEach(lp -> {
                Optional<Purchase> purchase = purchaseRepository.findById(lp.getIdPurchase());
                JasperStockSimple jasper = new JasperStockSimple();
                if (purchase.isPresent()) {
                    jasper.setDate(purchase.get().getReceipt().getReceiptDate());
                    jasper.setAgent(supplierRepository.findById(purchase.get().getSupplier()).get().getFullName());
                    jasper.setUdssales(0);
                    jasper.setPrice(lp.getIdProduct().getBuyPrice() * lp.getQuantity());
                    jasper.setProducto(newproduct.getName());
                    jasper.setUdspurchases(lp.getQuantity());
                    listStockSimple.add(jasper);
                } else {
                    System.err.println("La compra parece estar vacía");
                    log.info("La compra parece estar vacía");
                }
            });
            List<DetailSampling> details = detailSamplingRepository
                    .findAll()
                    .stream()
                    .filter(d -> d.getProduct().getId() == newproduct.getId())
                    .collect(Collectors.toList());

            List<Production> orders = productionRepository.findAll();
            orders.forEach(o -> details.forEach(d -> {
                if (o.getSampling().getId() == d.getSampling().getId()) {
                    JasperStockSimple jasper = new JasperStockSimple();
                    jasper.setDate(o.getDate());
                    jasper.setAgent(o.getClient().getFullName());
                    jasper.setUdspurchases(0);
                    jasper.setPrice(d.getProduct().getBuyPrice());
                    jasper.setProducto(newproduct.getName());
                    jasper.setUdssales(o.getQuantity() * d.getQuantity());
                    listStockSimple.add(jasper);
                }
            }));
            sortedList = listStockSimple.stream().sorted((jasperStockSimple, t1) -> {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                Date d1 = null;
                Date d2 = null;
                try {
                    d1 = sdf.parse(jasperStockSimple.getDate());
                    d2 = sdf.parse(t1.getDate());
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                return Objects.requireNonNull(d1).compareTo(d2);
            }).peek(jasperStockSimple -> {
                int stock = 0;
                for (int i = 0; i < listStockSimple.indexOf(jasperStockSimple); i++) {
                    stock += listStockSimple.get(i).getUdspurchases() - listStockSimple.get(i).getUdssales();
                }
                jasperStockSimple.setStock(stock);
            }).collect(Collectors.toList());
        } else {
            System.err.println("Parece que no existe ese producto");
            log.warning("Parece que no existe ese producto");
        }
        return sortedList;
    }
    public List<JasperStockComposite> getReportStockCompositeProducts(int product) {
        List<JasperStockComposite> jasperList = new ArrayList<>();
        Product newproduct = productRepository.findById(product).orElse(null);
        List<JasperStockComposite> sortedList = null;

        if (newproduct != null) {
            List<Production> productionOrders = productionRepository.getOrdersWithThisProduct(newproduct.getId());
            List<SaleLine> salesList = saleLineRepository.getSaleLinesWithThisProduct(newproduct.getId());
            productionOrders.forEach(production -> {
                JasperStockComposite jasperStockComposite = new JasperStockComposite();
                jasperStockComposite.setDate(production.getDate());
                jasperStockComposite.setAgent(production.getClient().getFullName());
                jasperStockComposite.setProduct(newproduct.getName());
                jasperStockComposite.setUnitsManufactured(production.getQuantity());
                jasperStockComposite.setPrice(production.getQuantity() * newproduct.getSellPrice());
                jasperStockComposite.setUnitsSold(0);
                //jasperStockComposite.setStock();
                jasperList.add(jasperStockComposite);
            });
            salesList.forEach(sale -> {
                JasperStockComposite jasperStockComposite = new JasperStockComposite();
                Sale forSale = saleRepository.findById(sale.getIdSale()).orElse(null);
                jasperStockComposite.setDate(forSale.getReceipt().getReceiptDate());
                Client client = clientRepository.findById(forSale.getClient()).orElse(null);
                jasperStockComposite.setAgent(client.getFullName());
            });
        } else {
            System.err.println("Parece que no existe ese producto");
            log.warning("Parece que no existe ese producto");
        }
        return jasperList;
    }
}
