-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22-Mar-2022 às 13:00
-- Versão do servidor: 10.4.22-MariaDB
-- versão do PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `senai`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `agendas`
--

CREATE TABLE `agendas` (
  `id` int(11) NOT NULL,
  `id_ambiente` int(11) NOT NULL,
  `id_turma` int(11) NOT NULL,
  `id_docente` int(11) NOT NULL,
  `data_inicial` datetime NOT NULL,
  `data_final` datetime NOT NULL,
  `id_agenda` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `agendas`
--

INSERT INTO `agendas` (`id`, `id_ambiente`, `id_turma`, `id_docente`, `data_inicial`, `data_final`, `id_agenda`) VALUES
(2, 2, 2, 3, '2022-01-25 00:00:00', '2022-01-26 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `ambientes`
--

CREATE TABLE `ambientes` (
  `id` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `capacidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `ambientes`
--

INSERT INTO `ambientes` (`id`, `id_tipo`, `capacidade`) VALUES
(1, 2, 555),
(2, 2, 45);

-- --------------------------------------------------------

--
-- Estrutura da tabela `componentes`
--

CREATE TABLE `componentes` (
  `id` int(11) NOT NULL,
  `materia` varchar(100) NOT NULL,
  `carga_horaria` float(7,5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `componentes`
--

INSERT INTO `componentes` (`id`, `materia`, `carga_horaria`) VALUES
(2, 'LIMAAAAA', 45.00000),
(3, 'ELETÔNICA', 45.00000);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_ambientes`
--

CREATE TABLE `tipo_ambientes` (
  `id` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tipo_ambientes`
--

INSERT INTO `tipo_ambientes` (`id`, `tipo`) VALUES
(1, 'INFORMATICAAA'),
(2, 'MECANICA'),
(4, 'ELETRONICAAAAA');

-- --------------------------------------------------------

--
-- Estrutura da tabela `turmas`
--

CREATE TABLE `turmas` (
  `id` int(11) NOT NULL,
  `curso` varchar(100) NOT NULL,
  `alunos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `turmas`
--

INSERT INTO `turmas` (`id`, `curso`, `alunos`) VALUES
(1, '1DES', 40),
(2, '2DES', 40);

-- --------------------------------------------------------

--
-- Estrutura da tabela `turma_componentes`
--

CREATE TABLE `turma_componentes` (
  `id` int(11) NOT NULL,
  `id_turma` int(11) NOT NULL,
  `id_componente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(75) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `foto` longtext DEFAULT NULL,
  `cpf` varchar(20) NOT NULL,
  `resetsenha` tinyint(1) DEFAULT NULL,
  `carga_horaria` int(50) DEFAULT NULL,
  `formacao` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `telefone`, `cargo`, `email`, `senha`, `foto`, `cpf`, `resetsenha`, `carga_horaria`, `formacao`) VALUES
(1, 'DANILO FALCIROLI Xi', '19.9.1122-3344', 'coordenador', 'danilo@senai.com', '202cb962ac59075b964b07152d234b70', '', '111.222.333-xx', NULL, NULL, NULL),
(3, 'CARLOS FALCIROLI', '19.9.1122-3344', 'professor', 'carlos@senai.com.br', '202cb962ac59075b964b07152d234b70', '', '111.222.333-90', NULL, NULL, NULL),
(4, 'MATHEUS FALCIROLI', '19.9.1122-3344', 'professor', 'pepapig@senai.com.br', '202cb962ac59075b964b07152d234b70', '', '111.222.333-90', NULL, NULL, NULL),
(5, 'PARAGUA', '19.9.1122-3344', 'coordenador', 'paragua@senai.com.br', '202cb962ac59075b964b07152d234b70', '', '111.222.333-10', NULL, NULL, NULL),
(6, 'PARAGUAÇU', '19.9.1122-3344', 'coordenador', 'paraguacu@senai.com.br', '202cb962ac59075b964b07152d234b70', 'data:image/jpeg;base64,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', '111.222.333-11', 0, 20, 'ENSINO FUNDAMENTAL');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `agendas`
--
ALTER TABLE `agendas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_ambiente` (`id_ambiente`),
  ADD KEY `id_turma` (`id_turma`),
  ADD KEY `id_docente` (`id_docente`),
  ADD KEY `id_agenda` (`id_agenda`);

--
-- Índices para tabela `ambientes`
--
ALTER TABLE `ambientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tipo` (`id_tipo`);

--
-- Índices para tabela `componentes`
--
ALTER TABLE `componentes`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tipo_ambientes`
--
ALTER TABLE `tipo_ambientes`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `turmas`
--
ALTER TABLE `turmas`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `turma_componentes`
--
ALTER TABLE `turma_componentes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_turma` (`id_turma`),
  ADD KEY `id_componente` (`id_componente`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agendas`
--
ALTER TABLE `agendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `ambientes`
--
ALTER TABLE `ambientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `componentes`
--
ALTER TABLE `componentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tipo_ambientes`
--
ALTER TABLE `tipo_ambientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `turmas`
--
ALTER TABLE `turmas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `turma_componentes`
--
ALTER TABLE `turma_componentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `agendas`
--
ALTER TABLE `agendas`
  ADD CONSTRAINT `agendas_ibfk_1` FOREIGN KEY (`id_ambiente`) REFERENCES `ambientes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `agendas_ibfk_2` FOREIGN KEY (`id_turma`) REFERENCES `turmas` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `agendas_ibfk_3` FOREIGN KEY (`id_docente`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `agendas_ibfk_4` FOREIGN KEY (`id_agenda`) REFERENCES `ambientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Limitadores para a tabela `ambientes`
--
ALTER TABLE `ambientes`
  ADD CONSTRAINT `ambientes_ibfk_1` FOREIGN KEY (`id_tipo`) REFERENCES `tipo_ambientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `turma_componentes`
--
ALTER TABLE `turma_componentes`
  ADD CONSTRAINT `turma_componentes_ibfk_1` FOREIGN KEY (`id_turma`) REFERENCES `turmas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `turma_componentes_ibfk_2` FOREIGN KEY (`id_componente`) REFERENCES `componentes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
