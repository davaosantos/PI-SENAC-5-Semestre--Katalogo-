package com.senac.katalogo.DTO;

public class FiltroRelatorioDTO {
    private String regiao;
    private String categoria;
    private String dataInicial;
    private String dataFinal;
    private String username;

    // Construtores, getters e setters

    public FiltroRelatorioDTO() {
    }

    public FiltroRelatorioDTO(String regiao, String categoria, String dataInicial, String dataFinal, String username) {
        this.regiao = regiao;
        this.categoria = categoria;
        this.dataInicial = dataInicial;
        this.dataFinal = dataFinal;
        this.username = username;
    }

    public String getRegiao() {
        return regiao;
    }

    public void setRegiao(String regiao) {
        this.regiao = regiao;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDataInicial() {
        return dataInicial;
    }

    public void setDataInicial(String dataInicial) {
        this.dataInicial = dataInicial;
    }

    public String getDataFinal() {
        return dataFinal;
    }

    public void setDataFinal(String dataFinal) {
        this.dataFinal = dataFinal;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}

