package com.senac.katalogo.repository;

import com.senac.katalogo.model.ProdutoRegiao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRegiaoRepository extends JpaRepository<ProdutoRegiao, Long> {
// nenhum método personalizado é necessário aqui
}
