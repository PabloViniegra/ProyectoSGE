package net.juanxxiii.db.repository;

import net.juanxxiii.db.entity.Sampling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SamplingRepository extends JpaRepository<Sampling, Integer> {
}
