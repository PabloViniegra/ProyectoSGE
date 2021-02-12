package net.juanxxiii.db.repository;

import net.juanxxiii.db.entity.Product;
import net.juanxxiii.db.entity.SaleLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleLineRepository extends JpaRepository<SaleLine, Integer> {
    @Query("from SaleLine sl where sl.idProduct.id=:idproduct")
    List<SaleLine> getSaleLinesWithThisProduct(@Param("idproduct") int idproduct);
}
