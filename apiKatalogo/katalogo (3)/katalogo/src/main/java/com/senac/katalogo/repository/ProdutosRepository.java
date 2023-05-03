package com.senac.katalogo.repository;

import com.senac.katalogo.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutosRepository extends JpaRepository<Produto, Long> {

    @Query("SELECT p FROM Produto p JOIN p.produtoRegioes r JOIN r.regioes re WHERE p.categoria = :categoria AND re IN :regioes")
    List<Produto> findByCategoriaAndRegioes(@Param("categoria") String categoria, @Param("regioes") List<Integer> regioes);

}
