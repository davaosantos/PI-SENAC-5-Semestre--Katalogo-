package com.senac.katalogo.model;

import java.util.List;

public class PedidoRequest {

    private List<Long> carrinho;
    private String enderecoEntrega;
    private String nomeComerciante;
    private String selectedRegion;
    private String username;

    public PedidoRequest() {
    }

    public List<Long> getCarrinho() {
        return carrinho;
    }

    public void setCarrinho(List<Long> carrinho) {
        this.carrinho = carrinho;
    }

    public String getEnderecoEntrega() {
        return enderecoEntrega;
    }

    public void setEnderecoEntrega(String enderecoEntrega) {
        this.enderecoEntrega = enderecoEntrega;
    }

    public String getNomeComerciante() {
        return nomeComerciante;
    }

    public void setNomeComerciante(String nomeComerciante) {
        this.nomeComerciante = nomeComerciante;
    }

    public String getSelectedRegion() {
        return selectedRegion;
    }

    public void setSelectedRegion(String selectedRegion) {
        this.selectedRegion = selectedRegion;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
