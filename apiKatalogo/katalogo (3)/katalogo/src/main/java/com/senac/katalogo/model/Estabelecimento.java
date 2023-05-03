package com.senac.katalogo.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "estabelecimentos")
public class Estabelecimento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "regiao_id")
    @JsonBackReference
    private Regioes regiao;

    @Column(name = "imagem")
    private byte[] imagem;


    public Estabelecimento(Long id, String nome, String descricao, Regioes regiao) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.regiao = regiao;
    }

    public Estabelecimento(Long id, String nome, String descricao, Regioes regiao, byte[] imagem) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.regiao = regiao;
        this.imagem = imagem;
    }

    public Estabelecimento() {
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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Regioes getRegiao() {
        return regiao;
    }

    public void setRegiao(Regioes regiao) {
        this.regiao = regiao;
    }

    public byte[] getImagem() {
        return imagem;
    }

    public void setImagem(byte[] imagem) {
        this.imagem = imagem;
    }
}
