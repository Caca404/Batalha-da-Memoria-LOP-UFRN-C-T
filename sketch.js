var tela, isDrawed, isPlay, autor, prof, cardSelected, cardSelectedObject, difficulty;
var blockSelection = false;

function preload() {
  autor = loadImage('autor.png');
  prof = loadImage('prof.jpg');
}

function setup() {
  createCanvas(620, 650);
  tela = 1;
  isPlay = 0;
  isDrawed = 0;
}

function draw() {
  
  background("#5A5A5A");
  
  switch(tela)
  {
    case 1:
        menuIniciar();
      break;
    case 2:
        dificuldade();
        // isPlay = 1;
      break;
    case 3:
        menuInstrucoes();
      break;
    case 4:
        menuCreditos();
      break;
    default:
        alert("Algo deu errado!");
      break;
  }
}

function menuIniciar(){
  if(!isDrawed){
    var firstButtonPositionX = 250;
    var firstButtonPositionY = 220;
    var buttonDistance = 70;
    var titlePositionY = 15;
    var startGame, instructions, credits;
    
    // Limpando a tela
    clearBtns();
    
    // Titulo
    var title = createElement("h1");
    title.position(firstButtonPositionX - 80, titlePositionY);
    (title.elt).textContent = "Batalha da memória";
    (title.elt).classList.add("title-primary");
    
    // Iniciar Jogo
    startGame = createButton('Iniciar Jogo');
    startGame.position(firstButtonPositionX, firstButtonPositionY);
    (startGame.elt).classList.add("btn");
    
    // Instruções do Jogo
    instructions = createButton('Instruções');
    instructions.position(firstButtonPositionX, firstButtonPositionY + buttonDistance);
    (instructions.elt).classList.add("btn");
    
    // Créditos
    credits = createButton('Créditos');
    credits.position(firstButtonPositionX, firstButtonPositionY + buttonDistance*2);
    (credits.elt).classList.add("btn");
    
    // Colocando eventos nos botões
    startGame.mousePressed(function(){
      tela = 2;
      isPlay = 0;
      isDrawed = 0;
    });
    
    instructions.mousePressed(function(){
      tela = 3;
      isDrawed = 0;
      isPlay = 0;
    });
    
    credits.mousePressed(function(){
      tela = 4;
      isDrawed = 0;
      isPlay = 0;
    });

    isDrawed = 1;
  }
}

function dificuldade(){
  if(!isDrawed){
    var firstButtonPositionX = 250;
    var firstButtonPositionY = 120;
    var buttonDistance = 70;
    var titlePositionY = 15;
    var facil, normal, dificil, back;
    
    // Limpando a tela
    clearBtns();
    
    // Titulo
    var title = createElement("h1");
    title.position(firstButtonPositionX - 18, titlePositionY);
    (title.elt).textContent = "Dificuldade";
    (title.elt).classList.add("title-primary");
    
    // Fácil
    facil = createButton('Fácil');
    facil.position(firstButtonPositionX, firstButtonPositionY);
    (facil.elt).classList.add("btn");
    
    // Normal
    normal = createButton('Normal');
    normal.position(firstButtonPositionX, firstButtonPositionY + buttonDistance);
    (normal.elt).classList.add("btn");
    
    // Dificil
    dificil = createButton('Difícil');
    dificil.position(firstButtonPositionX, firstButtonPositionY + buttonDistance*2);
    (dificil.elt).classList.add("btn");
    
    // Voltar
    back = createButton('Voltar');
    back.position(firstButtonPositionX, firstButtonPositionY + buttonDistance*3 + 25);
    (back.elt).classList.add("btn");
    
    // Colocando eventos nos botões
    facil.mousePressed(function(){
      isDrawed = 0;
      startGame(1);
    });
    normal.mousePressed(function(){
      isDrawed = 0;
      startGame(2);
    });
    dificil.mousePressed(function(){
      isDrawed = 0;
      startGame(3);
    });
    
    back.mousePressed(function(){
      tela = 1;
      isDrawed = 0;
      isPlay = 0;
    });

    isDrawed = 1;
  }
}



