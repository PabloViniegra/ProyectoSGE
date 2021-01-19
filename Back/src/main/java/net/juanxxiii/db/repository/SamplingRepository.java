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
}
