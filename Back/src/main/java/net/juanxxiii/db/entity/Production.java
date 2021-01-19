package net.juanxxiii.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "produccion")
public class Production {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idproduccion")
    private int id;

    @Column(name = "cantidad")
    private int quantity;

    @Column(name = "estado")
    private String status;

    @Column(name = "fechasolicitud")
    private String date;

    @ManyToOne(optional = false)
    @JoinColumn(name = "idcliente",referencedColumnName = "idcliente")
    private Client client;

    @ManyToOne(optional = false)
    @JoinColumn(name = "idescandallo",referencedColumnName = "idescandallo")
    private Sampling sampling;
}
