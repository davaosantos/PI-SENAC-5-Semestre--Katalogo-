package com.senac.katalogo.model;

import com.senac.katalogo.model.Produto;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "produto_regiao")
public class ProdutoRegiao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "produto_id")
    private Produto produto;


    @ElementCollection
    @CollectionTable(name = "produto_regiao_regioes", joinColumns = @JoinColumn(name = "produto_regiao_id"))
    @Column(name = "regiao")
    private List<Integer> regioes;


    // construtor, getters e setters


// construtor, getters e setters

    public ProdutoRegiao() {
    }

    public ProdutoRegiao(Produto produto, List<Integer> regioes) {
        this.produto = produto;
        this.regioes = regioes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public List<Integer> getRegioes() {
        return regioes;
    }

    public void setRegioes(List<Integer> regioes) {
        this.regioes = regioes;
    }
}