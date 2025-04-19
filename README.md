📒 Sistema de Gestão de Clientes – Comércio S.A.

Este projeto tem como objetivo realizar a gestão de contatos da empresa Comércio S.A., através de um sistema digital eficiente e organizado.


📌 Descrição do Projeto

O sistema permite o cadastro, edição, exclusão, listagem e busca de clientes, assim como a gestão de seus respectivos contatos (como telefones e e-mails).


✅ Funcionalidades

Clientes:

• RF01: O sistema deve permitir o cadastro de clientes com os seguintes dados: Nome, CPF, Data de Nascimento e Endereço; 
• RF02: O sistema deve permitir a edição dos dados de um cliente cadastrado; 
• RF03: O sistema deve permitir a exclusão de um cliente cadastrado; 
• RF04: O sistema deve permitir a listagem de todos os clientes cadastrados; 
• RF05: O sistema deve permitir a busca de um cliente pelo Nome ou CPF.

Contatos
• RF06: O sistema deve permitir o cadastro de contatos para um cliente, contendo os seguintes dados: Tipo do Contato (Telefone, E-mail), Valor do Contato (número ou email) e Observação; 
• RF07: O sistema deve permitir a edição dos contatos de um cliente;
• RF08: O sistema deve permitir a exclusão de um contato de um cliente; 
• RF09: O sistema deve permitir a listagem de todos os contatos de um cliente específico. 


📋 Regras de Negócio

• RN01: Os campos Nome e CPF são obrigatórios no cadastro do cliente; 
• RN02: Os campos Tipo do Contato e Valor do Contato são obrigatórios no cadastro do contato; 
• RN03: O CPF informado deve ser único no sistema; 
• RN04: O Nome do cliente não pode estar vazio; 
• RN05: A Data de Nascimento deve ser válida; 
• RN06: Um cliente pode ter mais de um contato cadastrado; 
• RN07: Ao excluir um cliente, todos os seus contatos devem ser removidos do sistema; 
• RN08: O sistema deve validar os dados informados antes de permitir o cadastro ou edição.


🛠️ Tecnologias Utilizadas

Frontend: React, Styled Components, Input Mask
Backend: Java, Spring Boot, Maven
Banco de Dados: MySQL


🚀 Como Executar o Projeto

Pré-requisitos:
• npm ou yarn
• Java 17 ou superior
• Maven
• MySQL (ou outro, caso prefira)

Passo a passo:

• Banco de Dados:
# Configure o nome do usuário, senha e nome do banco no arquivo 'application.properties'
spring.datasource.url=jdbc:mysql://localhost:3306/NOME_BANCO
spring.datasource.username=USUÁRIO
spring.datasource.password=SENHA

# Rode o MySQL e crie o banco de dados
CREATE DATABASE NOME_BANCO

# Caso esteja utilizando outro banco de dados que não o MySQL é necessário que seja atualizado na linha 1 do arquivo 'application.properties'


• Backend:
# Navegue até o diretório do backend
cd backend-spring

# Compile o projeto
mvn clean install

# Execute a aplicação
mvn spring-boot:run


• Frontend: 
# Navegue até o diretório do frontend
cd frontend-react

# Instale as dependências
npm install

# Inicie o projeto
npm start


📄 Licença

Este projeto é de uso interno da empresa Comércio S.A.