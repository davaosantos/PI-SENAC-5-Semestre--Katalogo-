package com.senac.katalogo.utils;

import com.senac.katalogo.model.Regioes;

public class UtilsKatalogo {

    public static Regioes toRegioes(String regiao) {
        switch (regiao) {
            case "Sul":
                return new Regioes(new Long("1"), "Sul");
            case "Sudeste":
                return new Regioes(new Long("2"), "Sudeste");
            case "Centro-Oeste":
                return new Regioes(new Long("3"), "Centro-Oeste");
            case "Norte":
                return new Regioes(new Long("4"), "Norte");
            case "Nordeste":
                return new Regioes(new Long("5"), "Nordeste");
            default:
                throw new IllegalArgumentException("Região inválida: " + regiao);
        }
    }
}