function startGame(dificuldade){
  if(!isDrawed){
    var firstButtonPositionX = 220;
    var firstButtonPositionY = 275;
    var lastCardPositionY = 350;
    var addCardX = 0;
    var addCardY = 0;
    
    var vetorPaises = ["belgica", "brasil", "franca", "inglaterra", "japao", "marrocos", "uruguai", "alemanha"];
    
    if(dificuldade == 2){
      firstButtonPositionX = 170;
      firstButtonPositionY = 390;
      lastCardPositionY = 460;
      vetorPaises = [...vetorPaises, "holanda", "finlandia", 'catar', 'italia', 'tcheca', 'taiwan', 'vietnam', 'suica', 'nigeria', 'grecia'];
    }
    else if(dificuldade == 3){
      firstButtonPositionX = 120;
      firstButtonPositionY = 510;
      lastCardPositionY = 580;
      vetorPaises = [...vetorPaises, "holanda", "finlandia", 'catar', 'italia', 'tcheca', 'taiwan', 'vietnam', 'suica', 'nigeria', 'grecia', 'austria', 'polonia', 'camaroes', 'gana', 'senegal', 'chade', 'dinamarca', 'indonesia', 'noruega', 'romenia', 'russia', 'siria', 'thailandia', 'ucrania'];
    }
    
    // Limpando telas
    clearBtns();
    
    var title = createElement("h2");
    (title.elt).textContent = "Fase: "+(dificuldade == 1 ? "Fácil" : (dificuldade == 2 ? "Normal" : "Difícil"));
    title.position(230, 10);
    (title.elt).classList.add("title-primary");
    
    var cardGroup = createElement("div");
    cardGroup.elt.setAttribute('id', 'group');
    
    var matrizPaises = randomCards(dificuldade);
    
    difficulty = dificuldade;
    
    for(let row = 0; row < matrizPaises.length; row++){
      for(let column = 0; column < matrizPaises.length; column++){
        var card = createElement("div");
        
        addCardX = 50 * column;
        addCardY = -60 * row;
        
        
        card.position(firstButtonPositionX + addCardX, firstButtonPositionY + addCardY);
        (card.elt).classList.add("card");
        (card.elt).classList.add(vetorPaises[matrizPaises[row][column]]);
        (card.elt).dataset.country = matrizPaises[row][column];
        (card.elt).addEventListener("click", cardClick);
        (cardGroup.elt).append(card.elt);
      }
    }
    
    // Voltar para o menu principal
    var back = createButton('Voltar');
    back.position(250, lastCardPositionY);
    (back.elt).classList.add("btn");

    // Colocando eventos nos botões
    back.mousePressed(function(){
      tela = 1;
      isDrawed = 0;
      isPlay = 0;
    });

    isDrawed = 1;
  }
}

function cardClick(element){
  
  var vitoria = 0;
  
  if(!blockSelection){
    if(element.target.classList.contains('ok')){
      return;
    }
    
    element.target.classList.toggle("card");
    element.target.classList.toggle("card-face");
    
    if(!cardSelected) {
      cardSelected = element.target.dataset.country;
      cardSelectedObject = element.target;
    }
    else {
      if(cardSelectedObject == element.target){
        
        cardSelected = null;
        cardSelectedObject = null;
        
        return;
      }
      
      blockSelection = true;

      setTimeout(() => {
        if(cardSelected == element.target.dataset.country){
          (element.target).classList.add('ok');
          document.querySelectorAll('div[data-country="'+cardSelected+'"]:not(.ok)').forEach(function(element){
            element.classList.add('ok');
          });
        }
        else {
          document.querySelectorAll('.card-face:not(.ok)').forEach(function(currentValue){
            currentValue.classList.toggle("card-face");
            currentValue.classList.toggle("card");
          });
        }
        
        blockSelection = false;
        cardSelected = null;
        cardSelectedObject = null;
        
        if(difficulty == 1) vitoria = 16;
        else if(difficulty == 2) vitoria = 36;
        else vitoria = 64;
        
        if(document.querySelectorAll('.ok').length == vitoria){
          
          var divVictory = createElement("div");
          divVictory.elt.setAttribute('id', 'divVitoriaLabel');
          divVictory.position(0, 140);
          var labelVictory = createElement("h2");
          labelVictory.elt.textContent = 'Vitória';
          divVictory.elt.append(labelVictory.elt);
        }
      }, "300");
    }
  }
}

