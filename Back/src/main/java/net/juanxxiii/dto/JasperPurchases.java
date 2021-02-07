package net.juanxxiii.dto;

import lombok.Data;

@Data
public class JasperPurchases {
    private int idDoc;
    private String date;
    private String supplier;
    private String dni;
    private float subtotal;
    private float quote;
    private float iva;
    private float total;
    private float importTotal;
}
