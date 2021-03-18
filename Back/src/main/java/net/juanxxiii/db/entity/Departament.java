package net.juanxxiii.db.entity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;


@Getter
@Setter
@Entity
@Table(name = "departamento")
public class Departament implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iddepartamento")
    private int idDepartment;

    @Column(name = "departamento")
    private String nameDepartment;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Departament)) return false;
        Departament that = (Departament) o;
        return getIdDepartment() == that.getIdDepartment() && Objects.equals(getNameDepartment(), that.getNameDepartment());
    }

    @Override
    public String toString() {
        return "Departament{" +
                "idDepartment=" + idDepartment +
                ", nameDepartment='" + nameDepartment + '\'' +
                '}';
    }
}
