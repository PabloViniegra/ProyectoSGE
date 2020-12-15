package net.juanxxiii.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "poblacion")
public class Population implements Serializable {
    @Id
    @Column(name = "codigo_postal")
    private int idPopulation;

    @Column(name = "poblacion")
    private String population;

    @Column(name = "provincia")
    private String province;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Population that = (Population) o;
        return idPopulation == that.idPopulation && population.equalsIgnoreCase(that.population);
    }
}
