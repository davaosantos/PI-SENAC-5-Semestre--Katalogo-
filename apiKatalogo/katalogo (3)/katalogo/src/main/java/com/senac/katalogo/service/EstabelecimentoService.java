package com.senac.katalogo.service;


import com.senac.katalogo.model.Estabelecimento;
import com.senac.katalogo.model.Regioes;
import com.senac.katalogo.repository.EstabelecimentoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class EstabelecimentoService {

    private EstabelecimentoRepository repository;

    public EstabelecimentoService(EstabelecimentoRepository repository) {
        this.repository = repository;
    }

    public Estabelecimento criarEstabelecimento(String nome, String descricao, Regioes regiao, MultipartFile imagem) throws IOException {
        Estabelecimento estabelecimento = new Estabelecimento();
        estabelecimento.setNome(nome);
        estabelecimento.setDescricao(descricao);
        estabelecimento.setImagem(imagem.getBytes());
        estabelecimento.setRegiao(regiao);
        return repository.save(estabelecimento);
    }

//    public List<Estabelecimento> buscarEstabelecimentos(Integer idRegiao) {
//        return repository.findEstabelecimentos(idRegiao);
//    }


}
