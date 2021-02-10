package net.juanxxiii.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "escandallos")
public class Sampling {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idescandallo")
    private int id;

    @Column(name = "nombre")
    private String name;

    @ManyToOne(targetEntity = Staff.class, optional = false)
    @JoinColumn(name = "idpersonal", referencedColumnName = "idpersonal")
    private Staff staff;

    @OneToOne(optional = false)
    @JoinColumn(name = "idproducto", referencedColumnName = "idproducto")
    private Product product;
}
