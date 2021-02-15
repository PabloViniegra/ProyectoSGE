package net.juanxxiii.dto;

import lombok.Data;
import net.juanxxiii.db.entity.Client;

@Data
public class JasperReceipt {
    private Client client;
    private int sale;
}
