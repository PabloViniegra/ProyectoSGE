package net.juanxxiii.db.repository;

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
}
