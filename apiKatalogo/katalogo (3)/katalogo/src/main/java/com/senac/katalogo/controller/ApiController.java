package com.senac.katalogo.controller;


import com.senac.katalogo.model.*;
import com.senac.katalogo.repository.EstabelecimentoRepository;
import com.senac.katalogo.repository.ProdutoRegiaoRepository;
import com.senac.katalogo.repository.ProdutosRepository;
import com.senac.katalogo.service.AuthService;
import com.senac.katalogo.service.EstabelecimentoService;
import com.senac.katalogo.utils.UtilsKatalogo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ApiController {

    @Autowired
    private ProdutosRepository produtoRepository;

    @Autowired
    private ProdutoRegiaoRepository produtoRegiaoRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private EstabelecimentoService estabelecimentoService;

    @RequestMapping(value = "/teste", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public String teste() {
        return "Ola katalogo";
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> credentials, HttpServletResponse response) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        String profile = authService.authenticate(username, password);
        if (profile != null) {
            response.addCookie(new Cookie("profile", profile));
            return "Login successful";
        } else {
            return "Invalid username or password";
        }
    }

    @PostMapping("/filtroProduto")
    public List<Produto> filtrarProdutos(@RequestBody Filtro filtro) {
        Integer regiao = converterRegiao(filtro.getRegiao());

        return produtoRepository.findByCategoriaAndRegioes(filtro.getCategoria(), Collections.singletonList(regiao));
    }

    @PostMapping("/filtroEstabelecimento")
    public List<Estabelecimento> filtrarEstabelecimentos(@RequestBody Filtro filtro) {

        System.out.println(filtro.getRegiao());
        Integer regiao = converterRegiao(filtro.getRegiao());

        System.out.println(regiao);
        return estabelecimentoRepository.findEstabelecimentos(Long.parseLong(regiao.toString()));
    }

    private Integer converterRegiao(String regiao) {
        switch (regiao) {
            case "sul":
                return 1;
            case "sudeste":
                return 2;
            case "centro-oeste":
                return 3;
            case "norte":
                return 4;
            case "nordeste":
                return 5;
            default:
                throw new IllegalArgumentException("Região inválida: " + regiao);
        }
    }

    @PostMapping(value = "/cadastroProduto", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> cadastrarProduto(@RequestParam("nome") String nome,
                                                   @RequestParam("preco") String preco,
                                                   @RequestParam("categoria") String categoria,
                                                   @RequestParam("imagem") MultipartFile imagem,
                                                   @RequestParam("regiao") List<Integer> regiao) {
        try {

            // Cria um novo objeto Produto com as informações fornecidas
            Produto produto = new Produto(nome, Double.valueOf(preco), categoria, imagem.getBytes());
            produtoRepository.save(produto);

            // Obtém o ID do produto gerado pelo auto-increment
            Long produtoId = produto.getId();

            System.out.println(produtoId);


            // Cria um novo objeto ProdutoRegiao para cada região selecionada
            for (Integer r : regiao) {
                ProdutoRegiao produtoRegiao = new ProdutoRegiao(produto, Arrays.asList(r));
                // Salva a associação entre produto e região no banco de dados
                produtoRegiaoRepository.save(produtoRegiao);
            }

            return new ResponseEntity<>("Produto cadastrado com sucesso!", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erro ao cadastrar produto.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //Cadastro de estabelecimento
    @Autowired
    private EstabelecimentoRepository estabelecimentoRepository;

    @PostMapping("/cadastroEstabelecimento")
    public ResponseEntity<?> cadastrarEstabelecimento(@RequestParam("nome") String nome,
                                                      @RequestParam("descricao") String descricao,
                                                      @RequestParam("regiao")String regiao,
                                                      @RequestParam("imagem") MultipartFile imagem
                                                      ) throws IOException {


        System.out.println(nome);
        estabelecimentoService.criarEstabelecimento(nome, descricao, UtilsKatalogo.toRegioes(regiao), imagem);
        return ResponseEntity.ok("Estabelecimento cadastrado com sucesso!");
    }

}
