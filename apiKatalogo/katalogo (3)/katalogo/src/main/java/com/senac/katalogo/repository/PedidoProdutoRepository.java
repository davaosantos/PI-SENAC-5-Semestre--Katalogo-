package com.senac.katalogo.repository;

import com.senac.katalogo.model.PedidoProduto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoProdutoRepository extends JpaRepository<PedidoProduto, Long> {
    // Declaração de métodos personalizados, se necessário
}
