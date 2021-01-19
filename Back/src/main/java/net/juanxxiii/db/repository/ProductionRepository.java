package net.juanxxiii.db.repository;

import net.juanxxiii.db.entity.Client;
import net.juanxxiii.db.entity.Production;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.beans.Transient;

@Repository
public interface ProductionRepository extends JpaRepository<Production,Integer> {

    @Transient
    @Modifying
    @Query(value = "UPDATE produccion SET estado=:status WHERE idProduccion=:id",nativeQuery = true)
    int updateStatus(@Param("status") String status, @Param("id") int id);

    @Transient
    @Modifying
    @Query(value = "UPDATE produccion SET idCliente=:idclient WHERE idProduccion=:id",nativeQuery = true)
    int updateClient(@Param("idclient") int client, @Param("id") int id);

    @Transient
    @Modifying
    @Query(value = "UPDATE produccion SET idEscandallo=:idsampling WHERE idProduccion=:id",nativeQuery = true)
    int updateSampling(@Param("idsampling") int sampling, @Param("id") int id);

    @Transient
    @Modifying
    @Query(value = "UPDATE produccion SET cantidad=:quantity,estado=:status,fechaSolicitud=:date WHERE idProduccion=:id",nativeQuery = true)
    int updateProduction(@Param("quantity") int quantity, @Param("status") String status, @Param("date") String date, @Param("id") int id);
}
