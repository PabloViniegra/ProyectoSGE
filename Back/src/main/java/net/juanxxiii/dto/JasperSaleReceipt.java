package net.juanxxiii.dto;

import lombok.Data;

@Data
public class JasperSaleReceipt {
    private int idDoc;
    private String date;
    private String clientName;
    private int staff;
    private String dni;
    private String initdate;
    private String lastdate;
    private float totalReceipt;
    private float total;
}
