package net.juanxxiii.db.repository;

import net.juanxxiii.db.entity.DetailSampling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailSamplingRepository extends JpaRepository<DetailSampling, Integer> {
}
