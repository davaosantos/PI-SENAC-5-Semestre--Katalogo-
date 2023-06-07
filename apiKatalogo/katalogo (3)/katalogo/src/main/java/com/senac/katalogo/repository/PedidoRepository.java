package com.senac.katalogo.repository;

import com.senac.katalogo.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PedidoRepository extends CrudRepository<Pedido, Long> {
//    @Query("SELECT p.username, SUM(p.valorTotal) AS valorTotal, e.regiao.nome AS nomeRegiao FROM Pedido p JOIN p.regiao e WHERE p.username = :username AND p.dataPedido BETWEEN :dataInicial AND :dataFinal GROUP BY p.username, e.regiao.nome")
//    List<Object[]> getRelatorioVendasPorUsuarioERegiao(@Param("username") String username, @Param("dataInicial") Date dataInicial, @Param("dataFinal") Date dataFinal);

    @Query("SELECT p FROM Pedido p WHERE p.username = :username AND p.dataPedido BETWEEN :dataInicial AND :dataFinal")
    List<Pedido> findPedidosByUsernameAndDataPedidoBetween(@Param("username") String username, @Param("dataInicial") Date dataInicial, @Param("dataFinal") Date dataFinal);

//    List<Pedido> findByDataPedidoBetween(Date dataInicial, Date dataFinal);
}
