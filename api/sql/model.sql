/* USERS DB*/

CREATE TABLE tbTarefas(
	id INT AUTO_INCREMENT,
    nome VARCHAR(128) NOT NULL,
    detalhes VARCHAR (512),
    dataInicio DATETIME,
    dataFim DATETIME,
    dataInicioString VARCHAR(32),
    dataFimString VARCHAR(32),
    possuiHoraInicio BOOL DEFAULT false,
    possuiHoraFim BOOL DEFAULT false,
    prioridade INT NOT NULL,
    estado INT NOT NULL,
    PRIMARY KEY (id)
) engine = innodb;

CREATE TABLE tbProjects(
    id INT AUTO_INCREMENT,
    nome VARCHAR(64) NOT NULL,
    dataInicio DATETIME,
    dataFim DATETIME,
    dataInicioString VARCHAR(64),
    dataFimString VARCHAR(64),
    situacao VARCHAR(64),
    PRIMARY KEY (id)
) engine = innodb;

CREATE TABLE tbProjetoTarefas(
    id INT AUTO_INCREMENT,
    nome VARCHAR(92),
    projeto INT NOT NULL,
    dataInicio DATETIME,
    dataFim DATETIME,
    dataInicioString VARCHAR(64),
    dataFimString VARCHAR(64),
    estado INT NOT NULL,
    dataFinalizado DATETIME,
    dataFinalizadoString DATETIME,
    prioridade INT NOT NULL,
    tarefaPai INT,
    PRIMARY KEY (id),
    FOREIGN KEY (projeto) REFERENCES tbProjetos(id),
    FOREIGN KEY (tarefaPai) REFERENCES tbProjetoTarefas(id)
) engine = innodb;

/* SYSTEM'S DB*/

CREATE TABLE tbUsuarios(
    id INT AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    senha VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
) engine = inodb;