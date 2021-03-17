package net.juanxxiii.dto;

import lombok.Data;

@Data
public class JasperPurchaseReceipt {
    private int idDoc;
    private String date;
    private String supplierName;
    private String staff;
    private String dni;
    private String initdate;
    private String lastdate;
    private float totalReceipt;
    private float total;
}
