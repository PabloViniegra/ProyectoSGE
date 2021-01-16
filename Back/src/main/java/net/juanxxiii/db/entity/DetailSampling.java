package net.juanxxiii.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "detalle_escandallo")
public class DetailSampling {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iddetalle")
    private int id;

    @Column(name = "cantidad")
    private int quantity;

    @OneToOne(optional = false)
    @JoinColumn(name = "idescandallo", referencedColumnName = "idescandallo")
    private Sampling sampling;

    @OneToMany(targetEntity = Product.class, mappedBy = "idproducto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Product> products;
}
