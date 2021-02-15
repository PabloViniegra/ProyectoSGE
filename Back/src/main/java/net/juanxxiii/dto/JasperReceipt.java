package net.juanxxiii.dto;

import lombok.Data;

@Data
public class JasperReceipt {
    private String name;
    private String location;
    private String population;
    private int receiptNumber;
    private String date;
    private float subtotal;
    private float quote;
    private float iva;
    private float total;
    private String iban;
    private String product;
    private int quantity;
    private float pvp;
    private float price;
}