function menuInstrucoes(){
  
  var firstButtonPositionX = 250;
  var firstButtonPositionY = 360;
  var titlePositionY = 15;
  var back;
  
  // Instruções
  fill(255);
  textSize(20);
  text('Esse jogo tem como objetivo ajudar o jogador a treinar', 40, titlePositionY+100);
  text('sua memória usando bandeiras em volta do globo.', 20, titlePositionY+125);
  text('Para isso use o clique do mouse para selecionar as cartas', 40, titlePositionY+155);
  text('correspondentes.', 20, titlePositionY+180);

  if(!isDrawed){
    
    // Limpando telas
    clearBtns();
    
    // Titulo
    var title = createElement("h3");
    title.position(firstButtonPositionX + 15, titlePositionY);
    (title.elt).textContent = "Instruções";
    (title.elt).classList.add("title-secondary");

    // Cards
    var card1 = createElement("div");
    card1.position(firstButtonPositionX + 50, firstButtonPositionY - 100);
    (card1.elt).classList.add("card");
    (card1.elt).classList.add("brasil");
    
    var card2 = createElement("div");
    card2.position(firstButtonPositionX + 120, firstButtonPositionY - 100);
    (card2.elt).classList.add("card");
    (card2.elt).classList.add("inglaterra");

    var card3 = createElement("div");
    card3.position(firstButtonPositionX - 20, firstButtonPositionY - 100);
    (card3.elt).classList.add("card");
    (card3.elt).classList.add("franca");


    // Voltar para o menu principal
    back = createButton('Voltar');
    back.position(firstButtonPositionX, firstButtonPositionY);
    (back.elt).classList.add("btn");
    
    // Colocando eventos nos botões
    back.mousePressed(function(){
      tela = 1;
      isDrawed = 0;
      isPlay = 0;
    });

    card1.mousePressed(function(){
      (card1.elt).classList.toggle("card");
      (card1.elt).classList.toggle("card-face");
    });
    card2.mousePressed(function(){
      (card2.elt).classList.toggle("card");
      (card2.elt).classList.toggle("card-face");
    });
    card3.mousePressed(function(){
      (card3.elt).classList.toggle("card");
      (card3.elt).classList.toggle("card-face");
    });

    isDrawed = 1;
  }
}

function menuCreditos(){
  var firstPhotoPositionX = 40;
  var firstPhotoPositionY = 75;
  var firstButtonPositionX = 250;
  var firstButtonPositionY = 360;
  var titlePositionY = 15;
  var back;

  image(autor, firstPhotoPositionX, firstPhotoPositionY, autor.width / 2, autor.height / 2);
  image(prof, 380, firstPhotoPositionY - 10, prof.width / 3, prof.height / 3);

  if(!isDrawed){
    
    // Limpando telas
    clearBtns();
    
    // Titulo
    var title = createElement("h3");
    title.position(firstButtonPositionX + 20, titlePositionY);
    (title.elt).textContent = "Créditos";
    (title.elt).classList.add("title-secondary");

    // Autor
    var autorNome = createElement("h5");
    autorNome.position(firstPhotoPositionX-15, firstPhotoPositionY + (autor.height/2) - 30);
    (autorNome.elt).textContent = "Aluno: Christian Cauã";
    (autorNome.elt).classList.add("title-secondary");

    // Prof
    var profNome = createElement("h5");
    (profNome.elt).textContent = "Orientadora: Idalmis Milian";
    (profNome.elt).classList.add("title-secondary");
    profNome.position(320, firstPhotoPositionY + (autor.height/2) - 30);

    var profLocal = createElement("h6");
    (profLocal.elt).textContent = "Instituição: ECT/UFRN";
    (profLocal.elt).classList.add("title-secondary");
    profLocal.position(320, firstPhotoPositionY + (autor.height/2) - 15);
    
    // Voltar para o menu principal
    back = createButton('Voltar');
    back.position(firstButtonPositionX, firstButtonPositionY);
    (back.elt).classList.add("btn");
    
    // Colocando eventos nos botões
    back.mousePressed(function(){
      tela = 1;
      isDrawed = 0;
      isPlay = 0;
    });

    isDrawed = 1;
  }
}

