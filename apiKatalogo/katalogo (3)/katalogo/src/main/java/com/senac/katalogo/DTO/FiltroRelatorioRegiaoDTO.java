package com.senac.katalogo.DTO;

public class FiltroRelatorioRegiaoDTO {
    private String dataInicial;
    private String dataFinal;

    private String username;

    // Construtores, getters e setters

    public FiltroRelatorioRegiaoDTO() {
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
