package com.senac.katalogo.controller;

import com.senac.katalogo.DTO.FiltroRelatorioDTO;
import com.senac.katalogo.model.Pedido;
import com.senac.katalogo.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/relatorioVendasProprias")
public class RelatorioVendasPropriasController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @PostMapping
    public Map<String, Object> gerarRelatorioVendasProprias(@RequestBody FiltroRelatorioDTO filtro) {
        String username = filtro.getUsername();
        String dataInicialStr = filtro.getDataInicial();
        String dataFinalStr = filtro.getDataFinal();

        // Converter as strings de data para objetos Date
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date dataInicial;
        Date dataFinal;
        try {
            dataInicial = dateFormat.parse(dataInicialStr);
            dataFinal = dateFormat.parse(dataFinalStr);
        } catch (ParseException e) {
            // Tratar o erro de parsing, se necessário
            return null;
        }

        System.out.println(dataInicial.toString());
        System.out.println(username);
        System.out.println(dataFinal.toString());

        // Consultar os pedidos do banco de acordo com o usuário atual (username)
        // e o período definido (dataInicial e dataFinal)
        List<Pedido> pedidos = pedidoRepository.findPedidosByUsernameAndDataPedidoBetween(username, dataInicial, dataFinal);
        pedidos.forEach(pedido -> {
            System.out.println("PEDIDOS AQUI ---------- ");
            System.out.println(pedido.getUsername());
            System.out.println(pedido.getValorTotal());
        });

        // Calcular os resultados do relatório
        Double valorTotalVendas = 0.0;
        Map<String, Integer> datasMaisVendas = new HashMap<>();

        for (Pedido pedido : pedidos) {
            valorTotalVendas += pedido.getValorTotal();
            System.out.println(valorTotalVendas + "VALOR SOMANDO");
            String dataPedidoStr = dateFormat.format(pedido.getDataPedido());
            System.out.println(dataPedidoStr + " dataPedidoStr ");

            datasMaisVendas.put(dataPedidoStr, datasMaisVendas.getOrDefault(dataPedidoStr, 0) + 1);
        }

        // Construir o mapa com os resultados do relatório
        Map<String, Object> relatorio = new HashMap<>();
        relatorio.put("valorTotalVendas", valorTotalVendas);
        relatorio.put("datasMaisVendas", datasMaisVendas);

        System.out.println(valorTotalVendas);
        System.out.println(datasMaisVendas);

        return relatorio;
    }
}