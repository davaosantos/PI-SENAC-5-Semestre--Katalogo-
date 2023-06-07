package com.senac.katalogo.service;

import com.senac.katalogo.model.Pedido;
import com.senac.katalogo.model.Regiao;
import com.senac.katalogo.repository.PedidoRepository;
import com.senac.katalogo.repository.RegiaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PedidoService {
    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private RegiaoRepository regiaoRepository;

    public Pedido criarPedido(Pedido pedido) {
        // Defina a data do pedido como a data atual
        pedido.setDataPedido(new Date());

        // Salve o pedido no banco de dados
        return pedidoRepository.save(pedido);
    }
}
