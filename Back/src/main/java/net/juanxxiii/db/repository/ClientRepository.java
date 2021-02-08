package net.juanxxiii.db.repository;

import net.juanxxiii.db.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    @Query("SELECT MAX(c.id) FROM Client c")
    int lastId();

    @Transactional
    @Modifying
    @Query("UPDATE Client c SET c.fullName = :fullName, c.dni = :dni, c.email = :email, c.iban = :iban WHERE c.id = :id")
    int updateClient(@Param("fullName") String fullName,@Param("dni") String dni,@Param("email") String email,@Param("iban") String iban,@Param("id") int id);

    @Transactional
    @Modifying
    @Query("UPDATE Client c SET c.fullName = :fullName WHERE c.id = :id")
    int updateClientName(@Param("fullName") String fullName, @Param("id") int id);

    @Transactional
    @Modifying
    @Query("UPDATE Client c SET c.dni = :dni WHERE c.id = :id")
    int updateClientDni(@Param("dni") String dni, @Param("id") int id);

    @Transactional
    @Modifying
    @Query("UPDATE Client c SET c.email = :email WHERE c.id = :id")
    int updateClientEmail(@Param("email") String email, @Param("id") int id);

    @Transactional
    @Modifying
    @Query("UPDATE Client c SET c.iban = :iban WHERE c.id = :id")
    int updateClientIban(@Param("iban") String iban, @Param("id") int id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE sge_moviles.clientes SET codigo_postal=:codPostal WHERE idCliente=:id",nativeQuery = true)
    void updatePopulation(@Param("codPostal") int codPostal, @Param("id") int id);


}
