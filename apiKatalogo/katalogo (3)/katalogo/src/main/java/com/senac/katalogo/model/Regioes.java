package com.senac.katalogo.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "regioes")
public class Regioes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "regioes", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProdutoRegiao> produtoRegiaoRegioes = new ArrayList<>();

    @OneToMany(mappedBy = "regiao", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Estabelecimento> estabelecimentos;

    public Regioes() {
    }

    //Construtor para cadastro de estabelecimento

    public Regioes(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<ProdutoRegiao> getProdutoRegiaoRegioes() {
        return produtoRegiaoRegioes;
    }

    public void setProdutoRegiaoRegioes(List<ProdutoRegiao> produtoRegiaoRegioes) {
        this.produtoRegiaoRegioes = produtoRegiaoRegioes;
    }

    public List<Estabelecimento> getEstabelecimentos() {
        return estabelecimentos;
    }

    public void setEstabelecimentos(List<Estabelecimento> estabelecimentos) {
        this.estabelecimentos = estabelecimentos;
    }
}
