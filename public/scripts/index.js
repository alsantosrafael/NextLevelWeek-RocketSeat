const buttonSearch = document.querySelector("#page-home main a")//To atribuindo a essa variavel o botao que eu criei no a da page-home main
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

console.log('escutador close',close)

buttonSearch.addEventListener("click", () => {
    console.log("entrou no escutador do botão")
    modal.classList.remove( "hide" )
    console.log(modal.classList)
})

close.addEventListener("click", ()=> {
    console.log("entrou no escutador do fechar")
    
    console.log(modal.classList)
    modal.classList.add( "hide" )
})

