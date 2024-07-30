# DomainExec - FrontEnd

O DomainExec é um programa web desenvolvido com Next.js, SQLite e Tailwind CSS. Ele permite a execução de comandos PowerShell e CMD em computadores dentro de um domínio específico. Com esta ferramenta, você pode cadastrar comandos, tipos de terminais e, em breve, adicionar uma lista de computadores.

## Funcionalidades ##
### Cadastro de Comandos: 
  Permite adicionar, editar e excluir comandos que serão executados nos computadores.
### Tipos de Terminais: 
  Permite cadastrar diferentes tipos de terminais (PowerShell, CMD).
### Execução Remota: 
  Conecta a uma porta específica de computadores dentro do domínio e executa os comandos cadastrados.
### (Em Desenvolvimento) Lista de Computadores:
  Possibilidade de gerenciar uma lista de computadores no sistema.

## Tecnologias Utilizadas
### Next.js: 
  Framework React para desenvolvimento web.
### SQLite: 
  Banco de dados leve e auto contido.
### Tailwind CSS: 
  Framework CSS para estilização rápida e customizável.

### Requisitos
## Node.js (versão 14 ou superior)
npm ou yarn
## SQLite

### Instalação
Clone o repositório:

bash
git clone https://github.com/seu-usuario/remote-command-executor.git
cd remote-command-executor
Instale as dependências:

bash
npm install
# ou
yarn install
Configure o banco de dados SQLite:

## Inicie o servidor de desenvolvimento:
bash
npm run dev
# ou
yarn dev

## Acesse o aplicativo no navegador:

## Adicione as variaveis de ambiente
NEXT_PUBLIC_USER = usuario com permissao de admin 
NEXT_PUBLIC_USER_PASS = senha do usuario com permisao de admin
NEXT_PUBLIC_DOMAIN = dominio em que esta os computadores

bash
Copiar código
http://localhost:3000

## Configuração
Porta de Conexão: Certifique-se de configurar a porta correta para conexão com os computadores dentro do domínio no arquivo de configuração.

## Uso
Acesse a interface web.
Navegue até a seção de Cadastro de Comandos para adicionar novos comandos.
Selecione o tipo de terminal (PowerShell ou CMD).
Execute os comandos nos computadores cadastrados.

## Contribuição
Fork o projeto.
Crie uma branch para sua feature (git checkout -b feature/nova-feature).
Commit suas mudanças (git commit -m 'Adiciona nova feature').
Push para a branch (git push origin feature/nova-feature).
Abra um Pull Request.
Licença
Este projeto está licenciado sob a MIT License.
