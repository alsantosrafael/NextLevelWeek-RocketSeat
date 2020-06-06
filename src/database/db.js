//Linhas necessárias para criacao do database
//importar a dependencia (pacote) do sqlite3
const sqlite3 = require("sqlite3").verbose()//to pegando o metodo do objeto(verbose) que eu importei com require

//Iniciando/criando o objeto que irá realizar operacoes no banco de dados
const db = new sqlite3.Database("./src/database/database.db") //Inicializando construtor para criar meu arquivo database.db

//Nao iremos mais ficar acessando nosso banco de dados por aqui. Assim sendo, vamos exportar o objeto db
module.exports = db


//Vamos utilizar o objeto de banco de dados para nossas aplicacoes
// db.serialize(() => { // O serialize faz rodar uma sequencia de código que eu definir.
//     //To criando uma funcao anonima aqui para definir quais sequencias de codigo o serialize vai rodar
//     //1.Criando uma tabela no banco de dados. Obs: só a crase permite realizar quebra de linha e manter formatacao!
//     //Todas as funcionalidades abaixo estao sendo implementadas via codigo sql
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
    
//     `)
//     //Explicando código acima: Crie uma tabela chamada "places" se nao existir
//     //Em seguida, estou criando os atributos que essa tabela tem
//     //ao meu ID estou atribuindo a qualidade de inteiro, chave primaria(primeiro identificador) e incremental
//     //Os outros atributos sao so atributos normais com seus tipos
//     //2.inserindo dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]
//     // Nao podemos usar  arrow function (funcao anonima) com o .this!! Da erro!
//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }
        
//         console.log("Cadastro realizado com sucesso!!")
//         console.log(this)//Objeto que existe dentro da funcao-Referenciando a resposta que o db.run nos retorna
//             //Esse cara basicamente retorna todo o conteudo que foi cadastrado nesse DB.
//     }
//     db.run(query, values, afterInsertData)//Estou passando minha funcao como referencia, isto é, sem nenhum parametro!
//         //Se eu passasse algum parametro aqui, a funcao iria ser inicializada e chamada imediatamente.
//         //Mas eu quero que essa funcao seja apenas callback, por isso só depois da insercao dos dados ela vai ser inicializada!

//         //Explicando codigo acima:
//         //Agora que eu criei o db, eu necessito inserir seus atributos
//         //Assim, eu dou o comando insira em "places" () os valores ();
//         //Em places eu identifico os campos em em values eu coloco os valores   
//         //Em places eu nao preciso inserir o ID pq o proprio DB ja vai fazer isso para mim!    
//         //Em values eu preciso inserir algum valor, vazio nao da. Entao inicialmente eu coloco ? para todos.
//         //tipo Callback chama a funcao mais tarde novamente.
    
//         //3.consultando dados na tabela
//     db.all(`SELECT * FROM places`, function(err, rows){

//         if(err) {
//             return console.log(err)
//         }
//         console.log("Aqui estão os seus registros:")
//         console.log(rows)
//     })
//         //Explicando código acima:
//         //usei o DB.all, passei como parametro o SELECIONE tudo da tabela places
//         //passei como parametro uma funcao anonima callback que vai receber como parametros os erros e as colunas(registros da tabela)
//         //caso eu quisesse retornar apenas um dos registros, basta substituir o * pelo nome do registro que quero buscar, por exemplo city

        //4.edicao de dados na tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [7], function(err){ 

    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso!")

    // })

// })