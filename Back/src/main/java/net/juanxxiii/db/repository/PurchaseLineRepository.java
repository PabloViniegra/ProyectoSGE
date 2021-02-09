package net.juanxxiii.db.repository;

import net.juanxxiii.db.entity.PurchaseLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseLineRepository extends JpaRepository<PurchaseLine, Integer> {
    @Query("Select max(p.id) from Purchase p")
    int lastId();

    @Query("from PurchaseLine pl where pl.idProduct=:idproduct")
    List<PurchaseLine> getPurchaseLinesWithThisProduct(@Param("idproduct") int id);
}
