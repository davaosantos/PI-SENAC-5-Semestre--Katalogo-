package com.senac.katalogo.repository;

import com.senac.katalogo.model.Regiao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface RegiaoRepository extends JpaRepository<Regiao, Integer> {
    Optional<Regiao> findById(int id);
}