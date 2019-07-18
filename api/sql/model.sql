CREATE DATABASE dbStockolmo;
USE dbStockolmo;

CREATE TABLE tbTarefas(
	id INT AUTO_INCREMENT,
    nome VARCHAR(128) NOT NULL,
    dataInicio DATETIME,
    dataFim DATETIME,
    dataInicioString VARCHAR(64),
    dataFimString VARCHAR(64),
    prioridade VARCHAR(16) NOT NULL,
    estado INT NOT NULL,
    dataFinalizado DATETIME,
    dataFinalizadoString DATETIME,
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
    FOREIGN KEY (projeto) REFERENCES tbProjetos(id)
    FOREIGN KEY (tarefaPai) REFERENCES tbProjetoTarefas(id)
) engine = innodb;