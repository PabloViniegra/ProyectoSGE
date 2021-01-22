package net.juanxxiii.db.repository;

import net.juanxxiii.db.entity.DetailSampling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.beans.Transient;

@Repository
public interface DetailSamplingRepository extends JpaRepository<DetailSampling, Integer> {
    @Modifying
    @Transactional
    @Query(value = "UPDATE detalle_escandallo SET idEscandallo=:idescandallo WHERE idDetalle=:id",nativeQuery = true)
    int updateSampling(@Param("idescandallo") int id, @Param("id") int id1);

    @Modifying
    @Transactional
    @Query(value = "UPDATE detalle_escandallo SET idProducto=:idproducto WHERE idDetalle=:id",nativeQuery = true)
    int updateProduct(@Param("idproducto") int id, @Param("id") int id1);

    @Modifying
    @Transactional
    @Query(value = "UPDATE detalle_escandallo SET cantidad=:quantity WHERE idDetalle=:id",nativeQuery = true)
    int updateDetailSampling(@Param("quantity") int quantity, @Param("id") int id);
}
