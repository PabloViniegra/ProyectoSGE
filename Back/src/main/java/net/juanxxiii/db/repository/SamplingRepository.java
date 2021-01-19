package net.juanxxiii.db.repository;

import net.juanxxiii.db.entity.Sampling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface SamplingRepository extends JpaRepository<Sampling, Integer> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE escandallos SET nombre=:name WHERE idEscandallo=:id",nativeQuery = true)
    int updateSampling(@Param("name") String name, @Param("id") int id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE escandallos SET idPersonal=:idstaff WHERE idEscandallo=:id",nativeQuery = true)
    int updateStaff(@Param("idstaff") int idStaff, @Param("id") int id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE escandallos SET idProducto=:idproducto WHERE idEscandallo=:id",nativeQuery = true)
    int updateProduct(@Param("idproducto") int id, @Param("id") int id1);
}
