const express = require("express") //To pedindo(require) uma funcao "express" e armazenando na variavel express
const server = express() // To aplicando a funcao que eu armazenei na variavel express.


//Configurar pasta public
server.use(express.static("public"))

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
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {//To chamando rotas aqui
    return res.render("search-results.html")
})

//ligando servidor
server.listen(3000)//Estou ligando meu servidor com um listener na porta 3000.
