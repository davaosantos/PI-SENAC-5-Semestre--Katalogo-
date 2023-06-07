package com.senac.katalogo.controller;

import com.senac.katalogo.model.Pedido;
import com.senac.katalogo.model.Regiao;
import com.senac.katalogo.repository.RegiaoRepository;
import com.senac.katalogo.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/vendas")
public class PedidoController {
    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private RegiaoRepository regiaoRepository;

    @PostMapping
    public ResponseEntity<?> criarPedido(@RequestBody Pedido pedido, @RequestParam("selectedRegion") int selectedRegion) {
        System.out.println(pedido.getRegiao() + "AQUIIII");

        pedido.setRegiao(selectedRegion);

        Pedido pedidoCriado = pedidoService.criarPedido(pedido);
        return ResponseEntity.ok(pedidoCriado);
    }
}