function clearBtns(){
  var allBtns = document.querySelectorAll('.btn, .title-secondary, .title-primary, .card, .card-face, #divVitoriaLabel');
  
  allBtns.forEach(function(currentValue){
    currentValue.parentNode.removeChild(currentValue);
  });
}

function keyPressed() {
  // Colocando evento para retornar ao menu principal
  if(key == 'Escape'){
      tela = 1;
      isDrawed = 0;
      isPlay = 0;
  }
}

function randomCards(dificuldade){
  var matrizCards = [];
  var vetorPais = [];
  var vetorPaisDisponivel = []
  var vetorDisponivel = [];
  
  switch(dificuldade){
    case 1:
      matrizCards[0] = [];
      matrizCards[1] = [];
      matrizCards[2] = [];
      matrizCards[3] = [];

      vetorPais[0] = 0;
      vetorPais[1] = 0;
      vetorPais[2] = 0;
      vetorPais[3] = 0;
      vetorPais[4] = 0;
      vetorPais[5] = 0;
      vetorPais[6] = 0;
      vetorPais[7] = 0;

      vetorPaisDisponivel = [0,1,2,3,4,5,6,7];
      
      for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
          vetorDisponivel.push([i,j]);
        }
      }
      break;
      
    case 2:
      matrizCards[0] = [];
      matrizCards[1] = [];
      matrizCards[2] = [];
      matrizCards[3] = [];
      matrizCards[4] = [];
      matrizCards[5] = [];
      
      for(let fill = 0; fill < 18; fill++){
        vetorPais[fill] = 0;
        vetorPaisDisponivel[fill] = fill;
      }

      for(let i = 0; i < 6; i++){
        for(let j = 0; j < 6; j++){
          vetorDisponivel.push([i,j]);
        }
      }
      break;
    case 3:
      
        matrizCards[0] = [];
        matrizCards[1] = [];
        matrizCards[2] = [];
        matrizCards[3] = [];
        matrizCards[4] = [];
        matrizCards[5] = [];
        matrizCards[6] = [];
        matrizCards[7] = [];
      
        for(let fill = 0; fill < 32; fill++){
          vetorPais[fill] = 0;
          vetorPaisDisponivel[fill] = fill;
        }
      
        for(let i = 0; i < 8; i++){
          for(let j = 0; j < 8; j++){
            vetorDisponivel.push([i,j]);
          }
        }
      
        break;
  }
  
  var numIndex = 0;
  var numPaisIndex = 0;
  
  while(vetorDisponivel.length > 0){
    numIndex = Math.floor(Math.random() * (vetorDisponivel.length - 1));
    var numPaisIndexDisponivel = Math.floor(Math.random() * (vetorPaisDisponivel.length - 1));
    numPaisIndex = vetorPaisDisponivel[numPaisIndexDisponivel];    
    
    var cardPosition = vetorDisponivel[numIndex];
    
    if(++vetorPais[numPaisIndex] == 2) vetorPaisDisponivel.splice(numPaisIndexDisponivel, 1);
    matrizCards[cardPosition[0]][cardPosition[1]] = numPaisIndex;
    
    vetorDisponivel.splice(numIndex, 1);
  }
  
  return matrizCards;
}