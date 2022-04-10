var menuLoaded = false;
var plantShow = false;

// leia o arquivo de dados de plantas
var jsonData;    
fetch("data.json")
.then(
function(u){
    return u.json();
})
.then(
function(json){
    jsonData = json;
})
.then(function(){

    // quando o usuário entrar na pagina pela primeira vez
    // detecte que pagina é, mude o url e mostre ela
    console.log("usuário acabou de abrir ou recarregar a pagina");

    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var urlPlant = urlParams.get('planta')
    if(urlPlant == null){
        window.history.replaceState({"page": "menu"}, "menu", "/");
        menu();
    } else {
        window.history.replaceState({"page": urlPlant}, urlPlant, urlPlant);
        plant(urlPlant);
    }
});

// quando o usuário clicar em alguma planta ou no botão de menu
// detecte que pagina é, mude o url adicionando ele ao historico e mostre a pagina
function clicked(button){
    console.log("usuário clicou em algum botão");

    if(button == "menu"){
        window.history.pushState({"page": "menu"}, "menu", "/");
        menu();
    } else {
        window.history.pushState({"page": button}, button, button);
        plant(button);
    }
}

// quando o usuário clicar no botão de voltar ou avançar
// detecte que pagina é e mostre ela
window.onpopstate = function(event) {
    console.log("usuário voltou ou avançou uma pagina");

    var page = event.state.page;
    if(page == "menu"){
        menu();
    } else {
        plant(page);
    }
};

// abrir pagina de planta
function plant(plant){
    console.log("abrindo planta: " + plant);

    var plantID;
    for(var i = 0; i < jsonData.plants.length; i++){
        if(plant.toLowerCase() == jsonData.plants[i].name.toLowerCase()){
            plantID = i;
        }
    }
    if(plantID == null) throw "nenhuma planta encontrada com nome: " + plant;

    document.getElementById("plant-scroll").scrollTop = 0;
    document.getElementById("background").style.backgroundImage = "url("+jsonData.plants[plantID].image+")";

    document.getElementById("name").innerHTML = jsonData.plants[plantID].name;
    document.getElementById("image").src = jsonData.plants[plantID].image;
    document.getElementById("scientific").innerHTML = jsonData.plants[plantID].scientificName;

    document.getElementById("reino").innerHTML = jsonData.plants[plantID].Reino;
    document.getElementById("pedido").innerHTML = jsonData.plants[plantID].Pedido;
    document.getElementById("familia").innerHTML = jsonData.plants[plantID].Família;
    document.getElementById("subfamilia").innerHTML = jsonData.plants[plantID].Subfamília;
    document.getElementById("genero").innerHTML = jsonData.plants[plantID].Gênero;
    document.getElementById("especies").innerHTML = jsonData.plants[plantID].Espécies;
    document.getElementById("nomebinomial").innerHTML = jsonData.plants[plantID].Nomebinomial;

    document.getElementById("general").innerHTML = jsonData.plants[plantID].general;
    document.getElementById("characteristics").innerHTML = jsonData.plants[plantID].characteristics;

    if(!plantShow){
        console.log("subindo pagina");

        plantShow = true;
        document.getElementById("plant").classList.add("show");
    }
}

// abrir pagina de menu
function menu(){
    console.log("abrindo menu");
    
    if(plantShow){
        console.log("descendo pagina");

        plantShow = false;
        document.getElementById("plant").classList.remove("show");
    }

    if (!menuLoaded){
        console.log("carregando plantas");
        for(var i = 0; i < jsonData.plants.length; i++){
            var button = document.createElement("button");
            button.classList.add("btn");
            button.setAttribute("onclick", "clicked('"+jsonData.plants[i].name+"')");

            var card = document.createElement("div");
            card.classList.add("card");
            card.style= "background-image: url('"+jsonData.plants[i].image+"');";
            
            var gradient = document.createElement("div");
            gradient.classList.add("gradient");
            
            var title = document.createElement("h2");
            title.classList.add("title");
            
            var text = document.createTextNode(jsonData.plants[i].name);

            title.appendChild(text);
            card.appendChild(gradient);
            card.appendChild(title);
            button.appendChild(card);
            document.getElementById("content").appendChild(button);
        }
        menuLoaded = true;
    }
}