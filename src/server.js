const express = require("express") //To pedindo(require) uma funcao "express" e armazenando na variavel express
const server = express() // To aplicando a funcao que eu armazenei na variavel express.

// importando o nosso banco de dados para o servidor
const db = require("./database/db")//nao preciso colocar o .js, ele ja entende!

//Configurar pasta public
server.use(express.static("public"))

//Habilitando o uso do req.body na nossa aplicacao
server.use(express.urlencoded({ extended: true}))

//Utilizando template-engine
const nunjucks = require("nunjucks")//Chamando o nunjucks para a variavel
nunjucks.configure("src/views", {//To passando alem da string um objeto com as variaveis express e noCache
    express: server,
    noCache: true
})

// Configurando caminhos da minha aplicacao
// Página inicial
//req é uma requisicao um pedido para o servidor
//res é a resposta do servidor
server.get("/", (req, res) => {//Verbo que faz a gnt conversar com o http. O / via get vai responder a um pedido
    //de aplicacao
    return res.render("index.html", { title: "Seu Marketplace de coleta de resíduos"}) //render é usado para usar o motor gráfico do nunjucks
})//Usar return para evitar ocorrencia de bugs

server.get("/create-point", (req, res) => {//To chamando rotas aqui
    
    //req.query: Query Strings da nossa URL
    //console.log(req.query)


    return res.render("create-point.html")
})
 
server.post("/save-point", (req, res) => {

    //req.body: o corpo do nosso formulário
    //console.log(req.body)//Pegando os dados do form enviados por post.
    //Inserindo dados no banco de dados
        const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    // Nao podemos usar  arrow function (funcao anonima) com o .this!! Da erro!
    function afterInsertData(err) {
        if(err) {
            return console.log(err)
            //return res.render("create-point.html")//, { saved: false})
        }
        
        console.log("Cadastro realizado com sucesso!!")
        console.log(this)//Objeto que existe dentro da funcao-Referenciando a resposta que o db.run nos retorna
            //Esse cara basicamente retorna todo o conteudo que foi cadastrado nesse DB.
        return res.render("create-point.html", { saved: true})
    }
    
    db.run(query, values, afterInsertData)

}) 


server.get("/search", (req, res) => {//To chamando rotas aqui, por isso nao preciso colocar o .html
    //Pegar os dados do banco de dados

    const search = req.query.search

    if (search == ""){
        //pesquisa vazia
        return res.render("search-results.html", { total: 0})
    }

    //Procura por cidade com nome aproximadamente igual (like)
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        //Mostrando a página HTML com os dados do banco de dados!
        return res.render("search-results.html", { places: rows, total: total})
    })
})

//ligando servidor
server.listen(3000)//Estou ligando meu servidor com um listener na porta 3000.
