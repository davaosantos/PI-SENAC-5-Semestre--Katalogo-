package com.senac.katalogo.controller;

import com.senac.katalogo.DTO.FiltroRelatorioDTO;
import com.senac.katalogo.model.Pedido;
import com.senac.katalogo.model.Regiao;
import com.senac.katalogo.repository.PedidoRepository;
import com.senac.katalogo.repository.RegiaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/relatorioVendasRegiao")
public class RelatorioVendasRegiaoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private RegiaoRepository regiaoRepository;

    @PostMapping
    public Map<String, Object> gerarRelatorioVendasRegiao(@RequestBody FiltroRelatorioDTO filtro) {
        String dataInicialStr = filtro.getDataInicial();
        String dataFinalStr = filtro.getDataFinal();
        String username = filtro.getUsername();

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

        System.out.println(dataInicial);
        System.out.println(dataFinal);
        System.out.println(username);

        // Consultar todos os pedidos do banco de acordo com o período definido (dataInicial e dataFinal)
//        List<Pedido> pedidos = pedidoRepository.findByDataPedidoBetween(dataInicial, dataFinal);

        List<Pedido> pedidos = pedidoRepository.findPedidosByUsernameAndDataPedidoBetween(username, dataInicial, dataFinal);


        // Restante do código para gerar o relatório de vendas por região

        Double valorTotalVendas = 0.0;
        Map<String, Integer> vendasPorRegiao = new HashMap<>();

        for (Pedido pedido : pedidos) {
            valorTotalVendas += pedido.getValorTotal();

            Integer regiaoId = pedido.getRegiao();
            Regiao regiao = regiaoRepository.findById(regiaoId).orElse(null);

            if (regiao != null) {
                Integer quantidadeVendas = vendasPorRegiao.getOrDefault(regiao.getNome(), 0);
                vendasPorRegiao.put(regiao.getNome(), quantidadeVendas + 1);
            } else {
                // Lidar com o caso em que a região não é encontrada
            }
        }

        // Calcular a porcentagem de vendas por região
        Map<String, Double> porcentagemVendasPorRegiao = new HashMap<>();
        List<Map<String, Object>> dadosGrafico = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : vendasPorRegiao.entrySet()) {
            String regiao = entry.getKey();
            Integer quantidadeVendas = entry.getValue();
            double porcentagemVendas = (double) quantidadeVendas / pedidos.size() * 100;
            System.out.println(porcentagemVendas + "Porcentagem");
            porcentagemVendasPorRegiao.put(regiao, porcentagemVendas);

            Map<String, Object> dadoRegiao = new HashMap<>();
            dadoRegiao.put("label", regiao);
            dadoRegiao.put("value", porcentagemVendas);

            dadosGrafico.add(dadoRegiao);
        }

        // Construir o mapa com os resultados do relatório
        Map<String, Object> relatorio = new HashMap<>();
        relatorio.put("valorTotalVendas", valorTotalVendas);
        relatorio.put("vendasPorRegiao", vendasPorRegiao);
        relatorio.put("porcentagemVendasPorRegiao", porcentagemVendasPorRegiao);
        relatorio.put("dadosGrafico", dadosGrafico);

        return relatorio;
    }
}
