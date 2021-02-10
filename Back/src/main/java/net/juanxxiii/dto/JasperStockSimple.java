package net.juanxxiii.dto;

import lombok.Data;

@Data
public class JasperStockSimple {
    private String date;
    private String agent;
    private int udspurchases;
    private float price;
    private int udssales;
    private int stock;
}
