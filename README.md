<p align="center">
<img src="simarko.png" alt="My cool logo"/>
</p>  

## [Smarkio]-watson-developer-cloud

Instruções de como executá-lo em um ambiente local.
Aplicação  em Node.js com banco de dados MySQL . 
A aplicação somente de uma página com dois painéis: no painel posicionado a esquerda, o
usuário poderá cadastrar novos comentários. No painel da direita todos os comentários
cadastrados devem ser listados.
Clique no botão "Gerar Audio" para realizar a conversão do comentário de texto para áudio, ultilizando a API **Text to Speech do IBM Watson**, e logo apos clicar no botão "Ouvir Audio" para reproduizi o audio gerado.


### Configrurando o banco de dados

executar o comando para cria o database:
````
CREATE DATABASE comentarios
````

No arquivo **/database/database.js**  é possivel alterar as configurações de conexão ao banco.
```
const connection = new Sequelize('comentarios','root','',{
    host:'localhost',
    dialect:'mysql'
});

```
### No arquivo /index.js
Altere a apikey e a url gerado na conta da IBM.
```
        const textToSpeech = new TextToSpeechV1({
            authenticator: new IamAuthenticator({ apikey: '**SuaApiKEY**' }),
            url: '**suaURl**'
 });
``` 
### No terminal
Acessando o terminal navegando para dentro do projeto e em seguida execute o comando:
***npm start***

### Acessando a aplicação no navegador: 
**http://localhost:8000/**

## Principais tecnologias utilizadas:


| Tecnologia                | Descrição                                                                           |            
| ------------------------- | ----------------------------------------------------------------------------------- | 
| `MySql`                   | Banco de dados                                                                      | 
| `Sequelize`               | ORM (Object-Relational Mapper) para Node. js,                                       | 
| `EJS`                     | EJS para transportarmos dados para o nosso front-end                                | 
| `Bootstrap`               | Crie sites rápidos e responsivos                                                    | 



















