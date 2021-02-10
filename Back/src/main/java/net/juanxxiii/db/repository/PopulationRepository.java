package net.juanxxiii.db.repository;

import net.juanxxiii.db.entity.Population;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PopulationRepository extends JpaRepository<Population, Integer> {
    @Transactional
    @Modifying
    @Query("UPDATE Population p SET p.population=:population, p.province=:province WHERE p.idPopulation=:idPopulation")
    int updatePopulation(@Param("population")String population, @Param("province")String province, @Param("idPopulation")int idPopulation);
}
