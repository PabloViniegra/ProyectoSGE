package net.juanxxiii.db.repository;

import net.juanxxiii.db.entity.Client;
import net.juanxxiii.db.entity.Production;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.beans.Transient;
import java.util.List;

@Repository
public interface ProductionRepository extends JpaRepository<Production,Integer> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE produccion SET estado=:status WHERE idProduccion=:id",nativeQuery = true)
    int updateStatus(@Param("status") String status, @Param("id") int id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE produccion SET idCliente=:idclient WHERE idProduccion=:id",nativeQuery = true)
    int updateClient(@Param("idclient") int client, @Param("id") int id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE produccion SET idEscandallo=:idsampling WHERE idProduccion=:id",nativeQuery = true)
    int updateSampling(@Param("idsampling") int sampling, @Param("id") int id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE produccion SET cantidad=:quantity,estado=:status,fechaSolicitud=:date WHERE idProduccion=:id",nativeQuery = true)
    int updateProduction(@Param("quantity") int quantity, @Param("status") String status, @Param("date") String date, @Param("id") int id);

    @Query(value = "select * from produccion where estado='EN PROCESO' order by idProduccion desc limit 0,20", nativeQuery = true)
    List<Production> getProductionInProcess();


}
