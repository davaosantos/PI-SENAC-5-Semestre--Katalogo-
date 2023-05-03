package com.senac.katalogo.repository;

import com.senac.katalogo.model.Estabelecimento;
import com.senac.katalogo.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EstabelecimentoRepository extends JpaRepository<Estabelecimento, Integer> {

//   @Query("SELECT e from Estabelecimento e where e.regiao_id = regiao")
//   List<Estabelecimento> findEstabelecimentos(@Param("regioes") Integer regiao);

    @Query("SELECT e FROM Estabelecimento e WHERE e.regiao.id =:regiao")
    List<Estabelecimento> findEstabelecimentos(@Param("regiao") Long regiao);

}
