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

    @OneToMany(targetEntity = Sampling.class, mappedBy = "id",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Sampling> sampling;

    @OneToMany(targetEntity = Product.class, mappedBy = "id", fetch = FetchType.LAZY)
    private List<Product> products;
}
