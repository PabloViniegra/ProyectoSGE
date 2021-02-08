package net.juanxxiii.dto;

import lombok.Data;


@Data
public class JasperSales {
    private int idDoc;
    private String receiptDate;
    private String client;
    private String dni;
    private float subtotal;
    private float quote;
    private float iva;
    private float total;
    private float importTotal;
}
