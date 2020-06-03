
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

    fetch(url)
    .then( (res) => {return res.json() })
    .then ( cities => {

        for (const city of cities ){

            citySelect.innerHTML += `<option value="${city.id}">${city.nome}`
        }

        citySelect.disabled = false
    })


}





document
    .querySelector("select[name=uf]")//Vou mandar procurar o item select cujo nome é uf
    .addEventListener("change", getCities)//Funcionalidade fica ouvindo eventos.Quando muda, executa funcao!
    
        