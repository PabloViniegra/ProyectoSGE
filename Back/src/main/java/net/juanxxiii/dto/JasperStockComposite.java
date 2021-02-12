package net.juanxxiii.dto;

import lombok.Data;

@Data
public class JasperStockComposite {
    private String date;
    private String agent;
    private String product;
    private int unitsManufactured;
    private float price;
    private int unitsSold;
    private int stock;
}
