
// Criei uma funcao chamada populateUFs. Criei uma variavel ufSelect que procura o meu item select com nome uf
//com o fetch eu peguei os estados no link
//criei uma funcao anonima que armazena os estados no formato json
//rodei um loop que passava a colecao item por item para a variavel state
//a variavel ufSelect passou para o html o conteudo



function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]") // Vou procurar e armazenar o select cujo nome é uf
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json() })
    .then( (states) =>{

        //state é uma variavel
        for(const state of states) {


            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )

}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city")
    const stateInput = document.querySelector("input[name=state")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text//Pegar o nome do estado correspondente ao seu id.


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>" // Limpei a variavel de cidades para que, ao trocar de estado, as cidades sejam as respectivas ao estado escolhido
    citySelect.disabled = true//Reabilitei o travamento dessa opcao.

    fetch(url)
    .then( (res) => {return res.json() })
    .then ( cities => {
       

        for (const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}`
        }

        citySelect.disabled = false
    })
}

 

document
    .querySelector("select[name=uf]")//Vou mandar procurar o item select cujo nome é uf
    .addEventListener("change", getCities)//Funcionalidade fica ouvindo eventos.Quando muda, executa funcao!
    
//Vou a partir de agora definir o que vai acontecer com cada item ao ser selecionado no itens de coleta

// Criei uma variável que vai pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")//vou pegar todos os Li que estiverem no .items-grid li e armazenar 
//Agora, faco um loop para adicionar um ouvidor de eventos do tipo click para cada item presente em itemsToCollect
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items")

let selectedItems = [] // Let cria variavel!

//Aqui to só fazendo um teste pra ver se tá dando tudo certo
function handleSelectedItem(event) {
    const itemLi = event.target
    
    
    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")


    const itemId = itemLi.dataset.id//Pegando aqui apenas o data-id de cada item li.Armazenei os data-id em uma variavel
    //Precisamos agora definir um algoritmo que resolva os seguintes problemas:

    console.log('ITEM ID: ', itemId)
    //Verificar se existem itens selecionados com o click do mouse
    //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {//funcao anonima com uum unico parametro

        const itemFound = item == itemId
        return itemFound
    })

    //se já estiverem selecionados, 
    if( alreadySelected >= 0 ){
        //tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else{
         // se nao estiver selecionado
        //  Adiciocar a selecao
        selectedItems.push(itemId)//inserindo itemId na colecao
        
        
    } 

    console.log('selectedItems: ', selectedItems)
    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}


    