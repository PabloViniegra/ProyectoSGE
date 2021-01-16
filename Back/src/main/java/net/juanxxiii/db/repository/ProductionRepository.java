package net.juanxxiii.db.repository;

import net.juanxxiii.db.entity.Production;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductionRepository extends JpaRepository<Production,Integer> {

}
