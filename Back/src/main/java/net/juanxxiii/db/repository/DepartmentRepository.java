package net.juanxxiii.db.repository;

import net.juanxxiii.db.entity.Departament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Departament, Integer> {
    @Query("select d from Departament d where d.idDepartment = :id")
    Optional<Departament> findById(@Param("idDepartment")int id);
}
