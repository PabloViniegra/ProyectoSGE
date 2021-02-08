package net.juanxxiii.db.repository;

import net.juanxxiii.db.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
    //SELECT t.idTelefono, t.numTelefono FROM Supplier s JOIN telefonosProveedor t on s.idProveedor = t.IdProveedor
    //SELECT new net.juanxxiii.dto.TelephoneDto(t.id, t.number) FROM Supplier s INNER JOIN Telephone t ON t.supplier = s.id

    @Query("SELECT MAX(s.id) FROM Supplier s")
    int lastId();

    @Transactional
    @Modifying
    @Query("UPDATE Supplier s SET s.fullName = :name, s.dni = :dni, s.email = :email WHERE s.id = :id")
    int updateSupplier(@Param("name") String name,@Param("dni") String dni,@Param("email") String email,@Param("id") int id);

    @Transactional
    @Modifying
    @Query("UPDATE Supplier s SET s.fullName = :name WHERE s.id = :id")
    int updateSupplierName(@Param("name") String name, @Param("id") int id);

    @Transactional
    @Modifying
    @Query("UPDATE Supplier s SET s.dni = :dni WHERE s.id = :id")
    int updateSupplierDni(@Param("dni") String dni, @Param("id") int id);

    @Transactional
    @Modifying
    @Query("UPDATE Supplier s SET s.email = :email WHERE s.id = :id")
    int updateSupplierEmail(@Param("email") String email, @Param("id") int id);

}
