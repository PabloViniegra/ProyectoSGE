package net.juanxxiii.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "personal")
public class Staff implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idpersonal")
    private int idStaff;

    @Column(name = "nombrecompleto")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "telefono")
    private int telephone;

    @ManyToOne(targetEntity = PositionStaff.class, optional = false)
    @JoinColumn(name = "idpuesto", referencedColumnName = "idpuesto")
    private PositionStaff positionStaff;

    @ManyToOne(targetEntity = Departament.class, optional = false)
    @JoinColumn(name = "iddepartmento", referencedColumnName = "iddepartamento")
    private Departament departament;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Staff)) return false;
        Staff staff = (Staff) o;
        return getIdStaff() == staff.getIdStaff() && getTelephone() == staff.getTelephone() && getName().equals(staff.getName()) && getEmail().equals(staff.getEmail()) && getPassword().equals(staff.getPassword()) && getPositionStaff().equals(staff.getPositionStaff()) && getDepartament().equals(staff.getDepartament());
    }

    @Override
    public String toString() {
        return "Staff{" +
                "idStaff=" + idStaff +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", telephone=" + telephone +
                ", positionStaff=" + positionStaff +
                ", departament=" + departament +
                '}';
    }
}
