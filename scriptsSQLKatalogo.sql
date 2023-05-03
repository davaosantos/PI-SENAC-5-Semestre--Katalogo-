-- CONECTA NO BANCO
USE katalogo;

-- MOSTRA AS TABELAS
SHOW tables;

DESCRIBE produto;
DESCRIBE produto_regiao;
DESCRIBE produto_regiao_regioes;
DESCRIBE regioes;

-- CRIANDO RELAÇÃO ESTABELECIMENTO E REGIAO
CREATE TABLE estabelecimentos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  descricao VARCHAR(255) NOT NULL
);


ALTER TABLE estabelecimentos
ADD COLUMN regiao_id INT NOT NULL,
ADD CONSTRAINT fk_estabelecimentos_regioes FOREIGN KEY (regiao_id) REFERENCES regioes (id);