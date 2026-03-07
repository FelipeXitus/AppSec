CREATE DATABASE IF NOT EXISTS testemed;
USE testemed;

CREATE TABLE IF NOT EXISTS paciente (
    id VARCHAR(36) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    estaAtivo BIT NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    possuiPlanoSaude BIT,
    planosSaude TEXT,
    historico TEXT,
    imagemUrl VARCHAR(255),
    role VARCHAR(20),
    PRIMARY KEY (id),
    UNIQUE KEY unique_cpf (cpf)
);

DELETE FROM paciente 
WHERE cpf IN ('78160552009', '12345678901');

INSERT INTO paciente 
(id, cpf, nome, email, estaAtivo, senha, telefone, possuiPlanoSaude, planosSaude, historico, imagemUrl, role)
VALUES
  (UUID(), '78160552009', 'Emerson Laranja', 'emerson@email.com', 1, 'Senh@forte123', '34999335522', 1,
   '[2]',
   '[{"condition": "sinusite", "severity": "moderado"}]',
   'https://img.freepik.com/fotos-gratis/designer-trabalhando-no-modelo-3d_23-2149371896.jpg',
   'PACIENTE'),

  (UUID(), '12345678901', 'Joana Silva', 'joana@email.com', 1, 'MinhaSenha123', '34999887766', 1,
   '[1, 3]',
   '[{"condition": "rinite", "severity": "leve"}, {"condition": "asma", "severity": "médio"}]',
   'https://img.freepik.com/fotos-premium/retrato-de-uma-jovem-brasileira-sorridente-em-um-vestido-mexicano-ai-gerado_632984-139.jpg',
   'PACIENTE');