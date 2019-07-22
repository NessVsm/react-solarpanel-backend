<b> INFORMAÇOES GERAIS</b><br />
O principal objetivo deste projeto é a criação de uma API RESTful capaz de exibir os dados de painéis solares localizados nos EUA tendo como principal parâmetro o estado do usuário logado. 
<br /><br />

<b> COMO RODAR O PROJETO</b><br />

No diretório principal, digite o comando npm install, que será responsável pela instalação de todas as dependências utilizadas. Uma vez finalizada a instalação, digite o comando <b> npm start </b>, que irá iniciar o servidor na porta 3000. Caso seja necessária a alteração da porta (na situação desta já estar sendo utilizada, por exemplo) o seguinte trecho do código pode ser alterado:<br />


```
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})
``` 
<br />

<b> REGRAS GERAIS </b><br />

Para utilização da API é necessária a existência de um banco de dados PostgreSQL para consulta dos dados do usuário e dos panéis solares que, devido ao seu tamanho, não foram disponibillizados. A criação da tabela de Usuários seguiu os padrões apresentados abaixo, ao passo que a de Painéis Solares foi realizada a partir da conversão dos dados do json em colunas de mesmo nome.<br /><br />


<b>FERRAMENTAS</b><br />

As seguintes ferramentas foram utilizadas na construção deste projeto:<br />
<ol>
  <li><b> Node.js </b> - Interpretador de código Javascript para construção de aplicações Web </li><br />
  <li><b> Express </b> - Framework para Nodejs </li><br />
  <li><b> JWT </b> - Gerador de token para autenticação do usuário no sistema </li><br />
  <li><b> PostgreSql </b> - Banco de dados relacional utilizado </li><br />
  <li><b> Nodemon </b> - Reinicia o servidor sempre que são feitas alterações </li><br />
  <li><b> Bycripts </b> - Utilizado para encriptação de senha  </li><br />
  <li><b> Postman </b> - Programa utilizado para teste da API  </li><br />
 </ol>
<br /><br />


<b>FUNCIONALIDADES</b><br />
<ol>
  <li> 
    <b> Fazer login </b><br />
      Usuário informa dados para login no sistema. Obrigatório para todas as requisições
  </li><br />
  <li> 
    <b> Cadastrar Novo Usuário </b><br />
    Cadastra um novo usuário no sistema. Os dados a serem informados incluem:<br />
    <ul>
      <li><b> E-mail</b> - VARCHAR (50) </li> <br />
      <li><b> Estado ( State ) </b> - VARCHAR (3) </li><br />
      <li><b> CEP ( Zipcode ) </b> - VARCHAR (100) </li><br />
      <li><b> Nome ( Name ) </b> - VARCHAR(100) </li><br />
      <li><b> Usuário ( Username) </b> - VARCHAR (100) </li><br />
      <li><b> Senha ( Password ) </b> - VARCHAR (100) </li><br />
     </ul>
   <br />
    O e-mail do usuário é um campo único, ou seja, não podem existir dois usuários com o mesmo e-mail cadastrados no    sistema. Todos os campos são obrigatórios.
  </li><br />
  <li>
    <b> Consultar Usuários </b><br />
    Lista todos os usuários cadastrados no sistema.
  </li><br />
  <li> 
    <b> Consultar Usuário por id </b><br />
    Exibe informações do usuário de acordo com seu id<br />
  </li><br />
  <li> 
    <b> Deletar Usuário </b><br />
    Busca e deleta usuário de acordo com o id passado<br />
  </li><br />
    
</ol><br /><br />

<b>REGRAS</b><br />
<ul>
  <li> Para que o sistema funcione corretamente, é necessário que o usuário primeiramente realize o Login</li><br />
  <li> Caso o usuário não esteja cadastrado, é possível adicionar um novo usuário</li><br />
  <li> Nenhuma requisição poderá ser realizada se o usuário não estiver logado. A sessão expira após 5 minutos e será, então, necessário um novo login. </li><br />
  <li> Os usuários só poderão ver informações correspondente aos seus estados (definidos no momento do cadastro), </li><br />
 </ul>
<b>REQUISIÇOES HTTP</b><br /><br />
<table>
  <thead>
      <th><b> Método </b> </th>
      <th><b> Parâmetros </b> </th>
      <th><b> Url </b> </th>
      <th><b> Descrição </b> </th>
  </thead>
  <tbody>
    <tr>
        <td><b> GET </b></td>
        <td> -- </td>
        <td> localhost:3000/ </td>
        <td> Exibe mensagem padrão "Bem vindo à API" </td>
      </tr>
     <tr>
        <td><b> POST </b></td>
        <td> -- </td>
        <td> localhost:3000/login </td>
        <td> Página na qual deverão ser informados e-mail e senha do usuário, ambos obrigatórios, para autenticação </td>
      </tr>
      <tr>
        <td><b> GET</b></td>
        <td> -- </td>
        <td> localhost:3000/users </td>
        <td> Lista todos os usuários por ordem de inserção </td>
      </tr>
      <tr>
        <td><b> GET</b></td>
        <td> /{id} </td>
        <td> localhost:3000/users/1 </td>
        <td> Exibe informações do usuário cujo id corresponda ao valor '1' </td>
      </tr>
      <tr>
        <td><b> POST</b></td>
        <td> -- </td>
        <td> localhost:3000/users </td>
        <td> Insere um novo usuário no sistema, uma vez que todos os campos do cadastro tenham sido informados </td>
      </tr>
     <tr>
        <td><b> DELETE </b></td>
        <td> -- </td>
        <td> localhost:3000/users,1 </td>
        <td> Deleta o usuário que possue o id informado </td>
      </tr>
      <tr>
        <td><b> GET </b></td>
        <td> -- </td>
        <td> localhost:3000/solar_data </td>
        <td> Retorna informações de todos os dados de painéis solares do sistema.<br />
Este endpoint serve apenas como consulta e não deverá ser utilizado no sistema </td>
      </tr>
     <tr>
        <td><b> GET </b></td>
        <td> -- </td>
        <td> localhost:3000/solar_data/CA </td>
        <td> Retorna informações de todos os dados de painéis solares de acordo com o estado passado como parâmetro.</td>
      </tr>
  </tbody>
 </table>
<br /><br />    

<b> ERROS</b><br />
<ul>
  <li><b>Falha ao autenticar o token</b><br />
Este erro ocorre quando a requisição não reconhece a existência do 'x-access-token' no header e/ou este está expirado
  </li>
  <li><b> Usuário não encontrado </b><br />
O id passado na requisição não corresponde a nenhum usuário existente no sistema
  </li>
  <li><b>O usuário não está autorizado a fazer essa requisição</b><br />
Usuário tenta acessar dados de painéis solares que não são do seu estado
  </li>
  <li><b> usuário e senha não correspondem </b><br />
Usuário e/ou senha informados no login não estão corretos
  </li>
  <li><b> Usuário não encontrado</b><br />
O usuário não está cadastrado
  </li>
